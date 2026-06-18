# AppVerse AI - Ultimate Frontend Application

AppVerse AI is a complete, production-grade frontend-only React 19 application built with Vite, React Router DOM, Tailwind CSS, Framer Motion, Recharts, and React Icons. It replicates a premium app store marketplace, a developer portal, and an admin console using HSL-tailored colors, sleek glassmorphism panels, and state-of-the-art UI animations.

## Technology Stack
- **Framework**: React 19, Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS (v3.4) & PostCSS
- **Animations**: Framer Motion (v11)
- **Charts**: Recharts (v2.15)
- **Icons**: React Icons (v5)
- **State Management**: React Context API & LocalStorage Persistence
- **Mock Data Layer**: 110+ Apps, 52 Users, 600+ Reviews, Time-series Charts Data

---

## Directory Structure
```text
C:\Users\Rohini\.gemini\antigravity\scratch\appverse-ai\
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── mock/
│   │   └── index.js
│   ├── context/
│   │   ├── AppContext.jsx
│   │   └── ThemeContext.jsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Carousel.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   └── ThemeSwitcher.jsx
│   │   ├── store/
│   │   │   ├── AppCard.jsx
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── analytics/
│   │   │   ├── AnalyticsCard.jsx
│   │   │   └── ChartCard.jsx
│   │   └── developer/
│   │       └── DevSidebar.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── AppDetailsPage.jsx
│   │   ├── RecommendationsPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── DownloadHistoryPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── 404Page.jsx
│   │   ├── dev/
│   │   │   ├── DevDashboard.jsx
│   │   │   ├── DevMyApps.jsx
│   │   │   ├── DevCreateApp.jsx
│   │   │   ├── DevAnalytics.jsx
│   │   │   ├── DevRevenue.jsx
│   │   │   └── DevReviews.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminUsers.jsx
│   │       ├── AdminApps.jsx
│   │       └── AdminReviews.jsx
│   └── routes.jsx
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
Clone or navigate to the directory and install dependencies:
```bash
npm install --legacy-peer-deps
```
*Note: The `--legacy-peer-deps` flag ensures that Recharts peer dependencies resolve cleanly alongside React 19.*

### Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) to inspect the project.

### Production Build
Verify the production-grade bundle compilations:
```bash
npm run build
```
The compiled build output will be exported into the `dist/` directory.
