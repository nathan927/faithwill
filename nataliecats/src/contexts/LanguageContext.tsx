import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  // Navbar
  home: string;
  gallery: string;
  catCare: string;
  community: string;
  meowMode: string;
  siteName: string;
  siteNameHighlight: string;
  
  // Hero Section
  exploreWith: string;
  welcome: string;
  natalie: string;
  catParadise: string;
  heroDescription: string;
  matchingGame: string;
  catchGame: string;
  members: string;
  dailyShares: string;
  happinessIndex: string;
  
  // Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  galleryDescription: string;
  
  // Newsletter
  newsletterBadge: string;
  newsletterTitle: string;
  newsletterHighlight: string;
  newsletterDescription: string;
  emailPlaceholder: string;
  subscribe: string;
  privacyNote: string;
  subscribeSuccess: string;
  subscribeSuccessDesc: string;
  
  // Footer
  footerDescription: string;
  followUs: string;
  copyright: string;
  backToTop: string;
  
  // Matching Game
  matchingGameTitle: string;
  pairs8: string;
  pairs16: string;
  startGame: string;
  restartGame: string;
  backToMenu: string;
  congratulations: string;
  completedIn: string;
  moves: string;
  playAgain: string;
  
  // Catch Game
  catchGameTitle: string;
  catchGameDesc: string;
  gameTime: string;
  score: string;
  start: string;
  gameOver: string;
  finalScore: string;
  clickCatsToScore: string;
  seconds: string;
  
  // Cat Care
  catCareTitle: string;
  catCareSubtitle: string;
  
  // Community
  communityTitle: string;
  communitySubtitle: string;
}

const translations: Record<Language, Translations> = {
  zh: {
    // Navbar
    home: '主頁',
    gallery: '相片集',
    catCare: '貓咪護理',
    community: '社群',
    meowMode: '喵喵模式',
    siteName: 'Natalie',
    siteNameHighlight: '貓咪樂園',
    
    // Hero Section
    exploreWith: '與Natalie一起探索',
    welcome: '歡迎來到',
    natalie: 'Natalie',
    catParadise: '貓咪樂園',
    heroDescription: '加入我們的貓咪愛好者社群,分享可愛時刻,學習照顧秘訣,與志同道合的貓奴們一起歡樂!',
    matchingGame: '貓咪配對遊戲',
    catchGame: '抓貓咪遊戲',
    members: '貓奴成員',
    dailyShares: '每日分享',
    happinessIndex: '快樂指數',
    
    // Gallery
    galleryTitle: '可愛',
    gallerySubtitle: '貓咪相簿',
    galleryDescription: '欣賞我們社群中最可愛的貓咪照片,點擊愛心收藏你喜歡的!',
    
    // Newsletter
    newsletterBadge: '訂閱電子報',
    newsletterTitle: '加入我們的',
    newsletterHighlight: '貓咪家族',
    newsletterDescription: '訂閱我們的電子報,獲取最新的貓咪資訊、護理貼士和獨家優惠!',
    emailPlaceholder: '輸入你的電郵地址',
    subscribe: '訂閱',
    privacyNote: '我們尊重你的隱私,絕不會發送垃圾郵件 🐱',
    subscribeSuccess: '訂閱成功!',
    subscribeSuccessDesc: '感謝你加入我們的貓咪家族!',
    
    // Footer
    footerDescription: '一個專為貓咪愛好者打造的溫馨社群,分享快樂,傳遞愛心。',
    followUs: '追蹤我們',
    copyright: '© 2025 Natalie 貓咪樂園',
    backToTop: '返回頂部',
    
    // Matching Game
    matchingGameTitle: '貓咪配對遊戲',
    pairs8: '8對 (16張)',
    pairs16: '16對 (32張)',
    startGame: '開始遊戲',
    restartGame: '重新開始',
    backToMenu: '返回選單',
    congratulations: '恭喜你!',
    completedIn: '完成步數',
    moves: '步',
    playAgain: '再玩一次',
    
    // Catch Game
    catchGameTitle: '抓貓咪遊戲',
    catchGameDesc: '在時間內點擊盡量多的貓咪!',
    gameTime: '遊戲時間',
    score: '分數',
    start: '開始',
    gameOver: '遊戲結束!',
    finalScore: '最終分數',
    clickCatsToScore: '點擊貓咪得分!',
    seconds: '秒',
    
    // Cat Care
    catCareTitle: '貓咪護理指南',
    catCareSubtitle: '專業的貓咪照顧知識和貼士',
    
    // Community
    communityTitle: '貓咪社群',
    communitySubtitle: '與其他貓奴分享交流',
  },
  en: {
    // Navbar
    home: 'Home',
    gallery: 'Gallery',
    catCare: 'Cat Care',
    community: 'Community',
    meowMode: 'Meow Mode',
    siteName: 'Natalie',
    siteNameHighlight: 'Cat Paradise',
    
    // Hero Section
    exploreWith: 'Explore with Natalie',
    welcome: 'Welcome to',
    natalie: 'Natalie',
    catParadise: 'Cat Paradise',
    heroDescription: 'Join our cat lovers community, share cute moments, learn care tips, and have fun with fellow cat enthusiasts!',
    matchingGame: 'Cat Matching Game',
    catchGame: 'Catch the Cat',
    members: 'Members',
    dailyShares: 'Daily Shares',
    happinessIndex: 'Happiness',
    
    // Gallery
    galleryTitle: 'Adorable',
    gallerySubtitle: 'Cat Gallery',
    galleryDescription: 'Enjoy the cutest cat photos from our community. Click the heart to save your favorites!',
    
    // Newsletter
    newsletterBadge: 'Newsletter',
    newsletterTitle: 'Join Our',
    newsletterHighlight: 'Cat Family',
    newsletterDescription: 'Subscribe to our newsletter for the latest cat news, care tips and exclusive offers!',
    emailPlaceholder: 'Enter your email address',
    subscribe: 'Subscribe',
    privacyNote: 'We respect your privacy and never send spam 🐱',
    subscribeSuccess: 'Subscribed!',
    subscribeSuccessDesc: 'Thanks for joining our cat family!',
    
    // Footer
    footerDescription: 'A cozy community for cat lovers to share happiness and spread love.',
    followUs: 'Follow Us',
    copyright: '© 2025 Natalie Cat Paradise',
    backToTop: 'Back to Top',
    
    // Matching Game
    matchingGameTitle: 'Cat Matching Game',
    pairs8: '8 Pairs (16 Cards)',
    pairs16: '16 Pairs (32 Cards)',
    startGame: 'Start Game',
    restartGame: 'Restart',
    backToMenu: 'Back to Menu',
    congratulations: 'Congratulations!',
    completedIn: 'Completed in',
    moves: 'moves',
    playAgain: 'Play Again',
    
    // Catch Game
    catchGameTitle: 'Catch the Cat',
    catchGameDesc: 'Click as many cats as you can!',
    gameTime: 'Time',
    score: 'Score',
    start: 'Start',
    gameOver: 'Game Over!',
    finalScore: 'Final Score',
    clickCatsToScore: 'Click cats to score!',
    seconds: 'sec',
    
    // Cat Care
    catCareTitle: 'Cat Care Guide',
    catCareSubtitle: 'Professional cat care knowledge and tips',
    
    // Community
    communityTitle: 'Cat Community',
    communitySubtitle: 'Share and connect with other cat lovers',
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
