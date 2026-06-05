export type AgeRange = '0-1' | '2-3' | '4-5';

export interface ChildProfile {
  name: string;
  age: AgeRange;
  tastes: string[];
  allergies: string[];
  completedOnboarding: boolean;
  premiumUnlocked: boolean;
  language: 'en' | 'ms';
}

export interface PickyAlternative {
  id: string;
  nameEn: string;
  nameMs: string;
  icon: string;
}

export interface Meal {
  id: string;
  nameEn: string;
  nameMs: string;
  typeEn: string;
  typeMs: string;
  time: string;
  image: string;
  tagsEn: string[];
  tagsMs: string[];
  portionEn: string;
  portionMs: string;
  icon: string;
  pickyAlternative: PickyAlternative;
}

export interface NutritionTip {
  titleEn: string;
  titleMs: string;
  contentEn: string;
  contentMs: string;
}

export interface IntakeLogItem {
  id: string;
  nameEn: string;
  nameMs: string;
  timeEn: string;
  timeMs: string;
  tagsEn: string[];
  tagsMs: string[];
  image: string;
}

export interface GrowthRecord {
  id: string;
  dateEn: string;
  dateMs: string;
  weight: number; // in kg
  height: number; // in cm
  bmi: number;
}
