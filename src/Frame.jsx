import React from 'react';
import './Frame.css';

export default function Frame({ children, colorScheme }) {
  // Fallbacks for colorScheme
  const topGrad = colorScheme?.topGrad || colorScheme?.gradient || 'linear-gradient(90deg, #ff2dbe 0%, #a259ff 100%)';
  const botGrad = colorScheme?.botGrad || colorScheme?.gradient || 'linear-gradient(120deg, #ff2dbe 0%, #a259ff 100%)';
  const bg = colorScheme?.background || '#0b0b0b';

  return (
    <div
      className="frame"
      style={{
        '--topGrad': topGrad,
        '--botGrad': botGrad,
        'background': bg,
      }}
    >
      <div className="band band--top" />
      <div className="band band--bottom" />
      <div className="frame__content">
        {children}
      </div>
    </div>
  );
}
