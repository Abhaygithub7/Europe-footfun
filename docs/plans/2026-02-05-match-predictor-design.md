# Design Document: Europe Top 5 & UCL Match Predictor

## 1. Executive Summary
A premium, data-dense, and gamified web application that predicts outcomes for the top 5 European football leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1) and the UEFA Champions League. It combines real-time statistical data with AI-enhanced insights, presented in a "Sportsbook meets Trading Terminal" interface.

## 2. Core Features & Architecture

### 2.1 Prediction Engine (Hybrid)
*   **Statistical Foundation:** Hard data (Win Rates, H2H, Form, Goals) drives the core probability model.
*   **AI Layer:** Generative AI analyzes complex context (Injuries, News, Tactical Matchups) to provide narrative insights and "Smart Badges".
*   **Data Strategy:**
    *   **Primary:** Real-time API (e.g., football-data.org) with aggressive caching (Redis/KV) to respect rate limits.
    *   **Fallback:** Realistic Simulation Mode (Mock Data) triggers seamlessly if API quotas are exhausted.

### 2.2 Dashboard ("The Lobby")
*   **Aesthetic:** "Gamified Pro" - Dark mode, neon accents, high contrast, sleek motion.
*   **Hero Section:** "Match of the Day" with dynamic team backgrounds, countdown timer, and a glowing "AI Pick" badge.
*   **League Rail:** Horizontal selector for the 6 supported leagues.
*   **Match Grid:** Card-based layout showing:
    *   Teams & Kickoff Time.
    *   Win Probability Bars.
    *   **Pro Toggle:** A switch that reveals deep stats (e.g., "🔥 5-Win Streak") directly on the cards.

### 2.3 Match Detail Page ("Prediction Console")
*   **Versus Header:** Holographic score prediction, "Live" or "Pre-match" status indicators.
*   **Sofascore-Style Visuals:**
    *   **Momentum Graph:** Wave chart showing expected dominance periods.
    *   **Attribute Pentagon:** 5-axis radar chart (Attack, Defense, Control, Form, H2H).
    *   **Trending Tags:** Contextual pills (e.g., "Late Goal Specialist").
*   **Prediction Slip:** A visually distinct "Betting Slip" card summarizing:
    *   Predicted Winner.
    *   Projected Score.
    *   Confidence Score.
    *   AI Analysis Commentary.

## 3. Technology Stack
*   **Frontend:** Next.js (App Router), React, TypeScript.
*   **Styling:** Tailwind CSS, Framer Motion (animations), Lucide React (icons).
*   **Visualization:** Recharts (Graphs & Radar Charts).
*   **State/Data:** TanStack Query (Caching & Sync), Supabase (optional, for auth/preferences if needed).
*   **AI:** Gemini Flash-Lite (for narrative generation).

## 4. User Flow
1.  **Landing:** User sees the "Match of the Day" and active league matches.
2.  **Filter:** User selects "Premier League" to isolate EPL matches.
3.  **Explore:** User toggles "Pro Mode" to see quick actionable stats on cards.
4.  **Deep Dive:** User clicks "Arsenal vs Chelsea".
5.  **Analysis:** User reviews the Momentum Graph and Attribute Pentagon.
6.  **Prediction:** User reads the AI insight and checks the "Prediction Slip" for the final verdict.
