import { useState } from 'react';
import { ChildProfile, AgeRange } from '../types';
import { TASTE_PREFERENCES, ALLERGIES_LIST } from '../data';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: ChildProfile) => void;
  language: 'en' | 'ms';
}

export default function Onboarding({ onComplete, language }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState<AgeRange>('2-3');
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState('');
  const [isDone, setIsDone] = useState(false);

  // Translations
  const t = {
    en: {
      saveExit: "Save & Exit",
      stepOf: (curr: number) => `Step ${curr} of 3`,
      basics: "Basics",
      tastes: "Tastes",
      safety: "Safety",
      heroTitle: "Let's start with your little hero.",
      heroDesc: "What should we call your child?",
      nameLabel: "Child's Name",
      namePlaceholder: "e.g. Adam or Siti",
      ageLabel: "Age",
      years: "Years",
      heroBanner: "Personalized meals for every stage.",
      next: "Next",
      back: "Back",
      favTitle: "Malaysian Favorites!",
      favDesc: "What kind of tastes does your little one enjoy?",
      halalNote: "We prioritize Halal-certified recipes and nutrient-dense local ingredients like sweet potatoes and spinach.",
      safetyTitle: "Safety First.",
      safetyDesc: "Does your child have any food allergies or specific dietary needs?",
      otherLabel: "Other (Please specify)",
      otherPlaceholder: "e.g. Gluten, Soy...",
      completeBtn: "Complete Profile",
      readyTitle: "Ready to Bowl!",
      readyDesc: "We're preparing the perfect Malaysian meal plan for your little one.",
      goDashboard: "Go to Dashboard",
      validationAlert: "Please enter your child's name to proceed!"
    },
    ms: {
      saveExit: "Simpan & Keluar",
      stepOf: (curr: number) => `Langkah ${curr} daripada 3`,
      basics: "Asas",
      tastes: "Selera",
      safety: "Keselamatan",
      heroTitle: "Mari mulakan dengan wira kecil anda.",
      heroDesc: "Siapakah nama anak anda?",
      nameLabel: "Nama Anak",
      namePlaceholder: "cth. Adam atau Siti",
      ageLabel: "Umur",
      years: "Tahun",
      heroBanner: "Sajian peribadi bagi setiap peringkat pertumbuhan.",
      next: "Seterusnya",
      back: "Kembali",
      favTitle: "Kegemaran Malaysia!",
      favDesc: "Apakah jenis rasa/makanan yang disukai oleh anak manja anda?",
      halalNote: "Kami mengutamakan resipi disahkan Halal dan bahan tempatan padat nutrisi seperti keledek dan bayam.",
      safetyTitle: "Keselamatan Diutamakan.",
      safetyDesc: "Adakah anak anda mempunyai sebarang alahan makanan atau keperluan diet tertentu?",
      otherLabel: "Lain-lain (Sila nyatakan)",
      otherPlaceholder: "cth. Gluten, Soya...",
      completeBtn: "Lengkapkan Profil",
      readyTitle: "Sedia untuk Dihidang!",
      readyDesc: "Kami sedang menyediakan pelan pemakanan Malaysia terbaik untuk si manja anda.",
      goDashboard: "Pergi ke Papan Pemuka",
      validationAlert: "Sila masukkan nama anak anda untuk meneruskan!"
    }
  }[language];

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      alert(t.validationAlert);
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    onComplete({
      name: name || "Harith",
      age,
      tastes: selectedTastes,
      allergies: customAllergy.trim() ? [...selectedAllergies, customAllergy.trim()] : selectedAllergies,
      completedOnboarding: true,
      premiumUnlocked: false,
      language
    });
  };

  const toggleTaste = (tasteId: string) => {
    setSelectedTastes(prev =>
      prev.includes(tasteId) ? prev.filter(id => id !== tasteId) : [...prev, tasteId]
    );
  };

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies(prev =>
      prev.includes(allergyId) ? prev.filter(id => id !== allergyId) : [...prev, allergyId]
    );
  };

  const stepTitles = [t.basics, t.tastes, t.safety];

  if (isDone) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[70vh] px-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-emerald-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold font-display text-emerald-800 mb-3">{t.readyTitle}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{t.readyDesc}</p>
          <div className="p-4 bg-emerald-50/50 rounded-2xl w-full text-left border border-emerald-100/50 mb-8">
            <div className="text-xs text-emerald-800 font-semibold uppercase tracking-wider mb-2">
              {language === 'en' ? 'Child Profile Card' : 'Kad Profil Anak'}
            </div>
            <div className="font-display font-bold text-gray-800 text-lg">
              {name} ({age} {t.years})
            </div>
            <div className="text-xs text-gray-500 mt-1 divide-y divide-gray-100">
              <p className="py-1">
                <strong>{language === 'en' ? 'Tastes: ' : 'Selera: '}</strong>
                {selectedTastes.length > 0 
                  ? selectedTastes.map(id => TASTE_PREFERENCES.find(x => x.id === id)?.[language === 'en' ? 'nameEn' : 'nameMs']).join(', ')
                  : (language === 'en' ? 'Nutrient Balance' : 'Seimbangan Nutrisi')}
              </p>
              <p className="py-1">
                <strong>{language === 'en' ? 'Allergies: ' : 'Alahan: '}</strong>
                {selectedAllergies.length > 0 || customAllergy 
                  ? [...selectedAllergies.map(id => ALLERGIES_LIST.find(x => x.id === id)?.[language === 'en' ? 'nameEn' : 'nameMs']), customAllergy].filter(Boolean).join(', ')
                  : (language === 'en' ? 'None declared' : 'Tiada diisytiharkan')}
              </p>
            </div>
          </div>
          <button
            onClick={handleFinish}
            className="w-full h-14 bg-emerald-700 text-white font-semibold rounded-full hover:bg-emerald-800 active-press shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            {t.goDashboard}
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col justify-between max-w-xl mx-auto w-full px-5 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between h-14 mb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700 text-3xl">child_care</span>
          <span className="font-display font-extrabold text-2xl text-emerald-800 tracking-tight">ChildBowl</span>
        </div>
        <button 
          onClick={handleFinish}
          className="text-xs text-gray-500 font-medium tracking-wide hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors active-press"
        >
          {t.saveExit}
        </button>
      </div>

      {/* Progress indicators matching Screen 3 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-bold text-emerald-700" id="step-count">
            {t.stepOf(step)}
          </span>
          <span className="text-sm font-semibold text-gray-500" id="step-title">
            {stepTitles[step - 1]}
          </span>
        </div>
        <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps Content Area */}
      <div className="flex-grow">
        {/* Step 1 Content */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-800 mb-1">{t.heroTitle}</h2>
              <p className="text-sm text-gray-500">{t.heroDesc}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">{t.nameLabel}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full h-14 px-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-600 focus:outline-none focus:ring-0 transition-all bg-white text-gray-800 text-lg shadow-sm"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">{t.ageLabel}</label>
              <div className="grid grid-cols-3 gap-3">
                {(['0-1', '2-3', '4-5'] as AgeRange[]).map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setAge(range)}
                    className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                      age === range 
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800 font-bold' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-200'
                    }`}
                  >
                    <span className="text-lg">{range}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{t.years}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom illustrated block from mockup */}
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-md group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUk6ykxAGPz5K9QBcvmcvokxLi-QL4hrWyScgRh6NH2bgXCbgp6QDGuIqU-76wbkhspmJMJcZ7SvV99J6Eqm7Losgy61U4jL7Ud349yvy9nv52UbDod3ha8XxX8sxLKgZ3tJB9roGc_Afzo7B1N7ApJGywVnTc67w-tJC3BdzQAuZbyN7naYkcT-IT0pLTczPTAgyK2Mt_3JAfpUKTmaSi_qDPw-K3fXp9NnRjfhdEovQARbWkFJ3yeDzfVajYUAuC49TZe9Hm1FKV" 
                alt="Cozy childhood space"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white font-bold text-sm tracking-wide">
                {t.heroBanner}
              </p>
            </div>
          </div>
        )}

        {/* Step 2 Content */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-800 mb-1">{t.favTitle}</h2>
              <p className="text-sm text-gray-500">{t.favDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {TASTE_PREFERENCES.map((pref) => {
                const isSelected = selectedTastes.includes(pref.id);
                const title = language === 'en' ? pref.nameEn : pref.nameMs;
                const desc = language === 'en' ? pref.descEn : pref.descMs;
                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => toggleTaste(pref.id)}
                    className={`flex flex-col p-4 rounded-2xl border-2 bg-white transition-all text-left group min-h-[140px] items-start ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/10' 
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <span className={`material-symbols-outlined mb-2 text-3xl font-light ${
                      isSelected ? 'text-amber-600' : 'text-gray-400'
                    }`} style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}>
                      {pref.icon}
                    </span>
                    <span className="font-bold text-sm text-gray-800 block mb-0.5">{title}</span>
                    <span className="text-[11px] text-gray-500 leading-snug">{desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Hint Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3 text-amber-900">
              <span className="material-symbols-outlined h-5 w-5 text-amber-700 font-light select-none">info</span>
              <p className="text-xs font-semibold leading-relaxed">
                {t.halalNote}
              </p>
            </div>
          </div>
        )}

        {/* Step 3 Content */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-800 mb-1">{t.safetyTitle}</h2>
              <p className="text-sm text-gray-500">{t.safetyDesc}</p>
            </div>

            <div className="space-y-2.5">
              {ALLERGIES_LIST.map((allergy) => {
                const isChecked = selectedAllergies.includes(allergy.id);
                const title = language === 'en' ? allergy.nameEn : allergy.nameMs;
                const desc = language === 'en' ? allergy.descEn : allergy.nameMs;
                return (
                  <label
                    key={allergy.id}
                    className={`flex items-center p-3.5 border-2 rounded-2xl cursor-pointer transition-all ${
                      isChecked 
                        ? 'border-emerald-600 bg-emerald-50/10' 
                        : 'border-gray-200 hover:bg-gray-50 bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAllergy(allergy.id)}
                      className="w-5 h-5 rounded text-emerald-700 focus:ring-emerald-600 border-gray-300 mr-4"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-800">{title}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{desc}</span>
                    </div>
                  </label>
                );
              })}

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-600 mb-1">{t.otherLabel}</label>
                <input
                  type="text"
                  value={customAllergy}
                  onChange={(e) => setCustomAllergy(e.target.value)}
                  placeholder={t.otherPlaceholder}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-emerald-600 focus:outline-none transition-all bg-white text-gray-800 text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Setup Footer Buttons */}
      <div className="pt-6 border-t border-gray-100 flex gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 h-14 rounded-full border-2 border-emerald-600 text-emerald-800 font-bold active-press flex items-center justify-center gap-1 bg-white hover:bg-emerald-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          className="flex-[2] h-14 rounded-full bg-emerald-700 text-white font-bold active-press flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/10 hover:bg-emerald-800 transition-all"
        >
          {step === 3 ? t.completeBtn : t.next}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
