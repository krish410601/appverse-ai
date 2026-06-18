// Deterministic Pseudo-Random Number Generator (PRNG) to keep mock data consistent
const createSeededRandom = (seed) => {
  let m = 0x80000000;
  let a = 1103515245;
  let c = 12345;
  let state = seed ? seed : Math.floor(Math.random() * (m - 1));
  return () => {
    state = (a * state + c) % m;
    return state / (m - 1);
  };
};

const random = createSeededRandom(42); // Seeded random instance

const CATEGORIES = [
  "AI Tools",
  "Productivity",
  "Entertainment",
  "Games",
  "Finance",
  "Creative",
  "Utilities",
  "Health"
];

// App descriptions and names by category
const APP_TEMPLATES = {
  "AI Tools": [
    { name: "CodeSphere Copilot", tag: "AI Code Assistant", desc: "An intelligent coding companion that autocompletes whole functions, writes unit tests, and explains complex algorithms directly in your browser IDE." },
    { name: "ChatPDF Professional", tag: "AI Document Reader", desc: "Instantly chat with any PDF document, research paper, or textbook. Summarize key findings, locate citations, and extract tables with natural language." },
    { name: "Synthesia Video Studio", tag: "AI Video Generator", desc: "Generate studio-grade videos with avatars and AI-generated scripts in 80+ languages. No cameras, microphones, or green screens needed." },
    { name: "MindMap AI", tag: "AI Brainstorming", desc: "Convert raw notes or transcripts into clean, dynamic mind maps, logic trees, and flowcharts using advanced LLM reasoning." },
    { name: "Midjourney Studio Pro", tag: "AI Art Generator", desc: "A creative canvas powered by stable diffusion models. Edit, upscale, and composite high-fidelity digital art with text prompts and brushes." },
    { name: "AudioScribe Translator", tag: "AI Voice Transcriber", desc: "Real-time speech translation and meeting summarization. Capture conversations and turn them into actionable meeting minutes." },
    { name: "ResumeRefine Pro", tag: "AI Career Coach", desc: "Optimize your resume, practice mock interviews, and tailor cover letters for specific job listings with interactive feedback." },
    { name: "CogniWrite Editor", tag: "AI Writing Assistant", desc: "Beat writer's block. Rephrase sentences, draft marketing newsletters, and optimize website copy for SEO using state-of-the-art text generation." }
  ],
  "Productivity": [
    { name: "Zenith Calendar", tag: "Smart Scheduling", desc: "An elegant, keyboard-first calendar that auto-coordinates team schedules, protects focus time, and integrations with video call platforms." },
    { name: "TaskFlow Boards", tag: "Visual Project Management", desc: "Organize projects using Kanban boards, Gantt charts, and calendar timelines. Features deep Slack and Github integrations." },
    { name: "Notepad Next", tag: "Rich Document Writer", desc: "A markdown editor featuring nested folder structures, offline editing, backlinking, and multiplayer real-time collaboration." },
    { name: "FocusTime Pomodoro", tag: "Concentration Timer", desc: "Stay productive with an customizable Pomodoro timer, ambient soundscapes, site blocking lists, and weekly productivity reports." },
    { name: "InboxZero Client", tag: "Unified Email Inbox", desc: "Clean up your cluttered inbox. Auto-categorizes emails, batches newsletters, and reminds you when to follow up." }
  ],
  "Entertainment": [
    { name: "CineSync Hub", tag: "Watch Parties", desc: "Watch movies and series in perfect synchronization with friends, featuring built-in video chat and spatial audio rooms." },
    { name: "SoundWave Stream", tag: "Hi-Res Music Player", desc: "Stream your favorite songs in 24-bit lossless audio. Create dynamic mixes, read synchronized lyrics, and share live playlists." },
    { name: "StreamForge Studio", tag: "Live Streaming Tools", desc: "Broadcast your screen and webcam to multiple platforms simultaneously with overlay controls and chat integrations." },
    { name: "ToonToon Animations", tag: "Webcomic Reader", desc: "Enjoy thousands of premium webcomics, manga, and cartoons with vertical scroll layouts and offline downloading." }
  ],
  "Games": [
    { name: "ShadowGrid Cyberpunk", tag: "Cyberpunk Action RPG", desc: "Explore a neon-drenched metropolis, hack corporations, and battle cyborg bosses in this high-intensity isometric roguelike RPG." },
    { name: "Cosmic Miner Idle", tag: "Idle Space Clicker", desc: "Deploy cargo ships, mine asteroids for rare elements, build space elevators, and colonize distant planets in an infinite idle universe." },
    { name: "Hexagon Strategy", tag: "Turn-based Chess", desc: "Test your strategic wits in complex hex-based map arenas. Battle against advanced AI engines or other players in competitive matchmaking." },
    { name: "PixelQuest Heroes", tag: "Retro Platformer", desc: "A nostalgic retro platformer featuring 8-bit chip tunes, challenging level designs, secret routes, and local cooperative play." },
    { name: "SpeedRush Racing 3D", tag: "High Speed Arcade", desc: "Race custom sports cars through dynamic environments, including busy city streets, desert canyons, and glowing space tracks." }
  ],
  "Finance": [
    { name: "Apex Portfolio Tracker", tag: "Stocks & Crypto Tracker", desc: "Track your investments across stocks, bonds, crypto wallets, and real estate in a single secure dashboard with real-time price updates." },
    { name: "WalletWise Budget", tag: "Personal Expense Planner", desc: "Securely link your bank accounts, set monthly category budgets, scan receipts, and auto-detect subscription leakages." },
    { name: "CoinScale Exchange", tag: "Crypto Trading Client", desc: "Trade over 300 cryptocurrencies with advanced chart tools, limit orders, instant swap interfaces, and bank wire support." },
    { name: "TaxReturn Wizard", tag: "Tax Estimator", desc: "File your personal and corporate taxes with confidence. Auto-fills tax documents and calculates deductions step-by-step." }
  ],
  "Creative": [
    { name: "VividPaint Studio", tag: "Digital Drawing Canvas", desc: "A lightweight painting app featuring customizable brush engines, infinite layers, perspective grids, and PSD imports." },
    { name: "BeatBuilder Synth", tag: "Desktop Synthesizer", desc: "A fully fledged music workstation. Program drums, record vocals, mix audio tracks, and export midi with virtual instrument libraries." },
    { name: "VectorCut Illustrator", tag: "Vector Editor", desc: "Create high-fidelity scalable logos, UI illustrations, and iconography. Export clean SVG code and print-ready PDFs." },
    { name: "StoryCraft Studio", tag: "Novel Writer", desc: "A professional text editor tailored for novelists. Track characters, map plot timelines, and manage chapters in a beautiful dark interface." }
  ],
  "Utilities": [
    { name: "NetGuard Premium VPN", tag: "Secure Encrypted Proxy", desc: "Protect your online privacy, encrypt your web activity, and bypass geo-restrictions with servers in 94 countries." },
    { name: "DiskSweeper Clean", tag: "System Speedup Optimizer", desc: "Analyze your local disk space, clear duplicate media, optimize startup programs, and delete registry leftovers." },
    { name: "PassVault Manager", tag: "Encrypted Password Wallet", desc: "Store credentials, payment methods, and notes in an offline AES-256 encrypted vault. Autofills logins in browsers." },
    { name: "LinkShare Sync", tag: "Fast File Transfer", desc: "Share files of any size over local Wi-Fi or secure web links without compression. Instant drag-and-drop file receiver." }
  ],
  "Health": [
    { name: "ZenSleep Ambient", tag: "White Noise Generator", desc: "Fall asleep faster with scientifically curated white noise, rain patterns, campfire crackles, and guided breathing exercises." },
    { name: "FitFlow Pilates", tag: "Home Workout Routines", desc: "Your personal fitness trainer. Stream hundreds of yoga, pilates, and bodyweight exercises tailored for your skill level." },
    { name: "CalorieCounter Log", tag: "Diet & Macro Tracker", desc: "Scan grocery barcodes, log meal macros, track water intake, and receive daily diet planning tips from nutritional AI coaches." },
    { name: "CardioPulse Tracker", tag: "Heart Rate Monitor", desc: "Monitor your resting heart rate, log blood pressure readings, and review weekly stress analysis logs." }
  ]
};

