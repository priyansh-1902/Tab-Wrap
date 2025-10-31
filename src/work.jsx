import React from 'react';

import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Work"]}
    label="SPENT ON WORK"
    focusColor="#7e22ce"
    streakTitle="WORK STREAK"
    streakBarColor="bg-green-400"
    streakHoverColor="hover:bg-green-300"
    streakGlowColor="#7e22ce"
    summaryType="work"
    quipDefault="Keep up the grind!"
    pageTitle="WORK CATEGORY SUMMARY"
    bgColors={["#a78bfa", "#7e22ce", "#38bdf8"]}
  />
);
