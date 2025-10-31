

import React from 'react';
import { createRoot } from 'react-dom/client';
import CategoryPage from './CategoryPage.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <CategoryPage
    categoryNames={["Social Media"]}
    label="SPENT ON SOCIAL MEDIA"
    focusColor="#f472b6"
    streakTitle="TOP SOCIAL MEDIA STREAK"
    streakBarColor="bg-pink-400"
    streakHoverColor="hover:bg-pink-300"
    streakGlowColor="rgba(236, 72, 153, 0.8)"
    summaryType="social media"
    quipDefault="Stay mindful!"
    pageTitle="SOCIAL MEDIA CATEGORY SUMMARY"
    bgColors={["#fbbf24", "#f472b6", "#38bdf8"]}
  />
);