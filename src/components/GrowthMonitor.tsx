import { useState, useEffect, FormEvent } from 'react';
import { ChildProfile, GrowthRecord, IntakeLogItem } from '../types';
import { INITIAL_GROWTH_RECORDS, INITIAL_INTAKE_LOG } from '../data';
import { TrendingUp, Lock, Plus, PlusCircle, MoreVertical, X, Calendar, Activity, Check } from 'lucide-react';

interface GrowthMonitorProps {
  profile: ChildProfile;
  onProfileUpdate: (p: ChildProfile) => void;
  language: 'en' | 'ms';
}

export default function GrowthMonitor({ profile, onProfileUpdate, language }: GrowthMonitorProps) {
  const [logs, setLogs] = useState<IntakeLogItem[]>(JSON.parse(localStorage.getItem('intake_logs') || 'null') || INITIAL_INTAKE_LOG);
  const [bmiInput, setBmiInput] = useState({
    weight: profile.age === '0-1' ? 7.8 : profile.age === '2-3' ? 12.5 : 16.2,
    height: profile.age === '0-1' ? 68.2 : profile.age === '2-3' ? 88.2 : 106.5
  });

  // Modal handles
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({ nameEn: '', tags: 'Protein High', time: '02:30 PM' });
  const [growthSuccess, setGrowthSuccess] = useState('');

  // Dual-lingual translations mapping
  const t = {
    en: {
      growthTitle: "Harith's Growth / Pertumbuhan Harith",
      lastUpdated: "Last updated / Terakhir dikemas kini: Today, 8:30 AM",
      normalRange: "Normal Range",
      bmiAge: "BMI for Age / BMI mengikut Umur",
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      weightLabel: "Weight / Berat",
      heightLabel: "Height / Tinggi",
      dailyLogTitle: "Daily Intake Log / Log Pengambilan Harian",
      dailyLogDesc: "Log meals to see nutritional correlations",
      logMealButton: "Log Meal",
      isGrowingTitle: "Is child growing correctly?",
      isGrowingDesc: "Our AI identifies growth plateaus before they become issues. Get monthly expert reports.",
      tryTrial: "Try 7 Days Free",
      unlockTitle: "Unlock Growth Analytics",
      unlockDesc: "Compare child's progress with WHO international standards and get pediatric insights.",
      upgradeButton: "Upgrade to ChildBowl+",
      addLogMeal: "Log Custom Intake",
      mealNamePlace: "e.g. Pureed Pumpkin or Mee Sup",
      mealTagsPlace: "Protein, Iron, Vitamins, Fiber",
      closeBtn: "Close",
      saveLog: "Save Intake",
      customWeightHeightTitle: "Update Growth Metrics",
      customWeightHeightDesc: "Recalculate BMI & save to child chart profile",
      saveMetrics: "Update Profile Base"
    },
    ms: {
      growthTitle: "Harith's Growth / Pertumbuhan Harith",
      lastUpdated: "Last updated / Terakhir dikemas kini: Hari ini, 8:30 AM",
      normalRange: "Julat Normal",
      bmiAge: "BMI untuk Umur / BMI mengikut Umur",
      underweight: "Kurang Berat",
      normal: "Normal",
      overweight: "Lebih Berat",
      weightLabel: "Weight / Berat",
      heightLabel: "Height / Tinggi",
      dailyLogTitle: "Daily Intake Log / Log Pengambilan Harian",
      dailyLogDesc: "Rekod hidangan makanan untuk melihat nutrisi pertumbuhan",
      logMealButton: "Log Makanan",
      isGrowingTitle: "Adakah anak membesar dengan betul?",
      isGrowingDesc: "AI kami mengenal pasti fasa mendatar sebelum menjadi masalah. Dapatkan laporan pakar bulanan.",
      tryTrial: "Cuba 7 Hari Percuma",
      unlockTitle: "Buka Analisis Pertumbuhan",
      unlockDesc: "Bandingkan perkembangan anak anda dengan standard antarabangsa WHO dan nasihat pediatrik.",
      upgradeButton: "Naik Taraf ke ChildBowl+",
      addLogMeal: "Catat Pengambilan Makanan",
      mealNamePlace: "cth. Puri Labu atau Mee Sup",
      mealTagsPlace: "Protein, Zat Besi, Vitamin, Serat",
      closeBtn: "Tutup",
      saveLog: "Simpan Rekod",
      customWeightHeightTitle: "Kemaskini Metrik Pertumbuhan",
      customWeightHeightDesc: "Kira semula BMI & simpan ke rekod profil anak",
      saveMetrics: "Simpan Metrik"
    }
  }[language];

  // Save logs to local storage when changed
  useEffect(() => {
    localStorage.setItem('intake_logs', JSON.stringify(logs));
  }, [logs]);

  // Handle adding custom logged intake
  const handleAddLog = (e: FormEvent) => {
    e.preventDefault();
    if (!newMeal.nameEn.trim()) return;

    const added: IntakeLogItem = {
      id: `intake_${Date.now()}`,
      nameEn: newMeal.nameEn,
      nameMs: newMeal.nameEn, // duplicate for bilingual fallback
      timeEn: newMeal.time,
      timeMs: newMeal.time,
      tagsEn: [newMeal.tags],
      tagsMs: [newMeal.tags],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzu2u8WzlmWHQuc5Zun52d2zdr_T_dquWEBVcaA7TfFLGXZVaKrrfZGS7lfYI3mYA7jYNqRCfdZwvdTN8chv-U0Fq0U1pAVJiiKa8ZYmIDYHTisjOxphFYrDhd8XrX1v_U2AXdRayd2KKdMxIHuDsfCoE1WeFBN9Fluw8GR1vhUUYjXW0hugENemFcFb6UYvVxYiFldrRIlet63ojgq_0mgYBKg2XKUAqwkf_qMGjg6XngW7jC8iQV8SP3JTaVwMpSB0E9U4CBdvNK'
    };

    setLogs([added, ...logs]);
    setNewMeal({ nameEn: '', tags: 'Protein High', time: '02:30 PM' });
    setIsLogModalOpen(false);
  };

  const handleUpdateMetrics = () => {
    setGrowthSuccess(language === 'en' ? 'Growth metrics saved to profile!' : 'Metrik pertumbuhan disimpan ke profil!');
    setTimeout(() => setGrowthSuccess(''), 3000);
  };

  const handleUnlockPremium = () => {
    onProfileUpdate({
      ...profile,
      premiumUnlocked: true
    });
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter(item => item.id !== id));
  };

  // Live calculated BMI: weight (kg) / heightSq (m)
  const heightInMeters = bmiInput.height / 100;
  const rawBmi = bmiInput.weight / (heightInMeters * heightInMeters);
  const calculatedBmi = isNaN(rawBmi) || !rawBmi ? 16.4 : parseFloat(rawBmi.toFixed(1));

  // BMI status logic
  const bmiStatusText = calculatedBmi < 14.5 
    ? t.underweight 
    : calculatedBmi > 18.5 
      ? t.overweight 
      : t.normal;

  const bmiPercent = Math.min(Math.max(((calculatedBmi - 10) / 15) * 100, 10), 95);

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-4 pb-20 space-y-6">
      {/* Welcome Title Banner */}
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-black font-display text-gray-800 tracking-tight leading-tight">
          {language === 'en' 
            ? `${profile.name}'s Growth` 
            : `${profile.name}'s Growth / Pertumbuhan ${profile.name}`}
        </h2>
        <p className="text-xs text-gray-500 font-medium">
          {t.lastUpdated}
        </p>
      </section>

      {/* Interactive Growth Metric Editor */}
      <section className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-3xl">
        <div className="flex items-center gap-1 mb-3">
          <Activity className="w-4 h-4 text-emerald-700" />
          <h4 className="font-bold text-xs text-emerald-950 font-display uppercase tracking-wide">
            {t.customWeightHeightTitle}
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
              {language === 'en' ? 'Toddler Weight (kg)' : 'Berat Balita (kg)'}
            </label>
            <input 
              type="number"
              step="0.1"
              value={bmiInput.weight}
              onChange={(e) => setBmiInput({ ...bmiInput, weight: parseFloat(e.target.value) || 0 })}
              className="w-full text-sm font-bold text-gray-800 bg-white border border-gray-250 p-2.5 rounded-xl focus:border-emerald-700/80 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
              {language === 'en' ? 'Toddler Height (cm)' : 'Tinggi Balita (cm)'}
            </label>
            <input 
              type="number"
              step="0.1"
              value={bmiInput.height}
              onChange={(e) => setBmiInput({ ...bmiInput, height: parseFloat(e.target.value) || 0 })}
              className="w-full text-sm font-bold text-gray-800 bg-white border border-gray-250 p-2.5 rounded-xl focus:border-emerald-700/80 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-medium text-emerald-800">{t.customWeightHeightDesc}</p>
          <button 
            type="button" 
            onClick={handleUpdateMetrics}
            className="bg-emerald-700 text-white rounded-full text-[10px] font-extrabold px-3 py-1.5 hover:bg-emerald-800 active-press shadow-sm"
          >
            {t.saveMetrics}
          </button>
        </div>
        {growthSuccess && (
          <p className="text-xs text-teal-700 font-bold mt-2 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            {growthSuccess}
          </p>
        )}
      </section>

      {/* Bento Layout Grid matching Screen 2 & 6 */}
      <div className="grid grid-cols-2 gap-4">
        {/* BMI Card */}
        <div className="col-span-2 bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between meal-card-shadow">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-black rounded-full text-[10px] uppercase tracking-wide">
                {bmiStatusText}
              </span>
              <span className="material-symbols-outlined text-emerald-700 text-lg select-none">info</span>
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-3xl text-emerald-700">
                {calculatedBmi}
              </span>
              <span className="font-bold text-xs text-gray-500">kg/m²</span>
            </div>
            <p className="font-medium text-xs text-gray-500 mt-1">{t.bmiAge}</p>
          </div>

          <div className="mt-5">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-700" 
                style={{ width: `${bmiPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
              <span>{t.underweight}</span>
              <span>{t.normal}</span>
              <span>{t.overweight}</span>
            </div>
          </div>
        </div>

        {/* Weight Card */}
        <div className="bg-white rounded-3xl p-4.5 shadow-sm border border-gray-100 meal-card-shadow flex items-center gap-4.5">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 shrink-0 select-none">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">monitor_weight</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider leading-none mb-1">
              {language === 'en' ? 'Weight' : 'Berat'}
            </p>
            <p className="font-display font-black text-xl text-gray-800 truncate">
              {bmiInput.weight} <span className="text-xs font-bold text-gray-500">kg</span>
            </p>
          </div>
          <div className="flex items-center text-emerald-700 text-xs font-black shrink-0">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            <span>2%</span>
          </div>
        </div>

        {/* Height Card */}
        <div className="bg-white rounded-3xl p-4.5 shadow-sm border border-gray-100 meal-card-shadow flex items-center gap-4.5">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0 select-none">
            <span className="material-symbols-outlined text-emerald-700 text-[20px]">straighten</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[10px] text-gray-400 uppercase tracking-wider leading-none mb-1">
              {language === 'en' ? 'Height' : 'Tinggi'}
            </p>
            <p className="font-display font-black text-xl text-gray-800 truncate">
              {bmiInput.height} <span className="text-xs font-bold text-gray-500">cm</span>
            </p>
          </div>
          <div className="flex items-center text-emerald-700 text-xs font-black shrink-0">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            <span>0.5%</span>
          </div>
        </div>

        {/* Growth Curve Analytics Block with Lock capability */}
        <div className="col-span-2 relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-5 shadow-sm h-64 flex flex-col justify-between meal-card-shadow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-bold font-display text-gray-800 text-base leading-tight">
              {language === 'en' ? 'Long-Term Growth Curve' : 'Kemajuan Pertumbuhan'}
            </h3>
            <div className="flex gap-1">
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-[9px] font-extrabold text-gray-500 uppercase tracking-wide">6 Months</span>
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-[9px] font-extrabold text-gray-500 uppercase tracking-wide">1 Year</span>
            </div>
          </div>

          {/* Svg Line Charts representation */}
          <div className={`flex-1 relative w-full pt-4 ${!profile.premiumUnlocked ? 'blur-xs pointer-events-none' : ''}`}>
            <div className="w-full h-full flex flex-col justify-end">
              <div className="flex-1 relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                  {/* WHO Standard reference range */}
                  <path 
                    d="M0,120 Q100,100 200,80 T400,45" 
                    fill="none" 
                    stroke="#dbf1e2" 
                    strokeWidth="10" 
                    strokeLinecap="round"
                  />
                  {/* Growth weight line */}
                  <path 
                    d="M0,135 L50,130 L100,118 L150,112 L200,98 L250,92 L300,78 L350,72 L400,58" 
                    fill="none" 
                    stroke="#006e1c" 
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                  />
                  {/* Standard height curve reference */}
                  <path 
                    d="M0,115 L100,95 L200,75 L300,55 L400,35" 
                    fill="none" 
                    stroke="#ff9800" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Horizontal timelines */}
                <div className="absolute left-0 bottom-0 w-full flex justify-between text-[10px] text-gray-400 font-bold px-1 uppercase tracking-wider">
                  <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                </div>
              </div>

              {/* Legend labels */}
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-emerald-700 rounded"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Toddler Height / Tinggi' : 'Tinggi'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-amber-500 rounded"></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Weight / Berat' : 'Berat'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Locker Overlay */}
          {!profile.premiumUnlocked && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 transition-all duration-500">
              <div 
                onClick={handleUnlockPremium}
                className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-3 shadow hover:scale-105 active-press transition-transform cursor-pointer text-white"
              >
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm font-display mb-1">
                {t.unlockTitle}
              </h4>
              <p className="text-[11px] text-gray-500 max-w-xs mb-3 leading-relaxed">
                {t.unlockDesc}
              </p>
              <button 
                onClick={handleUnlockPremium}
                className="px-6 py-2 bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider rounded-full hover:bg-emerald-800 transition-colors shadowactive-press"
              >
                {t.upgradeButton}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Daily Intake Log Header & Add Logic */}
      <section className="space-y-3 pt-2">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-bold text-gray-850 text-base leading-tight font-display">
              {t.dailyLogTitle}
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              {t.dailyLogDesc}
            </p>
          </div>
          
          <button 
            onClick={() => setIsLogModalOpen(true)}
            className="px-4 py-2 border-2 border-amber-600 text-amber-800 hover:bg-amber-50 font-bold text-xs rounded-full active-press transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {t.logMealButton}
          </button>
        </div>

        {/* Log Entries Grid */}
        <div className="space-y-3">
          {logs.map((item) => {
            const title = language === 'en' ? item.nameEn : item.nameMs;
            const time = language === 'en' ? item.timeEn : item.timeMs;
            const tags = language === 'en' ? item.tagsEn : item.tagsMs;
            
            return (
              <div 
                key={item.id} 
                className="bg-white p-3.5 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all meal-card-shadow duration-300 relative group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                  <img 
                    src={item.image} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-800 text-sm font-display truncate pr-2">
                      {title}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 shrink-0">
                      {time}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full text-[9px] font-extrabold tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Delete intake logs */}
                <button 
                  onClick={() => deleteLog(item.id)}
                  title="Remove from intake feed"
                  className="text-gray-300 hover:text-red-500 p-1.5 rounded-full transition-colors active-press"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Upsell banner */}
      {!profile.premiumUnlocked && (
        <section className="bg-emerald-950 rounded-3xl p-5.5 text-emerald-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1.5">
            <h3 className="font-display font-black text-lg leading-tight tracking-tight text-white select-none">
              {t.isGrowingTitle}
            </h3>
            <p className="text-xs text-emerald-250 leading-relaxed max-w-sm">
              {t.isGrowingDesc}
            </p>
          </div>
          <button 
            onClick={handleUnlockPremium}
            className="whitespace-nowrap px-5 py-3 h-12 bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 active-press hover:bg-amber-600 transition-colors"
          >
            {t.tryTrial}
          </button>
        </section>
      )}

      {/* Log Intake Pop-Up Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg font-display">
                {t.addLogMeal}
              </h3>
              <button 
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 bg-gray-50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Intake Item Name</label>
                <input 
                  type="text"
                  required
                  placeholder={t.mealNamePlace}
                  value={newMeal.nameEn}
                  onChange={(e) => setNewMeal({ ...newMeal, nameEn: e.target.value })}
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Time</label>
                  <input 
                    type="text"
                    required
                    value={newMeal.time}
                    onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Nutrient Category</label>
                  <select 
                    value={newMeal.tags}
                    onChange={(e) => setNewMeal({ ...newMeal, tags: e.target.value })}
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl bg-white focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="Protein High">Protein High</option>
                    <option value="Vitamin C">Vitamin C</option>
                    <option value="Iron Source">Iron Source</option>
                    <option value="Calcium Rich">Calcium Rich</option>
                    <option value="Fibers Good">Fibers Good</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors active-press"
                >
                  {t.closeBtn}
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-full transition-colors active-press shadow-md shadow-emerald-700/10"
                >
                  {t.saveLog}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
