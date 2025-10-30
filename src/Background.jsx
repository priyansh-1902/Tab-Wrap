import React from 'react';

export default function Background() {
  return (
    <style>{`
      html, body {
        background: #0b0b0b !important;
        margin: 0 !important;
        padding: 0 !important;
        min-height: 100vh !important;
        width: 100vw !important;
        box-sizing: border-box !important;
      }
    `}</style>
  );
}
