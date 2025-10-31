import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Trophy, Clock, Briefcase, DollarSign, Palette, Sun, HeartPulse, MessageSquare, Handshake, Clapperboard, ShoppingCart, Newspaper, Plane, HelpCircle } from 'lucide-react';

/**
 * General hook for category summary, streak, and quippy summary.
 * @param {object} options - Config for category names, labels, colors, keys, etc.
 * @returns {object} - All props needed for UI components.
 */
function useCategorySummary({
  categoryNames = [],
  label = '',
  focusColor = '#4ade80',
  streakKey = '',
  streakTitle = 'TOP FOCUS STREAK',
  streakBarColor = 'bg-purple-500',
  streakHoverColor = 'hover:bg-purple-400',
  streakGlowColor = 'rgba(168, 85, 247, 0.8)',
  summaryType = '',
  quipDefault = 'Keep up the grind!'
}) {
  // Quippy summary state
  const [quippySummary, setQuippySummary] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const quipRef = useRef('');

  useEffect(() => {
    async function fetchQuip() {
      if (!window.LanguageModel) {
        setQuippySummary(quipDefault);
        return;
      }
      const available = await window.LanguageModel.availability();
      if (available === 'unavailable') {
        setQuippySummary(quipDefault);
        return;
      }
      const session = await window.LanguageModel.create();
      chrome.storage.local.get(['tabWrapSummary'], async (data) => {
        const summary = data.tabWrapSummary || {};
        let cat = null;
        for (const name of categoryNames) {
          if (summary.categorySummaries?.[name] !== undefined) {
            cat = name;
            break;
          }
        }
        const summaryText = cat ? summary.categorySummaries[cat] : '';
        if (summaryText) {
          const prompt = summaryText + `\nWrite a quippy statement about this ${summaryType} summary, as if talking to the user, in less than 50 characters.`;
          try {
            setIsStreaming(true);
            let result = '';
            for await (const chunk of session.promptStreaming(prompt)) {
              result += chunk;
              quipRef.current = result;
              setQuippySummary(result);
            }
            setIsStreaming(false);
            session.destroy();
          } catch (e) {
            setQuippySummary(quipDefault);
            setIsStreaming(false);
          }
        } else {
          setQuippySummary(quipDefault);
        }
      });
    }
    fetchQuip();
  }, []);

  // Summary and streak state
  const [summaryState, setSummaryState] = useState({
    totalSeconds: 0,
    streakArr: [],
  });

  useEffect(() => {
    chrome.storage.local.get(['tabWrapSummary'], (data) => {
      const summary = data.tabWrapSummary || {};
      let cat = null;
      for (const name of categoryNames) {
        if (summary.categoryTotals?.[name] !== undefined) {
          cat = name;
          break;
        }
      }
      const totalSeconds = cat ? summary.categoryTotals[cat] : 0;
      let streakArr = [];
      if (streakKey && Array.isArray(summary[streakKey])) {
        streakArr = summary[streakKey];
      } else if (cat && Array.isArray(summary.topCategoryStreaks?.[cat])) {
        streakArr = summary.topCategoryStreaks[cat];
      }
      setSummaryState({ totalSeconds, streakArr });
    });
  }, []);

  // Prepare streak data for chart
  const streakDays = Array.isArray(summaryState.streakArr)
    ? summaryState.streakArr.map(day => (day.seconds !== undefined ? day.seconds : (day.minutes !== undefined ? day.minutes * 60 : 0)))
    : [];
  const streakDates = Array.isArray(summaryState.streakArr)
    ? summaryState.streakArr.map(day => {
        if (!day.date) return '';
        const d = new Date(day.date);
        return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
      })
    : [];
  const timePeriodLabel = Array.isArray(summaryState.streakArr) && summaryState.streakArr.length
    ? `${new Date(summaryState.streakArr[0].date).toLocaleString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(summaryState.streakArr[summaryState.streakArr.length - 1].date).toLocaleString('en-US', { month: 'short', day: 'numeric' })}`
    : '';

  // Shared animation progress for counter and histogram
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let start;
    let duration = 1200;
    function animate(ts) {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setProgress(prog);
      if (prog < 1) requestAnimationFrame(animate);
      else setProgress(1);
    }
    requestAnimationFrame(animate);
    return () => setProgress(0);
  }, [summaryState.totalSeconds, streakDays.length, streakDays.join(",")]);

  // Animated total time display
  const animatedValue = Math.floor(progress * summaryState.totalSeconds);
  let unit = 'HOURS';
  let shownValue = Math.floor(animatedValue / 3600);
  if (animatedValue < 60) {
    unit = 'SECONDS';
    shownValue = animatedValue;
  } else if (animatedValue < 3600) {
    unit = 'MINUTES';
    shownValue = Math.floor(animatedValue / 60);
  }

  return {
    quippySummary,
    isStreaming,
    shownValue,
    unit,
    streakDays,
    streakDates,
    timePeriodLabel,
    progress
  };
}

