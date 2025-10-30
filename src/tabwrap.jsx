import React from 'react';
import Background from './Background';

function TabWrapPage() {

  // Randomly select theme on each reload
  const theme = Math.random() < 0.5 ? 'magenta' : 'green';
  const themeVars = theme === 'magenta'
    ? {
        pillGradient: 'linear-gradient(90deg, #ff2dbe 0%, #a259ff 100%)',
        circleGradient: 'radial-gradient(circle, #ff2dbe 0%, transparent 70%)',
        buttonAccent: '#ff5a2e',
      }
    : {
        pillGradient: 'linear-gradient(90deg, #39ff14 0%, #00ffa2 100%)',
        circleGradient: 'radial-gradient(circle, #39ff14 0%, transparent 70%)',
        buttonAccent: '#00ffa2',
      };

  const startWrap = () => {
    window.location.href = 'tabwrapstats.html';
  };

  return (
    <>
      <style>{`
        html, body {
          background: #0b0b0b !important;
          margin: 0 !important;
          padding: 0 !important;
          min-height: 100vh !important;
          width: 100vw !important;
          box-sizing: border-box !important;
        }
        @keyframes magentaMove {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(40px, 40px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes magentaMove2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, -40px) scale(1.25); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes pillMove {
          0% { transform: rotate(-18deg) translate(0px, 0px); }
          50% { transform: rotate(-18deg) translate(30px, 20px); }
          100% { transform: rotate(-18deg) translate(0px, 0px); }
        }
      `}</style>
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      width: '100vw',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    }}>
  <Background />
      {/* Blurred magenta circle with animation */}
            <style>{`
                @keyframes magentaMove {
                  0% { transform: translate(0px, 0px); }
                  50% { transform: translate(40px, 40px); }
                  100% { transform: translate(0px, 0px); }
                }
                @keyframes magentaMove2 {
                  0% { transform: translate(0px, 0px); }
                  50% { transform: translate(-40px, -40px); }
                  100% { transform: translate(0px, 0px); }
                }
            `}</style>
      {/* Tilted magenta pill shape in upper left corner, animated */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -120,
        width: 420,
        height: 120,
        borderRadius: 80,
        background: themeVars.pillGradient,
        opacity: 0.85,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(8px)',
        animation: 'pillMove 24s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: -100,
        left: -120,
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: themeVars.circleGradient,
        filter: 'blur(48px)',
        opacity: 0.7,
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'magentaMove 12s ease-in-out infinite',
      }} />
      {/* Lower right blurred magenta circle */}
      <div style={{
        position: 'absolute',
        bottom: -100,
        right: -120,
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: themeVars.circleGradient,
        filter: 'blur(48px)',
        opacity: 0.7,
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'magentaMove2 12s ease-in-out infinite',
      }} />
      <div style={{
        width: 'min(600px, 96%)',
        borderRadius: 0,
        padding: '64px 48px',
        background: 'none',
        boxShadow: 'none',
        textAlign: 'center',
        zIndex: 1,
      }}>
        <h2 style={{ fontSize: 32, letterSpacing: '0.15em', margin: 0, fontWeight: 700, color: '#fff' }}>TAB WRAP</h2>
        <h1 style={{ fontSize: 100, lineHeight: 1, margin: '18px 0', fontWeight: 900, color: '#fff' }}>2024</h1>
        <p style={{ fontSize: 20, maxWidth: 520, margin: '0 auto', color: '#eee' }}>Your personalized deep dive into a year of <b>Work, Social, and Hobby</b> focus.</p>
        <button style={{
          background: '#fff',
          color: '#ff5a2e',
          border: 'none',
          borderRadius: 48,
          padding: '16px 40px',
          fontSize: 20,
          margin: '36px 0',
          cursor: 'pointer',
          fontWeight: 800,
          boxShadow: '0 6px 18px rgba(0,0,0,0.18)'
        }} onClick={startWrap}>Start My Wrap</button>
        <div style={{ color: '#fff', textAlign: 'center', fontSize: 16, marginTop: 16, fontWeight: 500 }}>
          Analytics Powered by Tab Wrap Extension
        </div>
      </div>
  </div>
  </>
  );
}

// Entry point for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
createRoot(root).render(<TabWrapPage />);
