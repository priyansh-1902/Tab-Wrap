import React, { useState, useEffect } from 'react';
import { Clock, MessageSquare, Paintbrush, Gamepad2, HeartHandshake, Zap, Sparkles, Trophy, Briefcase, DollarSign, Palette, Sun, HeartPulse, Handshake, Clapperboard, ShoppingCart, Newspaper, Plane, HelpCircle } from 'lucide-react';

/**
 * Animated Donut Chart for activity breakdown.
 */
const AnimatedDonutChart = ({ data }) => {
  const [animatedPercentages, setAnimatedPercentages] = useState(data.map(() => 0));

  useEffect(() => {
    const duration = 1500; // 1.5 seconds for animation
    const start = Date.now();

    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / duration);

      const newPercentages = data.map(item => item.percentage * progress);
      setAnimatedPercentages(newPercentages);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [data]);

  let cumulativePercentage = 0;
  const conicGradient = animatedPercentages
    .map((p, i) => {
      const start = cumulativePercentage;
      cumulativePercentage += p;
      return `${data[i].color} ${start}% ${cumulativePercentage}%`;
    })
    .join(', ');

  return (
    <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `conic-gradient(${conicGradient})`,
          transform: 'rotate(-90deg)', // Start the gradient from the top
        }}
      ></div>
      <div className="absolute w-28 h-28 bg-[#0a0a0a] rounded-full"></div> {/* Inner circle */}
      <div className="absolute text-white text-center">
        <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-1 animate-pulse" />
        <p className="text-xs uppercase font-semibold text-gray-400">Total</p>
      </div>
    </div>
  );
};


/**
 * Renders the primary large display for total time spent with a counting animation.
 */
