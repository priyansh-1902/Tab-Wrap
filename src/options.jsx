import React, { useState, useEffect } from 'react';
import { ToggleLeft, User, Save, Trash2, Zap, Play, Pause, Database, Settings } from 'lucide-react';

const defaultCategories = [
  { text: "Work", emoji: "💼", color: "#7e22ce" }, // purple
  { text: "Finance", emoji: "💰", color: "#22c55e" }, // green
  { text: "Hobbies", emoji: "🎨", color: "#facc15" }, // yellow
  { text: "Spirituality", emoji: "🧘", color: "#22d3ee" }, // teal
  { text: "Health", emoji: "🏋️", color: "#ef4444" }, // red
  { text: "Social Media", emoji: "💬", color: "#ff6347" }, // bright red
  { text: "Community", emoji: "🤝", color: "#a259ff" }, // violet
  { text: "Entertainment", emoji: "🎬", color: "#fb923c" }, // orange
  { text: "Shopping", emoji: "🛒", color: "#38bdf8" }, // blue
  { text: "News", emoji: "📰", color: "#2563eb" }, // blue
  { text: "Travel", emoji: "✈️", color: "#f472b6" }, // pink
  { text: "Miscellaneous", emoji: "❓", color: "#d1d5db" } // gray
];

const NotificationToast = () => (
  <div 
    id="notification-message"
    className="fixed top-5 right-5 z-50 p-4 bg-purple-600/90 text-white rounded-lg shadow-xl transition-opacity duration-500 opacity-0 pointer-events-none"
    style={{ minWidth: '200px', backdropFilter: 'blur(5px)' }}
  >
    Action Complete!
  </div>
);


