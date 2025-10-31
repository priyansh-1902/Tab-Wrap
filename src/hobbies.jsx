
import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Hobbies"]}
    label="SPENT ON HOBBIES/CREATIVITY"
    focusColor="#facc15"
    streakTitle="TOP HOBBIES/CREATIVITY STREAK"
    streakBarColor="bg-indigo-400"
    streakHoverColor="hover:bg-indigo-300"
    streakGlowColor="rgba(167, 139, 250, 0.8)"
    summaryType="hobbies/creativity"
    quipDefault="Keep creating and exploring!"
    pageTitle="HOBBIES/CREATIVITY CATEGORY SUMMARY"
    bgColors={["#a78bfa", "#fbbf24", "#38bdf8"]}
  />
);

