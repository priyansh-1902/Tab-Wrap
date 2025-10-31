
import React, { useState, useEffect } from 'react';

const defaultCategories = [
  { text: "Work and Learning", emoji: "💼" },
  { text: "Finance", emoji: "💰" },
  { text: "Hobbies / Creativity", emoji: "🎨" },
  { text: "Spirituality", emoji: "🧘" },
  { text: "Health / Fitness", emoji: "🏋️" },
  { text: "Social Media / Messaging", emoji: "💬" },
  { text: "Community / Volunteering", emoji: "🤝" },
  { text: "Entertainment / Gaming", emoji: "🎬" },
  { text: "Shopping", emoji: "🛒" },
  { text: "News", emoji: "📰" },
  { text: "Travel", emoji: "✈️" },
  { text: "Misc / Uncategorized", emoji: "❓" }
];

export default function OptionsPage() {
  const [db, setDb] = useState({});
  const [profile, setProfile] = useState({ description: '', categories: defaultCategories });
  const [historyPaused, setHistoryPaused] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  const [debugDate, setDebugDate] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['db', 'profile', 'historyPaused', 'debugMode', 'debugDate', 'selectedCategories'], (data) => {
      setDb(data.db || {});
      setProfile(data.profile || { description: '', categories: defaultCategories });
      setHistoryPaused(!!data.historyPaused);
      setDebugMode(!!data.debugMode);
      setDebugDate(data.debugDate || '');
      setSelectedCategories(data.selectedCategories || defaultCategories.map(cat => typeof cat === 'string' ? cat : cat.text));
    });
  }, []);
  // Toggle category selection
  const handleCategoryClick = (cat) => {
    let text = typeof cat === 'string' ? cat : cat.text;
    let updated;
    if (selectedCategories.includes(text)) {
      updated = selectedCategories.filter(c => c !== text);
    } else {
      updated = [...selectedCategories, text];
    }
    setSelectedCategories(updated);
    chrome.storage.local.set({ selectedCategories: updated });
  };

  const handleDebugToggle = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    chrome.storage.local.set({ debugMode: newDebugMode });
    if (!newDebugMode) {
      setDebugDate('');
      chrome.storage.local.remove('debugDate');
    }
  };

  const handleDebugDateChange = (e) => {
    setDebugDate(e.target.value);
    chrome.storage.local.set({ debugDate: e.target.value });
  };

  const saveProfile = () => {
    chrome.storage.local.set({ profile }, async () => {
      await categorizeEntries(true);
    });
  };

  const clearProfile = () => {
    chrome.storage.local.remove('profile', async () => {
      setProfile({ description: '', categories: defaultCategories });
      await categorizeEntries(true);
    });
  };

  // Helpers and categorizeEntries implementation
  async function getStorage(keys) {
    return new Promise((resolve) => chrome.storage.local.get(keys, resolve));
  }

  async function setStorage(obj) {
    return new Promise((resolve) => chrome.storage.local.set(obj, resolve));
  }


  async function calculateTabWrapSummary() {
  categorizeEntries(false); // Ensure all entries are categorized first
  const { db, profile } = await getStorage(['db', 'profile']);
    const summary = {
      perDay: {},
      totalSeconds: 0,
      totalMinutes: 0,
      totalTabs: 0,
      highestDay: null,
      highestMinutes: 0,
      categoryTotals: {},
      categoryPercents: [],
      topCategoryWebsites: {}, // New field for unique websites per top category
    };
    let totalSeconds = 0;
    let totalTabs = 0;
    let highestDay = null;
    let highestMinutes = 0;
    const categoryTotals = {};
    // First pass: calculate totals
    for (const date of Object.keys(db || {})) {
      let daySeconds = 0;
      let dayTabs = 0;
      for (const entry of Object.values(db[date] || {})) {
        daySeconds += entry.time || 0;
        dayTabs += entry.count || 0;
        if (entry.category) {
          if (!categoryTotals[entry.category]) categoryTotals[entry.category] = 0;
          categoryTotals[entry.category] += entry.time || 0;
        }
      }
      summary.perDay[date] = {
        seconds: daySeconds,
        minutes: Math.floor(daySeconds / 60),
        tabs: dayTabs
      };
      totalSeconds += daySeconds;
      totalTabs += dayTabs;
      if (daySeconds / 60 > highestMinutes) {
        highestMinutes = Math.floor(daySeconds / 60);
        highestDay = date;
      }
    }
    summary.totalSeconds = totalSeconds;
    summary.totalMinutes = Math.floor(totalSeconds / 60);
    summary.totalTabs = totalTabs;
    summary.highestDay = highestDay;
    summary.highestMinutes = highestMinutes;
    summary.categoryTotals = categoryTotals;
    // Calculate percent breakdown
    summary.categoryPercents = Object.entries(categoryTotals)
      .map(([cat, sec]) => ({
        cat,
        sec,
        hrs: Math.round(sec / 3600),
        pct: totalSeconds ? (sec / totalSeconds * 100) : 0
      }))
      .sort((a, b) => b.sec - a.sec);

    // Get top 100 pages (by time spent) for each top 5 category and save their titles
    const top5 = summary.categoryPercents.slice(0, 5).map(x => x.cat);
    const topPagesByCategory = {};
    for (const cat of top5) {
      topPagesByCategory[cat] = [];
    }
    // Collect all entries for each top category
    for (const date of Object.keys(db || {})) {
      for (const [url, entry] of Object.entries(db[date] || {})) {
        if (top5.includes(entry.category)) {
          topPagesByCategory[entry.category].push({
            title: entry.title || url,
            time: entry.time || 0,
            url
          });
        }
      }
    }
    // Sort and keep top 100 by time spent
    summary.categorySummaries = {};
    for (const cat of top5) {
      topPagesByCategory[cat] = topPagesByCategory[cat]
        .sort((a, b) => b.time - a.time)
        .slice(0, 100);
      summary.topCategoryWebsites[cat] = topPagesByCategory[cat].map(page => page.title);
      console.log('Top pages for category', cat, ':', summary.topCategoryWebsites[cat]);
      // Summarize top 100 titles for this category using Summarizer API
      // if ('Summarizer' in window && window.Summarizer) {
        try {
          // const availability = await window.Summarizer.availability();
          // if (availability === 'available') {
            console.log('Summarizing category:', cat);

            // if (navigator.userActivation?.isActive) {
              const summarizer = await window.Summarizer.create({
                type: 'tldr',
                format: 'plain-text',
                length: 'short',
                sharedContext: `Summarize the user's behavior in the category '${cat}' from the following top 100 pages. Strictly keep it under 100 words.`
              });
              const titleList = topPagesByCategory[cat].map((p, i) => `${i + 1}. ${p.title} (${p.time} seconds)`).join('\n');
              const userDesc = (profile?.description || '');
              const inputText = `User description: ${userDesc}\nTop 100 pages in category '${cat}':\n${titleList}`;
              const summaryText = await summarizer.summarize(inputText);
              summary.categorySummaries[cat] = summaryText;
            // }
          // }
        } catch (e) {
          console.log('Error summarizing category', cat, ':', e);
          summary.categorySummaries[cat] = 'Summary unavailable.';
        }
      // } else {
      //   summary.categorySummaries[cat] = 'Summarizer API not available.';
      // }
    }

    // Generalize streak logic for top 5 categories
    summary.topCategoryStreaks = {};
    for (const cat of top5) {
      let streakArr = [];
      // Build a map of date -> minutes for this category
      const dateMinutes = {};
      for (const date of Object.keys(db || {})) {
        let seconds = 0;
        for (const entry of Object.values(db[date] || {})) {
          if (entry.category === cat) {
            seconds += entry.time || 0;
          }
        }
        dateMinutes[date] = seconds; // Save time in seconds for streaks
      }
      // Fill in missing dates with zero minutes
      const allDates = Object.keys(dateMinutes).sort();
      if (allDates.length > 0) {
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);
        const padDates = [];
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const iso = d.toISOString().slice(0, 10);
          padDates.push(iso);
        }
        // Build padded streak array
        const paddedArr = padDates.map(date => ({ date, minutes: dateMinutes[date] || 0 }));
        // Find the 7 consecutive days with the maximum total seconds
        let maxSum = -1, maxIdx = 0;
        for (let i = 0; i <= paddedArr.length - 7; i++) {
          const sum = paddedArr.slice(i, i + 7).reduce((acc, x) => acc + x.minutes, 0);
          if (sum > maxSum) {
            maxSum = sum;
            maxIdx = i;
          }
        }
        streakArr = paddedArr.slice(maxIdx, maxIdx + 7).map(day => ({ date: day.date, seconds: day.minutes })); // Save as seconds
      } else {
        streakArr = [];
      }
      summary.topCategoryStreaks[cat] = streakArr;
      if (cat === 'Work and Professional' || cat === 'Work and Learning') {
        summary.workStreak = streakArr;
      }
      console.log(`Streak for ${cat}:`, streakArr);
    }
    await setStorage({ tabWrapSummary: summary });
    console.log('Tab Wrap summary calculated!');
  }

  async function categorizeEntries(all = false) {
    const { db, profile } = await getStorage(['db', 'profile']);
    if (!window.LanguageModel) {
      console.log('LanguageModel API not available');
      return;
    }
    const available = await LanguageModel.availability();
    if (available === 'unavailable') {
      console.log('Gemini Nano not available');
      return;
    }
    const session = await LanguageModel.create();
    const description = profile?.description || '';
    const categories = (profile?.categories || []).map(cat => typeof cat === 'string' ? cat : cat.text);
    let updated = false;
    for (const date of Object.keys(db || {})) {
      for (const [url, entry] of Object.entries(db[date] || {})) {
        if (all || !entry.category) {
          console.log('Checking entry for URL:', url, 'Current category:', entry.category);
          const prompt = `User description: ${description}\nCategories: ${categories.join(', ')}\nURL: ${url}\nTitle: ${entry.title}\n\nBased on the above, which category was the user spending time on?\nStrictly output only one category from the list above. If none match, output 'miscellaneous'.`;
          console.log("Asking model with prompt:", prompt);
          try {
            const result = await session.prompt(prompt);
            entry.category = result.trim();
            updated = true;
          } catch (e) {
            entry.category = 'error';
            updated = true;
          }
        }
      }
    }
  
    session.destroy();
    if (updated) {
      await setStorage({ db });
    } else {
      console.log('No entries found.');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: 32,
      background: '#111',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: 'Inter, Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      {/* Blurred gradient overlays for tab wrap aesthetic */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: 40,
          left: 60,
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, #ff2d55 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.7,
        }} />
        <div style={{
          position: 'absolute',
          top: 120,
          right: 40,
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, #a259ff 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 120,
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, #2ecc40 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.5,
        }} />
      </div>
      <div style={{
        maxWidth: 700,
        width: '100%',
      }}>
        <h2 style={{
          color: '#fff',
          fontWeight: 800,
          fontSize: 36,
          letterSpacing: 1,
          marginBottom: 18,
          textAlign: 'center',
          textShadow: '0 2px 12px #a259ff, 0 1px 4px #ff2d55',
        }}>Tab Wrap Options</h2>
        <div style={{ marginBottom: 24 }}>
        <label>
          <input type="checkbox" checked={debugMode} onChange={handleDebugToggle} /> Debug Mode
        </label>
        {debugMode && (
          <div style={{ marginTop: 8 }}>
            <label>Set Debug Date: </label>
            <input
              type="date"
              value={debugDate}
              onChange={handleDebugDateChange}
              style={{ marginLeft: 8 }}
            />
          </div>
        )}
      </div>
  <div style={{ margin: '24px 0', background: 'transparent', borderRadius: 18, padding: 20, color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
        <label style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12, display: 'block', letterSpacing: 1 }}>Tell us about yourself:</label>
        <textarea
          value={profile.description}
          onChange={e => setProfile({ ...profile, description: e.target.value })}
          style={{
            width: '100%',
            minHeight: 60,
            background: 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: 16,
            fontFamily: 'inherit',

            outline: 'none',
            resize: 'vertical',
          }}
          placeholder="Share a bit about your work, interests, or browsing habits..."
        />
      </div>
  <div style={{ margin: '24px 0', background: 'transparent', borderRadius: 18, padding: 20, color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
        <label style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12, display: 'block', letterSpacing: 1 }}>Categories (click to select):</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          {profile.categories.map((cat, idx) => {
            let emoji = '';
            let text = '';
            if (typeof cat === 'string') {
              const def = defaultCategories.find(dc => dc.text === cat);
              emoji = def ? def.emoji : '';
              text = cat;
            } else {
              emoji = cat.emoji;
              text = cat.text;
            }
            const selected = selectedCategories.includes(text);
            return (
              <span
                key={text + idx}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  background: selected ? '#fff' : '#f3f3f3',
                  color: selected ? '#222' : '#444',
                  borderRadius: 14,
                  padding: '10px 18px',
                  fontSize: 17,
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: selected ? '0 2px 12px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.08)',
                  border: selected ? '2px solid #4f8cff' : '1px solid #eee',
                  minWidth: 90,
                  justifyContent: 'center',
                  cursor: 'pointer',
                  opacity: selected ? 1 : 0.85,
                  transition: 'all 0.2s',
                  userSelect: 'none',
                  fontWeight: selected ? 600 : 400,
                  letterSpacing: 0.5,
                }}
                title={selected ? 'Included in analytics' : 'Excluded from analytics'}
              >
                {emoji && <span style={{ fontSize: 24, marginRight: 10 }}>{emoji}</span>}{text}
              </span>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
          <button style={{ background: 'white', color: 'rgb(255, 90, 46)', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(46,204,64,0.12)', cursor: 'pointer' }} onClick={saveProfile}>Save Profile</button>
          <button style={{ background: 'white', color: 'rgb(255, 90, 46)', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(162,89,255,0.12)', cursor: 'pointer' }} onClick={clearProfile}>Clear Profile</button>
          <button style={{ background: 'white', color: 'rgb(255, 90, 46)', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(79,140,255,0.12)', cursor: 'pointer' }} onClick={() => categorizeEntries(false)}>Categorize</button>
          <button style={{ background: 'white', color: 'rgb(255, 90, 46)', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(255,45,85,0.12)', cursor: 'pointer' }} onClick={calculateTabWrapSummary}>Tab Wrap</button>
        </div>
        {/* Table rendering removed as per user request. */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 18 }}>
          <button style={{ background: 'linear-gradient(90deg, #232526 0%, #414345 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer' }} onClick={() => chrome.storage.local.set({ db: {} }, () => setDb({}))}>Clear DB</button>
          <button style={{ background: 'linear-gradient(90deg, #232526 0%, #ff2d55 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(255,45,85,0.12)', cursor: 'pointer' }} onClick={() => chrome.storage.local.set({ historyPaused: true }, () => setHistoryPaused(true))}>Pause History</button>
          <button style={{ background: 'linear-gradient(90deg, #232526 0%, #2ecc40 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(46,204,64,0.12)', cursor: 'pointer' }} onClick={() => chrome.storage.local.set({ historyPaused: false }, () => setHistoryPaused(false))}>Resume History</button>
        </div>
      </div>
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <button style={{ background: 'linear-gradient(90deg, #ff2d55 0%, #232526 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 32px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px rgba(255,45,85,0.18)', cursor: 'pointer', marginTop: 24 }} onClick={() => window.location.href = 'test_page.html'}>
          Go to Test Page
        </button>
      </div>
      </div>
    </div>
  );
};


// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<OptionsPage />);