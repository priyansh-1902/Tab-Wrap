import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';
createRoot(root).render(
  <CategoryPage
    categoryNames={["Shopping"]}
    label="SPENT ON SHOPPING"
    focusColor="#38bdf8"
    streakTitle="SHOPPING STREAK"
    streakBarColor="bg-blue-400"
    streakHoverColor="hover:bg-blue-300"
    streakGlowColor="rgba(56,189,248,0.8)"
    summaryType="shopping"
    quipDefault="Shop smart!"
    pageTitle="SHOPPING CATEGORY SUMMARY"
    bgColors={["#38bdf8", "#fbbf24", "#a78bfa"]}
  />
);
