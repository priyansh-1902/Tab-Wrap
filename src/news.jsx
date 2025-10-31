import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

createRoot(root).render(
  <CategoryPage
    categoryNames={["News"]}
    label="SPENT ON NEWS"
    focusColor="#38bdf8"
    streakTitle="NEWS STREAK"
    streakBarColor="bg-blue-400"
    streakHoverColor="hover:bg-blue-300"
    streakGlowColor="rgba(56,189,248,0.8)"
    summaryType="news"
    quipDefault="Stay informed!"
    pageTitle="NEWS CATEGORY SUMMARY"
    bgColors={["#38bdf8", "#fbbf24", "#a78bfa"]}
  />
);
