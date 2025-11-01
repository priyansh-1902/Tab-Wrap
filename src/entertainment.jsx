import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

createRoot(root).render(
  <CategoryPage
      categoryNames={["Entertainment"]}
      label="SPENT ON ENTERTAINMENT"
      focusColor="#fb923c"
      streakTitle="ENTERTAINMENT STREAK"
      streakBarColor="bg-pink-400"
      streakHoverColor="hover:bg-pink-300"
      streakGlowColor="rgba(236,72,153,0.8)"
      summaryType="entertainment"
      quipDefault="Enjoy responsibly!"
      pageTitle="ENTERTAINMENT CATEGORY SUMMARY"
      bgColors={["#f472b6", "#fb923c", "#38bdf8"]}
    />
);
