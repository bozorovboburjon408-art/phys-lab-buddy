export interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
  variables: { symbol: string; name: string; unit: string }[];
  category: string;
}

export interface FormulaCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const formulaCategories: FormulaCategory[] = [
  { id: "kinematics", name: "Kinematika", icon: "MoveRight", color: "hsl(280, 70%, 50%)" },
  { id: "dynamics", name: "Dinamika", icon: "Zap", color: "hsl(340, 70%, 50%)" },
  { id: "energy", name: "Energiya va ish", icon: "Battery", color: "hsl(45, 70%, 50%)" },
  { id: "oscillations", name: "Tebranishlar", icon: "Activity", color: "hsl(160, 70%, 50%)" },
  { id: "waves", name: "To'lqinlar", icon: "Waves", color: "hsl(200, 70%, 50%)" },
  { id: "thermodynamics", name: "Termodinamika", icon: "Thermometer", color: "hsl(15, 70%, 50%)" },
  { id: "electricity", name: "Elektr", icon: "Plug", color: "hsl(50, 70%, 50%)" },
  { id: "magnetism", name: "Magnetizm", icon: "Magnet", color: "hsl(260, 70%, 50%)" },
  { id: "optics", name: "Optika", icon: "Sun", color: "hsl(180, 70%, 50%)" },
  { id: "atomic", name: "Atom fizikasi", icon: "Atom", color: "hsl(300, 70%, 50%)" },
];

