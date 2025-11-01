import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

// Get category info from URL params
const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('name') || 'Miscellaneous';
const categoryColor = urlParams.get('color') || '#9ca3af';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={[categoryName]}
    label={`SPENT ON ${categoryName.toUpperCase()}`}
    focusColor={categoryColor}
    streakTitle={`${categoryName.toUpperCase()} STREAK`}
    summaryType={categoryName.toLowerCase()}
    quipDefault="Keep it up! 🚀"
    pageTitle={categoryName.toUpperCase()}
  />
);