const TotalTimeDisplay = ({ minutes, label, focusColor }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = minutes;

  useEffect(() => {
    if (targetValue === 0) return;

    const duration = 1500; // 1.5 seconds
    const start = Date.now();

    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(progress * targetValue);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [targetValue]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2">
        {label}
      </p>
      <p
        className="text-6xl sm:text-7xl font-extrabold"
        style={{ color: focusColor }}
      >
        {displayValue}
      </p>
      <p className="text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest">
        Minutes
      </p>
    </div>
  );
};

/**
 * Renders the new tabs count and a highlight message.
 */
const NewTabsHighlight = ({ count, message, highlight }) => {
  // Simple utility function to allow for basic bolding from data (e.g., using **text**)
  const renderMessage = (text) => {
    const parts = text.split('**');
    return (
      <>
        {parts.map((part, index) => {
          if (index % 2 !== 0) {
            return <strong key={index} className="text-[#ff6347]">{part}</strong>; // Highlight bolded text
          }
          return part;
        })}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center text-center px-4 mt-6 space-y-3">
      <p className="text-lg font-medium text-white">
        {renderMessage(message)}
      </p>
      <p className="text-sm text-gray-400 italic">
        {highlight}
      </p>
    </div>
  );
};

/**
 * Renders an individual category item with a percentage bar.
 */
const CategoryProgressBar = ({ name, percentage, icon, color }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second for bar growth
    const start = Date.now();

    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / duration);
      const currentWidth = percentage * progress; // Animate percentage
      setAnimatedWidth(currentWidth);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [percentage]);

  return (
    <div className="flex items-center space-x-3 w-full">
      <div className="w-5 h-5 flex-shrink-0" style={{ color: color }}>{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-300">{name}</p>
        <div className="w-full bg-white/10 rounded-full h-2 mt-1">
          <div
            className="h-full rounded-full"
            style={{
              width: `${animatedWidth}%`,
              backgroundColor: color,
              transition: 'background-color 0.3s ease-in-out', // Smooth color change if data changes
            }}
          ></div>
        </div>
      </div>
      <p className="text-sm font-semibold text-white w-12 text-right">
        {animatedWidth.toFixed(1)}%
      </p>
    </div>
  );
};


/**
 * Main App Component for the Summary Page
 */
function TabWrapStats() {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    chrome.storage.local.get(['tabWrapSummary'], (data) => {
      setSummary(data.tabWrapSummary || null);
    });
  }, []);

  if (!summary) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-black">Loading stats...</div>;
  }

  // Prepare top 5 categories for breakdown
  // Import defaultCategories from options.jsx
  const defaultCategories = [
    { text: "Work", color: "#7e22ce" },
    { text: "Finance", color: "#22c55e" },
    { text: "Hobbies", color: "#facc15" },
    { text: "Spirituality", color: "#22d3ee" },
    { text: "Health", color: "#ef4444" },
    { text: "Social Media", color: "#ff6347" },
    { text: "Community", color: "#a259ff" },
    { text: "Entertainment", color: "#eab308" },
    { text: "Shopping", color: "#38bdf8" },
    { text: "News", color: "#64748b" },
    { text: "Travel", color: "#f472b6" },
    { text: "Misc", color: "#f472b6" }
  ];

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

  function getCategoryColor(name) {
    // Try exact match first
    const found = defaultCategories.find(cat => cat.text === name);
    if (found) return found.color;
    // Try partial match for cases like "Work and Learning"
    for (const cat of defaultCategories) {
      if (name.toLowerCase().includes(cat.text.toLowerCase())) return cat.color;
    }
    return '#38bdf8'; // fallback
  }

  const top5 = (summary.categoryPercents || []).slice(0, 5);
    const activityBreakdown = top5.map(cat => {
      const key = cat.cat.split(' ')[0];
      const IconComponent = categoryIcons[key] || Zap;
      return {
        name: cat.cat,
        percentage: cat.pct,
        IconComponent,
        color: getCategoryColor(cat.cat)
      };
    });

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans" style={{ backgroundColor: '#0a0a0a' }}>
      {/* ...existing code... */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#ff0099] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#ff6347] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-8 mt-10 mb-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest">TAB WRAP - OCTOBER</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 drop-shadow-lg">
            Your Browsing Stats
          </h1>
        </div>

        {/* Total Browsing Stats */}
        <TotalTimeDisplay
          minutes={summary.totalMinutes}
          label="Total Minutes Spent Browsing"
          focusColor="#ff0099"
        />

        {/* New Tabs and Highlight */}
        <NewTabsHighlight
          count={summary.totalTabs}
          message={`You opened a mere **${summary.totalTabs}** new tabs this month!`}
          highlight={''}
        />

        {/* Activity Breakdown Donut Chart */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
            Activity Breakdown (By Time)
          </h2>
          <AnimatedDonutChart data={activityBreakdown} />
        </div>

        {/* Category Progress Bars */}
        <div className="space-y-4 px-2">
          {activityBreakdown.map((category, index) => (
            <CategoryProgressBar
              key={index}
              name={category.name}
              percentage={category.percentage}
              icon={<category.IconComponent size={18} />}
              color={category.color}
            />
          ))}
        </div>

        {/* Action Buttons */}
        {/* Button to go to top category page */}
        {activityBreakdown.length > 0 && (
          (() => {
            const topCat = activityBreakdown[0].name;
            let pageName = '';
            if (topCat.includes('/')) {
              pageName = topCat.split('/')[0].replace(/\s+/g, '').toLowerCase();
            } else {
              pageName = topCat.split(' ')[0].toLowerCase();
            }
            const pageUrl = `${pageName}.html`;
            return (
              <button
                className="mt-6 py-3 px-6 rounded-full text-white font-bold text-lg transition-all duration-300 ease-in-out shadow-lg bg-[#ff0099] hover:bg-[#e00080] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                onClick={() => window.location.href = pageUrl}
              >
                Go to your top category page
              </button>
            );
          })()
        )}
      </div>

      {/* Tailwind Animation Styles (unchanged) */}
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Standard CSS for pulse effect */
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
createRoot(root).render(<TabWrapStats />);