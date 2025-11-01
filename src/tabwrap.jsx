import React from 'react';

function TabWrapPage() {
  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center font-sans" style={{ backgroundColor: '#0a0a0a' }}>

      {/* Background Effect: Cosmic Blur - Using Pink (#ff0099) and Orange (#ff6347) accents for theme consistency */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Top-left Pink Blob */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#ff0099] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        {/* Top-right Orange Blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6347] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        {/* Bottom-left Pink Blob */}
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ff0099] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        {/* Bottom-right Orange Blob */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#ff6347] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-6 max-w-xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-300 uppercase tracking-widest" style={{ letterSpacing: '0.15em' }}>
          TAB WRAP
        </h1>
        <p className="text-base sm:text-lg text-gray-300 px-4">
          Ready to see what you've <em>really</em> been up to online? 👀
        </p>
        <p className="text-sm text-gray-400 px-4 italic">
          (Don't worry, no one will know 🤫)
        </p>

        <button
          className="group mt-8 py-4 px-10 rounded-2xl bg-gradient-to-r from-[#ff0099] to-[#d60080] text-white font-bold text-lg shadow-2xl hover:shadow-pink-500/50 hover:from-[#e00080] hover:to-[#c20070] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          onClick={() => window.location.href = 'tabwrapstats.html'}
        >
          <span className="flex items-center space-x-2">
            <span>Let's Do This!</span>
            <span className="text-xl group-hover:animate-bounce">🚀</span>
          </span>
        </button>
      {/* Tailwind Animation Styles */}
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
        .animation-delay-6000 {
            animation-delay: 6s;
        }
      `}
      </style>
      </div>
    </div>
  );
}

// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<TabWrapPage />);