// Generate Users
const FIRST_NAMES = ["Alex", "Jordan", "Taylor", "Morgan", "Sam", "Jamie", "Riley", "Casey", "Skyler", "Cameron", "Robin", "Peyton", "Drew", "Ryan", "Elena", "Kaito", "Fatima", "Liam", "Sarah", "Gabriel", "Chao", "Aria", "Chloe", "Devon", "Marcus"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Chen", "Kim", "Singh", "Patel"];

const USER_BIOS = [
  "Software Engineer specializing in React & TypeScript.",
  "Digital designer obsessed with minimalism, typography, and dark mode.",
  "Indie hacker, SaaS enthusiast, and chronic coffee drinker.",
  "Mobile developer and casual gamer.",
  "Creative director and vector illustrator.",
  "Crypto enthusiast, investor, and financial analyst.",
  "Yoga practitioner and health coach.",
  "High school science teacher who loves coding tutorials.",
  "Data analyst looking for the perfect note-taking system.",
  "AI researcher exploring LLMs and prompt engineering."
];

export const generateUsers = () => {
  const list = [];
  // Current user (Self)
  list.push({
    id: "user_self",
    username: "Rohini Dev",
    email: "rohini@appverse.ai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Developer / Admin",
    bio: "Lead Developer at AppVerse Studio. Building the future of AI applications.",
    downloads: ["app_1", "app_5", "app_10", "app_18", "app_25"],
    favorites: ["app_1", "app_10", "app_32"],
    reviewsWritten: 12,
    badges: ["Beta Tester", "Premium Subscriber", "Developer License"],
    revenueTier: "Enterprise",
    activity: [
      { id: "act_1", type: "download", target: "CodeSphere Copilot", date: "2026-06-12" },
      { id: "act_2", type: "review", target: "ChatPDF Professional", date: "2026-06-11" },
      { id: "act_3", type: "favorite", target: "Zenith Calendar", date: "2026-06-10" }
    ]
  });

  for (let i = 1; i <= 52; i++) {
    const fn = FIRST_NAMES[Math.floor(random() * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(random() * LAST_NAMES.length)];
    const username = `${fn} ${ln}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`;
    const avatar = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(random() * 999999)}?w=150`;
    const bio = USER_BIOS[Math.floor(random() * USER_BIOS.length)];
    const downloadsCount = Math.floor(random() * 8) + 1;
    const downloads = [];
    for (let d = 0; d < downloadsCount; d++) {
      downloads.push(`app_${Math.floor(random() * 100) + 1}`);
    }
    
    list.push({
      id: `user_${i}`,
      username,
      email,
      avatar,
      role: random() > 0.9 ? "Moderator" : "User",
      bio,
      downloads: [...new Set(downloads)],
      favorites: downloads.slice(0, Math.floor(random() * downloads.length)),
      reviewsWritten: Math.floor(random() * 10),
      badges: random() > 0.85 ? ["Gold Reviewer"] : random() > 0.7 ? ["Early Adopter"] : ["Standard User"],
      isBlocked: random() > 0.95
    });
  }
  return list;
};

export const users = generateUsers();

// Generate Apps (110 total)
export const generateApps = () => {
  const appList = [];
  let appIdCounter = 1;

  // Let's create the template-based realistic apps first
  CATEGORIES.forEach(category => {
    const templates = APP_TEMPLATES[category] || [];
    templates.forEach(tpl => {
      const rating = parseFloat((4.0 + random() * 1.0).toFixed(1));
      const downloads = Math.floor(1000 + random() * 499000);
      const isFree = random() > 0.3;
      const price = isFree ? "Free" : `$${(0.99 + random() * 19).toFixed(2)}`;
      const size = `${Math.floor(15 + random() * 150)} MB`;
      const devName = `${LAST_NAMES[Math.floor(random() * LAST_NAMES.length)]} Labs`;

      appList.push({
        id: `app_${appIdCounter++}`,
        name: tpl.name,
        tagline: tpl.tag,
        description: tpl.desc,
        category,
        rating,
        downloads,
        price,
        size,
        developer: devName,
        developerId: `dev_${Math.floor(random() * 10) + 1}`,
        logo: `https://images.unsplash.com/photo-${1510000000000 + Math.floor(random() * 999999)}?w=100&h=100&fit=crop&q=80`,
        banner: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(random() * 999999)}?w=1200&h=500&fit=crop&q=80`,
        screenshots: [
          `https://images.unsplash.com/photo-${1540000000000 + Math.floor(random() * 999999)}?w=600&q=80`,
          `https://images.unsplash.com/photo-${1550000000000 + Math.floor(random() * 999999)}?w=600&q=80`,
          `https://images.unsplash.com/photo-${1560000000000 + Math.floor(random() * 999999)}?w=600&q=80`
        ],
        version: `${Math.floor(random() * 3) + 1}.${Math.floor(random() * 9)}.${Math.floor(random() * 9)}`,
        releaseDate: `2026-0${Math.floor(random() * 5) + 1}-${Math.floor(random() * 20) + 10}`,
        requirements: "Windows 10/11 or macOS 12+",
        releaseNotes: "Performance optimizations, fixed crash on launch, updated interface themes.",
        featured: random() > 0.85,
        editorsChoice: random() > 0.9,
        trending: random() > 0.8,
        likes: Math.floor(downloads * 0.1),
        isApproved: true,
      });
    });
  });

  // Programmatically generate remaining apps up to 110
  const appWords = ["Flux", "Quantum", "Sync", "Link", "Zen", "Pulse", "Nova", "Starlight", "Core", "Grid", "Apex", "Omni", "Horizon", "Velocity", "Edge", "Spectra", "Atlas", "Titan", "Vertex", "Infinity"];
  const appSuffixes = ["AI", "Pro", "Go", "Hub", "Suite", "App", "Studio", "Workspace", "Flow", "OS", "Forge", "Plus"];

  while (appIdCounter <= 110) {
    const category = CATEGORIES[Math.floor(random() * CATEGORIES.length)];
    const word1 = appWords[Math.floor(random() * appWords.length)];
    const word2 = appSuffixes[Math.floor(random() * appSuffixes.length)];
    const name = `${word1} ${word2}`;
    const tag = `Premium ${category} Utility`;
    const desc = `Maximize your experience with ${name}. A powerful, enterprise-grade utility tool built for seamless integration, offering instant results, performance caching, and offline support. Perfect for both professionals and hobbyists looking to speed up their ${category.toLowerCase()} workflow.`;
    
    const rating = parseFloat((3.5 + random() * 1.5).toFixed(1));
    const downloads = Math.floor(500 + random() * 250000);
    const isFree = random() > 0.4;
    const price = isFree ? "Free" : `$${(1.99 + random() * 9).toFixed(2)}`;
    const size = `${Math.floor(5 + random() * 90)} MB`;
    const devName = `${appWords[Math.floor(random() * appWords.length)]} Development`;

    appList.push({
      id: `app_${appIdCounter++}`,
      name,
      tagline: tag,
      description: desc,
      category,
      rating,
      downloads,
      price,
      size,
      developer: devName,
      developerId: `dev_${Math.floor(random() * 10) + 1}`,
      logo: `https://images.unsplash.com/photo-${1515000000000 + Math.floor(random() * 999999)}?w=100&h=100&fit=crop&q=80`,
      banner: `https://images.unsplash.com/photo-${1542000000000 + Math.floor(random() * 999999)}?w=1200&h=500&fit=crop&q=80`,
      screenshots: [
        `https://images.unsplash.com/photo-${1555000000000 + Math.floor(random() * 999999)}?w=600&q=80`,
        `https://images.unsplash.com/photo-${1565000000000 + Math.floor(random() * 999999)}?w=600&q=80`
      ],
      version: `1.0.${Math.floor(random() * 9)}`,
      releaseDate: `2026-05-${Math.floor(random() * 20) + 10}`,
      requirements: "Compatible with modern web browsers and mobile platforms",
      releaseNotes: "Initial release of the application. High-fidelity layouts and dark theme included.",
      featured: false,
      editorsChoice: false,
      trending: random() > 0.9,
      likes: Math.floor(downloads * 0.08),
      isApproved: true
    });
  }

  // Inject a few developer apps explicitly assigned to self_developer for the Dev Portal
  for (let dIdx = 1; dIdx <= 4; dIdx++) {
    appList[dIdx].developer = "AppVerse Studio";
    appList[dIdx].developerId = "dev_self";
  }

  return appList;
};

