
import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Finance"]}
    label="SPENT ON FINANCE"
    focusColor="#22c55e"
    streakTitle="TOP FINANCE STREAK"
    streakBarColor="bg-yellow-500"
    streakHoverColor="hover:bg-yellow-400"
    streakGlowColor="rgba(245, 158, 66, 0.8)"
    summaryType="finance"
    quipDefault="Keep saving and investing!"
    pageTitle="FINANCE CATEGORY SUMMARY"
    bgColors={["#fbbf24", "#f59e42", "#38bdf8"]}
  />
);