/**
 * Renders the primary large display for total hours/minutes/seconds.
 * @param {object} props - Contains hours, unit, label, and focusColor.
 */
function TotalHoursDisplay({ hours, unit, label, focusColor, iconColor = '#4ade80' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto">
      <div className={`text-white mb-4 p-2 rounded-full`} style={{ backgroundColor: iconColor + '33' }}>
        <Clock className="w-8 h-8" style={{ color: iconColor }} />
      </div>
      <p 
        className="text-6xl sm:text-7xl font-extrabold" 
        style={{ color: focusColor }}
      >
        {hours}
      </p>
      <p className="text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2">
        {unit}
      </p>
      <p className="text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center">
        {label}
      </p>
    </div>
  );
}

/**
 * Renders the daily productivity streak bar chart.
 * @param {array} streakDays - Array of focus intensity values (0.0 to 1.0).
 * @param {string} timePeriodLabel - Label for the time period (e.g., 'NOV 15 - NOV 21').
 * @param {string} barColor - Tailwind color class for bars.
 */
function StreakChart({ streakDays, timePeriodLabel, streakDates, progress, title = 'TOP FOCUS STREAK', color = '#4ade80', glowColor }) {
  const max = Math.max(...streakDays, 1);
  const normalized = streakDays.map(v => max ? v / max : 0);
  const animatedHeights = normalized.map(h => h * (typeof progress === 'number' ? progress : 1));
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex items-end space-x-2 w-full max-w-sm px-4">
        {animatedHeights.map((intensity, index) => (
          <div 
            key={index} 
            className="flex-1 rounded-t-lg transition-all duration-300 cursor-pointer"
            style={{ 
              height: `${intensity * 100}px`,
              minHeight: '4px',
              backgroundColor: color,
              boxShadow: `0 0 10px ${intensity > 0.8 ? (glowColor || color) : 'transparent'}`,
              transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
          </div>
        ))}
  <Trophy className="w-8 h-8 ml-4 animate-pulse" style={{ color }} />
      </div>
      <p className="text-sm text-gray-400 mt-4 font-semibold tracking-wide">{timePeriodLabel}</p>
    </div>
  );
}

// General CategoryPage component for any category
export default function CategoryPage({
  categoryNames = [],
  label = '',
  focusColor = '#4ade80',
  streakTitle = 'TOP CATEGORY STREAK',
  quipDefault = 'Keep going!',
  pageTitle = 'CATEGORY SUMMARY'
}) {

    console.log('color:', focusColor);
  // Icon mapping for categories
  const categoryIcons = {
    Work: Briefcase,
    Finance: DollarSign,
    Hobbies: Palette,
    Spirituality: Sun,
    Health: HeartPulse,
    Social: MessageSquare,
    Community: Handshake,
    Entertainment: Clapperboard,
    Shopping: ShoppingCart,
    News: Newspaper,
    Travel: Plane,
    default: HelpCircle,
  };
  // Top 5 categories state
  const [topCategories, setTopCategories] = useState([]);
  useEffect(() => {
    chrome.storage.local.get(['tabWrapSummary'], (data) => {
      const summary = data.tabWrapSummary || {};
      const sorted = Array.isArray(summary.categoryPercents) ? summary.categoryPercents.slice(0, 5) : [];
      setTopCategories(sorted.map(cat => cat.cat));
    });
  }, [categoryNames]);

  // Determine current and next category
  let currentCat = categoryNames && categoryNames.length ? categoryNames[0] : label;
  const currentIdx = topCategories.findIndex(cat => cat === currentCat);
  const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % topCategories.length : 0;
  const nextCat = topCategories[nextIdx] || '';
  let nextPageName = '';
  if (nextCat.includes('/')) {
    nextPageName = nextCat.split('/')[0].replace(/\s+/g, '').toLowerCase();
  } else {
    nextPageName = nextCat.split(' ')[0].toLowerCase();
  }
  const nextPageUrl = `${nextPageName}.html`;
  const {
    quippySummary,
    isStreaming,
    shownValue,
    unit,
    streakDays,
    streakDates,
    timePeriodLabel,
    progress
  } = useCategorySummary({
    categoryNames,
    label,
    focusColor: focusColor,
    streakKey: '',
    streakTitle,
    streakBarColor: undefined,
    streakHoverColor: undefined,
    streakGlowColor: undefined,
    summaryType: undefined,
    quipDefault
  });

  console.log('Rendering CategoryPage for', categoryNames);
  console.log({ quippySummary, isStreaming, shownValue, unit, streakDays, streakDates, timePeriodLabel, progress });

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans">
      {/* Background Effect: Cosmic Blur */}
      {/* Removed bgColors overlays as requested */}

      {/* Main Content Card - Simplified Layout */}
      <div className="w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12">
        {/* Category Icon and Title */}
        <div className="flex flex-col items-center mb-2">
          {(() => {
            console.log('Rendering icon for category:', label, categoryNames);
            const rawName = (categoryNames && categoryNames.length ? categoryNames[0] : label) || 'default';
            const firstWord = rawName.split('/')[0].split(' ')[0];
            const key = firstWord ? (firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()) : 'default';
            const IconComponent = categoryIcons[key] || categoryIcons.default;
            return <IconComponent className="w-14 h-14 mb-2" style={{ color: focusColor }} aria-label={label + ' icon'} />;
          })()}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg">
            {pageTitle}
          </h1>
        </div>

        {/* 1. Hours Display Component */}
        <TotalHoursDisplay
          hours={shownValue}
          unit={unit}
          label={label}
          focusColor={focusColor}
          iconColor={focusColor}
        />

        {/* Small Section Textbox with Gemini Nano quippy summary (streaming) */}
        <div className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4">
          <p className="text-base sm:text-lg font-semibold text-white text-center">
            {isStreaming ? <span>{quippySummary}<span className="animate-pulse">|</span></span> : (quippySummary || quipDefault)}
          </p>
        </div>

        {/* 2. Streak Section Component */}
        <StreakChart
          streakDays={streakDays}
          timePeriodLabel={timePeriodLabel}
          streakDates={streakDates}
          progress={progress}
          barColor={undefined}
          hoverColor={undefined}
          glowColor={focusColor}
          title={streakTitle}
          color={focusColor}
        />

        {/* Button to go to next top category page, only if not last in top 5 */}
        {/* Back and Next buttons for category navigation */}
        {topCategories.length > 0 && (
          (() => {
            const prevIdx = currentIdx - 1;
            let prevCat = prevIdx >= 0 ? topCategories[prevIdx] : null;
            let prevPageName = '';
            let prevPageUrl = '';
            if (currentIdx === 0) {
              prevPageUrl = 'tabwrapstats.html';
            } else if (prevCat) {
              if (prevCat.includes('/')) {
                prevPageName = prevCat.split('/')[0].replace(/\s+/g, '').toLowerCase();
              } else {
                prevPageName = prevCat.split(' ')[0].toLowerCase();
              }
              prevPageUrl = `${prevPageName}.html`;
            }
            // Layout logic
            const buttonClass = "w-56 h-12 mx-2 rounded-xl font-semibold text-white text-base bg-[#23243a] shadow-md hover:bg-[#2d2e4a] transition-all flex items-center justify-center tracking-wide";
            if (currentIdx === 0 || currentIdx === topCategories.length - 1) {
              if (currentIdx === 0) {
                // First category: show both back and next buttons
                return (
                  <div className="flex justify-center items-center mt-8 gap-6">
                    <button
                      className={buttonClass}
                      style={{ minWidth: '14rem', maxWidth: '14rem', height: '3rem', boxShadow: '0 2px 12px rgba(56,189,248,0.10)', border: '1px solid #2d2e4a' }}
                      onClick={() => window.location.href = prevPageUrl}
                    >
                      Back to Stats
                    </button>
                    <button
                      className={buttonClass}
                      style={{ minWidth: '14rem', maxWidth: '14rem', height: '3rem', boxShadow: '0 2px 12px rgba(56,189,248,0.10)', border: '1px solid #2d2e4a' }}
                      onClick={() => window.location.href = nextPageUrl}
                    >
                      Go to next top category: {nextCat}
                    </button>
                  </div>
                );
              } else {
                // Last category: centered back button only
                return (
                  <div className="flex justify-center mt-8">
                    <button
                      className={buttonClass}
                      style={{ minWidth: '14rem', maxWidth: '14rem', height: '3rem', boxShadow: '0 2px 12px rgba(56,189,248,0.10)', border: '1px solid #2d2e4a' }}
                      onClick={() => window.location.href = prevPageUrl}
                    >
                      Back to previous category{prevCat ? ': ' + prevCat : ''}
                    </button>
                  </div>
                );
              }
            } else {
              // Back button left, next button right
              return (
                <div className="flex justify-center items-center mt-8 gap-6">
                  <button
                    className={buttonClass}
                    style={{ minWidth: '14rem', maxWidth: '14rem', height: '3rem', boxShadow: '0 2px 12px rgba(56,189,248,0.10)', border: '1px solid #2d2e4a' }}
                    onClick={() => window.location.href = prevPageUrl}
                  >
                    Back to previous category: {prevCat}
                  </button>
                  <button
                    className={buttonClass}
                    style={{ minWidth: '14rem', maxWidth: '14rem', height: '3rem', boxShadow: '0 2px 12px rgba(56,189,248,0.10)', border: '1px solid #2d2e4a' }}
                    onClick={() => window.location.href = nextPageUrl}
                  >
                    Go to next top category: {nextCat}
                  </button>
                </div>
              );
            }
          })()
        )}

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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
            animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
