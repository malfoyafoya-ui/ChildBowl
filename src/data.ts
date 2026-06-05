import { Meal, NutritionTip, IntakeLogItem, GrowthRecord } from './types';

export const NUTRITION_TIPS: NutritionTip[] = [
  {
    titleEn: "Nutrition Tip of the Day",
    titleMs: "Tip Nutrisi Hari Ini",
    contentEn: "Include a source of Vitamin C (like papaya) with iron-rich foods to help your toddler absorb iron more efficiently.",
    contentMs: "Sertakan sumber Vitamin C (seperti betik) dengan makanan kaya zat besi untuk membantu anak anda menyerap zat besi dengan lebih cekap."
  },
  {
    titleEn: "Allergy Prevention Tip",
    titleMs: "Tip Pencegahan Alahan",
    contentEn: "Introduce local allergen foods one at a time over 3 days to easily trace any reactions.",
    contentMs: "Perkenalkan makanan alahan tempatan satu per satu selama 3 hari bagi mengesan sebarang tindak balas dengan mudah."
  },
  {
    titleEn: "Hydration Advice",
    titleMs: "Nasihat Penghidratan",
    contentEn: "Toddlers need about 1 to 1.2 liters of water daily. Offer water in a cute colorful training cup!",
    contentMs: "Kanak-kanak memerlukan kira-kira 1 hingga 1.2 liter air sehari. Berikan air dalam cawan latihan yang comel!"
  }
];

export const TASTE_PREFERENCES = [
  { id: 'porridge', icon: 'soup_kitchen', nameEn: 'Porridge/Bubur', descEn: 'Soft and comforting', nameMs: 'Bubur', descMs: 'Lembut dan menyelesakan' },
  { id: 'rice', icon: 'nutrition', nameEn: 'Rice Dishes', descEn: 'Energy for growth', nameMs: 'Hidangan Nasi', descMs: 'Tenaga untuk pertumbuhan' },
  { id: 'fruits', icon: 'eco', nameEn: 'Tropical Fruits', descEn: 'Papaya, Banana, Mango', nameMs: 'Buah-buahan Tempatan', descMs: 'Betik, Pisang, Mangga' },
  { id: 'noodles', icon: 'bakery_dining', nameEn: 'Noodles', descEn: 'Easy soft textures', nameMs: 'Mee/Bihun', descMs: 'Tekstur lembut yang mudah' }
];

export const ALLERGIES_LIST = [
  { id: 'dairy', nameEn: 'Dairy / Lactose', descEn: 'Milk, cheese, butter', nameMs: 'Susu / Laktosa', descMs: 'Susu, keju, mentega' },
  { id: 'peanuts', nameEn: 'Peanuts / Tree Nuts', descEn: 'Strictly nut-free zone', nameMs: 'Kacang Tanah / Kekacang', descMs: 'Zon bebas kacang sepenuhnya' },
  { id: 'seafood', nameEn: 'Seafood / Shellfish', descEn: 'Prawns, crab, fish', nameMs: 'Makanan Laut / Kerang', descMs: 'Udang, ketam, ikan' },
  { id: 'egg', nameEn: 'Egg', descEn: 'Used in many baked goods', nameMs: 'Telur', descMs: 'Kandungan dalam pelbagai roti' }
];

