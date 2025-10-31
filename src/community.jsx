import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Community"]}
    label="SPENT ON COMMUNITY"
    focusColor="#fbbf24"
    streakTitle="COMMUNITY STREAK"
    streakBarColor="bg-yellow-400"
    streakHoverColor="hover:bg-yellow-300"
    streakGlowColor="rgba(251,191,36,0.8)"
    summaryType="community"
    quipDefault="Stay connected!"
    pageTitle="COMMUNITY CATEGORY SUMMARY"
    bgColors={["#fbbf24", "#38bdf8", "#a78bfa"]}
  />
);
