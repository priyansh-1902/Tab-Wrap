let activeTabId = null;
let activeTabUrl = null;
let activeTabTitle = null;
let lastActivated = null;
let lastUpdatedEntries = [];

// Returns today's date in YYYY-MM-DD format, or debug date if set
async function getToday() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    const { debugMode, debugDate } = await new Promise(resolve => chrome.storage.local.get(['debugMode', 'debugDate'], resolve));
    if (debugMode && debugDate) {
      return debugDate;
    }
  }
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// Updates the db object for a given date and url
function updateDbForDate(db, date, url, entryUpdate) {
  if (!db[date]) db[date] = {};
  if (!db[date][url]) db[date][url] = { time: 0, title: url, category: '', count: 0 };
  Object.assign(db[date][url], entryUpdate);
  return db;
}

// Helper to update time spent and title, grouped by day
async function updateTime(url, title, delta) {
  if (!url) return;
  if (!delta) return;
  const storage = await chrome.storage.local.get(['db', 'historyPaused']);
  const db = storage.db || {};
  const historyPaused = storage.historyPaused;
  if (historyPaused) return;
  const today = await getToday();
  updateDbForDate(db, today, url, {
    time: (db[today]?.[url]?.time || 0) + delta,
    title: title || url,
    lastUpdated: Date.now()
  });
  await chrome.storage.local.set({ db });
  trackUpdatedUrl(url, today);
}

function trackUpdatedUrl(url, date) {
  console.log('[trackUpdatedUrl] Called with:', url, date);
  // Remove if already present
  lastUpdatedEntries = lastUpdatedEntries.filter(e => !(e.url === url && e.date === date));
  console.log('[trackUpdatedUrl] After filter:', lastUpdatedEntries);
  // Add to front
  lastUpdatedEntries.unshift({ url, date });
  console.log('[trackUpdatedUrl] After unshift:', lastUpdatedEntries);
  // Keep only last 10
  if (lastUpdatedEntries.length > 10) lastUpdatedEntries = lastUpdatedEntries.slice(0, 10);
  console.log('[trackUpdatedUrl] After slice:', lastUpdatedEntries);
  // If exactly 10 unique, trigger categorize
  if (lastUpdatedEntries.length === 10) {
    console.log('[trackUpdatedUrl] Triggering categorize with:', lastUpdatedEntries);
    createOffscreenAndCategorize(lastUpdatedEntries.slice());
    lastUpdatedEntries = [];
    console.log('[trackUpdatedUrl] Reset lastUpdatedEntries');
  }
}

async function createOffscreenAndCategorize(entries) {
  console.log('[createOffscreenAndCategorize] Called with:', entries);
  // Create offscreen document if not already present
  if (!await chrome.offscreen.hasDocument()) {
    console.log('[createOffscreenAndCategorize] Creating offscreen document');
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['DOM_PARSER'],
      justification: 'Categorize URLs in background'
    });
  } else {
    console.log('[createOffscreenAndCategorize] Offscreen document already exists');
  }
  // Get db and profile
  const { db, profile } = await chrome.storage.local.get(['db', 'profile']);
  // Build full entry objects for each tracked entry
  const fullEntries = entries.map(({ url, date }) => {
    const entry = (db[date] && db[date][url]) ? { ...db[date][url], url, date } : { url, date, title: url };
    return entry;
  });
  // Send message to offscreen doc to run categorizeEntries
  console.log('[createOffscreenAndCategorize] Sending message to offscreen doc with full entries and profile');
  console.log('profile:', profile);
  chrome.runtime.sendMessage({ type: 'CATEGORIZE_ENTRIES', entries: fullEntries, profil: profile });
}

// Request title from content script
function requestTabInfo(tabId) {
  chrome.tabs.sendMessage(tabId, { type: 'REQUEST_TAB_INFO' }, (response) => {
    if (response && response.url) {
      activeTabUrl = response.url;
      activeTabTitle = response.title;
    } else {
      activeTabUrl = null;
      activeTabTitle = null;
    }
    lastActivated = Date.now();
  });
}

