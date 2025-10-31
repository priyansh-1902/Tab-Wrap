
import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Spirituality"]}
    label="SPENT ON SPIRITUALITY"
    focusColor="#34d399"
    streakTitle="TOP SPIRITUALITY STREAK"
    streakBarColor="bg-green-400"
    streakHoverColor="hover:bg-green-300"
    streakGlowColor="rgba(52, 211, 153, 0.8)"
    summaryType="spirituality"
    quipDefault="Stay mindful and inspired!"
    pageTitle="SPIRITUALITY CATEGORY SUMMARY"
    bgColors={["#34d399", "#fbbf24", "#38bdf8"]}
  />
);
createRoot(root).render(<Spirituality />);
