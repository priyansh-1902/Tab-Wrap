// Offscreen categorizer script

// Helper: fetch categories from profile
async function getCategories() {
  const { profile } = await chrome.storage.local.get(['profile']);
  return profile?.categories || [];
}

// Helper: categorize a url (same logic as options page)
function categorizeUrl(url, categories) {
  // Example: match by substring, fallback to 'Misc'
  for (const cat of categories) {
    if (cat.keywords && cat.keywords.some(kw => url.includes(kw))) {
      return cat.name;
    }
  }
  return 'Misc';
}

// Storage helpers
async function getStorage(keys) {
  return new Promise((resolve) => chrome.storage.local.get(keys, resolve));
}
async function setStorage(obj) {
  return new Promise((resolve) => chrome.storage.local.set(obj, resolve));
}

// Main handler for categorization
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  console.log('[offscreen] Received message:', msg);
  if (msg.type === 'CATEGORIZE_ENTRIES' && Array.isArray(msg.entries)) {
    const profile = msg.profil;
    const entries = msg.entries;
    console.log('[offscreen] Got entries and profile:', entries, profile);
    if (!window.LanguageModel) {
      console.log('[offscreen] LanguageModel API not available');
      sendResponse({ success: false });
      chrome.offscreen.closeDocument();
      return;
    }
    const available = await LanguageModel.availability();
    console.log('[offscreen] LanguageModel availability:', available);
    if (available === 'unavailable') {
      console.log('[offscreen] Gemini Nano not available');
      sendResponse({ success: false });
      chrome.offscreen.closeDocument();
      return;
    }
    const session = await LanguageModel.create();
    console.log('[offscreen] Created LanguageModel session');
    const description = profile?.description || 'No description provided';
    const categories = (profile?.categories || []).map(cat => typeof cat === 'string' ? cat : cat.text);
    let updatedEntries = [];
    for (const entry of entries) {
      const { url, date, title } = entry;
      console.log('[offscreen] Processing entry:', entry);
      const prompt = `User description: ${description}\nCategories: ${categories.join(', ')}\nURL: ${url}\nTitle: ${title}\n\nBased on the above, which category was the user spending time on?\nStrictly output only one category from the list above. If none match, output 'miscellaneous'.`;
      console.log('[offscreen] Prompt:', prompt);
      try {
        const result = await session.prompt(prompt);
        entry.category = result.trim();
        updatedEntries.push(entry);
        console.log('[offscreen] Categorized:', url, 'as', result.trim());
      } catch (e) {
        entry.category = 'error';
        updatedEntries.push(entry);
        console.log('[offscreen] Error categorizing:', url, e);
      }
    }
    session.destroy();
    console.log('[offscreen] Destroyed LanguageModel session');
    // Instead of sendResponse, send categorized entries to background
    chrome.runtime.sendMessage({ type: 'CATEGORIZED_ENTRIES', entries: updatedEntries });
    console.log('[offscreen] Sent CATEGORIZED_ENTRIES to background, waiting for CLOSE_OFFSCREEN');
    // Do not close here, wait for handshake
  }
  if (msg.type === 'CLOSE_OFFSCREEN') {
    console.log('[offscreen] Received CLOSE_OFFSCREEN, closing doc');
    chrome.offscreen.closeDocument();
  }
});