export const apps = generateApps();

// Generate Reviews (600+ total, 5-6 reviews per app)
const REVIEW_ADJECTIVES = ["Excellent", "Perfect", "Really helpful", "Very smooth", "Useful", "Clean UI", "Decent", "Good", "Outstanding", "Slightly slow", "Bugs on launch", "Highly recommended", "Absolute game changer"];
const REVIEW_NOUNS = ["app", "utility", "design", "experience", "tool", "features", "updates", "support", "dashboard", "layout"];
const REVIEW_FEEDBACKS = [
  "This has completely transformed my daily workflow. Worth every single cent!",
  "Great job on the animations, feels very native and smooth. Would love to see more widget options.",
  "Decent, but crashes sometimes when exporting high resolution files. Hoping for a patch soon.",
  "Exactly what I was looking for. Very simple, lightweight, and offline support works flawlessly.",
  "The AI features are incredibly snappy. It generated code/design that worked instantly. Very impressive.",
  "Simple, direct, and does exactly what it says. 5 stars!",
  "Could use better documentation but the core app works really well.",
  "I have tried three similar apps, and this one is by far the fastest and most beautiful. Recommended!"
];

export const generateReviews = () => {
  const reviewList = [];
  let reviewIdCounter = 1;

  apps.forEach(app => {
    // Determine how many reviews (5 to 8 per app)
    const reviewCount = Math.floor(random() * 4) + 5;
    for (let r = 0; r < reviewCount; r++) {
      const user = users[Math.floor(random() * users.length)];
      const rating = Math.floor(random() * 2) + 4; // mostly 4 or 5 stars
      const adj = REVIEW_ADJECTIVES[Math.floor(random() * REVIEW_ADJECTIVES.length)];
      const noun = REVIEW_NOUNS[Math.floor(random() * REVIEW_NOUNS.length)];
      const feedback = REVIEW_FEEDBACKS[Math.floor(random() * REVIEW_FEEDBACKS.length)];
      const title = `${adj} ${noun}`;
      const helpful = Math.floor(random() * 45);
      
      const rDate = new Date();
      rDate.setDate(rDate.getDate() - Math.floor(random() * 30));

      reviewList.push({
        id: `rev_${reviewIdCounter++}`,
        appId: app.id,
        appName: app.name,
        userId: user.id,
        userName: user.username,
        userAvatar: user.avatar,
        rating: random() > 0.15 ? rating : rating - 2, // inject occasional 2-3 star reviews
        title,
        comment: feedback,
        date: rDate.toISOString().split('T')[0],
        helpful,
        isFlagged: random() > 0.97
      });
    }
  });

  return reviewList;
};

