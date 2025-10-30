import React from 'react';
import { Trophy, Clock } from 'lucide-react';

// --- Sub-Components ---

/**
 * Renders the primary large display for total hours worked.
 * @param {object} props - Contains hours, unit, label, and focusColor.
 */
const TotalHoursDisplay = ({ hours, unit, label, focusColor }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto">
      <div className="text-white mb-4 p-2 rounded-full bg-green-400/20">
        <Clock className="w-8 h-8 text-green-400" />
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
};


/**
 * Renders the daily productivity streak bar chart.
 * @param {array} streakDays - Array of focus intensity values (0.0 to 1.0).
 * @param {string} timePeriodLabel - Label for the time period (e.g., 'NOV 15 - NOV 21').
 */
const StreakChart = ({ streakDays, timePeriodLabel }) => {
  // Normalize streakDays to [0, 1]
  console.log('Original streak data:', streakDays);
  const max = Math.max(...streakDays, 1);
  const normalized = streakDays.map(v => max ? v / max : 0);
  console.log('Normalized histogram data:', normalized);

  // Animation state for bars
  const [animatedHeights, setAnimatedHeights] = React.useState(Array(normalized.length).fill(0));
  React.useEffect(() => {
    let start;
    let duration = 1200;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setAnimatedHeights(normalized.map(h => h * progress));
      if (progress < 1) requestAnimationFrame(animate);
      else setAnimatedHeights(normalized);
    }
    requestAnimationFrame(animate);
    // Reset on data change
    return () => setAnimatedHeights(Array(normalized.length).fill(0));
  }, [streakDays.length, streakDays.join(",")]);

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
        TOP FOCUS STREAK
      </h3>
      <div className="flex items-end space-x-2 w-full max-w-sm px-4">
        {animatedHeights.map((intensity, index) => (
          <div 
            key={index} 
            className="flex-1 rounded-t-lg bg-purple-500 hover:bg-purple-400 transition-all duration-300 cursor-pointer"
            style={{ 
              height: `${intensity * 100}px`,
              minHeight: '4px',
              boxShadow: `0 0 10px ${intensity > 0.8 ? 'rgba(168, 85, 247, 0.8)' : 'transparent'}`,
              transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Date below each bar */}
            <span className="block text-xs text-gray-300 mt-2 text-center font-semibold">
              {typeof streakDates !== 'undefined' && streakDates[index]}
            </span>
          </div>
        ))}
        <Trophy className="w-8 h-8 text-yellow-400 ml-4 animate-pulse" />
      </div>
      <p className="text-sm text-gray-400 mt-4 font-semibold tracking-wide">{timePeriodLabel}</p>
    </div>
  );
};


// --- Main App Component ---

function Work() {
  
  // State for work summary
  const [workSummary, setWorkSummary] = React.useState({
    totalMinutes: 0,
    workStreak: [],
  });

  React.useEffect(() => {
    chrome.storage.local.get(['tabWrapSummary'], (data) => {
      const summary = data.tabWrapSummary || {};
      // Try both possible work category names
      let workCat = summary.categoryTotals?.['Work and Professional'] !== undefined
        ? 'Work and Professional'
        : (summary.categoryTotals?.['Work and Learning'] !== undefined ? 'Work and Learning' : null);
      const totalMinutes = workCat ? Math.floor((summary.categoryTotals[workCat] || 0) / 60) : 0;
      setWorkSummary({
        totalMinutes,
        workStreak: Array.isArray(summary.workStreak) ? summary.workStreak : [],
      });
    });
  }, []);

  // Prepare streak data for chart (use raw minutes, not divided by 60)
  const streakDays = Array.isArray(workSummary.workStreak)
    ? workSummary.workStreak.map(day => day.minutes)
    : [];
  const streakDates = Array.isArray(workSummary.workStreak)
    ? workSummary.workStreak.map(day => {
        if (!day.date) return '';
        const d = new Date(day.date);
        return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
      })
    : [];
  const timePeriodLabel = Array.isArray(workSummary.workStreak) && workSummary.workStreak.length
    ? `${new Date(workSummary.workStreak[0].date).toLocaleString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(workSummary.workStreak[workSummary.workStreak.length - 1].date).toLocaleString('en-US', { month: 'short', day: 'numeric' })}`
    : '';

  // Animated total time display
  const [displayValue, setDisplayValue] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    let end = workSummary.totalMinutes;
    let duration = 1200;
    let startTime;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(end);
    }
    requestAnimationFrame(animate);
  }, [workSummary.totalMinutes]);

  // Format display value
  let hours = Math.floor(displayValue / 60);
  let minutes = displayValue % 60;
  let seconds = Math.floor(displayValue * 60) % 60;
  let unit = 'HOURS';
  let shownValue = hours;
  if (displayValue < 1) {
    unit = 'SECONDS';
    shownValue = Math.floor(workSummary.totalMinutes * 60);
  } else if (displayValue < 60) {
    unit = 'MINUTES';
    shownValue = displayValue;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans">
      {/* Background Effect: Cosmic Blur */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Card - Simplified Layout */}
      <div className="w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg">
          WORK CATEGORY SUMMARY
        </h1>

        {/* 1. Hours Display Component */}
        <TotalHoursDisplay
          hours={shownValue}
          unit={unit}
          label={'SPENT ON WORK'}
          focusColor={'#4ade80'}
        />

        {/* Small Section Textbox */}
        <div className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4">
          <p className="text-base sm:text-lg font-semibold text-white text-center">
            This section can be used to display a summary, motivational message, or any additional info about your work streak. You can customize this text as needed.
          </p>
        </div>

        {/* 2. Streak Section Component */}
        <StreakChart
          streakDays={streakDays}
          timePeriodLabel={timePeriodLabel}
          streakDates={streakDates}
        />

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
};


// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<Work />);
