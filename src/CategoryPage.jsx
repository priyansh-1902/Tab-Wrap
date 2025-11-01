import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Trophy, Clock, Briefcase, DollarSign, Palette, Sun, HeartPulse, MessageSquare, Handshake, Clapperboard, ShoppingCart, Newspaper, Plane, HelpCircle, Hash } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-700/50 shadow-xl w-full max-w-lg mx-auto">
      <div className={`text-white mb-4 p-3 rounded-full`} style={{ backgroundColor: iconColor + '22' }}>
        <Clock className="w-10 h-10" style={{ color: iconColor }} />
      </div>
      <p 
        className="text-7xl sm:text-8xl font-extrabold" 
        style={{ color: focusColor }}
      >
        {hours}
      </p>
      <p className="text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-3">
        {unit}
      </p>
      <p className="text-2xl sm:text-3xl font-bold text-white mt-4 text-center">
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
  
  // Dynamic icon mapping
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      Work: Briefcase,
      Finance: DollarSign,
      Hobbies: Palette,
      Spirituality: Sun,
      Health: HeartPulse,
      Social: MessageSquare,
      'Social Media': MessageSquare,
      Community: Handshake,
      Entertainment: Clapperboard,
      Shopping: ShoppingCart,
      News: Newspaper,
      Travel: Plane,
      Miscellaneous: Hash,
      default: HelpCircle,
    };
    
    // Try exact match
    if (iconMap[categoryName]) return iconMap[categoryName];
    // Try first word
    const firstWord = categoryName.split(' ')[0];
    return iconMap[firstWord] || iconMap.default;
  };
  
  // Top 5 categories state
  const [topCategories, setTopCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});
  
  useEffect(() => {
    chrome.storage.local.get(['tabWrapSummary', 'profile'], (data) => {
      const summary = data.tabWrapSummary || {};
      const sorted = Array.isArray(summary.categoryPercents) ? summary.categoryPercents.slice(0, 5) : [];
      setTopCategories(sorted.map(cat => cat.cat));
      
      // Get colors from profile
      const profile = data.profile || {};
      const categories = profile.categories || [];
      const colorMap = {};
      categories.forEach(cat => {
        const name = typeof cat === 'string' ? cat : cat.text;
        const color = typeof cat === 'string' ? focusColor : cat.color;
        colorMap[name] = color;
      });
      setCategoryColors(colorMap);
    });
  }, [categoryNames]);

  // Determine current and next category
  let currentCat = categoryNames && categoryNames.length ? categoryNames[0] : label;
  const currentIdx = topCategories.findIndex(cat => cat === currentCat);
  const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % topCategories.length : 0;
  const nextCat = topCategories[nextIdx] || '';
  
  // Dynamic page URL generation
  const getCategoryPageUrl = (categoryName) => {
    if (!categoryName) return 'tabwrapstats.html';
    const color = categoryColors[categoryName] || focusColor;
    return `category.html?name=${encodeURIComponent(categoryName)}&color=${encodeURIComponent(color)}`;
  };
  
  const nextPageUrl = getCategoryPageUrl(nextCat);
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
  <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center font-sans" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Background Effect: Cosmic Blur */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: focusColor }}></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob animation-delay-4000" style={{ backgroundColor: focusColor }}></div>
      </div>

      {/* Main Content Card - Simplified Layout */}
      <div className="w-full max-w-2xl p-8 md:p-10 rounded-3xl backdrop-filter backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-800/80 border border-gray-700/50 shadow-2xl relative space-y-10">
        {/* Category Icon and Title */}
        <div className="flex flex-col items-center mb-2">
          {(() => {
            console.log('Rendering icon for category:', label, categoryNames);
            const rawName = (categoryNames && categoryNames.length ? categoryNames[0] : label) || 'default';
            const IconComponent = getCategoryIcon(rawName);
            return <IconComponent className="w-16 h-16 mb-3" style={{ color: focusColor }} aria-label={label + ' icon'} />;
          })()}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center uppercase tracking-wider drop-shadow-lg" style={{ 
            background: `linear-gradient(135deg, ${focusColor} 0%, ${focusColor}99 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
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
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700/50 shadow-lg w-full max-w-lg mx-auto my-4">
          <p className="text-lg sm:text-xl font-semibold text-white text-center leading-relaxed">
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
        {topCategories.length === 1 ? (
          <div className="flex justify-center mt-8">
            <button
              className="group px-8 py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-2 border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
              onClick={() => window.location.href = 'tabwrapstats.html'}
            >
              <span className="text-2xl group-hover:animate-pulse">←</span>
              <span>Back to Stats</span>
            </button>
          </div>
        ) : topCategories.length > 0 && (
          (() => {
            const prevIdx = currentIdx - 1;
            let prevCat = prevIdx >= 0 ? topCategories[prevIdx] : null;
            let prevPageUrl = '';
            if (currentIdx === 0) {
              prevPageUrl = 'tabwrapstats.html';
            } else if (prevCat) {
              prevPageUrl = getCategoryPageUrl(prevCat);
            }
            
            // Improved button styling with gradients and hover effects
            const buttonBaseClass = "group relative px-6 py-4 rounded-2xl font-bold text-white text-sm overflow-hidden transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105";
            const gradientOverlay = "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300";
            
            if (currentIdx === 0 || currentIdx === topCategories.length - 1) {
              if (currentIdx === 0) {
                // First category: show both back and next buttons
                return (
                  <div className="flex flex-wrap justify-center items-center mt-8 gap-4">
                    <button
                      className={`${buttonBaseClass} bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-600`}
                      onClick={() => window.location.href = prevPageUrl}
                    >
                      <span className="text-xl group-hover:animate-pulse">←</span>
                      <span className="relative z-10">Back to Stats</span>
                    </button>
                    <button
                      className={`${buttonBaseClass} bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-purple-500 shadow-xl hover:shadow-2xl hover:border-purple-400`}
                      style={{
                        background: `linear-gradient(135deg, ${categoryColors[nextCat] || '#a855f7'} 0%, ${categoryColors[nextCat] || '#ec4899'} 100%)`
                      }}
                      onClick={() => window.location.href = nextPageUrl}
                    >
                      <span className="relative z-10">Next: {nextCat}</span>
                      <span className="text-xl group-hover:animate-pulse">→</span>
                    </button>
                  </div>
                );
              } else {
                // Last category: centered back button only
                return (
                  <div className="flex justify-center mt-8">
                    <button
                      className={`${buttonBaseClass} bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-600`}
                      onClick={() => window.location.href = prevPageUrl}
                    >
                      <span className="text-xl group-hover:animate-pulse">←</span>
                      <span className="relative z-10">Back{prevCat ? `: ${prevCat}` : ''}</span>
                    </button>
                  </div>
                );
              }
            } else {
              // Back button left, next button right
              return (
                <div className="flex flex-wrap justify-center items-center mt-8 gap-4">
                  <button
                    className={`${buttonBaseClass} bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-600`}
                    style={prevCat && categoryColors[prevCat] ? {
                      background: `linear-gradient(135deg, ${categoryColors[prevCat]}33 0%, ${categoryColors[prevCat]}11 100%)`,
                      borderColor: categoryColors[prevCat] + '66'
                    } : {}}
                    onClick={() => window.location.href = prevPageUrl}
                  >
                    <span className="text-xl group-hover:animate-pulse">←</span>
                    <span className="relative z-10">{prevCat}</span>
                  </button>
                  <button
                    className={`${buttonBaseClass} bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-purple-500 shadow-xl hover:shadow-2xl hover:border-purple-400`}
                    style={nextCat && categoryColors[nextCat] ? {
                      background: `linear-gradient(135deg, ${categoryColors[nextCat]} 0%, ${categoryColors[nextCat]}cc 100%)`,
                      borderColor: categoryColors[nextCat]
                    } : {}}
                    onClick={() => window.location.href = nextPageUrl}
                  >
                    <span className="relative z-10">{nextCat}</span>
                    <span className="text-xl group-hover:animate-pulse">→</span>
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
