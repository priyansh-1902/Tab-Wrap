// colorScheme.jsx
// Returns a random color scheme object for use in stats and tabwrap pages

const colorSchemes = [
  {
    gradient: 'linear-gradient(90deg, #ff2dbe 0%, #a259ff 100%)',
    bar: 'linear-gradient(90deg, #ff2dbe 0%, #a259ff 100%)',
    accent: '#a259ff',
    background: '#0b0b0b',
  },
  {
    gradient: 'linear-gradient(90deg, #39ff14 0%, #00ffa2 100%)',
    bar: 'linear-gradient(90deg, #39ff14 0%, #00ffa2 100%)',
    accent: '#39ff14',
    background: '#0b0b0b',
  },
//   {
//     gradient: 'linear-gradient(90deg, #ff2d55 0%, #ffe082 100%)',
//     bar: 'linear-gradient(90deg, #ff2d55 0%, #ffe082 100%)',
//     accent: '#ff2d55',
//     background: '#0b0b0b',
//   },
//   {
//     gradient: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
//     bar: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
//     accent: '#414345',
//     background: '#0b0b0b',
//   },
];

export default function getRandomColorScheme() {
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
}
