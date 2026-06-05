import { useState } from 'react';
import { ChildProfile } from '../types';
import { Sparkles, Check, X, ShieldCheck, Heart, Trash2, ArrowLeftRight } from 'lucide-react';

interface ProfileSettingsProps {
  profile: ChildProfile;
  onProfileUpdate: (p: ChildProfile) => void;
  onReset: () => void;
  language: 'en' | 'ms';
  onLanguageChange: (lang: 'en' | 'ms') => void;
}

export default function ProfileSettings({ profile, onProfileUpdate, onReset, language, onLanguageChange }: ProfileSettingsProps) {
  const [checkoutModal, setCheckoutModal] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Translation mapper
  const t = {
    en: {
      elevateTitle: "Elevate Baby's Growth",
      elevateDesc: "Personalized nutrition and smart tracking tailored for your little one's journey.",
      theEssentials: "The Essentials",
      basicPlan: "Basic Plan",
      free: "Free",
      dailyMealRecipes: "Daily Meal Recipes",
      basicNutritionTips: "Basic Nutrition Tips",
      currentPlan: "Current Plan",
      mostPopular: "Most Popular",
      childBowlPlus: "ChildBowl Plus",
      premiumGrowth: "Premium Growth",
      priceAndFreq: "RM3.99/month",
      smartGrowthMonitor: "Smart Growth Monitor",
      realtimeTracker: "Real-time height & weight tracking",
      bmiTracker: "BMI Tracker",
      pedaligned: "Pediatrician-aligned benchmarks",
      advancedReports: "Advanced Reports",
      monthlyDigest: "Monthly health digest PDFs",
      halalChat: "Halal-Certified Experts Chat",
      startTrial: "Start 7-Day Free Trial",
      securedPayments: "Secured Local Payment Methods",
      cancelAnytime: "Cancel anytime from your Account Settings. Prices include SST where applicable. Securely processed by local Malaysian gateways.",
      whyUpgrade: "Why Upgrade?",
      personalizedMenus: "Personalized Menus",
      personalizedMenusDesc: "Adapts to your child's age and allergies.",
      weightTrends: "Weight Trends",
      weightTrendsDesc: "See the progress over months.",
      docReady: "Doc-Ready",
      docReadyDesc: "Export data for clinic visits.",
      languageTitle: "Language Selector / Pilihan Bahasa",
      english: "English",
      malay: "Bahasa Melayu",
      dangerTitle: "Danger Zone / Padam Profil",
      dangerDesc: "This will hard reset the local storage and start the onboarding questionnaire again.",
      resetBtn: "Reset Onboarding Profile",
      checkoutTitle: "Secure Local Checkout Gateway 🇲🇾",
      billingSummary: "Secure subscription with Malaysian local gateways",
      selectPaymentMethod: "Select Payment Provider:",
      simPay: "Complete Secure Payment (RM3.99)",
      paymentDone: "Payment Successful! Premium features unlocked.",
      close: "Close"
    },
    ms: {
      elevateTitle: "Tingkatkan Pertumbuhan Si Manja",
      elevateDesc: "Nutrisi diperibadikan dan pemantauan pintar yang dirumus khas untuk perjalanan tumbesaran anak anda.",
      theEssentials: "Keperluan Asas",
      basicPlan: "Pelan Asas",
      free: "Percuma",
      dailyMealRecipes: "Resipi Makanan Harian",
      basicNutritionTips: "Tip Nutrisi Asas",
      currentPlan: "Pelan Aktif",
      mostPopular: "Paling Popular",
      childBowlPlus: "ChildBowl Plus",
      premiumGrowth: "Pertumbuhan Premium",
      priceAndFreq: "RM3.99/bulan",
      smartGrowthMonitor: "Pemantau Tumbesaran Pintar",
      realtimeTracker: "Pemantauan tinggi & berat masa nyata",
      bmiTracker: "Pengesan BMI",
      pedaligned: "Penanda aras sejajar pakar pediatrik",
      advancedReports: "Laporan Terperinci",
      monthlyDigest: "PDF ringkasan kesihatan bulanan",
      halalChat: "Sembang Pakar Disahkan Halal",
      startTrial: "Mula Percubaan Percuma 7 Hari",
      securedPayments: "Kaedah Pembayaran Tempatan Selamat",
      cancelAnytime: "Batal bila-bila masa dari tetapan akaun anda. Harga termasuk SST jika berkenaan. Diproses dengan selamat melalui gerbang pembayaran Malaysia.",
      whyUpgrade: "Mengapa Perlu Naik Taraf?",
      personalizedMenus: "Menu Diperibadikan",
      personalizedMenusDesc: "Menyesuaikan dengan umur dan alahan anak anda.",
      weightTrends: "Aliran Berat Badan",
      weightTrendsDesc: "Lihat kemajuan tumbesaran dari bulan ke bulan.",
      docReady: "Sedia Dokumen",
      docReadyDesc: "Eksport data untuk lawatan klinik.",
      languageTitle: "Language Selector / Pilihan Bahasa",
      english: "English",
      malay: "Bahasa Melayu",
      dangerTitle: "Zon Bahaya / Danger Zone",
      dangerDesc: "Tindakan ini akan mengosongkan storan tempatan dan memulakan semula set soalan profil anak anda.",
      resetBtn: "Padam & Tetap Semula Profil",
      checkoutTitle: "Gerbang Pembayaran Selamat Malaysia 🇲🇾",
      billingSummary: "Langganan selamat melalui gerbang tempatan",
      selectPaymentMethod: "Pilih Pembekal Kaedah Bayaran:",
      simPay: "Lengkapkan Bayaran Selamat (RM3.99)",
      paymentDone: "Pembayaran Berjaya! Ciri premium dibuka.",
      close: "Tutup"
    }
  }[language];

  const handleOpenCheckout = (method: string) => {
    if (profile.premiumUnlocked) return;
    setCheckoutModal(method);
    setPaymentSuccess(false);
  };

  const executePay = () => {
    onProfileUpdate({
      ...profile,
      premiumUnlocked: true
    });
    setPaymentSuccess(true);
    setTimeout(() => {
      setCheckoutModal(null);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-4 pb-20 space-y-6">
      {/* Title Section matching Screen 4 layout */}
      <section className="text-center space-y-1">
        <h2 className="text-2xl font-black font-display text-gray-800 tracking-tight leading-tight">
          {t.elevateTitle}
        </h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto font-medium leading-relaxed">
          {t.elevateDesc}
        </p>
      </section>

      {/* Subscription Plans Grid */}
      <div className="space-y-4">
        {/* Basic free tier */}
        <article className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm meal-card-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
                {t.theEssentials}
              </span>
              <h3 className="font-display font-black text-lg text-gray-800">
                {t.basicPlan}
              </h3>
            </div>
            <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold text-xs">
              {t.free}
            </div>
          </div>

          <ul className="space-y-2 mb-5">
            <li className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
              <span className="material-symbols-outlined text-emerald-700 text-lg">check_circle</span>
              <span>{t.dailyMealRecipes}</span>
            </li>
            <li className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
              <span className="material-symbols-outlined text-emerald-700 text-lg">check_circle</span>
              <span>{t.basicNutritionTips}</span>
            </li>
            <li className="flex items-center gap-2.5 text-xs text-gray-400 font-medium opacity-60">
              <span className="material-symbols-outlined text-gray-400 text-lg">cancel</span>
              <span className="line-through">Smart Growth Monitoring</span>
            </li>
          </ul>

          <button className="w-full py-3 rounded-full border-2 border-emerald-700 text-emerald-800 font-bold text-xs bg-emerald-50/20 active-press cursor-default">
            {t.currentPlan}
          </button>
        </article>

        {/* Premium Upgrade Plan showing RM3.99/mo */}
        <article className={`bg-white border-2 rounded-3xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between transition-all ${
          profile.premiumUnlocked ? 'border-amber-400 bg-amber-50/5' : 'border-emerald-700'
        }`}>
          {/* Most popular badge */}
          <div className="absolute top-0 right-0 bg-emerald-700 text-white px-4 py-1 rounded-bl-2xl font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            {t.mostPopular}
          </div>

          <div className="mb-3">
            <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest leading-none">
              {t.childBowlPlus}
            </span>
            <h3 className="font-display font-black text-lg text-gray-800">
              {t.premiumGrowth}
            </h3>
          </div>

          <div className="mb-4 flex items-baseline gap-1">
            <span className="text-3xl font-black font-display text-gray-800">RM3.99</span>
            <span className="text-xs text-gray-500 font-bold">/ month</span>
          </div>

          <ul className="space-y-3.5 mb-6">
            <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
              <span className="material-symbols-outlined text-emerald-700 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="font-bold text-gray-850 leading-none mb-0.5">{t.smartGrowthMonitor}</p>
                <p className="text-[10px] text-gray-400 leading-snug">{t.realtimeTracker}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
              <span className="material-symbols-outlined text-emerald-700 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="font-bold text-gray-850 leading-none mb-0.5">{t.bmiTracker}</p>
                <p className="text-[10px] text-gray-400 leading-snug">{t.pedaligned}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
              <span className="material-symbols-outlined text-emerald-700 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="font-bold text-gray-850 leading-none mb-0.5">{t.advancedReports}</p>
                <p className="text-[10px] text-gray-400 leading-snug">{t.monthlyDigest}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
              <span className="material-symbols-outlined text-emerald-700 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="font-bold text-gray-850 leading-none">{t.halalChat}</p>
              </div>
            </li>
          </ul>

          <button 
            type="button"
            onClick={() => handleOpenCheckout('Direct')}
            className={`w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider shadow active-press ${
              profile.premiumUnlocked
                ? 'bg-amber-500 text-white cursor-default'
                : 'bg-emerald-700 text-white hover:bg-emerald-800'
            }`}
          >
            {profile.premiumUnlocked 
              ? (language === 'en' ? 'Unlocked & Active' : 'Aktif & Pro')
              : t.startTrial}
          </button>
        </article>
      </div>

      {/* Local Payment badging of Screen 4 */}
      <section className="bg-gray-100 rounded-3xl p-5 text-center">
        <h4 className="font-bold font-display text-xs text-gray-500 tracking-wider uppercase mb-4">
          {t.securedPayments}
        </h4>
        <div className="flex justify-center items-center gap-4.5 select-none opacity-90">
          {/* GrabPay */}
          <div 
            onClick={() => handleOpenCheckout('GrabPay')}
            className="flex flex-col items-center gap-1 cursor-pointer group active-press"
          >
            <div className="w-12 h-8 bg-[#00B14F] hover:brightness-105 rounded-lg flex items-center justify-center font-black text-white text-[10px] shadow-xs">
              Grab
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-emerald-700">GrabPay</span>
          </div>

          {/* Touch n Go */}
          <div 
            onClick={() => handleOpenCheckout('Touch \'n Go')}
            className="flex flex-col items-center gap-1 cursor-pointer group active-press"
          >
            <div className="w-12 h-8 bg-[#005BAA] hover:brightness-105 rounded-lg flex items-center justify-center font-black text-white text-[10px] shadow-xs">
              TnG
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-blue-700">eWallet</span>
          </div>

          {/* FPX Gateway */}
          <div 
            onClick={() => handleOpenCheckout('FPX Online Banking')}
            className="flex flex-col items-center gap-1 cursor-pointer group active-press"
          >
            <div className="w-12 h-8 bg-white border border-gray-200 hover:border-blue-400 rounded-lg flex items-center justify-center font-black text-blue-900 italic text-xs shadow-xs">
              FPX
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-blue-900">FPX</span>
          </div>

          {/* Credit Card circles */}
          <div 
            onClick={() => handleOpenCheckout('Credit Card')}
            className="flex flex-col items-center gap-1 cursor-pointer group active-press"
          >
            <div className="w-12 h-8 bg-white border border-gray-200 hover:border-amber-400 rounded-lg flex items-center justify-center gap-0.5 shadow-xs">
              <div className="w-4 h-4 rounded-full bg-red-500 -mr-1.5" />
              <div className="w-4 h-4 rounded-full bg-amber-500 opacity-80" />
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-amber-600">Card</span>
          </div>
        </div>
        <p className="mt-5 text-[10px] text-gray-400 leading-relaxed font-semibold">
          {t.cancelAnytime}
        </p>
      </section>

      {/* Why Upgrade Bento Grid detailing Screen 4 */}
      <section className="space-y-3">
        <h4 className="font-bold font-display text-gray-800 text-sm leading-tight uppercase tracking-wider">
          {t.whyUpgrade}
        </h4>
        <div className="grid grid-cols-2 gap-35">
          <div className="col-span-2 bg-amber-50 rounded-2xl p-4 flex items-center gap-4.5 border border-amber-100">
            <img 
              className="w-14 h-14 rounded-xl object-cover shadow-xs border border-amber-200" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzu2u8WzlmWHQuc5Zun52d2zdr_T_dquWEBVcaA7TfFLGXZVaKrrfZGS7lfYI3mYA7jYNqRCfdZwvdTN8chv-U0Fq0U1pAVJiiKa8ZYmIDYHTisjOxphFYrDhd8XrX1v_U2AXdRayd2KKdMxIHuDsfCoE1WeFBN9Fluw8GR1vhUUYjXW0hugENemFcFb6UYvVxYiFldrRIlet63ojgq_0mgYBKg2XKUAqwkf_qMGjg6XngW7jC8iQV8SP3JTaVwMpSB0E9U4CBdvNK"
              alt="Baby eating"
              referrerPolicy="no-referrer"
            />
            <div>
              <h5 className="font-bold text-amber-900 text-xs font-display">{t.personalizedMenus}</h5>
              <p className="text-[10px] text-amber-800 font-medium leading-relaxed mt-0.5">{t.personalizedMenusDesc}</p>
            </div>
          </div>

          <div className="bg-gray-100/70 p-4 rounded-2xl flex flex-col gap-1.5">
            <span className="material-symbols-outlined text-emerald-700 font-light select-none text-xl">query_stats</span>
            <h5 className="font-bold text-gray-800 text-xs font-display">{t.weightTrends}</h5>
            <p className="text-[10px] text-gray-400 font-medium leading-snug">{t.weightTrendsDesc}</p>
          </div>

          <div className="bg-gray-100/70 p-4 rounded-2xl flex flex-col gap-1.5">
            <span className="material-symbols-outlined text-amber-700 font-light select-none text-xl">medical_services</span>
            <h5 className="font-bold text-gray-800 text-xs font-display">{t.docReady}</h5>
            <p className="text-[10px] text-gray-400 font-medium leading-snug">{t.docReadyDesc}</p>
          </div>
        </div>
      </section>

      {/* Bilingual language toggle section */}
      <section className="bg-white p-4 rounded-3xl border border-gray-100 space-y-3 meal-card-shadow">
        <h4 className="font-semibold text-gray-700 text-xs font-display flex items-center gap-1">
          <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-700" />
          {t.languageTitle}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onLanguageChange('en')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all active-press ${
              language === 'en' 
                ? 'bg-emerald-700 text-white shadow-sm' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t.english}
          </button>
          
          <button
            onClick={() => onLanguageChange('ms')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all active-press ${
              language === 'ms' 
                ? 'bg-emerald-700 text-white shadow-sm' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t.malay}
          </button>
        </div>
      </section>

      {/* Danger Zone: reset local profile questionnaire */}
      <section className="bg-red-50 border border-red-100 p-4 rounded-3xl space-y-2">
        <h4 className="font-bold text-red-900 text-xs font-display flex items-center gap-1.5 uppercase tracking-wide">
          <Trash2 className="w-3.5 h-3.5" />
          {t.dangerTitle}
        </h4>
        <p className="text-[10px] text-red-800 font-medium leading-relaxed">
          {t.dangerDesc}
        </p>
        <button
          onClick={onReset}
          className="w-full py-2.5 bg-red-650 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-colors active-press shadow-sm"
        >
          {t.resetBtn}
        </button>
      </section>

      {/* Checkout simulated Modal form overlay */}
      {checkoutModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-gray-100 shadow-2xl text-center space-y-4">
            <h3 className="font-bold text-gray-800 text-base font-display">
              {t.checkoutTitle}
            </h3>
            
            <p className="text-xs text-gray-600 leading-relaxed bg-amber-50 rounded-2xl p-3 border border-amber-100">
              {t.billingSummary}
            </p>

            <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Provider:</span>
              <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">{checkoutModal}</span>
            </div>

            <div className="text-left font-bold text-xs space-y-1 py-1 text-gray-600">
              <div className="flex justify-between">
                <span>Monthly Premium:</span>
                <span className="text-gray-800">RM3.99</span>
              </div>
              <div className="flex justify-between">
                <span>Inclusive SST (8%):</span>
                <span className="text-gray-800">RM0.32</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-1 text-emerald-800 font-black">
                <span>Total Charge:</span>
                <span>RM4.31</span>
              </div>
            </div>

            {!paymentSuccess ? (
              <button
                onClick={executePay}
                className="w-full py-3 bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-full shadow hover:bg-emerald-800 active-press transition-all"
              >
                {t.simPay}
              </button>
            ) : (
              <div className="p-2 bg-teal-50 text-teal-700 text-xs font-bold rounded-xl animate-bounce">
                ✔️ {t.paymentDone}
              </div>
            )}

            <button
              onClick={() => setCheckoutModal(null)}
              className="w-full py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-full transition-colors active-press"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
