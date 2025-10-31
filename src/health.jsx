
import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Health"]}
    label="SPENT ON FITNESS"
    focusColor="#ef4444"
    streakTitle="TOP FITNESS STREAK"
    streakBarColor="bg-blue-400"
    streakHoverColor="hover:bg-blue-300"
    streakGlowColor="rgba(56, 189, 248, 0.8)"
    summaryType="fitness"
    quipDefault="Stay active and healthy!"
    pageTitle="FITNESS CATEGORY SUMMARY"
    bgColors={["#38bdf8", "#fbbf24", "#34d399"]}
  />
);