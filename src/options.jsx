import React, { useState, useEffect } from 'react';
import { User, Save, Trash2, Play, Pause, Settings, Plus, X, Edit2, Check, Sparkles, TrendingUp } from 'lucide-react';

// Utility to get default categories - ensures Miscellaneous is always present
const getDefaultCategories = () => [
  { text: "Work", emoji: "💼", color: "#7e22ce" },
  { text: "Finance", emoji: "💰", color: "#22c55e" },
  { text: "Hobbies", emoji: "🎨", color: "#facc15" },
  { text: "Spirituality", emoji: "🧘", color: "#22d3ee" },
  { text: "Health", emoji: "🏋️", color: "#ef4444" },
  { text: "Social Media", emoji: "💬", color: "#ff6347" },
  { text: "Community", emoji: "🤝", color: "#a259ff" },
  { text: "Entertainment", emoji: "🎬", color: "#fb923c" },
  { text: "Shopping", emoji: "🛒", color: "#38bdf8" },
  { text: "News", emoji: "📰", color: "#2563eb" },
  { text: "Travel", emoji: "✈️", color: "#f472b6" },
  { text: "Miscellaneous", emoji: "❓", color: "#9ca3af" }
];

const colorOptions = [
  { name: 'Purple', value: '#7e22ce' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Yellow', value: '#facc15' },
  { name: 'Teal', value: '#22d3ee' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Tomato', value: '#ff6347' },
  { name: 'Orange', value: '#fb923c' },
  { name: 'Sky Blue', value: '#38bdf8' },
  { name: 'Pink', value: '#f472b6' },
  { name: 'Violet', value: '#a259ff' },
  { name: 'Indigo', value: '#2563eb' },
  { name: 'Gray', value: '#9ca3af' },
];

const sassyMessages = [
  "Look at you being productive! 🎉",
  "Your browsing stats are *chef's kiss* 👨‍🍳",
  "Wow, someone's been busy! 🚀",
  "These numbers don't lie! 📊",
  "Profile saved! Now go browse something interesting 😎",
  "Data secured! Your secrets are safe with me 🔒",
  "Changes saved! You're on fire! 🔥",
];

const NotificationToast = ({ message }) => (
  <div 
    id="notification-message"
    className="fixed top-5 right-5 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-2xl transition-all duration-500 opacity-0 pointer-events-none transform translate-y-[-20px]"
    style={{ minWidth: '280px', backdropFilter: 'blur(10px)' }}
  >
    <div className="flex items-center space-x-3">
      <Sparkles className="w-5 h-5 animate-pulse" />
      <span className="font-semibold">{message || "Action Complete!"}</span>
    </div>
  </div>
);

const showNotification = (message) => {
  const toast = document.getElementById('notification-message');
  if (toast) {
    toast.querySelector('span').textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    toast.style.pointerEvents = 'auto';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      toast.style.pointerEvents = 'none';
    }, 3000);
  }
};


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
  const [profile, setProfile] = useState({ description: '', categories: getDefaultCategories() });
  const [historyPaused, setHistoryPaused] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  const [debugDate, setDebugDate] = useState('');
  const [tabWrapLoading, setTabWrapLoading] = useState(false);
  const [tabWrapReady, setTabWrapReady] = useState(false);
  const [tabWrapError, setTabWrapError] = useState('');
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ text: '', emoji: '📌', color: '#7e22ce' });
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['db', 'profile', 'historyPaused', 'debugMode', 'debugDate', 'selectedCategories'], (data) => {
      setDb(data.db || {});
      const profileObj = data.profile || { description: '', categories: getDefaultCategories() };
      
      // Ensure Miscellaneous category exists
      const hasMisc = profileObj.categories.some(cat => 
        (typeof cat === 'string' ? cat : cat.text).toLowerCase() === 'miscellaneous'
      );
      if (!hasMisc) {
        profileObj.categories.push({ text: "Miscellaneous", emoji: "❓", color: "#9ca3af" });
      }
      
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
      const defaultCats = getDefaultCategories();
      setSelectedCategories(data.selectedCategories || defaultCats.map(cat => typeof cat === 'string' ? cat : cat.text));
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
      const message = sassyMessages[Math.floor(Math.random() * sassyMessages.length)];
      showNotification(message);
    });
  };

  const clearProfile = () => {
    chrome.storage.local.remove('profile', async () => {
      setProfile({ description: '', categories: getDefaultCategories() });
      chrome.storage.local.set({ historyPaused: true });
      setHistoryPaused(true);
      await categorizeEntries(true);
      showNotification("Profile cleared! Fresh start! 🌟");
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
      setTabWrapError('Whoa there, speed racer! 🏎️ You need at least 5 minutes of browsing data. Go explore the web a bit more!');
      return;
    }
    await categorizeEntries(false); // Ensure all entries are categorized first
    const { profile } = await getStorage(['db', 'profile']);
    
    // Get dynamic categories from profile
    const allowedCategories = (profile?.categories || getDefaultCategories()).map(cat => 
      (typeof cat === 'string' ? cat : cat.text).toLowerCase()
    );
    
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
    showNotification("Tab Wrap ready! Your data is looking 🔥");
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
            entry.category = 'Miscellaneous';
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

  // Category Management Functions
  const addCategory = () => {
    if (newCategory.text.trim() === '') return;
    const updatedCategories = [...profile.categories, { ...newCategory }];
    setProfile({ ...profile, categories: updatedCategories });
    setNewCategory({ text: '', emoji: '📌', color: '#7e22ce' });
  };

  const removeCategory = (index) => {
    const category = profile.categories[index];
    // Prevent removing Miscellaneous category
    if (category.text === 'Miscellaneous') {
      alert('Cannot remove Miscellaneous category - it is required for uncategorized items.');
      return;
    }
    const updatedCategories = profile.categories.filter((_, i) => i !== index);
    setProfile({ ...profile, categories: updatedCategories });
  };

  const startEditCategory = (index) => {
    setEditingCategory(index);
  };

  const saveEditCategory = (index, updatedCategory) => {
    const updatedCategories = [...profile.categories];
    updatedCategories[index] = updatedCategory;
    setProfile({ ...profile, categories: updatedCategories });
    setEditingCategory(null);
  };

  const cancelEditCategory = () => {
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans" style={{ backgroundColor: '#0a0a0a' }}>
      <NotificationToast message={toastMessage} />

      {/* Background Effect: Modern Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/20 via-purple-500/30 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        {/* Grid overlay for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Modern card with premium aesthetics */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header with gradient accent */}
          <div className="relative p-8 pb-6 border-b border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
            <div className="relative text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 mb-2">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tight" style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ff0099 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Tab Wrap
              </h1>
              <p className="text-gray-400 text-sm font-medium">Understand your digital life, one tab at a time</p>
            </div>
          </div>

          {/* Content area */}
          <div className="p-8 space-y-6">

        <div className="space-y-3">
          <label className="flex items-center text-lg font-bold text-white mb-2">
            <User className="w-5 h-5 mr-3 text-pink-400" />
            Tell us about yourself
          </label>
          <textarea
            value={profile.description}
            onChange={e => setProfile({ ...profile, description: e.target.value })}
            rows="4"
            className="w-full p-4 rounded-xl bg-black/40 text-gray-100 border border-white/10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none placeholder-gray-500"
            placeholder="e.g., I'm a software developer who loves tech, travel, and staying informed..."
          ></textarea>
        </div>

        {/* Category Management Section */}
        <div className="space-y-3">
          <button
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="group flex items-center justify-between w-full p-4 rounded-xl bg-black/40 border border-white/10 hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <Settings className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-lg font-bold text-white">Manage Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">{profile.categories.length} categories</span>
              <div className={`transform transition-transform ${showCategoryManager ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>
          
          {showCategoryManager && (
            <div className="bg-black/40 rounded-xl p-6 space-y-6 border border-white/10">
              {/* Existing Categories */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Your Categories</h3>
                <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-white/5">
                  {profile.categories.map((category, index) => (
                    <div key={index} className="group flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-all">
                      {editingCategory === index ? (
                        <div className="flex items-center space-x-3 flex-1">
                          <input
                            type="text"
                            value={category.emoji}
                            onChange={e => {
                              const updated = [...profile.categories];
                              updated[index] = { ...updated[index], emoji: e.target.value };
                              setProfile({ ...profile, categories: updated });
                            }}
                            className="w-14 p-2 text-center rounded-lg bg-black/60 text-white border border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                            maxLength="2"
                          />
                          <input
                            type="text"
                            value={category.text}
                            onChange={e => {
                              const updated = [...profile.categories];
                              updated[index] = { ...updated[index], text: e.target.value };
                              setProfile({ ...profile, categories: updated });
                            }}
                            className="flex-1 p-2 rounded-lg bg-black/60 text-white border border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                          />
                          <select
                            value={category.color}
                            onChange={e => {
                              const updated = [...profile.categories];
                              updated[index] = { ...updated[index], color: e.target.value };
                              setProfile({ ...profile, categories: updated });
                            }}
                            className="p-2 rounded-lg bg-black/60 text-white border border-white/20 focus:border-purple-500/50"
                          >
                            {colorOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.name}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => saveEditCategory(index, category)}
                            className="p-2 rounded-lg bg-green-600/80 hover:bg-green-600 text-white transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEditCategory}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{category.emoji}</span>
                            <span className="text-white font-semibold">{category.text}</span>
                            <div
                              className="w-6 h-6 rounded-lg border-2 border-white/20 shadow-inner"
                              style={{ backgroundColor: category.color }}
                            ></div>
                          </div>
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditCategory(index)}
                              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeCategory(index)}
                              disabled={category.text === 'Miscellaneous'}
                              className={`p-2 rounded-lg transition-colors ${
                                category.text === 'Miscellaneous'
                                  ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                                  : 'bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300'
                              }`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Category */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Add New Category</h3>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newCategory.emoji}
                    onChange={e => setNewCategory({ ...newCategory, emoji: e.target.value })}
                    className="w-16 p-3 text-center rounded-lg bg-black/60 text-white border border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                    placeholder="📌"
                    maxLength="2"
                  />
                  <input
                    type="text"
                    value={newCategory.text}
                    onChange={e => setNewCategory({ ...newCategory, text: e.target.value })}
                    className="flex-1 p-3 rounded-lg bg-black/60 text-white border border-white/20 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="Category name"
                  />
                  <select
                    value={newCategory.color}
                    onChange={e => setNewCategory({ ...newCategory, color: e.target.value })}
                    className="p-3 rounded-lg bg-black/60 text-white border border-white/20 focus:border-purple-500/50"
                  >
                    {colorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={addCategory}
                    disabled={!newCategory.text.trim()}
                    className={`p-3 rounded-lg transition-all ${
                      newCategory.text.trim()
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg'
                        : 'bg-white/5 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={saveProfile}
            className="group w-full px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white flex items-center justify-center space-x-2 transform hover:scale-[1.02]"
          >
            <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Save Profile</span>
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => chrome.storage.local.set({ db: {} }, () => setDb({}))}
              className="group px-4 py-3 rounded-xl font-semibold text-sm transition-all bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-red-500/30 flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
            
            {historyPaused ? (
              <button
                onClick={async () => {
                  const { profile: storedProfile } = await new Promise(resolve => chrome.storage.local.get(['profile'], resolve));
                  if (storedProfile && storedProfile.description && storedProfile.description.trim() !== '') {
                    chrome.storage.local.set({ historyPaused: false }, () => setHistoryPaused(false));
                  } else {
                    const textarea = document.querySelector('textarea');
                    if (textarea) {
                      textarea.style.boxShadow = '0 0 0 3px #ef4444';
                      textarea.style.borderColor = '#ef4444';
                      textarea.style.transition = 'box-shadow 0.3s, border-color 0.3s';
                      setTimeout(() => {
                        textarea.style.boxShadow = '';
                        textarea.style.borderColor = '';
                      }, 2000);
                    }
                  }
                }}
                className="group px-4 py-3 rounded-xl font-semibold text-sm transition-all bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Resume History</span>
              </button>
            ) : (
              <button
                onClick={() => chrome.storage.local.set({ historyPaused: true }, () => setHistoryPaused(true))}
                className="group px-4 py-3 rounded-xl font-semibold text-sm transition-all bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 flex items-center justify-center space-x-2"
              >
                <Pause className="w-4 h-4" />
                <span>Pause History</span>
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-gradient-to-r from-transparent via-black/90 to-transparent text-gray-500 uppercase tracking-wider">Generate Wrap</span>
          </div>
        </div>

        {/* Tab Wrap Section */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Generate Your Tab Wrap</h2>
            <p className="text-gray-400 text-sm">Create a personalized summary of your browsing activity</p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <button 
              className="group relative w-full sm:w-auto px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden" 
              style={{ 
                background: 'linear-gradient(135deg, #ff0099 0%, #ff6347 100%)',
                color: 'white'
              }}
              onClick={calculateTabWrapSummary} 
              disabled={tabWrapLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>{tabWrapLoading ? 'Analyzing your data...' : 'Generate Tab Wrap'}</span>
              </div>
            </button>
            
            {tabWrapLoading && (
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-400 text-sm">This might take a moment...</p>
              </div>
            )}
            
            {tabWrapError && !tabWrapLoading && (
              <div className="w-full px-6 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium text-center">
                {tabWrapError}
              </div>
            )}
            
            {tabWrapReady && !tabWrapLoading && (
              <button 
                className="group relative px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden transform hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                  color: 'white'
                }}
                onClick={() => window.location.href = '../pages/tabwrap.html'}
              >
                <div className="relative flex items-center space-x-2">
                  <span>View My Tab Wrap</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            )}
          </div>
        </div>
          
          </div>
        </div>
      </div>

        {/* Tailwind Animation Styles */}
        <style>{`
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
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
    </div>
  );
};


// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<OptionsPage />);