import { useState, useEffect, useRef } from 'react';

/**
 * General hook for category summary, streak, and quippy summary.
 * @param {object} options - Config for category names, labels, colors, keys, etc.
 * @returns {object} - All props needed for UI components.
 */
export function useCategorySummary({
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
    totalMinutes: 0,
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
      const totalMinutes = cat ? Math.floor((summary.categoryTotals[cat] || 0) / 60) : 0;
      let streakArr = [];
      if (streakKey && Array.isArray(summary[streakKey])) {
        streakArr = summary[streakKey];
      } else if (cat && Array.isArray(summary.topCategoryStreaks?.[cat])) {
        streakArr = summary.topCategoryStreaks[cat];
      }
      setSummaryState({ totalMinutes, streakArr });
    });
  }, []);

  // Prepare streak data for chart
  const streakDays = Array.isArray(summaryState.streakArr)
    ? summaryState.streakArr.map(day => day.minutes)
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
  }, [summaryState.totalMinutes, streakDays.length, streakDays.join(",")]);

  // Animated total time display
  const animatedValue = Math.floor(progress * summaryState.totalMinutes);
  let hours = Math.floor(animatedValue / 60);
  let minutes = animatedValue % 60;
  let unit = 'HOURS';
  let shownValue = hours;
  if (animatedValue < 1) {
    unit = 'SECONDS';
    shownValue = Math.floor(summaryState.totalMinutes * 60 * progress);
  } else if (animatedValue < 60) {
    unit = 'MINUTES';
    shownValue = animatedValue;
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
import React from 'react';
import { Trophy, Clock } from 'lucide-react';

/**
 * Renders the primary large display for total hours/minutes/seconds.
 * @param {object} props - Contains hours, unit, label, and focusColor.
 */
export const TotalHoursDisplay = ({ hours, unit, label, focusColor, iconColor = '#4ade80' }) => {
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
};

/**
 * Renders the daily productivity streak bar chart.
 * @param {array} streakDays - Array of focus intensity values (0.0 to 1.0).
 * @param {string} timePeriodLabel - Label for the time period (e.g., 'NOV 15 - NOV 21').
 * @param {string} barColor - Tailwind color class for bars.
 */
export const StreakChart = ({ streakDays, timePeriodLabel, streakDates, progress, barColor = 'bg-purple-500', hoverColor = 'hover:bg-purple-400', glowColor = 'rgba(168, 85, 247, 0.8)', title = 'TOP FOCUS STREAK' }) => {
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
            className={`flex-1 rounded-t-lg ${barColor} ${hoverColor} transition-all duration-300 cursor-pointer`}
            style={{ 
              height: `${intensity * 100}px`,
              minHeight: '4px',
              boxShadow: `0 0 10px ${intensity > 0.8 ? glowColor : 'transparent'}`,
              transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
          </div>
        ))}
        <Trophy className="w-8 h-8 text-yellow-400 ml-4 animate-pulse" />
      </div>
      <p className="text-sm text-gray-400 mt-4 font-semibold tracking-wide">{timePeriodLabel}</p>
    </div>
  );
};