export const reviews = generateReviews();

// Generate notifications
export const notifications = [
  { id: "notif_1", type: "update", title: "CodeSphere Copilot Updated", message: "Version 2.4.1 is now available with 2x faster autocomplete speed and multi-file context support.", date: "2026-06-13", read: false },
  { id: "notif_2", type: "alert", title: "Suspicious Login", message: "A new login was detected from Windows device in Seattle, USA.", date: "2026-06-12", read: false },
  { id: "notif_3", type: "promotion", title: "Editor's Choice Deals", message: "Save up to 50% on premium creativity apps this weekend only.", date: "2026-06-11", read: true },
  { id: "notif_4", type: "review", title: "New Review Received", message: "User Sarah Jenkins left a 5-star review on your app ChatPDF Professional.", date: "2026-06-10", read: true },
  { id: "notif_5", type: "update", title: "System Update Complete", message: "AppVerse AI has been upgraded to React 19. Enjoy smoother glassmorphic animations.", date: "2026-06-09", read: true }
];

// Generate Enterprise Analytics & Revenue Data
export const storeAnalytics = {
  kpis: {
    totalDownloads: "18.4M",
    activeUsers: "4.2M",
    premiumSubscriptions: "320.5K",
    totalRevenue: "$1.24M",
    downloadGrowth: "+14.2%",
    revenueGrowth: "+18.9%",
    activeUserGrowth: "+8.4%",
    subscriptionGrowth: "+22.1%"
  },
  downloadsHistory: [
    { month: "Jan", downloads: 1200000, revenue: 85000, active: 3100000 },
    { month: "Feb", downloads: 1350000, revenue: 92000, active: 3200000 },
    { month: "Mar", downloads: 1500000, revenue: 105000, active: 3400000 },
    { month: "Apr", downloads: 1400000, revenue: 98000, active: 3500000 },
    { month: "May", downloads: 1650000, revenue: 115000, active: 3800000 },
    { month: "Jun", downloads: 1850000, revenue: 130000, active: 4200000 }
  ],
  categoryDistribution: [
    { name: "AI Tools", value: 35 },
    { name: "Games", value: 20 },
    { name: "Productivity", value: 15 },
    { name: "Creative", value: 10 },
    { name: "Finance", value: 10 },
    { name: "Others", value: 10 }
  ],
  ratingDistribution: [
    { star: "5 Star", count: 480 },
    { star: "4 Star", count: 320 },
    { star: "3 Star", count: 110 },
    { star: "2 Star", count: 40 },
    { star: "1 Star", count: 20 }
  ],
  userActivity: [
    { day: "Mon", sessions: 450000, downloads: 38000 },
    { day: "Tue", sessions: 480000, downloads: 41000 },
    { day: "Wed", sessions: 520000, downloads: 46000 },
    { day: "Thu", sessions: 490000, downloads: 42000 },
    { day: "Fri", sessions: 550000, downloads: 51000 },
    { day: "Sat", sessions: 620000, downloads: 65000 },
    { day: "Sun", sessions: 590000, downloads: 58000 }
  ]
};

