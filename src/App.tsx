import { useState, useEffect, FormEvent } from 'react';
import { ChildProfile } from './types';
import Onboarding from './components/Onboarding';
import MealsPlanner from './components/MealsPlanner';
import GrowthMonitor from './components/GrowthMonitor';
import ProfileSettings from './components/ProfileSettings';
import { Home, Utensils, TrendingUp, User, Bell, Menu, Sparkles, MessageCircle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  // Load child profile or fallback
  const [profile, setProfile] = useState<ChildProfile>(() => {
    const saved = localStorage.getItem('child_profile');
    if (saved) return JSON.parse(saved);
    return {
      name: 'Harith',
      age: '2-3',
      tastes: [],
      allergies: [],
      completedOnboarding: false, // forces onboarding on first open
      premiumUnlocked: false,
      language: 'en'
    };
  });

  const [activeTab, setActiveTab] = useState<'home' | 'meals' | 'growth' | 'profile'>('meals');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatConversation, setChatConversation] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: "Hi! I am Auntie Sarah, your Halal nutrition expert. Ask me anything about weaning or meal recipes!" }
  ]);

  // Synchronise profile to local storage when changed
  useEffect(() => {
    localStorage.setItem('child_profile', JSON.stringify(profile));
  }, [profile]);

  const handleProfileComplete = (newProfile: ChildProfile) => {
    setProfile(newProfile);
    setActiveTab('meals'); // redirect straight to meals plan screen upon onboarding complete!
  };

  const handleProfileUpdate = (updated: ChildProfile) => {
    setProfile(updated);
  };

  const handleResetProfile = () => {
    const defaultProfile: ChildProfile = {
      name: '',
      age: '2-3',
      tastes: [],
      allergies: [],
      completedOnboarding: false,
      premiumUnlocked: false,
      language: profile.language
    };
    setProfile(defaultProfile);
    setActiveTab('meals');
  };

  const handleLanguageChange = (lang: 'en' | 'ms') => {
    setProfile(prev => ({
      ...prev,
      language: lang
    }));
  };

  const speakToExpert = (e: FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatConversation(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatMessage('');

    // Answer logic based on toddler profile
    setTimeout(() => {
      let reply = "That's a great question! For a toddler their age, we recommend combining mashed proteins like chicken with mild dahl or soft papaya slices.";
      if (profile.language === 'ms') {
        reply = "Soalan yang amat baik! Untuk si manja seusia ini, kami menasihatkan gabungan protein hancur seperti isi ayam bersama dahl lembut dan hirisan betik manis.";
      }
      setChatConversation(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1200);
  };

  const language = profile.language;

  // Onboarding screen force
  if (!profile.completedOnboarding) {
    return (
      <div className="bg-[#fbf9f8] min-h-screen flex flex-col font-sans text-gray-800">
        <Onboarding onComplete={handleProfileComplete} language={language} />
      </div>
    );
  }

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col font-sans text-[#1b1c1c] overflow-x-hidden pb-12">
      
      {/* Top Application Header Bar matches screens beautifully */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fbf9f8] border-b border-gray-100 shadow-xs flex items-center justify-between px-5 h-16 max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Menu button triggers interactive help drawer */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active-press transition-colors select-none"
            title="Menu Sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-display font-black text-xl text-emerald-800 tracking-tight select-none">
            ChildBowl{activeTab !== 'meals' && (
              <span className="text-emerald-700/60 font-semibold font-sans text-sm ml-1">
                : {profile.name}
              </span>
            )}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Bell Notifications clickable */}
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-full hover:bg-gray-100 active-press transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>

            {/* Notifications Panel Box */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-2xl p-4 z-[90] space-y-3 font-medium animate-fade-in text-xs text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="font-bold text-gray-800">Alert Feed</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-black">Aug 24</span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                    <p><strong>Iron absorb milestone!</strong> Include tropical papaya slices in Harith's breakfast to boost absorption.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <p>Recommended <strong>Mini Nasi Lemak</strong> is ready for lunch.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Child profile picture badge circle */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white overflow-hidden shadow-sm hover:scale-105 active-press transition-transform cursor-pointer"
            title="Child Profile Settings"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZDFDfCuI1eKguuiad3g8Ncc_8mRAR4F_5B3oEwvmHLD-T7vDoe-9aNmKsI4-BrNMqsUqTeHYIucMDM2JG_7-ZL3WaWxmCWrmGLmJJXjMDiDXzfUQJiAJP0eQZ36tjw-MHLFHduGplG93gVDAIdkV2TcjUFLENZUfFCYCD4vSWWHnOvye6QseKopFV4dWedHvnTey9BmhcSt6RYsvh-ocEkKX6PXRBNCKn72IXH23TbBg3fz8NcDctX9A-mW1uv7u28XDqaN3uJdLK" 
              alt="Harith Profile Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main className="flex-grow pt-18 pb-20 w-full max-w-xl mx-auto">
        {/* Render Tab Contents */}
        {activeTab === 'home' && (
          <div className="px-4 py-4 space-y-6">
            {/* Friendly Greeting Card */}
            <section className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm meal-card-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="z-10">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Malaysia-First Nutrition</span>
                </div>
                <h2 className="text-2xl font-black font-display text-gray-800 leading-snug">
                  {language === 'en' 
                    ? `Safely nurturing ${profile.name} through every stage.` 
                    : `Menyokong tumbesaran ${profile.name} pada setiap peringkat.`}
                </h2>
                <p className="text-xs text-gray-500 font-medium leading-relaxed mt-2.5">
                  {language === 'en'
                    ? `Handcrafted recipes personalized for ${profile.age} years. Free from non-SST surprises.`
                    : `Resipi peribadi khas disahkan Halal bagi kanak-kanak seusia ${profile.age} tahun.`}
                </p>
              </div>

              {/* Stat Bento metrics quick summary */}
              <div className="grid grid-cols-2 gap-3 mt-6 border-t border-gray-100 pt-5">
                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-left cursor-pointer hover:bg-emerald-50" onClick={() => setActiveTab('meals')}>
                  <div className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wide">Today's Goal</div>
                  <div className="text-sm font-black font-display text-emerald-950 mt-1">75% Complete</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">3 balanced meals planned</div>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100/50 text-left cursor-pointer hover:bg-amber-50" onClick={() => setActiveTab('growth')}>
                  <div className="text-[10px] text-amber-800 font-extrabold uppercase tracking-wide">Metrics Checked</div>
                  <div className="text-sm font-black font-display text-amber-950 mt-1">BMI: 16.4</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">Growth within normal limits</div>
                </div>
              </div>
            </section>

            {/* Quick-select carousel list */}
            <section className="space-y-3">
              <h3 className="font-bold text-[#1b1c1c] text-sm uppercase tracking-wide">Nutrition Quick Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setActiveTab('meals')}
                  className="bg-white border border-gray-100 p-4 rounded-2xl meal-card-shadow cursor-pointer hover:scale-[1.01] transition-transform text-left group"
                >
                  <Utensils className="w-6 h-6 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-xs">Today's Meal Plans</h4>
                  <p className="text-[9px] text-gray-400 mt-1">View recipes & portion swaps</p>
                </div>

                <div 
                  onClick={() => setActiveTab('growth')}
                  className="bg-white border border-gray-100 p-4 rounded-2xl meal-card-shadow cursor-pointer hover:scale-[1.01] transition-transform text-left group"
                >
                  <TrendingUp className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-xs">Growth & Intake logs</h4>
                  <p className="text-[9px] text-gray-400 mt-1">Log weights, heights and food</p>
                </div>
              </div>
            </section>

            {/* Interactive chat panel consultation with dietitian */}
            <section className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm meal-card-shadow">
              <div className="flex items-center gap-2 mb-4.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Consult Halal Dietitian</h3>
                  <p className="text-[10px] text-gray-400">Simulated answers matching profile factors</p>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 h-48 overflow-y-auto bg-[#fbf9f8] p-3 rounded-2xl border border-gray-100">
                {chatConversation.map((chat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[85%] ${chat.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <span className="text-[9px] font-bold text-gray-400 mb-0.5">
                      {chat.sender === 'user' ? 'You' : 'Sarah, RD'}
                    </span>
                    <p className={`p-3 text-xs rounded-2xl ${
                      chat.sender === 'user' 
                        ? 'bg-emerald-700 text-white rounded-tr-none' 
                        : 'bg-white text-gray-700 rounded-tl-none border border-gray-200'
                    }`}>
                      {chat.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chat Message Box */}
              <form onSubmit={speakToExpert} className="flex gap-2 mt-3.5">
                <input 
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={language === 'en' ? "Ask Sarah (e.g. Can I feed peanuts?)..." : "Tanya Sarah..."}
                  className="flex-1 text-xs px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 rounded-xl active-press"
                >
                  Send
                </button>
              </form>
            </section>
          </div>
        )}

        {activeTab === 'meals' && (
          <MealsPlanner profile={profile} language={language} />
        )}

        {activeTab === 'growth' && (
          <GrowthMonitor 
            profile={profile} 
            onProfileUpdate={handleProfileUpdate}
            language={language}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSettings 
            profile={profile} 
            onProfileUpdate={handleProfileUpdate}
            onReset={handleResetProfile}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </main>

      {/* Persistent Bottom Tabbed Menu Bar matches Screens beautifully */}
      <nav className="fixed bottom-0 left-0 right-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-white border-t border-gray-100 z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.04)] max-w-xl mx-auto">
        {/* Home Tab item */}
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-2xl transition-all active-press ${
            activeTab === 'home' 
              ? 'bg-emerald-50 text-emerald-800 font-bold scale-102 font-display' 
              : 'text-gray-400 font-semibold'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-xs">{language === 'en' ? 'Home' : 'Utama'}</span>
        </button>

        {/* Meals Tab item */}
        <button 
          onClick={() => setActiveTab('meals')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-2xl transition-all active-press ${
            activeTab === 'meals' 
              ? 'bg-emerald-50 text-emerald-800 font-bold scale-102 font-display' 
              : 'text-gray-400 font-semibold'
          }`}
        >
          <Utensils className="w-5 h-5 mb-0.5" />
          <span className="text-xs">{language === 'en' ? 'Meals' : 'Hidangan'}</span>
        </button>

        {/* Growth Tab item */}
        <button 
          onClick={() => setActiveTab('growth')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-2xl transition-all active-press ${
            activeTab === 'growth' 
              ? 'bg-emerald-50 text-emerald-800 font-bold scale-102 font-display' 
              : 'text-gray-400 font-semibold'
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-0.5" />
          <span className="text-xs">{language === 'en' ? 'Growth' : 'Tumbesaran'}</span>
        </button>

        {/* Profile Settings Tab item */}
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-2xl transition-all active-press ${
            activeTab === 'profile' 
              ? 'bg-emerald-50 text-emerald-800 font-bold scale-102 font-display' 
              : 'text-gray-400 font-semibold'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-xs">{language === 'en' ? 'Profile' : 'Profil'}</span>
        </button>
      </nav>

      {/* Sidebar helper drawer with hamburger click */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[120] flex animate-fade-in">
          {/* Backdrop screen */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer sheet body */}
          <div className="relative w-72 max-w-[80vw] h-full bg-white border-r border-gray-100 shadow-2xl p-6 flex flex-col justify-between z-[130]">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <span className="material-symbols-outlined text-emerald-700 text-3xl">child_care</span>
                <span className="font-display font-extrabold text-2xl text-emerald-850">ChildBowl</span>
              </div>

              {/* Sidebar items options */}
              <div className="space-y-2 text-xs font-bold text-gray-600">
                <div 
                  onClick={() => { setActiveTab('home'); setSidebarOpen(false); }}
                  className="p-3 bg-gray-50 hover:bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Interactive Landing Dashboard</span>
                </div>
                <div 
                  onClick={() => { setActiveTab('meals'); setSidebarOpen(false); }}
                  className="p-3 bg-gray-50 hover:bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Weekly Meals & Swaps Catalog</span>
                </div>
                <div 
                  onClick={() => { setActiveTab('growth'); setSidebarOpen(false); }}
                  className="p-3 bg-gray-50 hover:bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Growth curves and Logs feed</span>
                </div>
                <div 
                  onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
                  className="p-3 bg-gray-50 hover:bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Upgrade to Premium ChildBowl Plus</span>
                </div>
              </div>
            </div>

            {/* Support stamp section */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-[10px] uppercase font-extrabold text-emerald-700 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Halal Weaning Guide</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                Nutrient-dense childhood formulas compliant with Malaysian dietary standards.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
