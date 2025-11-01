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
  const [categoryColorMap, setCategoryColorMap] = useState({});
  
  useEffect(() => {
    chrome.storage.local.get(['tabWrapSummary', 'profile'], (data) => {
      setSummary(data.tabWrapSummary || null);
      
      // Build color map from profile categories
      const profile = data.profile || {};
      const categories = profile.categories || [];
      const colorMap = {};
      categories.forEach(cat => {
        const name = typeof cat === 'string' ? cat : cat.text;
        const color = typeof cat === 'string' ? '#38bdf8' : cat.color;
        colorMap[name] = color;
      });
      setCategoryColorMap(colorMap);
    });
  }, []);

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0a0a0a]">
        <div className="text-center space-y-4">
          <div className="loader" style={{ width: 48, height: 48, border: '4px solid rgba(255, 0, 153, 0.2)', borderTop: '4px solid #ff0099', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <p className="text-gray-400">Loading your awesome stats...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
        </div>
      </div>
    );
  }

  // Prepare top 5 categories for breakdown
  const categoryIcons = {
    Work: Briefcase,
    Finance: DollarSign,
    Hobbies: Palette,
    Spirituality: Sun,
    Health: HeartPulse,
    'Social Media': MessageSquare,
    Social: MessageSquare,
    Community: Handshake,
    Entertainment: Clapperboard,
    Shopping: ShoppingCart,
    News: Newspaper,
    Travel: Plane,
    Miscellaneous: HelpCircle,
    default: Zap,
  };

  function getCategoryColor(name) {
    // Use dynamic color from profile
    return categoryColorMap[name] || '#38bdf8';
  }
  
  function getCategoryIcon(name) {
    // Try exact match
    if (categoryIcons[name]) return categoryIcons[name];
    // Try first word
    const firstWord = name.split(' ')[0];
    return categoryIcons[firstWord] || categoryIcons.default;
  }

  const top5 = (summary.categoryPercents || []).slice(0, 5);
  const activityBreakdown = top5.map(cat => {
    const IconComponent = getCategoryIcon(cat.cat);
    return {
      name: cat.cat,
      percentage: cat.pct,
      IconComponent,
      color: getCategoryColor(cat.cat)
    };
  });

  return (
  <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Modern gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/20 via-purple-500/30 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="relative p-8 pb-6 border-b border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
            <div className="relative text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 mb-2">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">TAB WRAP</p>
              <h1 className="text-4xl sm:text-5xl font-black drop-shadow-lg" style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ff0099 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Your Browsing Stats
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">

        {/* Total Browsing Stats */}
        <TotalTimeDisplay
          minutes={summary.totalMinutes}
          label="Total Minutes Browsing"
          focusColor="#ff0099"
        />

        {/* New Tabs and Highlight */}
        <NewTabsHighlight
          count={summary.totalTabs}
          message={`You opened **${summary.totalTabs}** tabs! ${summary.totalTabs > 100 ? "Tab hoarder alert! 🚨" : summary.totalTabs > 50 ? "That's... a lot of tabs 😅" : "Not bad! 👍"}`}
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
        {/* Centered Button to go to top category page */}
        {activityBreakdown.length > 0 && (
          <div className="flex justify-center w-full pt-4">
            {(() => {
              const topCat = activityBreakdown[0].name;
              const topColor = activityBreakdown[0].color;
              const pageUrl = `category.html?name=${encodeURIComponent(topCat)}&color=${encodeURIComponent(topColor)}`;
              return (
                <button
                  className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                  style={{
                    background: 'linear-gradient(135deg, #ff0099 0%, #a855f7 100%)',
                    color: 'white'
                  }}
                  onClick={() => window.location.href = pageUrl}
                >
                  Explore Top Category →
                </button>
              );
            })()}
          </div>
        )}
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

// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<TabWrapStats />);