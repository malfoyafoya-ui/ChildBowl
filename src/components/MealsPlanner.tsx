import { useState, useEffect } from 'react';
import { ChildProfile, Meal } from '../types';
import { NUTRITION_TIPS, MEALS_BY_AGE } from '../data';
import { RotateCw, Calendar, RefreshCw, ShoppingBag } from 'lucide-react';

interface MealsPlannerProps {
  profile: ChildProfile;
  language: 'en' | 'ms';
}

export default function MealsPlanner({ profile, language }: MealsPlannerProps) {
  // Get default meals for the child's age group
  const defaultMeals = MEALS_BY_AGE[profile.age] || MEALS_BY_AGE['2-3'];
  
  // State for active meals (to allow swapping with alternatives)
  const [meals, setMeals] = useState<Meal[]>([]);
  // Store which meal card has its swap alternative expanded
  const [expandedSwap, setExpandedSwap] = useState<string | null>(null);
  // Store which meals have actually been swapped
  const [swappedMeals, setSwappedMeals] = useState<Record<string, boolean>>({});
  // Current tip of the day index
  const [tipIndex, setTipIndex] = useState(0);
  // Active filter chip states (for aesthetic and interactive filtering)
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    setMeals(defaultMeals);
  }, [profile.age, defaultMeals]);

  // Bilingual translation mapper
  const t = {
    en: {
      todaysPlan: "Today's Plan",
      ageLabel: "Age",
      title: "Balanced Growth",
      nutritionTip: "Nutrition Tip of the Day",
      swapText: "Swap",
      pickerAlternative: "Pickiest eater alternative:",
      useThis: "Use This",
      portionText: "Portion",
      nutrientTarget: "Nutrient Target",
      dailySummary: "Daily Summary / Ringkasan Harian",
      caloriesLabel: "Calories / Kalori",
      proteinLabel: "Protein / Protein",
      vitLabel: "Vitamins / Vitamin",
      carbsLabel: "Carbs / Karbohidrat",
      caloriesLimit: "950 / 1200 kcal",
      proteinLimit: "12g / 15g",
      vitLevel: "High",
      carbsLevel: "Normal",
      complete: "75% Complete",
      filtersLabel: "FILTERS / PENAPIS",
      filterAge: "Age / Umur",
      filterAllergy: "Allergies / Alahan",
      filterLocal: "Local / Tempatan"
    },
    ms: {
      todaysPlan: "Pelan Hari Ini",
      ageLabel: "Umur",
      title: "Pertumbuhan Seimbang",
      nutritionTip: "Tip Nutrisi Hari Ini",
      swapText: "Tukar",
      pickerAlternative: "Pilihan budak memilih makan:",
      useThis: "Guna Ini",
      portionText: "Porsi",
      nutrientTarget: "Ringkasan Harian",
      dailySummary: "Ringkasan Harian",
      caloriesLabel: "Kalori / Calories",
      proteinLabel: "Protein",
      vitLabel: "Vitamin",
      carbsLabel: "Karbohidrat",
      caloriesLimit: "950 / 1200 kcal",
      proteinLimit: "12g / 15g",
      vitLevel: "Tinggi",
      carbsLevel: "Normal",
      complete: "75% Selesai",
      filtersLabel: "PENAPIS / FILTERS",
      filterAge: "Umur / Age",
      filterAllergy: "Alahan / Allergies",
      filterLocal: "Tempatan / Local"
    }
  }[language];

  const toggleSwapPanel = (mealId: string) => {
    setExpandedSwap(prev => prev === mealId ? null : mealId);
  };

  const executeMealSwap = (mealId: string) => {
    setSwappedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
    setExpandedSwap(null);
  };

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId]
    );
  };

  // Move forward through tips of the day
  const nextTip = () => {
    setTipIndex(prev => (prev + 1) % NUTRITION_TIPS.length);
  };

  const activeTip = NUTRITION_TIPS[tipIndex];

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-4 pb-20">
      {/* Header section matching Screens 1 and 5 */}
      <section className="mb-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wide mb-1">
              {language === 'en' 
                ? `Today's Plan • Age ${profile.age}` 
                : `Pelan Hari Ini • Umur ${profile.age}`}
            </p>
            <h2 className="text-2xl font-black font-display text-gray-800 leading-tight">
              {language === 'en' 
                ? "Balanced Growth" 
                : "Balanced Growth / Pertumbuhan Seimbang"}
            </h2>
          </div>
          <div className="bg-amber-500 text-white px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 shadow-sm select-none shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span>Aug 24</span>
          </div>
        </div>
      </section>

      {/* Bilingual Filters Section (matches screen 5) */}
      <section className="mb-5">
        <p className="text-[10px] font-extrabold text-gray-500 tracking-wider uppercase mb-2">
          {t.filtersLabel}
        </p>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button 
            onClick={() => toggleFilter('age')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
              activeFilters.includes('age')
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] font-light">child_care</span>
            {t.filterAge}
          </button>
          
          <button 
            onClick={() => toggleFilter('allergy')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
              activeFilters.includes('allergy')
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] font-light">warning</span>
            {t.filterAllergy}
          </button>

          <button 
            onClick={() => toggleFilter('local')}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
              activeFilters.includes('local')
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] font-light font-bold">local_grocery_store</span>
            {t.filterLocal}
          </button>
        </div>
      </section>

      {/* Nutrition Tip Bento Banner matching Screens 1 & 5 */}
      <section className="mb-6">
        <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-3xl flex gap-4 items-start relative overflow-hidden shadow-sm">
          <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none text-emerald-600">
            <span className="material-symbols-outlined text-[80px]">lightbulb</span>
          </div>
          
          <button 
            onClick={nextTip}
            title="Next nutrition tip"
            className="bg-emerald-600 p-2 rounded-xl shrink-0 text-white hover:bg-emerald-700 active-press transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] block" style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_objects
            </span>
          </button>
          
          <div>
            <h3 className="font-bold font-display text-xs text-emerald-900 mb-1 flex items-center gap-1.5">
              {language === 'en' ? activeTip.titleEn : activeTip.titleMs}
              <span className="text-[10px] text-emerald-500 font-normal">Click bulb to swap</span>
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed font-medium">
              {language === 'en' ? activeTip.contentEn : activeTip.contentMs}
            </p>
          </div>
        </div>
      </section>

      {/* Meal Plan Stack Column */}
      <section className="space-y-4">
        {meals.map((meal) => {
          const isSwapped = swappedMeals[meal.id];
          const isExpanded = expandedSwap === meal.id;
          
          // Determine active layout texts based on language and swapped state
          const mealType = language === 'en' ? meal.typeEn : meal.typeMs;
          const portionText = language === 'en' ? meal.portionEn : meal.portionMs;
          
          const title = isSwapped 
            ? (language === 'en' ? meal.pickyAlternative.nameEn : meal.pickyAlternative.nameMs)
            : (language === 'en' ? meal.nameEn : meal.nameMs);

          const tags = isSwapped 
            ? (language === 'en' ? ['Kid Favorite', 'Picky Friendly'] : ['Kegemaran Anak', 'Mudah Suap'])
            : (language === 'en' ? meal.tagsEn : meal.tagsMs);

          return (
            <div 
              key={meal.id} 
              className="bg-white border border-gray-100 rounded-3xl p-4 meal-card-shadow hover:scale-[1.01] transition-transform duration-300 relative group"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                  <img 
                    src={meal.image} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {isSwapped && (
                    <div className="absolute inset-0 bg-emerald-900/10 flex items-center justify-center">
                      <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase scale-90">Swapped</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {mealType}
                    </span>
                    <span className="text-[11px] text-gray-500 font-bold bg-gray-50 px-2 py-0.5 rounded-full">
                      {meal.time}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 text-base leading-snug font-display mb-1.5 truncate">
                    {title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action divider matching child details */}
              <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <span className="material-symbols-outlined text-[18px]">restaurant</span>
                  <span className="text-xs font-semibold">{portionText}</span>
                </div>
                
                <button 
                  onClick={() => toggleSwapPanel(meal.id)}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all active-press ${
                    isSwapped
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100/50'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isExpanded ? 'rotate-180' : ''} transition-transform`} />
                  {isSwapped 
                    ? (language === 'en' ? 'Original' : 'Asal') 
                    : (language === 'en' ? 'Swap' : 'Tukar')}
                </button>
              </div>

              {/* Picky Eater Alternative Swap Panel */}
              {isExpanded && (
                <div className="mt-3.5 p-3.5 bg-gray-50/50 rounded-2xl border border-dashed border-gray-300 animate-fade-in">
                  <p className="text-[10px] font-extrabold text-gray-500 mb-2.5">
                    {t.pickerAlternative}
                  </p>
                  
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                        <span className="material-symbols-outlined text-amber-700 font-thin text-[20px]">
                          {meal.pickyAlternative.icon}
                        </span>
                      </div>
                      
                      <div className="text-xs">
                        <p className="font-bold text-gray-800">
                          {language === 'en' ? meal.pickyAlternative.nameEn : meal.pickyAlternative.nameMs}
                        </p>
                        <p className="text-[9px] text-gray-400 mt-0.5">Recommended Picky Eater Safe</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => executeMealSwap(meal.id)}
                      className="bg-emerald-700 text-white px-3.5 py-1.5 rounded-full text-[10px] font-extrabold hover:bg-emerald-800 transition-colors active-press shadow-sm"
                    >
                      {t.useThis}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Progress metrics widget matching Screens 1 and 5 */}
      <section className="mt-6 bg-white border border-gray-100 rounded-3xl p-5 meal-card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-display text-gray-800 text-base">
            {language === 'en' ? "Nutrient Target" : "Daily Summary / Ringkasan Harian"}
          </h3>
          <span className="text-emerald-700 font-extrabold text-sm font-display tracking-tight bg-emerald-50 px-2.5 py-1 rounded-full">
            {t.complete}
          </span>
        </div>

        <div className="space-y-4">
          {/* Calories (Screen 5 detail) */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 font-bold mb-1">
              <span>{t.caloriesLabel}</span>
              <span className="text-gray-800">{t.caloriesLimit}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-emerald-600 rounded-full transition-all duration-1000" style={{ width: '79%' }}></div>
            </div>
          </div>

          {/* Protein */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 font-bold mb-1">
              <span>{t.proteinLabel}</span>
              <span className="text-gray-800">{t.proteinLimit}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-emerald-600 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* Vitamins */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 font-bold mb-1">
              <span>{t.vitLabel}</span>
              <span className="text-amber-700">{t.vitLevel}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Carbs (Screen 5 detail) */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 font-bold mb-1">
              <span>{t.carbsLabel}</span>
              <span className="text-amber-700">{t.carbsLevel}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
