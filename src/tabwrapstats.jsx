import React, { useEffect, useState, useRef } from 'react';
import Frame from './Frame';
import Background from './Background';
import getRandomColorScheme from './colorScheme';
import './tabwrapstats.css';

 function TabWrapStats() {

  const [summary, setSummary] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const [barPercents, setBarPercents] = useState([]);
  const [barNumbers, setBarNumbers] = useState([]);
  const [colorScheme] = useState(getRandomColorScheme());
  const [quippy, setQuippy] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const quipRef = useRef('');

  console.log('Color Scheme:', colorScheme);

  useEffect(() => {
    chrome.storage.local.get(['tabWrapSummary', 'profile'], async (data) => {
      setSummary(data.tabWrapSummary || null);
      // Build category map from profile
      const categories = (data.profile?.categories || []).map(cat => typeof cat === 'string' ? { text: cat, emoji: '' } : cat);
      const map = {};
      categories.forEach(cat => { map[cat.text] = cat.emoji || ''; });
      setCategoryMap(map);
    });
  }, []);

  // Delay prompt streaming until bars finish animating
  useEffect(() => {
    if (!summary || !summary.categoryPercents) return;
    // Wait for bar animation duration before starting prompt streaming
    const animationDuration = 800; // ms (should match bar animation)
    let timeoutId;
    if (window.LanguageModel && summary) {
      setQuippy('');
      setIsStreaming(false);
      timeoutId = setTimeout(async () => {
        setIsStreaming(true);
        const prompt = `User description: ${summary.profile?.description || ''}\nCategory totals (seconds): ${JSON.stringify(summary.categoryTotals)}\nTotal time spent: ${summary.totalMinutes} minutes.\n\nWrite a short, witty summary about this user's browsing habits based on their self-description and category totals. Write as if you're talking to the user, not describing them. Make it fun and personalized. STRICTLY KEEP IT UNDER 20 WORDS AND NO EMOJIS.`;
        try {
          const session = await window.LanguageModel.create();
          let result = '';
          for await (const chunk of session.promptStreaming(prompt)) {
            result += chunk;
            quipRef.current = result;
            setQuippy(result);
          }
          setIsStreaming(false);
          session.destroy();
        } catch (e) {
          setQuippy('Gemini Nano could not generate a summary.');
          setIsStreaming(false);
        }
      }, animationDuration);
    } else if (summary?.quippySummary) {
      setQuippy(summary.quippySummary);
    }
    return () => clearTimeout(timeoutId);
  }, [summary]);

  // Animate sliding bars when summary is loaded
  useEffect(() => {
    if (!summary || !summary.categoryPercents) return;
    // Start with all bars and numbers at 0
    setBarPercents(Array(summary.categoryPercents.length).fill(0));
    setBarNumbers(Array(summary.categoryPercents.length).fill(0));
    // Animate each bar and number to its percent
    const time = 800; // ms
    const steps = 30;
    summary.categoryPercents.forEach((cat, idx) => {
      let step = 0;
      const target = cat.pct;
      const interval = setInterval(() => {
        step++;
        setBarPercents(prev => {
          const next = [...prev];
          next[idx] = Math.min(target, (target * step) / steps);
          return next;
        });
        setBarNumbers(prev => {
          const next = [...prev];
          next[idx] = Math.min(target, (target * step) / steps);
          return next;
        });
        if (step >= steps) clearInterval(interval);
      }, time / steps);
    });
  }, [summary]);

  if (!summary) {
    return <div className="bg-black text-white min-h-screen p-10 text-center">No stats available. Please run Tab Wrap from the options page.</div>;
  }

    // Use pre-calculated summary from tabWrapSummary
    const sortedCategories = summary.categoryPercents || [];

  console.log('Sorted Categories:', sortedCategories);

  return (
    <>
      <Background />
      <Frame colorScheme={colorScheme}>
        <div className="text-lg font-semibold tracking-widest mb-2 opacity-85">TAB WRAP - OCTOBER</div>
        <div className="text-4xl font-bold mb-3">Your Browsing Stats</div>
        <div className="text-xl mb-2 opacity-80">Total Minutes Spent Browsing</div>
        <div className="text-7xl font-extrabold mb-4 tracking-widest">
          {summary.totalMinutes > 0 ? summary.totalMinutes.toLocaleString() : `${summary.totalSeconds} sec`}
        </div>
        <div className="text-lg mb-2">
          You opened a {summary.totalTabs > 1000 ? 'massive' : 'mere'} <span style={{ color: '#ffe082', fontWeight: 700 }}>{summary.totalTabs.toLocaleString()} new tabs</span> this month!
        </div>
          {quippy && (
            <div
              className="text-base mb-4"
              style={{ color: colorScheme.accent, fontWeight: 500, opacity: 0.92 }}
            >
              {isStreaming ? <span>{quippy}<span className="animate-pulse">|</span></span> : quippy}
            </div>
          )}
        <div className="stats-container">
          <div className="stats-title">Activity Breakdown (By Time)</div>
          <div className="stats-breakdown" style={{ borderBottom: `2px solid ${colorScheme.accent}` }}></div>
          <div className="flex flex-col items-center w-full" style={{ maxWidth: 480 }}>
            {sortedCategories.slice(0, 5).map((cat, idx) => (
              <div key={cat.cat} className="stats-category">
                <div className="stats-category-header">
                  <span className="flex items-center text-white font-bold">
                    {categoryMap[cat.cat] && <span className="stats-category-emoji">{categoryMap[cat.cat]}</span>}
                    {cat.cat}
                  </span>
                  <span className="text-white font-bold">{(barNumbers[idx] || 0).toFixed(1)}%</span>
                </div>
                <div className="stats-bar-bg">
                  <div
                    className="stats-bar"
                    style={{ background: colorScheme.bar, width: `${barPercents[idx] || 0}%`, transition: 'width 0.2s' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
            {/* Button to go to top category page */}
            {sortedCategories.length > 0 && (
              (() => {
                const topCat = sortedCategories[0].cat;
                let pageName = '';
                if (topCat.includes('/')) {
                  pageName = topCat.split('/')[0].replace(/\s+/g, '').toLowerCase();
                } else {
                  pageName = topCat.split(' ')[0].toLowerCase();
                }
                const pageUrl = `${pageName}.html`;
                return (
                  <button
                    className="stats-social-btn"
                    style={{ background: colorScheme.gradient, boxShadow: '0 2px 8px rgba(162,89,255,0.12)', marginTop: '18px' }}
                    onClick={() => window.location.href = pageUrl}
                  >
                    Go to your top category page
                  </button>
                );
              })()
            )}
          {/* Conditional Social Media Button */}
          {sortedCategories.slice(0, 5).some(cat => cat.cat === 'Social Media / Messaging' || cat.cat === 'Social Media') && (
            <button
              className="stats-social-btn"
              style={{ background: colorScheme.gradient, boxShadow: '0 2px 8px rgba(162,89,255,0.12)' }}
              onClick={() => window.location.href = 'socialmedia.html'}
            >
              Wanna see how much time you spent on social media?
            </button>
          )}
        </div>
      </Frame>
    </>
  );
}

// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<TabWrapStats />);