export const formulas: Formula[] = [
  // Kinematika
  {
    id: "velocity",
    name: "Tezlik",
    formula: "v = \\frac{s}{t}",
    description: "Jismning bosib o'tgan yo'lini vaqtga nisbati",
    variables: [
      { symbol: "v", name: "Tezlik", unit: "m/s" },
      { symbol: "s", name: "Yo'l", unit: "m" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "acceleration",
    name: "Tezlanish",
    formula: "a = \\frac{v - v_0}{t}",
    description: "Tezlikning vaqt bo'yicha o'zgarish tezligi",
    variables: [
      { symbol: "a", name: "Tezlanish", unit: "m/s²" },
      { symbol: "v", name: "Oxirgi tezlik", unit: "m/s" },
      { symbol: "v_0", name: "Boshlang'ich tezlik", unit: "m/s" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "displacement_uniform",
    name: "Tekis harakat yo'li",
    formula: "s = v \\cdot t",
    description: "Tekis harakatda bosib o'tilgan yo'l",
    variables: [
      { symbol: "s", name: "Yo'l", unit: "m" },
      { symbol: "v", name: "Tezlik", unit: "m/s" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "displacement_accelerated",
    name: "Tekis tezlanuvchan harakat yo'li",
    formula: "s = v_0 t + \\frac{at^2}{2}",
    description: "Tekis tezlanuvchan harakatda bosib o'tilgan yo'l",
    variables: [
      { symbol: "s", name: "Yo'l", unit: "m" },
      { symbol: "v_0", name: "Boshlang'ich tezlik", unit: "m/s" },
      { symbol: "a", name: "Tezlanish", unit: "m/s²" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "velocity_accelerated",
    name: "Tekis tezlanuvchan harakat tezligi",
    formula: "v = v_0 + at",
    description: "Tekis tezlanuvchan harakatda tezlik",
    variables: [
      { symbol: "v", name: "Tezlik", unit: "m/s" },
      { symbol: "v_0", name: "Boshlang'ich tezlik", unit: "m/s" },
      { symbol: "a", name: "Tezlanish", unit: "m/s²" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "velocity_squared",
    name: "Tezlikning kvadrati",
    formula: "v^2 = v_0^2 + 2as",
    description: "Tezlik, boshlang'ich tezlik, tezlanish va yo'l orasidagi bog'lanish",
    variables: [
      { symbol: "v", name: "Oxirgi tezlik", unit: "m/s" },
      { symbol: "v_0", name: "Boshlang'ich tezlik", unit: "m/s" },
      { symbol: "a", name: "Tezlanish", unit: "m/s²" },
      { symbol: "s", name: "Yo'l", unit: "m" },
    ],
    category: "kinematics",
  },
  {
    id: "free_fall",
    name: "Erkin tushish",
    formula: "h = \\frac{gt^2}{2}",
    description: "Erkin tushishda bosib o'tilgan balandlik",
    variables: [
      { symbol: "h", name: "Balandlik", unit: "m" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "projectile_range",
    name: "Gorizontal otilgan jism masofasi",
    formula: "L = v_0 \\cdot \\cos\\alpha \\cdot t",
    description: "Burchak ostida otilgan jismning gorizontal masofasi",
    variables: [
      { symbol: "L", name: "Gorizontal masofa", unit: "m" },
      { symbol: "v_0", name: "Boshlang'ich tezlik", unit: "m/s" },
      { symbol: "\\alpha", name: "Otilish burchagi", unit: "°" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "projectile_max_range",
    name: "Maksimal uzoqlikka otish",
    formula: "L_{max} = \\frac{v_0^2 \\sin 2\\alpha}{g}",
    description: "Burchak ostida otilgan jismning maksimal masofasi",
    variables: [
      { symbol: "L_{max}", name: "Maksimal masofa", unit: "m" },
      { symbol: "v_0", name: "Boshlang'ich tezlik", unit: "m/s" },
      { symbol: "\\alpha", name: "Otilish burchagi", unit: "°" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²" },
    ],
    category: "kinematics",
  },
  {
    id: "circular_velocity",
    name: "Aylana bo'ylab harakat tezligi",
    formula: "v = \\frac{2\\pi r}{T}",
    description: "Aylana bo'ylab tekis harakatda chiziqli tezlik",
    variables: [
      { symbol: "v", name: "Chiziqli tezlik", unit: "m/s" },
      { symbol: "r", name: "Radius", unit: "m" },
      { symbol: "T", name: "Davr", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "angular_velocity",
    name: "Burchak tezlik",
    formula: "\\omega = \\frac{2\\pi}{T}",
    description: "Aylana bo'ylab harakatda burchak tezlik",
    variables: [
      { symbol: "\\omega", name: "Burchak tezlik", unit: "rad/s" },
      { symbol: "T", name: "Davr", unit: "s" },
    ],
    category: "kinematics",
  },
  {
    id: "centripetal_acceleration",
    name: "Markazga intilma tezlanish",
    formula: "a_c = \\frac{v^2}{r} = \\omega^2 r",
    description: "Aylana bo'ylab harakatda markazga yo'nalgan tezlanish",
    variables: [
      { symbol: "a_c", name: "Markazga intilma tezlanish", unit: "m/s²" },
      { symbol: "v", name: "Chiziqli tezlik", unit: "m/s" },
      { symbol: "r", name: "Radius", unit: "m" },
      { symbol: "\\omega", name: "Burchak tezlik", unit: "rad/s" },
    ],
    category: "kinematics",
  },

  // Dinamika
  {
    id: "newton_second",
    name: "Nyutonning ikkinchi qonuni",
    formula: "F = ma",
    description: "Kuch jism massasi va tezlanish ko'paytmasiga teng",
    variables: [
      { symbol: "F", name: "Kuch", unit: "N" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "a", name: "Tezlanish", unit: "m/s²" },
    ],
    category: "dynamics",
  },
  {
    id: "weight",
    name: "Og'irlik kuchi",
    formula: "P = mg",
    description: "Jismning og'irlik kuchi",
    variables: [
      { symbol: "P", name: "Og'irlik kuchi", unit: "N" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²" },
    ],
    category: "dynamics",
  },
  {
    id: "friction",
    name: "Ishqalanish kuchi",
    formula: "F_{ishq} = \\mu N",
    description: "Ishqalanish kuchi normal kuchga proporsional",
    variables: [
      { symbol: "F_{ishq}", name: "Ishqalanish kuchi", unit: "N" },
      { symbol: "\\mu", name: "Ishqalanish koeffitsiyenti", unit: "-" },
      { symbol: "N", name: "Normal kuch", unit: "N" },
    ],
    category: "dynamics",
  },
  {
    id: "gravitational",
    name: "Butun olam tortishish qonuni",
    formula: "F = G\\frac{m_1 m_2}{r^2}",
    description: "Ikki jism orasidagi gravitatsion tortishish kuchi",
    variables: [
      { symbol: "F", name: "Tortishish kuchi", unit: "N" },
      { symbol: "G", name: "Gravitatsion doimiy", unit: "N·m²/kg²" },
      { symbol: "m_1, m_2", name: "Jismlar massasi", unit: "kg" },
      { symbol: "r", name: "Jismlar orasidagi masofa", unit: "m" },
    ],
    category: "dynamics",
  },
  {
    id: "momentum",
    name: "Impuls",
    formula: "p = mv",
    description: "Jism impulsi massa va tezlik ko'paytmasi",
    variables: [
      { symbol: "p", name: "Impuls", unit: "kg·m/s" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "v", name: "Tezlik", unit: "m/s" },
    ],
    category: "dynamics",
  },
  {
    id: "impulse",
    name: "Kuch impulsi",
    formula: "F \\cdot t = \\Delta p",
    description: "Kuch impulsi impuls o'zgarishiga teng",
    variables: [
      { symbol: "F", name: "Kuch", unit: "N" },
      { symbol: "t", name: "Vaqt", unit: "s" },
      { symbol: "\\Delta p", name: "Impuls o'zgarishi", unit: "kg·m/s" },
    ],
    category: "dynamics",
  },
  {
    id: "centripetal_force",
    name: "Markazga intilma kuch",
    formula: "F_c = \\frac{mv^2}{r}",
    description: "Aylana bo'ylab harakatda markazga yo'nalgan kuch",
    variables: [
      { symbol: "F_c", name: "Markazga intilma kuch", unit: "N" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "v", name: "Tezlik", unit: "m/s" },
      { symbol: "r", name: "Radius", unit: "m" },
    ],
    category: "dynamics",
  },
  {
    id: "hookes_law",
    name: "Guk qonuni",
    formula: "F = -kx",
    description: "Elastik kuch deformatsiyaga proporsional",
    variables: [
      { symbol: "F", name: "Elastik kuch", unit: "N" },
      { symbol: "k", name: "Bikrlik koeffitsiyenti", unit: "N/m" },
      { symbol: "x", name: "Deformatsiya", unit: "m" },
    ],
    category: "dynamics",
  },

  // Energiya va ish
  {
    id: "work",
    name: "Mexanik ish",
    formula: "A = F \\cdot s \\cdot \\cos\\alpha",
    description: "Kuch tomonidan bajarilgan ish",
    variables: [
      { symbol: "A", name: "Ish", unit: "J" },
      { symbol: "F", name: "Kuch", unit: "N" },
      { symbol: "s", name: "Ko'chish", unit: "m" },
      { symbol: "\\alpha", name: "Burchak", unit: "°" },
    ],
    category: "energy",
  },
  {
    id: "power",
    name: "Quvvat",
    formula: "P = \\frac{A}{t} = Fv",
    description: "Vaqt birligi ichida bajarilgan ish",
    variables: [
      { symbol: "P", name: "Quvvat", unit: "W" },
      { symbol: "A", name: "Ish", unit: "J" },
      { symbol: "t", name: "Vaqt", unit: "s" },
      { symbol: "F", name: "Kuch", unit: "N" },
      { symbol: "v", name: "Tezlik", unit: "m/s" },
    ],
    category: "energy",
  },
  {
    id: "kinetic_energy",
    name: "Kinetik energiya",
    formula: "E_k = \\frac{mv^2}{2}",
    description: "Harakatlanayotgan jism energiyasi",
    variables: [
      { symbol: "E_k", name: "Kinetik energiya", unit: "J" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "v", name: "Tezlik", unit: "m/s" },
    ],
    category: "energy",
  },
  {
    id: "potential_energy",
    name: "Potensial energiya",
    formula: "E_p = mgh",
    description: "Jismning balandlikdagi energiyasi",
    variables: [
      { symbol: "E_p", name: "Potensial energiya", unit: "J" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²" },
      { symbol: "h", name: "Balandlik", unit: "m" },
    ],
    category: "energy",
  },
  {
    id: "elastic_potential",
    name: "Elastik potensial energiya",
    formula: "E_p = \\frac{kx^2}{2}",
    description: "Deformatsiyalangan prujinaning energiyasi",
    variables: [
      { symbol: "E_p", name: "Potensial energiya", unit: "J" },
      { symbol: "k", name: "Bikrlik koeffitsiyenti", unit: "N/m" },
      { symbol: "x", name: "Deformatsiya", unit: "m" },
    ],
    category: "energy",
  },
  {
    id: "efficiency",
    name: "FIK (Foydali ish koeffitsiyenti)",
    formula: "\\eta = \\frac{A_{foydali}}{A_{sarflangan}} \\cdot 100\\%",
    description: "Foydali ishning sarflangan ishga nisbati",
    variables: [
      { symbol: "\\eta", name: "FIK", unit: "%" },
      { symbol: "A_{foydali}", name: "Foydali ish", unit: "J" },
      { symbol: "A_{sarflangan}", name: "Sarflangan ish", unit: "J" },
    ],
    category: "energy",
  },

  // Tebranishlar
  {
    id: "pendulum_period",
    name: "Matematik mayatnik davri",
    formula: "T = 2\\pi\\sqrt{\\frac{l}{g}}",
    description: "Matematik mayatnikning tebranish davri",
    variables: [
      { symbol: "T", name: "Davr", unit: "s" },
      { symbol: "l", name: "Mayatnik uzunligi", unit: "m" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²" },
    ],
    category: "oscillations",
  },
  {
    id: "spring_period",
    name: "Prujinali mayatnik davri",
    formula: "T = 2\\pi\\sqrt{\\frac{m}{k}}",
    description: "Prujinali mayatnikning tebranish davri",
    variables: [
      { symbol: "T", name: "Davr", unit: "s" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "k", name: "Bikrlik koeffitsiyenti", unit: "N/m" },
    ],
    category: "oscillations",
  },
  {
    id: "frequency",
    name: "Chastota",
    formula: "f = \\frac{1}{T}",
    description: "Vaqt birligi ichidagi tebranishlar soni",
    variables: [
      { symbol: "f", name: "Chastota", unit: "Hz" },
      { symbol: "T", name: "Davr", unit: "s" },
    ],
    category: "oscillations",
  },
  {
    id: "harmonic_displacement",
    name: "Garmonik tebranish tenglamasi",
    formula: "x = A\\cos(\\omega t + \\varphi_0)",
    description: "Garmonik tebranishda jism holati",
    variables: [
      { symbol: "x", name: "Siljish", unit: "m" },
      { symbol: "A", name: "Amplituda", unit: "m" },
      { symbol: "\\omega", name: "Siklik chastota", unit: "rad/s" },
      { symbol: "t", name: "Vaqt", unit: "s" },
      { symbol: "\\varphi_0", name: "Boshlang'ich faza", unit: "rad" },
    ],
    category: "oscillations",
  },
  {
    id: "cyclic_frequency",
    name: "Siklik chastota",
    formula: "\\omega = 2\\pi f = \\frac{2\\pi}{T}",
    description: "Burchak tezlik va chastota orasidagi bog'lanish",
    variables: [
      { symbol: "\\omega", name: "Siklik chastota", unit: "rad/s" },
      { symbol: "f", name: "Chastota", unit: "Hz" },
      { symbol: "T", name: "Davr", unit: "s" },
    ],
    category: "oscillations",
  },

  // To'lqinlar
  {
    id: "wave_velocity",
    name: "To'lqin tezligi",
    formula: "v = \\lambda f = \\frac{\\lambda}{T}",
    description: "To'lqin tarqalish tezligi",
    variables: [
      { symbol: "v", name: "To'lqin tezligi", unit: "m/s" },
      { symbol: "\\lambda", name: "To'lqin uzunligi", unit: "m" },
      { symbol: "f", name: "Chastota", unit: "Hz" },
      { symbol: "T", name: "Davr", unit: "s" },
    ],
    category: "waves",
  },
  {
    id: "sound_intensity",
    name: "Tovush intensivligi",
    formula: "I = \\frac{P}{S}",
    description: "Birlik yuzaga to'g'ri keladigan quvvat",
    variables: [
      { symbol: "I", name: "Intensivlik", unit: "W/m²" },
      { symbol: "P", name: "Quvvat", unit: "W" },
      { symbol: "S", name: "Yuza", unit: "m²" },
    ],
    category: "waves",
  },
  {
    id: "doppler_effect",
    name: "Dopler effekti",
    formula: "f' = f\\frac{v \\pm v_{kuzatuvchi}}{v \\mp v_{manba}}",
    description: "Harakatdagi manba yoki kuzatuvchi uchun chastota o'zgarishi",
    variables: [
      { symbol: "f'", name: "Qabul qilingan chastota", unit: "Hz" },
      { symbol: "f", name: "Manba chastotasi", unit: "Hz" },
      { symbol: "v", name: "Tovush tezligi", unit: "m/s" },
      { symbol: "v_{kuzatuvchi}", name: "Kuzatuvchi tezligi", unit: "m/s" },
      { symbol: "v_{manba}", name: "Manba tezligi", unit: "m/s" },
    ],
    category: "waves",
  },
  {
    id: "standing_wave",
    name: "Turg'un to'lqin",
    formula: "l = n\\frac{\\lambda}{2}",
    description: "Turg'un to'lqin hosil bo'lish sharti",
    variables: [
      { symbol: "l", name: "Sim uzunligi", unit: "m" },
      { symbol: "n", name: "Garmonika tartib soni", unit: "-" },
      { symbol: "\\lambda", name: "To'lqin uzunligi", unit: "m" },
    ],
    category: "waves",
  },

  // Termodinamika
  {
    id: "heat",
    name: "Issiqlik miqdori",
    formula: "Q = cm\\Delta T",
    description: "Jismni isitish uchun zarur issiqlik",
    variables: [
      { symbol: "Q", name: "Issiqlik miqdori", unit: "J" },
      { symbol: "c", name: "Solishtirma issiqlik sig'imi", unit: "J/(kg·K)" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "\\Delta T", name: "Harorat o'zgarishi", unit: "K" },
    ],
    category: "thermodynamics",
  },
  {
    id: "ideal_gas",
    name: "Ideal gaz holat tenglamasi",
    formula: "PV = nRT",
    description: "Ideal gazning holat tenglamasi",
    variables: [
      { symbol: "P", name: "Bosim", unit: "Pa" },
      { symbol: "V", name: "Hajm", unit: "m³" },
      { symbol: "n", name: "Mol soni", unit: "mol" },
      { symbol: "R", name: "Universal gaz doimiysi", unit: "J/(mol·K)" },
      { symbol: "T", name: "Harorat", unit: "K" },
    ],
    category: "thermodynamics",
  },
  {
    id: "combined_gas_law",
    name: "Birlashtirilgan gaz qonuni",
    formula: "\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}",
    description: "Gaz parametrlari orasidagi bog'lanish",
    variables: [
      { symbol: "P_1, P_2", name: "Bosimlar", unit: "Pa" },
      { symbol: "V_1, V_2", name: "Hajmlar", unit: "m³" },
      { symbol: "T_1, T_2", name: "Haroratlar", unit: "K" },
    ],
    category: "thermodynamics",
  },
  {
    id: "first_law",
    name: "Termodinamikaning birinchi qonuni",
    formula: "\\Delta U = Q - A",
    description: "Ichki energiya o'zgarishi issiqlik va ishga bog'liq",
    variables: [
      { symbol: "\\Delta U", name: "Ichki energiya o'zgarishi", unit: "J" },
      { symbol: "Q", name: "Issiqlik miqdori", unit: "J" },
      { symbol: "A", name: "Bajarilgan ish", unit: "J" },
    ],
    category: "thermodynamics",
  },
  {
    id: "carnot_efficiency",
    name: "Karno sikli FIKi",
    formula: "\\eta = 1 - \\frac{T_2}{T_1}",
    description: "Ideal issiqlik mashinasining maksimal FIKi",
    variables: [
      { symbol: "\\eta", name: "FIK", unit: "-" },
      { symbol: "T_1", name: "Isitkich harorati", unit: "K" },
      { symbol: "T_2", name: "Sovutkich harorati", unit: "K" },
    ],
    category: "thermodynamics",
  },
  {
    id: "internal_energy",
    name: "Ichki energiya",
    formula: "U = \\frac{3}{2}nRT",
    description: "Bir atomli ideal gazning ichki energiyasi",
    variables: [
      { symbol: "U", name: "Ichki energiya", unit: "J" },
      { symbol: "n", name: "Mol soni", unit: "mol" },
      { symbol: "R", name: "Universal gaz doimiysi", unit: "J/(mol·K)" },
      { symbol: "T", name: "Harorat", unit: "K" },
    ],
    category: "thermodynamics",
  },
  {
    id: "latent_heat",
    name: "Fazaviy o'tish issiqligi",
    formula: "Q = Lm",
    description: "Agregat holat o'zgarishi uchun issiqlik",
    variables: [
      { symbol: "Q", name: "Issiqlik miqdori", unit: "J" },
      { symbol: "L", name: "Solishtirma issiqlik", unit: "J/kg" },
      { symbol: "m", name: "Massa", unit: "kg" },
    ],
    category: "thermodynamics",
  },

  // Elektr
  {
    id: "coulombs_law",
    name: "Kulon qonuni",
    formula: "F = k\\frac{q_1 q_2}{r^2}",
    description: "Ikki nuqtaviy zaryad orasidagi kuch",
    variables: [
      { symbol: "F", name: "Kuch", unit: "N" },
      { symbol: "k", name: "Kulon doimiysi", unit: "N·m²/C²" },
      { symbol: "q_1, q_2", name: "Zaryadlar", unit: "C" },
      { symbol: "r", name: "Masofa", unit: "m" },
    ],
    category: "electricity",
  },
  {
    id: "electric_field",
    name: "Elektr maydon kuchlanganligi",
    formula: "E = \\frac{F}{q} = k\\frac{Q}{r^2}",
    description: "Birlik zaryadga ta'sir etuvchi kuch",
    variables: [
      { symbol: "E", name: "Maydon kuchlanganligi", unit: "V/m" },
      { symbol: "F", name: "Kuch", unit: "N" },
      { symbol: "q", name: "Sinov zaryadi", unit: "C" },
      { symbol: "Q", name: "Manba zaryadi", unit: "C" },
      { symbol: "r", name: "Masofa", unit: "m" },
    ],
    category: "electricity",
  },
  {
    id: "voltage",
    name: "Kuchlanish",
    formula: "U = \\frac{A}{q}",
    description: "Birlik zaryadni ko'chirish uchun sarflangan ish",
    variables: [
      { symbol: "U", name: "Kuchlanish", unit: "V" },
      { symbol: "A", name: "Ish", unit: "J" },
      { symbol: "q", name: "Zaryad", unit: "C" },
    ],
    category: "electricity",
  },
  {
    id: "ohms_law",
    name: "Om qonuni",
    formula: "I = \\frac{U}{R}",
    description: "Tok kuchi kuchlanish va qarshilikka bog'liq",
    variables: [
      { symbol: "I", name: "Tok kuchi", unit: "A" },
      { symbol: "U", name: "Kuchlanish", unit: "V" },
      { symbol: "R", name: "Qarshilik", unit: "Ω" },
    ],
    category: "electricity",
  },
  {
    id: "resistance",
    name: "O'tkazgich qarshiligi",
    formula: "R = \\rho\\frac{l}{S}",
    description: "O'tkazgich qarshiligi uning o'lchamlariga bog'liq",
    variables: [
      { symbol: "R", name: "Qarshilik", unit: "Ω" },
      { symbol: "\\rho", name: "Solishtirma qarshilik", unit: "Ω·m" },
      { symbol: "l", name: "Uzunlik", unit: "m" },
      { symbol: "S", name: "Ko'ndalang kesim yuzasi", unit: "m²" },
    ],
    category: "electricity",
  },
  {
    id: "electric_power",
    name: "Elektr quvvati",
    formula: "P = UI = I^2R = \\frac{U^2}{R}",
    description: "Elektr zanjirida ajraladigan quvvat",
    variables: [
      { symbol: "P", name: "Quvvat", unit: "W" },
      { symbol: "U", name: "Kuchlanish", unit: "V" },
      { symbol: "I", name: "Tok kuchi", unit: "A" },
      { symbol: "R", name: "Qarshilik", unit: "Ω" },
    ],
    category: "electricity",
  },
  {
    id: "capacitance",
    name: "Sig'im",
    formula: "C = \\frac{q}{U}",
    description: "Kondensator sig'imi",
    variables: [
      { symbol: "C", name: "Sig'im", unit: "F" },
      { symbol: "q", name: "Zaryad", unit: "C" },
      { symbol: "U", name: "Kuchlanish", unit: "V" },
    ],
    category: "electricity",
  },
  {
    id: "capacitor_energy",
    name: "Kondensator energiyasi",
    formula: "W = \\frac{CU^2}{2} = \\frac{q^2}{2C}",
    description: "Zaryadlangan kondensatorda to'plangan energiya",
    variables: [
      { symbol: "W", name: "Energiya", unit: "J" },
      { symbol: "C", name: "Sig'im", unit: "F" },
      { symbol: "U", name: "Kuchlanish", unit: "V" },
      { symbol: "q", name: "Zaryad", unit: "C" },
    ],
    category: "electricity",
  },
  {
    id: "joule_lenz",
    name: "Joul-Lens qonuni",
    formula: "Q = I^2Rt",
    description: "O'tkazgichda ajraladigan issiqlik",
    variables: [
      { symbol: "Q", name: "Issiqlik miqdori", unit: "J" },
      { symbol: "I", name: "Tok kuchi", unit: "A" },
      { symbol: "R", name: "Qarshilik", unit: "Ω" },
      { symbol: "t", name: "Vaqt", unit: "s" },
    ],
    category: "electricity",
  },

  // Magnetizm
  {
    id: "magnetic_force",
    name: "Amper kuchi",
    formula: "F = BIl\\sin\\alpha",
    description: "Magnit maydonda tokli o'tkazgichga ta'sir etuvchi kuch",
    variables: [
      { symbol: "F", name: "Amper kuchi", unit: "N" },
      { symbol: "B", name: "Magnit induksiya", unit: "T" },
      { symbol: "I", name: "Tok kuchi", unit: "A" },
      { symbol: "l", name: "O'tkazgich uzunligi", unit: "m" },
      { symbol: "\\alpha", name: "Burchak", unit: "°" },
    ],
    category: "magnetism",
  },
  {
    id: "lorentz_force",
    name: "Lorens kuchi",
    formula: "F = qvB\\sin\\alpha",
    description: "Magnit maydonda harakatlanayotgan zaryadga ta'sir etuvchi kuch",
    variables: [
      { symbol: "F", name: "Lorens kuchi", unit: "N" },
      { symbol: "q", name: "Zaryad", unit: "C" },
      { symbol: "v", name: "Tezlik", unit: "m/s" },
      { symbol: "B", name: "Magnit induksiya", unit: "T" },
      { symbol: "\\alpha", name: "Burchak", unit: "°" },
    ],
    category: "magnetism",
  },
  {
    id: "magnetic_flux",
    name: "Magnit oqimi",
    formula: "\\Phi = BS\\cos\\alpha",
    description: "Yuzadan o'tuvchi magnit oqimi",
    variables: [
      { symbol: "\\Phi", name: "Magnit oqimi", unit: "Wb" },
      { symbol: "B", name: "Magnit induksiya", unit: "T" },
      { symbol: "S", name: "Yuza", unit: "m²" },
      { symbol: "\\alpha", name: "Burchak", unit: "°" },
    ],
    category: "magnetism",
  },
  {
    id: "faraday_law",
    name: "Faradey qonuni",
    formula: "\\varepsilon = -\\frac{\\Delta\\Phi}{\\Delta t}",
    description: "Elektromagnit induksiya EYKi",
    variables: [
      { symbol: "\\varepsilon", name: "Induksiya EYKi", unit: "V" },
      { symbol: "\\Delta\\Phi", name: "Magnit oqimi o'zgarishi", unit: "Wb" },
      { symbol: "\\Delta t", name: "Vaqt oralig'i", unit: "s" },
    ],
    category: "magnetism",
  },
  {
    id: "inductance",
    name: "Induktivlik",
    formula: "L = \\frac{\\Phi}{I}",
    description: "G'altakning induktivligi",
    variables: [
      { symbol: "L", name: "Induktivlik", unit: "H" },
      { symbol: "\\Phi", name: "Magnit oqimi", unit: "Wb" },
      { symbol: "I", name: "Tok kuchi", unit: "A" },
    ],
    category: "magnetism",
  },
  {
    id: "self_induction",
    name: "O'z-o'zini induksiya EYKi",
    formula: "\\varepsilon_L = -L\\frac{\\Delta I}{\\Delta t}",
    description: "Tokni o'zgartganda hosil bo'ladigan EYK",
    variables: [
      { symbol: "\\varepsilon_L", name: "O'z-o'zini induksiya EYKi", unit: "V" },
      { symbol: "L", name: "Induktivlik", unit: "H" },
      { symbol: "\\Delta I", name: "Tok o'zgarishi", unit: "A" },
      { symbol: "\\Delta t", name: "Vaqt oralig'i", unit: "s" },
    ],
    category: "magnetism",
  },
  {
    id: "magnetic_energy",
    name: "Magnit maydon energiyasi",
    formula: "W = \\frac{LI^2}{2}",
    description: "G'altakda to'plangan magnit maydon energiyasi",
    variables: [
      { symbol: "W", name: "Energiya", unit: "J" },
      { symbol: "L", name: "Induktivlik", unit: "H" },
      { symbol: "I", name: "Tok kuchi", unit: "A" },
    ],
    category: "magnetism",
  },

  // Optika
  {
    id: "reflection_law",
    name: "Qaytish qonuni",
    formula: "\\alpha = \\beta",
    description: "Tushish burchagi qaytish burchagiga teng",
    variables: [
      { symbol: "\\alpha", name: "Tushish burchagi", unit: "°" },
      { symbol: "\\beta", name: "Qaytish burchagi", unit: "°" },
    ],
    category: "optics",
  },
  {
    id: "snells_law",
    name: "Sinish qonuni",
    formula: "n_1 \\sin\\alpha = n_2 \\sin\\beta",
    description: "Yorug'lik sinishi qonuni",
    variables: [
      { symbol: "n_1", name: "Birinchi muhit sindirish ko'rsatkichi", unit: "-" },
      { symbol: "n_2", name: "Ikkinchi muhit sindirish ko'rsatkichi", unit: "-" },
      { symbol: "\\alpha", name: "Tushish burchagi", unit: "°" },
      { symbol: "\\beta", name: "Sinish burchagi", unit: "°" },
    ],
    category: "optics",
  },
  {
    id: "critical_angle",
    name: "To'liq ichki qaytish burchagi",
    formula: "\\sin\\alpha_k = \\frac{n_2}{n_1}",
    description: "To'liq ichki qaytish boshlanadiganburchak",
    variables: [
      { symbol: "\\alpha_k", name: "Kritik burchak", unit: "°" },
      { symbol: "n_1", name: "Zich muhit sindirish ko'rsatkichi", unit: "-" },
      { symbol: "n_2", name: "Siyrak muhit sindirish ko'rsatkichi", unit: "-" },
    ],
    category: "optics",
  },
  {
    id: "lens_formula",
    name: "Linza formulasi",
    formula: "\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}",
    description: "Linza fokus masofasi va tasvir masofasi bog'lanishi",
    variables: [
      { symbol: "F", name: "Fokus masofa", unit: "m" },
      { symbol: "d", name: "Predmetgacha masofa", unit: "m" },
      { symbol: "f", name: "Tasvirgacha masofa", unit: "m" },
    ],
    category: "optics",
  },
  {
    id: "magnification",
    name: "Kattalashtirish",
    formula: "\\Gamma = \\frac{H}{h} = \\frac{f}{d}",
    description: "Linza yoki ko'zgu kattalashtiruvi",
    variables: [
      { symbol: "\\Gamma", name: "Kattalashtirish", unit: "-" },
      { symbol: "H", name: "Tasvir balandligi", unit: "m" },
      { symbol: "h", name: "Predmet balandligi", unit: "m" },
      { symbol: "f", name: "Tasvirgacha masofa", unit: "m" },
      { symbol: "d", name: "Predmetgacha masofa", unit: "m" },
    ],
    category: "optics",
  },
  {
    id: "optical_power",
    name: "Optik kuch",
    formula: "D = \\frac{1}{F}",
    description: "Linzaning optik kuchi",
    variables: [
      { symbol: "D", name: "Optik kuch", unit: "dptr" },
      { symbol: "F", name: "Fokus masofa", unit: "m" },
    ],
    category: "optics",
  },
  {
    id: "interference_max",
    name: "Interferensiya maksimumi",
    formula: "\\Delta = k\\lambda",
    description: "Konstruktiv interferensiya sharti",
    variables: [
      { symbol: "\\Delta", name: "Yo'l farqi", unit: "m" },
      { symbol: "k", name: "Tartib soni", unit: "-" },
      { symbol: "\\lambda", name: "To'lqin uzunligi", unit: "m" },
    ],
    category: "optics",
  },
  {
    id: "diffraction_grating",
    name: "Difraksion panjara",
    formula: "d\\sin\\theta = k\\lambda",
    description: "Difraksion panjara maksimumi sharti",
    variables: [
      { symbol: "d", name: "Panjara davri", unit: "m" },
      { symbol: "\\theta", name: "Difraksiya burchagi", unit: "°" },
      { symbol: "k", name: "Tartib soni", unit: "-" },
      { symbol: "\\lambda", name: "To'lqin uzunligi", unit: "m" },
    ],
    category: "optics",
  },

  // Atom fizikasi
  {
    id: "photoelectric",
    name: "Fotoeffekt tenglamasi",
    formula: "h\\nu = A + \\frac{m_e v^2}{2}",
    description: "Eynshteyn fotoeffekt tenglamasi",
    variables: [
      { symbol: "h", name: "Plank doimiysi", unit: "J·s" },
      { symbol: "\\nu", name: "Yorug'lik chastotasi", unit: "Hz" },
      { symbol: "A", name: "Chiqish ishi", unit: "J" },
      { symbol: "m_e", name: "Elektron massasi", unit: "kg" },
      { symbol: "v", name: "Elektron tezligi", unit: "m/s" },
    ],
    category: "atomic",
  },
  {
    id: "photon_energy",
    name: "Foton energiyasi",
    formula: "E = h\\nu = \\frac{hc}{\\lambda}",
    description: "Yorug'lik kvantining energiyasi",
    variables: [
      { symbol: "E", name: "Foton energiyasi", unit: "J" },
      { symbol: "h", name: "Plank doimiysi", unit: "J·s" },
      { symbol: "\\nu", name: "Chastota", unit: "Hz" },
      { symbol: "c", name: "Yorug'lik tezligi", unit: "m/s" },
      { symbol: "\\lambda", name: "To'lqin uzunligi", unit: "m" },
    ],
    category: "atomic",
  },
  {
    id: "de_broglie",
    name: "De Broyl to'lqin uzunligi",
    formula: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
    description: "Zarraning to'lqin xususiyati",
    variables: [
      { symbol: "\\lambda", name: "To'lqin uzunligi", unit: "m" },
      { symbol: "h", name: "Plank doimiysi", unit: "J·s" },
      { symbol: "p", name: "Impuls", unit: "kg·m/s" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "v", name: "Tezlik", unit: "m/s" },
    ],
    category: "atomic",
  },
  {
    id: "bohr_radius",
    name: "Bor radiusi",
    formula: "r_n = n^2 r_1",
    description: "Vodorod atomida elektron orbitasi radiusi",
    variables: [
      { symbol: "r_n", name: "n-chi orbit radiusi", unit: "m" },
      { symbol: "n", name: "Asosiy kvant soni", unit: "-" },
      { symbol: "r_1", name: "Birinchi orbit radiusi", unit: "m" },
    ],
    category: "atomic",
  },
  {
    id: "bohr_energy",
    name: "Bor energiyasi",
    formula: "E_n = -\\frac{13.6}{n^2} \\text{ eV}",
    description: "Vodorod atomida elektron energiyasi",
    variables: [
      { symbol: "E_n", name: "n-chi sath energiyasi", unit: "eV" },
      { symbol: "n", name: "Asosiy kvant soni", unit: "-" },
    ],
    category: "atomic",
  },
  {
    id: "mass_energy",
    name: "Massa-energiya ekvivalentligi",
    formula: "E = mc^2",
    description: "Eynshteyn massa-energiya munosabati",
    variables: [
      { symbol: "E", name: "Energiya", unit: "J" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "c", name: "Yorug'lik tezligi", unit: "m/s" },
    ],
    category: "atomic",
  },
  {
    id: "radioactive_decay",
    name: "Radioaktiv yemirilish",
    formula: "N = N_0 \\cdot 2^{-\\frac{t}{T_{1/2}}}",
    description: "Radioaktiv yadrolar sonining vaqtga bog'liqligi",
    variables: [
      { symbol: "N", name: "Qolgan yadrolar soni", unit: "-" },
      { symbol: "N_0", name: "Boshlang'ich yadrolar soni", unit: "-" },
      { symbol: "t", name: "Vaqt", unit: "s" },
      { symbol: "T_{1/2}", name: "Yarim yemirilish davri", unit: "s" },
    ],
    category: "atomic",
  },
  {
    id: "binding_energy",
    name: "Bog'lanish energiyasi",
    formula: "E_b = \\Delta m \\cdot c^2",
    description: "Yadro bog'lanish energiyasi",
    variables: [
      { symbol: "E_b", name: "Bog'lanish energiyasi", unit: "J" },
      { symbol: "\\Delta m", name: "Massa defekti", unit: "kg" },
      { symbol: "c", name: "Yorug'lik tezligi", unit: "m/s" },
    ],
    category: "atomic",
  },
];

export const getFormulasByCategory = (categoryId: string): Formula[] => {
  return formulas.filter((f) => f.category === categoryId);
};

export const searchFormulas = (query: string): Formula[] => {
  const lowerQuery = query.toLowerCase();
  return formulas.filter(
    (f) =>
      f.name.toLowerCase().includes(lowerQuery) ||
      f.description.toLowerCase().includes(lowerQuery) ||
      f.variables.some((v) => v.name.toLowerCase().includes(lowerQuery))
  );
};