export const developerRevenue = {
  summary: {
    monthlyEarnings: "$14,820",
    totalSalesCount: "8,450",
    activeSubscribers: "1,240",
    growthPercent: "+12.4%",
    unpaidEarnings: "$3,410"
  },
  revenueHistory: [
    { date: "June 08", earnings: 450 },
    { date: "June 09", earnings: 520 },
    { date: "June 10", earnings: 480 },
    { date: "June 11", earnings: 610 },
    { date: "June 12", earnings: 700 },
    { date: "June 13", earnings: 820 }
  ],
  transactions: [
    { id: "tx_1001", app: "CodeSphere Copilot", customer: "Liam Chen", type: "Subscription Renewal", amount: "$19.99", status: "Success", date: "2026-06-13 18:45" },
    { id: "tx_1002", app: "ChatPDF Professional", customer: "Sarah Jenkins", type: "One-time Purchase", amount: "$9.99", status: "Success", date: "2026-06-13 17:20" },
    { id: "tx_1003", app: "Synthesia Video Studio", customer: "Marcus Patel", type: "License Activation", amount: "$49.99", status: "Success", date: "2026-06-13 15:10" },
    { id: "tx_1004", app: "MindMap AI", customer: "Chloe Anderson", type: "Subscription Sign-up", amount: "$14.99", status: "Success", date: "2026-06-13 11:05" },
    { id: "tx_1005", app: "CodeSphere Copilot", customer: "Aria Kim", type: "Subscription Renewal", amount: "$19.99", status: "Pending", date: "2026-06-13 09:30" }
  ]
};