// When tab is activated
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const now = Date.now();
  if (activeTabUrl && lastActivated) {
    await updateTime(activeTabUrl, activeTabTitle, Math.floor((now - lastActivated) / 1000));
  }
  // Add new tab's url to db and set lastUpdated
  activeTabId = activeInfo.tabId;
  chrome.tabs.get(activeTabId, async (tab) => {
    if (tab && tab.url && !tab.url.startsWith('chrome://')) {
      const storage = await chrome.storage.local.get(['db']);
      const db = storage.db || {};
      const today = await getToday();
      if (!db[today]) db[today] = {};
      if (!db[today][tab.url]) {
        db[today][tab.url] = { time: 0, title: tab.title || tab.url, count: 0, lastUpdated: Date.now() };
      } else {
        db[today][tab.url].lastUpdated = Date.now();
      }
      await chrome.storage.local.set({ db });
    }
  });
  requestTabInfo(activeTabId);
});

// When window focus changes
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  const now = Date.now();
  if (activeTabUrl && lastActivated) {
    await updateTime(activeTabUrl, activeTabTitle, Math.floor((now - lastActivated) / 1000));
  }
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    activeTabId = null;
    activeTabUrl = null;
    activeTabTitle = null;
    lastActivated = null;
  } else {
    // Get active tab in new window
    const tabs = await chrome.tabs.query({ active: true, windowId });
    const tab = tabs[0];
    if (tab) {
      activeTabId = tab.id;
      requestTabInfo(activeTabId);
    }
  }
});

// Inject content script into all tabs when extension is installed or started
function injectAllTabs() {
  chrome.tabs.query({}, (tabs) => {
    let injectedCount = 0;
    for (const tab of tabs) {
      try {
        if (!tab.url.startsWith('chrome://')) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
          injectedCount++;
        }
      } catch (e) {
        // ignore tabs we can't access
      }
    }
    console.log(`[injectAllTabs] Injected content script into ${injectedCount} tabs.`);
  });
}

chrome.runtime.onInstalled.addListener(() => injectAllTabs());
chrome.runtime.onStartup.addListener(() => injectAllTabs());

// Open the Tab Wrap page as a full tab (not popup) when the toolbar action is clicked
chrome.action && chrome.action.onClicked && chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('tabwrap.html') });
});

// On extension suspend (service worker unload)
self.addEventListener('onSuspend', async () => {
  const now = Date.now();
  if (activeTabUrl && lastActivated) {
    await updateTime(activeTabUrl, activeTabTitle, Math.floor((now - lastActivated) / 1000));
  }
});

// Listen for messages from content or pages
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'TAB_INFO' && message.url) {
    activeTabUrl = message.url;
    activeTabTitle = message.title;
    lastActivated = Date.now();
    sendResponse({ status: 'ok' });
  }
  if (message.type === 'CATEGORIZED_ENTRIES' && Array.isArray(message.entries)) {
    console.log('[background] Received CATEGORIZED_ENTRIES:', message.entries);
    const storage = await chrome.storage.local.get(['db']);
    const db = storage.db || {};
    for (const entry of message.entries) {
      const { url, date, category } = entry;
      if (!db[date]) db[date] = {};
      if (!db[date][url]) db[date][url] = {};
      db[date][url].category = category;
    }
    await chrome.storage.local.set({ db });
    console.log('[background] Updated db with categorized entries');
    // Handshake: tell offscreen doc to close
    chrome.runtime.sendMessage({ type: 'CLOSE_OFFSCREEN' });
    console.log('[background] Sent CLOSE_OFFSCREEN to offscreen doc');
  }
});

// Increment count and update lastUpdated when a tab is loaded or reloaded
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url &&
    !tab.url.startsWith('chrome://') &&
    !tab.url.startsWith('chrome-extension://')) {
    const storage = await chrome.storage.local.get(['db']);
    const db = storage.db || {};
    const today = await getToday();
    if (!db[today]) db[today] = {};
    if (!db[today][tab.url]) {
      db[today][tab.url] = { time: 0, title: tab.title || tab.url, count: 0, lastUpdated: Date.now() };
    } else {
      db[today][tab.url].lastUpdated = Date.now();
    }
    db[today][tab.url].count = (db[today][tab.url].count || 0) + 1;
    await chrome.storage.local.set({ db });
    trackUpdatedUrl(tab.url, today);
    console.log(`[onUpdated] Incremented count for URL: ${tab.url} | Count: ${db[today][tab.url].count}`);
    if (tab.active) {
      activeTabId = tabId;
      activeTabUrl = tab.url;
      activeTabTitle = tab.title || tab.url;
      lastActivated = Date.now();
    }
  }
});
