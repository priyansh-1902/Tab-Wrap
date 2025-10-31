import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Travel"]}
    label="SPENT ON TRAVEL"
    focusColor="#f472b6"
    streakTitle="TRAVEL STREAK"
    streakBarColor="bg-blue-400"
    streakHoverColor="hover:bg-blue-300"
    streakGlowColor="rgba(56,189,248,0.8)"
    summaryType="travel"
    quipDefault="Explore more!"
    pageTitle="TRAVEL CATEGORY SUMMARY"
    bgColors={["#38bdf8", "#fbbf24", "#a78bfa"]}
  />
);