// Age-specific meals
export const MEALS_BY_AGE: Record<'0-1' | '2-3' | '4-5', Meal[]> = {
  '0-1': [
    {
      id: 'b1',
      nameEn: 'Smooth Mashed Banana & Oats',
      nameMs: 'Lenyekan Pisang & Oats Lembut',
      typeEn: 'Breakfast',
      typeMs: 'Sarapan',
      time: '08:30 AM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkpIp6Z_k14uf9D_2ROyLgkV15VQ3Nbuy7afrz9-YtmDv-GFexZz6xqTDgnIwFA6GC5SA0stBDmv4LX0B2t4FwyRFsyvAgF_Ngyj3IPTwstJFhiOVX3Z_D_pCfA7B55h4c1F6x9Z-wDn8w5ZfN4HvELz8S2uV_HUaT39kP9wVqF3uAqSGHN5we8IykJdAIaZxe_kJixr220JA45oymc0kF39TyfxwkyfezT-FI_4TmVdkvJ2VTKEL7itAbeXgDIqnF1x53_VjEEGO9',
      tagsEn: ['Iron Rich', 'First Spoon'],
      tagsMs: ['Kaya Zat Besi', 'Suapan Pertama'],
      portionEn: 'Portion: 3-4 tablespoons',
      portionMs: 'Porsi: 3-4 sudu besar',
      icon: 'restaurant',
      pickyAlternative: {
        id: 'alt_b1',
        nameEn: 'Pureed Sweet Potato with Breastmilk',
        nameMs: 'Puri Keledek Manis dengan Susu Ibu',
        icon: 'egg'
      }
    },
    {
      id: 'l1',
      nameEn: 'Millet Congee with Soft Pumpkin',
      nameMs: 'Bubur Sekoi dengan Labu Manis',
      typeEn: 'Lunch',
      typeMs: 'Tengah Hari',
      time: '12:30 PM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGLwAEN9Jera08EH04B27ND0G7af-t67nAlGEKbUVfkTzTRTA6dCh-0rupRsZqX40TqlgJQYxGi14NmCXNnVkAqtOUEkFNWKf7cRV-09QSA6yvKHahRSSIHnH_CAPIi4bH_9R2oapzZGXKZjVbJsFYR7mUCh6HMBeRGfHgLZbiG5B9aAEhCCBY_ACkHcnu6l3hlV677Gaeqz_0xRySA3al_E-il6qDwyIS5ozURYxEm5Sn8NaWmMXbM_uAEKR9m5bb17MMd0s3SJ6H',
      tagsEn: ['Fiber', 'Easy Swallowing'],
      tagsMs: ['Serat', 'Mudah Ditelan'],
      portionEn: 'Portion: 1/2 cup blended',
      portionMs: 'Porsi: 1/2 cawan dikisar',
      icon: 'scale',
      pickyAlternative: {
        id: 'alt_l1',
        nameEn: 'Steam Silken Tofu Puree',
        nameMs: 'Puri Tauhu Lembut Kukus',
        icon: 'lunch_dining'
      }
    },
    {
      id: 'd1',
      nameEn: 'Soft Spinach & Chicken Mash',
      nameMs: 'Lecek Sayur Bayam & Sup Ayam',
      typeEn: 'Dinner',
      typeMs: 'Makan Malam',
      time: '06:30 PM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiBww-hAO5ESbLz0XCt6CEoB3Q_5aYlfZ0W_C9glD-zBPOuS06PHeJDrxiGJzNVf4PJnJ9Rd4PGcq5HbP1EuQSiygnC4t-QSXQGycw6-oGudKXXuAu_QCL8g0rfbAJvXxYxdCjw2-5YFO9vW2cpKAFNjNYkzVcOphe7W9A41dCS_X5bP9roXB0c7AlvrXm63Yk-jJajDKEeCbnk10NJztX0-SjeF2IBZNf0nlt5xGfoWbMR7fbBh6ks_HSEPhprwXBWTOjvFCa2dJt',
      tagsEn: ['Hydration', 'Fine Texture'],
      tagsMs: ['Penghidratan', 'Tekstur Halus'],
      portionEn: 'Portion: 2-3 tablespoons progress',
      portionMs: 'Porsi: 2-3 sudu besar',
      icon: 'soup_kitchen',
      pickyAlternative: {
        id: 'alt_d1',
        nameEn: 'Mashed Avocado & Pear Puree',
        nameMs: 'Lenyekan Avocado & Puri Buah Pear',
        icon: 'dinner_dining'
      }
    }
  ],
  '2-3': [
    {
      id: 'b2',
      nameEn: 'Soft Mini Apam Balik',
      nameMs: 'Soft Mini Apam Balik',
      typeEn: 'Breakfast',
      typeMs: 'Sarapan',
      time: '08:30 AM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkpIp6Z_k14uf9D_2ROyLgkV15VQ3Nbuy7afrz9-YtmDv-GFexZz6xqTDgnIwFA6GC5SA0stBDmv4LX0B2t4FwyRFsyvAgF_Ngyj3IPTwstJFhiOVX3Z_D_pCfA7B55h4c1F6x9Z-wDn8w5ZfN4HvELz8S2uV_HUaT39kP9wVqF3uAqSGHN5we8IykJdAIaZxe_kJixr220JA45oymc0kF39TyfxwkyfezT-FI_4TmVdkvJ2VTKEL7itAbeXgDIqnF1x53_VjEEGO9',
      tagsEn: ['Iron Rich', 'Texture Focus'],
      tagsMs: ['Iron Rich', 'Texture Focus'],
      portionEn: 'Portion: 1 piece (sliced)',
      portionMs: 'Portion: 1 piece (sliced)',
      icon: 'restaurant',
      pickyAlternative: {
        id: 'alt_b2',
        nameEn: 'Steam Egg with Minced Chicken',
        nameMs: 'Steam Egg with Minced Chicken',
        icon: 'egg'
      }
    },
    {
      id: 'l2',
      nameEn: 'Mini Nasi Lemak (Mild)',
      nameMs: 'Mini Nasi Lemak (Mild)',
      typeEn: 'Lunch',
      typeMs: 'Tengah Hari',
      time: '12:30 PM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMLXKIOeRJnVzvjA5VkDjLcV9R_NWPBpNCbrnT0JoJLB6BIcd-GUk9Gx4PD3Pd7uJiX8TzR-pd9RvluIqKHa7PiC7lSOrapZakutEgcHip4LoppeuBpsYautFAeSMgTEIK02VYO5PJDu999JCmrgf3iwu_q2LCgCcNEHe7o5PPGc2YE-T4IysnEh15yR8tm4EEm5stdSqzmt9z957gOQrx_xj3HfVOBWNymPwnVbdlFvlyXT4O54WfGePfME5xyQbiMT80gJz0OqA0',
      tagsEn: ['Fiber', 'Calcium'],
      tagsMs: ['Fiber', 'Calcium'],
      portionEn: 'Portion: 1/2 Cup Rice + 1 Egg',
      portionMs: 'Portion: 1/2 Cup Rice + 1 Egg',
      icon: 'scale',
      pickyAlternative: {
        id: 'alt_l2',
        nameEn: 'Soft Chicken Congee with Carrots',
        nameMs: 'Soft Chicken Congee with Carrots',
        icon: 'lunch_dining'
      }
    },
    {
      id: 'd2',
      nameEn: 'Star-Veggie Chicken Soup',
      nameMs: 'Star-Veggie Chicken Soup',
      typeEn: 'Dinner',
      typeMs: 'Makan Malam',
      time: '06:30 PM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiBww-hAO5ESbLz0XCt6CEoB3Q_5aYlfZ0W_C9glD-zBPOuS06PHeJDrxiGJzNVf4PJnJ9Rd4PGcq5HbP1EuQSiygnC4t-QSXQGycw6-oGudKXXuAu_QCL8g0rfbAJvXxYxdCjw2-5YFO9vW2cpKAFNjNYkzVcOphe7W9A41dCS_X5bP9roXB0c7AlvrXm63Yk-jJajDKEeCbnk10NJztX0-SjeF2IBZNf0nlt5xGfoWbMR7fbBh6ks_HSEPhprwXBWTOjvFCa2dJt',
      tagsEn: ['Hydration', 'Easy Digest'],
      tagsMs: ['Hydration', 'Easy Digest'],
      portionEn: 'Portion: 1 small bowl',
      portionMs: 'Portion: 1 small bowl',
      icon: 'soup_kitchen',
      pickyAlternative: {
        id: 'alt_d2',
        nameEn: 'Cheesy Sweet Potato Mash',
        nameMs: 'Cheesy Sweet Potato Mash',
        icon: 'dinner_dining'
      }
    }
  ],
  '4-5': [
    {
      id: 'b3',
      nameEn: 'Mini Roti Canai with Mild dhal',
      nameMs: 'Roti Canai Mini & Kuah Dhal Mesra',
      typeEn: 'Breakfast',
      typeMs: 'Sarapan',
      time: '08:30 AM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkpIp6Z_k14uf9D_2ROyLgkV15VQ3Nbuy7afrz9-YtmDv-GFexZz6xqTDgnIwFA6GC5SA0stBDmv4LX0B2t4FwyRFsyvAgF_Ngyj3IPTwstJFhiOVX3Z_D_pCfA7B55h4c1F6x9Z-wDn8w5ZfN4HvELz8S2uV_HUaT39kP9wVqF3uAqSGHN5we8IykJdAIaZxe_kJixr220JA45oymc0kF39TyfxwkyfezT-FI_4TmVdkvJ2VTKEL7itAbeXgDIqnF1x53_VjEEGO9',
      tagsEn: ['Energy Rich', 'Finger Food'],
      tagsMs: ['Tenaga Tinggi', 'Makanan Jari'],
      portionEn: 'Portion: 1 whole piece (cubed)',
      portionMs: 'Porsi: 1 keping penuh (dadu)',
      icon: 'restaurant',
      pickyAlternative: {
        id: 'alt_b3',
        nameEn: 'Baked Peanut Butter Soft Toast',
        nameMs: 'Roti Bakar Mentega Kacang Lembut',
        icon: 'egg'
      }
    },
    {
      id: 'l3',
      nameEn: 'Nasi Goreng Kampung (Kid-Friendly)',
      nameMs: 'Nasi Goreng Kampung Mesra Bayi',
      typeEn: 'Lunch',
      typeMs: 'Tengah Hari',
      time: '12:30 PM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMLXKIOeRJnVzvjA5VkDjLcV9R_NWPBpNCbrnT0JoJLB6BIcd-GUk9Gx4PD3Pd7uJiX8TzR-pd9RvluIqKHa7PiC7lSOrapZakutEgcHip4LoppeuBpsYautFAeSMgTEIK02VYO5PJDu999JCmrgf3iwu_q2LCgCcNEHe7o5PPGc2YE-T4IysnEh15yR8tm4EEm5stdSqzmt9z957gOQrx_xj3HfVOBWNymPwnVbdlFvlyXT4O54WfGePfME5xyQbiMT80gJz0OqA0',
      tagsEn: ['Protein High', 'Hidden Veggies'],
      tagsMs: ['Tinggi Protein', 'Sayur Tersembunyi'],
      portionEn: 'Portion: 1 cup bowl',
      portionMs: 'Porsi: 1 mangkuk cawan',
      icon: 'scale',
      pickyAlternative: {
        id: 'alt_l3',
        nameEn: 'Mee Sup Ayam Halus dengan Fishcake',
        nameMs: 'Mee Sup Ayam Halus dengan Kek Ikan',
        icon: 'lunch_dining'
      }
    },
    {
      id: 'd3',
      nameEn: 'Sweet Potato & Grilled Chicken Sticks',
      nameMs: 'Stik Ayam Bakar & Kentang Manis',
      typeEn: 'Dinner',
      typeMs: 'Makan Malam',
      time: '06:30 PM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiBww-hAO5ESbLz0XCt6CEoB3Q_5aYlfZ0W_C9glD-zBPOuS06PHeJDrxiGJzNVf4PJnJ9Rd4PGcq5HbP1EuQSiygnC4t-QSXQGycw6-oGudKXXuAu_QCL8g0rfbAJvXxYxdCjw2-5YFO9vW2cpKAFNjNYkzVcOphe7W9A41dCS_X5bP9roXB0c7AlvrXm63Yk-jJajDKEeCbnk10NJztX0-SjeF2IBZNf0nlt5xGfoWbMR7fbBh6ks_HSEPhprwXBWTOjvFCa2dJt',
      tagsEn: ['Zinc Rich', 'Active Muscles'],
      tagsMs: ['Kaya Zink', 'Otot Aktif'],
      portionEn: 'Portion: 2 chicken sticks + 1/2 cup sweet mash',
      portionMs: 'Porsi: 2 stik ayam + 1/2 cawan keledek manis',
      icon: 'soup_kitchen',
      pickyAlternative: {
        id: 'alt_d3',
        nameEn: 'Soft Chicken Fried Bihun',
        nameMs: 'Bihun Goreng Ayam Lembut',
        icon: 'dinner_dining'
      }
    }
  ]
};

