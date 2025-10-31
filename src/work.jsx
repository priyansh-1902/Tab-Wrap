import React from 'react';

import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Work and Learning"]}
    label="SPENT ON WORK"
    focusColor="#4ade80"
    streakTitle="WORK STREAK"
    streakBarColor="bg-green-400"
    streakHoverColor="hover:bg-green-300"
    streakGlowColor="rgba(34,197,94,0.8)"
    summaryType="work"
    quipDefault="Keep up the grind!"
    pageTitle="WORK CATEGORY SUMMARY"
    bgColors={["#a78bfa", "#4ade80", "#38bdf8"]}
  />
);