const CustomCheckbox = ({ checked, onChange, label }) => (
  <label className="flex items-center space-x-3 cursor-pointer select-none">
    <div className={`relative w-12 h-6 flex items-center rounded-full transition-all duration-300 ${checked ? 'bg-[#ff0099]' : 'bg-gray-700'}`}>
      <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 transform ${checked ? 'translate-x-7' : 'translate-x-1'}`}></div>
    </div>
    <span className="text-gray-300 font-medium">{label}</span>
    <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
  </label>
);


const ActionButton = ({ onClick, children, className = '', color = 'primary', Icon }) => {
  let baseClasses = "py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap";
  let colorClasses = '';

  switch (color) {
    case 'save': // Save Profile / Test Page (Orange/Red Gradient)
      colorClasses = 'bg-gradient-to-r from-[#ff6347] to-[#e04020] text-white hover:from-[#e04020] hover:to-[#c03010] shadow-[#ff6347]/50';
      break;
    case 'clear': // Clear/Neutral (Subtle Gray, slight red hover for clear)
      colorClasses = 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-red-900/50 hover:text-white shadow-inner shadow-black/30';
      break;
    case 'categorize': // Categorize/Action (Purple Gradient)
      colorClasses = 'bg-gradient-to-r from-[#a855f7] to-[#8b5cf6] text-white hover:from-[#8b5cf6] hover:to-[#7c3aed] shadow-[#a855f7]/50';
      break;
    case 'tabwrap': // Tab Wrap (Pink Gradient)
      colorClasses = 'bg-gradient-to-r from-[#ff0099] to-[#d60080] text-white hover:from-[#e00080] hover:to-[#c20070] shadow-[#ff0099]/50';
      break;
    case 'history-pause': // Pause History (Dark Red Glow)
      colorClasses = 'bg-gray-800 text-red-400 border border-red-700/50 hover:bg-red-900/30 shadow-red-900/50';
      break;
    case 'history-resume': // Resume History (Dark Green Glow)
      colorClasses = 'bg-gray-800 text-green-400 border border-green-700/50 hover:bg-green-900/30 shadow-green-900/50';
      break;
    default:
      colorClasses = 'bg-gray-800 text-white hover:bg-gray-700';
  }


  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${colorClasses} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
};




export default function OptionsPage() {
  const [db, setDb] = useState({});
  const [profile, setProfile] = useState({ description: '', categories: defaultCategories });
  const [historyPaused, setHistoryPaused] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  const [debugDate, setDebugDate] = useState('');
  const [tabWrapLoading, setTabWrapLoading] = useState(false);
  const [tabWrapReady, setTabWrapReady] = useState(false);
  const [tabWrapError, setTabWrapError] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['db', 'profile', 'historyPaused', 'debugMode', 'debugDate', 'selectedCategories'], (data) => {
      setDb(data.db || {});
      const profileObj = data.profile || { description: '', categories: defaultCategories };
      setProfile(profileObj);
      // Pause history if description is empty
      if (!profileObj.description || profileObj.description.trim() === '') {
        chrome.storage.local.set({ historyPaused: true });
        setHistoryPaused(true);
      } else {
        setHistoryPaused(!!data.historyPaused);
      }
      setDebugMode(!!data.debugMode);
      setDebugDate(data.debugDate || '');
      setSelectedCategories(data.selectedCategories || defaultCategories.map(cat => typeof cat === 'string' ? cat : cat.text));
    });
  }, []);

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
      // Pause history if textarea is empty, resume if not
      const textarea = document.querySelector('textarea');
      const value = textarea ? textarea.value : '';
      if (!value || value.trim() === '') {
        chrome.storage.local.set({ historyPaused: true });
        setHistoryPaused(true);
      } else {
        chrome.storage.local.set({ historyPaused: false });
        setHistoryPaused(false);
      }
      await categorizeEntries(true);
    });
  };

  const clearProfile = () => {
    chrome.storage.local.remove('profile', async () => {
      setProfile({ description: '', categories: defaultCategories });
      chrome.storage.local.set({ historyPaused: true });
      setHistoryPaused(true);
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
    setTabWrapLoading(true);
    setTabWrapReady(false);
    setTabWrapError('');

    const { db } = await getStorage(['db']);
    // Calculate totalSeconds before categorization
    let totalSeconds = 0;
    for (const date of Object.keys(db || {})) {
      for (const entry of Object.values(db[date] || {})) {
        totalSeconds += entry.time || 0;
      }
    }
    if (totalSeconds < 120) {
      setTabWrapLoading(false);
      setTabWrapReady(false);
      setTabWrapError('You have spent less than 5 minutes browsing. Maybe spend some time browsing and try again later.');
      return;
    }
    await categorizeEntries(false); // Ensure all entries are categorized first
    const { profile } = await getStorage(['db', 'profile']);
    // Remove all entries whose category is not in defaultCategories (case-insensitive, do not mutate original db)
    const allowedCategories = defaultCategories.map(cat => (typeof cat === 'string' ? cat : cat.text.toLowerCase()));
    const filteredDb = {};
    for (const date of Object.keys(db || {})) {
      for (const [url, entry] of Object.entries(db[date] || {})) {
        if (entry.category && allowedCategories.includes(entry.category.toLowerCase())) {
          if (!filteredDb[date]) filteredDb[date] = {};
          filteredDb[date][url] = { ...entry };
        }
      }
    }
    // Use filteredDb for all summary calculations below
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
    let totalTabs = 0;
    let highestDay = null;
    let highestMinutes = 0;
    const categoryTotals = {};
    // First pass: calculate totals
    for (const date of Object.keys(filteredDb || {})) {
      let daySeconds = 0;
      let dayTabs = 0;
      for (const entry of Object.values(filteredDb[date] || {})) {
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
  const top5 = summary.categoryPercents.filter(x => x.sec > 0).slice(0, 5).map(x => x.cat);
    const topPagesByCategory = {};
    for (const cat of top5) {
      topPagesByCategory[cat] = [];
    }
    // Collect all entries for each top category
    for (const date of Object.keys(filteredDb || {})) {
      for (const [url, entry] of Object.entries(filteredDb[date] || {})) {
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
      for (const date of Object.keys(filteredDb || {})) {
        let seconds = 0;
        for (const entry of Object.values(filteredDb[date] || {})) {
          if (entry.category === cat) {
            seconds += entry.time || 0;
          }
        }
        dateMinutes[date] = seconds; // Save time in seconds for streaks
      }
      // Fill in missing dates with zero minutes
      const allDates = Object.keys(dateMinutes).sort();
      // Always produce a 7-day streak ending at the latest date in the data (or today if data is less than 7 days old)
      let padDates = [];
      if (allDates.length > 0) {
        // Find the latest date in the data
        const latestDate = new Date(allDates[allDates.length - 1]);
        // Build the last 7 days ending at latestDate
        for (let i = 6; i >= 0; i--) {
          const d = new Date(latestDate);
          d.setDate(d.getDate() - i);
          padDates.push(d.toISOString().slice(0, 10));
        }
        // Build padded streak array
        const paddedArr = padDates.map(date => ({ date, minutes: dateMinutes[date] || 0 }));
        streakArr = paddedArr.map(day => ({ date: day.date, seconds: day.minutes })); // Save as seconds
      } else {
        // No data, pad with 7 zeros for today and previous 6 days
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          padDates.push(d.toISOString().slice(0, 10));
        }
        streakArr = padDates.map(date => ({ date, seconds: 0 }));
      }
      summary.topCategoryStreaks[cat] = streakArr;
      console.log(`Streak for ${cat}:`, streakArr);
    }

    await setStorage({ tabWrapSummary: summary });
    setTabWrapLoading(false);
    setTabWrapReady(true);
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
          let prompt = '';
          if (description.trim() !== '') {
            prompt = `User description: ${description}\nCategories: ${categories.join(', ')}\nURL: ${url}\nTitle: ${entry.title}\n\nBased on the above, which category was the user spending time on?\nStrictly output **only** one category from the list above. Do not make up a new category that is not in the list provided.`;
          } else {
            prompt = `\nURL: ${url}\nTitle: ${entry.title}\n\nIf the user was on the above webpage, which category out of ${categories.join(', ')} were they likely spending time on?\n Strictly output **only** one category from the list above. Do not make up a new category that is not in the list provided.`;
          }
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
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans" style={{ backgroundColor: '#0a0a0a' }}>
      <NotificationToast />

      {/* Background Effect: Cosmic Blur */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Top-left Green Blob (matching Wrap-up) */}
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-green-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob"></div>
        {/* Top-right Purple Blob (matching Wrap-up) */}
        <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-2xl p-6 sm:p-10 rounded-3xl bg-gray-900/70 backdrop-blur-md shadow-2xl shadow-black/80 space-y-8 mt-12 mb-12 border border-gray-800">
        
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center uppercase tracking-wider mb-8" style={{ color: 'white', textShadow: '0 0 10px #ff0099, 0 0 20px #a855f7' }}>
          <span className="text-pink-400">Tab Wrap</span>
        </h1>

        <hr className="border-t border-gray-700/50" />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <label>
            <input type="checkbox" checked={debugMode} onChange={handleDebugToggle} /> Debug Mode
          </label>
          {debugMode && (
            <div style={{ marginTop: 8, marginLeft: 16 }}>
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

        <div className="space-y-3 pt-4">
          <label className="flex items-center text-xl font-bold text-white mb-2 tracking-wide">
            <User className="w-6 h-6 mr-3 text-pink-400" />
            Tell us about yourself:
          </label>
          <textarea
            value={profile.description}
            onChange={e => setProfile({ ...profile, description: e.target.value })}
            rows="4"
            className="w-full p-4 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-[#ff0099] focus:border-[#ff0099] transition-colors resize-none shadow-inner shadow-black/20"
            placeholder="For example, I am software developer who loves to read about technology, travel the world, and stay updated with the latest news."
          ></textarea>
        </div>

        {/* Primary Action Buttons Grid (Save, Clear, Categorize, Tab Wrap) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, flexDirection: 'column', alignItems: 'center' }}>
        <ActionButton onClick={saveProfile} color="clear" className="sm:col-span-1" Icon={Save}>
          Save Profile
        </ActionButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <ActionButton onClick={() => chrome.storage.local.set({ db: {} }, () => setDb({}))} color="clear" className="sm:col-span-1" Icon={Database}>
          Clear History
        </ActionButton>
          {/* History Toggle */}
          {historyPaused ? (
            <ActionButton 
              onClick={async () => {
                // Only resume if description exists in storage
                const { profile: storedProfile } = await new Promise(resolve => chrome.storage.local.get(['profile'], resolve));
                if (storedProfile && storedProfile.description && storedProfile.description.trim() !== '') {
                  chrome.storage.local.set({ historyPaused: false }, () => setHistoryPaused(false));
                } else {
                  // Glow textarea red for 2 seconds
                  const textarea = document.querySelector('textarea');
                  if (textarea) {
                    textarea.style.boxShadow = '0 0 0 3px #ff2d55';
                    textarea.style.borderColor = '#ff2d55';
                    textarea.style.transition = 'box-shadow 0.3s, border-color 0.3s';
                    setTimeout(() => {
                      textarea.style.boxShadow = '';
                      textarea.style.borderColor = '';
                    }, 2000);
                  }
                }
              }} 
              color="history-resume" 
              className="col-span-2" 
              Icon={Play}
            >
            Resume History
            </ActionButton>
          ) : (
            <ActionButton 
              onClick={() => chrome.storage.local.set({ historyPaused: true }, () => setHistoryPaused(true))} 
              color="history-pause" 
              className="col-span-2" 
              Icon={Pause}
            >
              Pause History
            </ActionButton>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, flexDirection: 'column', alignItems: 'center' }}>
          <button style={{ background: 'white', color: 'rgb(255, 90, 46)', border: 'none', borderRadius: 12, padding: '10px 32px', fontWeight: 600, fontSize: 18, boxShadow: '0 2px 8px rgba(255,45,85,0.18)', cursor: 'pointer', marginBottom: tabWrapLoading ? 16 : 0 }} onClick={calculateTabWrapSummary} disabled={tabWrapLoading}>Tab Wrap</button>
          {tabWrapLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40 }}>
              <div className="loader" style={{ width: 32, height: 32, border: '4px solid #ff0099', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
            </div>
          )}
          {tabWrapError && !tabWrapLoading && (
            <div style={{ color: '#ff0099', fontWeight: 600, marginTop: 12, textAlign: 'center', maxWidth: 320 }}>{tabWrapError}</div>
          )}
          {tabWrapReady && !tabWrapLoading && (
            <button style={{ background: 'linear-gradient(90deg, #ff0099 0%, #232526 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 32px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px rgba(255,45,85,0.18)', cursor: 'pointer', marginTop: 16 }} onClick={() => window.location.href = '../pages/tabwrap.html'}>
              Take me to my Tab Wrap
            </button>
          )}
        </div>

        <hr className="border-t border-gray-800" />

        {/* Tailwind Animation Styles (for cosmic blur) */}
        <style>{`
          /* Define custom keyframes for the "cosmic blob" animation */
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    </div>
  );
};


// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<OptionsPage />);