// Initial intake log history
export const INITIAL_INTAKE_LOG: IntakeLogItem[] = [
  {
    id: 'intake_1',
    nameEn: 'Mini Nasi Lemak (Mild)',
    nameMs: 'Mini Nasi Lemak (Mild)',
    timeEn: '08:15 AM',
    timeMs: '08:15 AM',
    tagsEn: ['Protein High', 'Iron Source'],
    tagsMs: ['Protein High', 'Iron Source'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGLwAEN9Jera08EH04B27ND0G7af-t67nAlGEKbUVfkTzTRTA6dCh-0rupRsZqX40TqlgJQYxGi14NmCXNnVkAqtOUEkFNWKf7cRV-09QSA6yvKHahRSSIHnH_CAPIi4bH_9R2oapzZGXKZjVbJsFYR7mUCh6HMBeRGfHgLZbiG5B9aAEhCCBY_ACkHcnu6l3hlV677Gaeqz_0xRySA3al_E-il6qDwyIS5ozURYxEm5Sn8NaWmMXbM_uAEKR9m5bb17MMd0s3SJ6H'
  },
  {
    id: 'intake_2',
    nameEn: 'Papaya & Pear Slices',
    nameMs: 'Betik & Hirisan Buah Pir',
    timeEn: '10:30 AM',
    timeMs: '10:30 AM',
    tagsEn: ['Vitamin C'],
    tagsMs: ['Vitamin C'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPqqSsFkbJtelQpI_zCXRZaFSvkyE_7rTH3NWF3rvHLU9MtnlhaXthFmhhsr27NRXJ8aI2oie27ZAcuc3vT_23ySHd4wOWM62rxGP4ARm3wE_KpJrHRq8xsiqHjOKIeCaLDWbifKpIeTmjzOIW9FmaP4emmEd25nO0C0yVNYswY8unaHs7FnYhxwBdVML-fGzk4nuBjJP8G2loggCbopIZNKhvalR0vXQ66M7m0K5gGSaIZ40rwKmR4rtGTtxLCxl22bft4N10Rf-k'
  }
];

// Initial weight log records
export const INITIAL_GROWTH_RECORDS: GrowthRecord[] = [
  {
    id: 'g_1',
    dateEn: 'June 5, 2026',
    dateMs: '5 Jun 2026',
    weight: 12.5,
    height: 88.2,
    bmi: 16.1
  },
  {
    id: 'g_2',
    dateEn: 'May 1, 2026',
    dateMs: '1 Mei 2026',
    weight: 12.3,
    height: 87.5,
    bmi: 16.1
  },
  {
    id: 'g_3',
    dateEn: 'April 2, 2026',
    dateMs: '2 Apr 2026',
    weight: 12.0,
    height: 86.8,
    bmi: 15.9
  }
];
