import { PhysicsSimulation } from "@/types/physics";

export const simulations: PhysicsSimulation[] = [
  {
    id: "pendulum",
    title: "Simple Pendulum",
    titleUz: "Oddiy mayatnik",
    description: "Explore the motion of a simple pendulum and how its period depends on length and gravity.",
    descriptionUz: "Oddiy mayatnikning harakatini va uning davri uzunlik va tortishish kuchiga qanday bog'liqligini o'rganing.",
    icon: "⏱️",
    parameters: [
      { id: "length", name: "String Length", nameUz: "Ip uzunligi", min: 0.1, max: 3, step: 0.1, value: 1, unit: "m" },
      { id: "mass", name: "Bob Mass", nameUz: "Yuk massasi", min: 0.1, max: 5, step: 0.1, value: 1, unit: "kg" },
      { id: "gravity", name: "Gravity", nameUz: "Erkin tushish tezlanishi", min: 1, max: 25, step: 0.1, value: 9.8, unit: "m/s²" },
      { id: "angle", name: "Initial Angle", nameUz: "Boshlang'ich burchak", min: 5, max: 45, step: 1, value: 20, unit: "°" },
    ],
    presets: [
      { id: "earth", nameUz: "🌍 Yer", description: "Yerdagi standart gravitatsiya", values: { gravity: 9.8 } },
      { id: "moon", nameUz: "🌙 Oy", description: "Oydagi gravitatsiya (g=1.62)", values: { gravity: 1.62 } },
      { id: "mars", nameUz: "🔴 Mars", description: "Marsdagi gravitatsiya (g=3.71)", values: { gravity: 3.71 } },
      { id: "jupiter", nameUz: "🟤 Yupiter", description: "Yupiterdagi gravitatsiya (g=24.79)", values: { gravity: 24.79 } },
      { id: "longPendulum", nameUz: "📏 Uzun mayatnik", description: "3 metrlik uzun mayatnik", values: { length: 3, angle: 15 } },
      { id: "heavyBob", nameUz: "⚫ Og'ir yuk", description: "5 kg og'ir yuk bilan", values: { mass: 5, length: 1.5 } },
    ],
    theoryUz: `Oddiy mayatnik - bu og'irlik kuchi ta'sirida tebranuvchi, cho'zilmaydigan ipga osilgan nuqtaviy jism. Mayatnik kichik burchaklarda (< 15°) garmonik tebranish hosil qiladi.

Mayatnikning tebranish davri T faqat ip uzunligi L va erkin tushish tezlanishi g ga bog'liq bo'lib, yuk massasiga bog'liq emas. Bu xususiyat Galiley tomonidan kashf qilingan.

Mayatnikning energiyasi tebranish davomida kinetik va potensial energiya o'rtasida almashib turadi, lekin to'liq mexanik energiya saqlanib qoladi (ishqalanish hisobga olinmasa).`,
    theory: `A simple pendulum consists of a point mass suspended from an inextensible string, oscillating under the influence of gravity. For small angles (< 15°), it exhibits simple harmonic motion.`,
    formulas: [
      { formula: "T = 2π√(L/g)", latex: "T = 2\\pi\\sqrt{\\frac{L}{g}}", description: "Period of oscillation", descriptionUz: "Tebranish davri" },
      { formula: "f = 1/T", latex: "f = \\frac{1}{T} = \\frac{1}{2\\pi}\\sqrt{\\frac{g}{L}}", description: "Frequency", descriptionUz: "Chastota" },
      { formula: "ω = √(g/L)", latex: "\\omega = \\sqrt{\\frac{g}{L}}", description: "Angular frequency", descriptionUz: "Burchak chastotasi" },
      { formula: "θ(t) = θ₀cos(ωt)", latex: "\\theta(t) = \\theta_0 \\cos(\\omega t)", description: "Angular displacement", descriptionUz: "Burchak siljishi" },
      { formula: "E = mgh = ½mv²", latex: "E = mgh = \\frac{1}{2}mv^2", description: "Energy conservation", descriptionUz: "Energiyaning saqlanishi" },
    ],
  },
  {
    id: "projectile",
    title: "Projectile Motion",
    titleUz: "Gorizontal otilgan jism",
    description: "Visualize the trajectory of a projectile under gravity.",
    descriptionUz: "Tortishish kuchi ta'sirida otilgan jismning traektoriyasini vizualizatsiya qiling.",
    icon: "🎯",
    parameters: [
      { id: "velocity", name: "Initial Velocity", nameUz: "Boshlang'ich tezlik", min: 5, max: 50, step: 1, value: 20, unit: "m/s" },
      { id: "angle", name: "Launch Angle", nameUz: "Otish burchagi", min: 10, max: 80, step: 1, value: 45, unit: "°" },
      { id: "gravity", name: "Gravity", nameUz: "Erkin tushish tezlanishi", min: 1, max: 25, step: 0.1, value: 9.8, unit: "m/s²" },
      { id: "height", name: "Initial Height", nameUz: "Boshlang'ich balandlik", min: 0, max: 20, step: 0.5, value: 0, unit: "m" },
      { id: "mass", name: "Mass", nameUz: "Jism massasi", min: 0.1, max: 10, step: 0.1, value: 1, unit: "kg" },
      { id: "airResistance", name: "Air Resistance", nameUz: "Havo qarshiligi", min: 0, max: 0.5, step: 0.05, value: 0, unit: "" },
    ],
    presets: [
      { id: "maxRange", nameUz: "📏 Maksimal masofa", description: "45° burchakda maksimal uzoqlik", values: { angle: 45, velocity: 30 } },
      { id: "highAngle", nameUz: "🔼 Yuqori burchak", description: "Baland traektoriya", values: { angle: 70, velocity: 25 } },
      { id: "lowAngle", nameUz: "🔽 Past burchak", description: "Past traektoriya", values: { angle: 20, velocity: 35 } },
      { id: "moonLanding", nameUz: "🌙 Oyda otish", description: "Oy gravitatsiyasida", values: { gravity: 1.62, velocity: 15, angle: 45 } },
      { id: "heavyObject", nameUz: "🏋️ Og'ir jism", description: "Og'ir jism havo qarshiligi bilan", values: { mass: 10, airResistance: 0.1 } },
      { id: "basketball", nameUz: "🏀 Basketbol", description: "To'p tashlash", values: { velocity: 8, angle: 50, height: 2 } },
    ],
    theoryUz: `Gorizontal otilgan jism harakati - bu jism boshlang'ich tezlik bilan burchak ostida otilganda hosil bo'ladigan harakat. Bu harakat ikki mustaqil komponentdan iborat:

1. Gorizontal harakat - tekis harakat (tezlanishsiz)
2. Vertikal harakat - tekis tezlanuvchan harakat (erkin tushish)

Traektoriya parabolik shaklga ega. Maksimal uzoqlik 45° burchakda erishiladi.`,
    theory: `Projectile motion consists of two independent components: uniform horizontal motion and uniformly accelerated vertical motion (free fall). The trajectory is parabolic.`,
    formulas: [
      { formula: "R = v₀²sin(2θ)/g", latex: "R = \\frac{v_0^2 \\sin(2\\theta)}{g}", description: "Range", descriptionUz: "Uchish masofasi" },
      { formula: "H = v₀²sin²(θ)/2g", latex: "H = \\frac{v_0^2 \\sin^2(\\theta)}{2g}", description: "Maximum height", descriptionUz: "Maksimal balandlik" },
      { formula: "t = 2v₀sin(θ)/g", latex: "t = \\frac{2v_0 \\sin(\\theta)}{g}", description: "Time of flight", descriptionUz: "Uchish vaqti" },
      { formula: "x = v₀cos(θ)·t", latex: "x = v_0 \\cos(\\theta) \\cdot t", description: "Horizontal position", descriptionUz: "Gorizontal joy" },
      { formula: "y = v₀sin(θ)·t - ½gt²", latex: "y = v_0 \\sin(\\theta) \\cdot t - \\frac{1}{2}gt^2", description: "Vertical position", descriptionUz: "Vertikal joy" },
    ],
  },
  {
    id: "spring",
    title: "Spring Oscillation",
    titleUz: "Prujinali tebranish",
    description: "Study harmonic motion of a mass-spring system.",
    descriptionUz: "Prujina-yuk tizimining garmonik harakatini o'rganing.",
    icon: "🔄",
    parameters: [
      { id: "springConstant", name: "Spring Constant", nameUz: "Prujina bikrligi", min: 10, max: 200, step: 5, value: 50, unit: "N/m" },
      { id: "mass", name: "Mass", nameUz: "Massa", min: 0.1, max: 5, step: 0.1, value: 1, unit: "kg" },
      { id: "amplitude", name: "Amplitude", nameUz: "Amplituda", min: 0.05, max: 0.5, step: 0.01, value: 0.2, unit: "m" },
      { id: "damping", name: "Damping", nameUz: "So'nish koeffitsienti", min: 0, max: 1, step: 0.05, value: 0.1, unit: "" },
    ],
    presets: [
      { id: "stiff", nameUz: "🔩 Qattiq prujina", description: "Yuqori bikrlikli prujina", values: { springConstant: 200, mass: 1 } },
      { id: "soft", nameUz: "🧵 Yumshoq prujina", description: "Past bikrlikli prujina", values: { springConstant: 20, mass: 1 } },
      { id: "heavyMass", nameUz: "⚫ Og'ir yuk", description: "Og'ir yuk bilan tebranish", values: { mass: 5, springConstant: 100 } },
      { id: "undamped", nameUz: "♾️ So'nmasdan", description: "So'nishsiz ideal tebranish", values: { damping: 0, amplitude: 0.3 } },
      { id: "overdamped", nameUz: "🛑 Kuchli so'nish", description: "Tez so'nadigan tebranish", values: { damping: 0.8, amplitude: 0.4 } },
      { id: "carSuspension", nameUz: "🚗 Avtomobil amortizatori", description: "Real amortizator", values: { springConstant: 80, damping: 0.3, mass: 2 } },
    ],
    theoryUz: `Prujinali tebranish - bu Guk qonuniga bo'ysunadigan elastik kuch ta'sirida hosil bo'ladigan garmonik tebranish.

Guk qonuni: F = -kx (bu yerda k - prujina bikrligi, x - cho'zilish)

Tebranish davri faqat prujina bikrligi va yuk massasiga bog'liq, amplitudaga bog'liq emas.`,
    theory: `Spring oscillation is simple harmonic motion governed by Hooke's Law. The period depends only on spring constant and mass, not amplitude.`,
    formulas: [
      { formula: "F = -kx", latex: "F = -kx", description: "Hooke's Law", descriptionUz: "Guk qonuni" },
      { formula: "T = 2π√(m/k)", latex: "T = 2\\pi\\sqrt{\\frac{m}{k}}", description: "Period", descriptionUz: "Tebranish davri" },
      { formula: "ω = √(k/m)", latex: "\\omega = \\sqrt{\\frac{k}{m}}", description: "Angular frequency", descriptionUz: "Burchak chastotasi" },
      { formula: "x(t) = A·cos(ωt + φ)", latex: "x(t) = A \\cos(\\omega t + \\varphi)", description: "Position", descriptionUz: "Joy funksiyasi" },
      { formula: "E = ½kA²", latex: "E = \\frac{1}{2}kA^2", description: "Total energy", descriptionUz: "To'liq energiya" },
    ],
  },
  {
    id: "wave",
    title: "Wave Motion",
    titleUz: "To'lqin harakati",
    description: "Explore transverse wave properties and behavior.",
    descriptionUz: "Ko'ndalang to'lqin xususiyatlari va xatti-harakatlarini o'rganing.",
    icon: "🌊",
    parameters: [
      { id: "amplitude", name: "Amplitude", nameUz: "Amplituda", min: 10, max: 80, step: 5, value: 40, unit: "px" },
      { id: "wavelength", name: "Wavelength", nameUz: "To'lqin uzunligi", min: 50, max: 300, step: 10, value: 150, unit: "px" },
      { id: "frequency", name: "Frequency", nameUz: "Chastota", min: 0.5, max: 5, step: 0.1, value: 1, unit: "Hz" },
      { id: "speed", name: "Wave Speed", nameUz: "To'lqin tezligi", min: 50, max: 300, step: 10, value: 150, unit: "px/s" },
    ],
    presets: [
      { id: "lowFreq", nameUz: "📻 Past chastota", description: "Sekin to'lqin", values: { frequency: 0.5, wavelength: 250 } },
      { id: "highFreq", nameUz: "📡 Yuqori chastota", description: "Tez to'lqin", values: { frequency: 4, wavelength: 80 } },
      { id: "highAmplitude", nameUz: "📈 Katta amplituda", description: "Baland to'lqin", values: { amplitude: 70, frequency: 1.5 } },
      { id: "longWave", nameUz: "〰️ Uzun to'lqin", description: "Radio to'lqinlar kabi", values: { wavelength: 300, frequency: 0.8 } },
      { id: "shortWave", nameUz: "∿ Qisqa to'lqin", description: "Rentgen nurlari kabi", values: { wavelength: 60, frequency: 3 } },
    ],
    theoryUz: `To'lqin - bu tebranishlarning muhitda tarqalishi. Ko'ndalang to'lqinlarda zarralar to'lqin tarqalish yo'nalishiga perpendikulyar tebranadi.

To'lqin tezligi v = λf formula bilan aniqlanadi. Bu universal formula barcha to'lqin turlari uchun amal qiladi.`,
    theory: `A wave is the propagation of oscillations through a medium. Wave speed equals wavelength times frequency.`,
    formulas: [
      { formula: "v = λf", latex: "v = \\lambda f", description: "Wave speed", descriptionUz: "To'lqin tezligi" },
      { formula: "T = 1/f", latex: "T = \\frac{1}{f}", description: "Period", descriptionUz: "Davr" },
      { formula: "λ = vT", latex: "\\lambda = vT", description: "Wavelength", descriptionUz: "To'lqin uzunligi" },
      { formula: "y = A·sin(kx - ωt)", latex: "y = A \\sin(kx - \\omega t)", description: "Wave equation", descriptionUz: "To'lqin tenglamasi" },
      { formula: "k = 2π/λ", latex: "k = \\frac{2\\pi}{\\lambda}", description: "Wave number", descriptionUz: "To'lqin soni" },
    ],
  },
  {
    id: "freefall",
    title: "Free Fall",
    titleUz: "Erkin tushish",
    description: "Observe objects falling under gravity with optional air resistance.",
    descriptionUz: "Jismlarning tortishish kuchi ta'sirida tushishini havo qarshiligi bilan kuzating.",
    icon: "⬇️",
    parameters: [
      { id: "height", name: "Initial Height", nameUz: "Boshlang'ich balandlik", min: 10, max: 200, step: 5, value: 100, unit: "m" },
      { id: "mass", name: "Mass", nameUz: "Massa", min: 0.1, max: 10, step: 0.1, value: 1, unit: "kg" },
      { id: "gravity", name: "Gravity", nameUz: "Erkin tushish tezlanishi", min: 1, max: 25, step: 0.1, value: 9.8, unit: "m/s²" },
      { id: "airResistance", name: "Air Resistance", nameUz: "Havo qarshiligi", min: 0, max: 1, step: 0.05, value: 0, unit: "" },
      { id: "initialVelocity", name: "Initial Velocity", nameUz: "Boshlang'ich tezlik", min: 0, max: 20, step: 1, value: 0, unit: "m/s" },
    ],
    presets: [
      { id: "earthVacuum", nameUz: "🌍 Yer (vakuum)", description: "Havo qarshilisisiz erkin tushish", values: { gravity: 9.8, airResistance: 0 } },
      { id: "moonFall", nameUz: "🌙 Oyda tushish", description: "Oy gravitatsiyasi", values: { gravity: 1.62, airResistance: 0 } },
      { id: "marsFall", nameUz: "🔴 Marsda tushish", description: "Mars gravitatsiyasi va atmosferasi", values: { gravity: 3.71, airResistance: 0.3 } },
      { id: "featherEarth", nameUz: "🪶 Patda tushish", description: "Havo qarshiligi bilan yengil jism", values: { mass: 0.1, airResistance: 0.8 } },
      { id: "skydiver", nameUz: "🪂 Parashyutchi", description: "Parashyutsiz sakrash", values: { height: 200, mass: 80, airResistance: 0.2, initialVelocity: 0 } },
      { id: "throwDown", nameUz: "⬇️ Pastga otish", description: "Boshlang'ich tezlik bilan", values: { initialVelocity: 15, height: 150 } },
    ],
    theoryUz: `Erkin tushish - bu jismning faqat og'irlik kuchi ta'sirida harakati. Vakuumda barcha jismlar massasidan qat'i nazar bir xil tezlanish bilan tushadi.

Yerda erkin tushish tezlanishi g ≈ 9.8 m/s².`,
    theory: `Free fall is motion under gravity alone. In a vacuum, all objects fall with the same acceleration regardless of mass.`,
    formulas: [
      { formula: "h = ½gt²", latex: "h = \\frac{1}{2}gt^2", description: "Distance fallen", descriptionUz: "Bosib o'tilgan masofa" },
      { formula: "v = gt", latex: "v = gt", description: "Velocity", descriptionUz: "Tezlik" },
      { formula: "v = √(2gh)", latex: "v = \\sqrt{2gh}", description: "Velocity from height", descriptionUz: "Balandlikdan tezlik" },
      { formula: "t = √(2h/g)", latex: "t = \\sqrt{\\frac{2h}{g}}", description: "Time to fall", descriptionUz: "Tushish vaqti" },
      { formula: "F = mg", latex: "F = mg", description: "Weight force", descriptionUz: "Og'irlik kuchi" },
    ],
  },
  {
    id: "collision",
    title: "Elastic Collision",
    titleUz: "Elastik to'qnashuv",
    description: "Study momentum and energy conservation in collisions.",
    descriptionUz: "To'qnashuvlarda impuls va energiyaning saqlanishini o'rganing.",
    icon: "💥",
    parameters: [
      { id: "mass1", name: "Mass 1", nameUz: "1-jism massasi", min: 0.5, max: 5, step: 0.1, value: 1, unit: "kg" },
      { id: "mass2", name: "Mass 2", nameUz: "2-jism massasi", min: 0.5, max: 5, step: 0.1, value: 2, unit: "kg" },
      { id: "velocity1", name: "Velocity 1", nameUz: "1-jism tezligi", min: -10, max: 10, step: 0.5, value: 5, unit: "m/s" },
      { id: "velocity2", name: "Velocity 2", nameUz: "2-jism tezligi", min: -10, max: 10, step: 0.5, value: -2, unit: "m/s" },
      { id: "restitution", name: "Coefficient of Restitution", nameUz: "Qaytish koeffitsienti", min: 0, max: 1, step: 0.1, value: 1, unit: "" },
    ],
    presets: [
      { id: "elastic", nameUz: "🎱 Elastik to'qnashuv", description: "Ideal elastik to'qnashuv", values: { restitution: 1 } },
      { id: "inelastic", nameUz: "🧱 Noelastik", description: "To'liq noelastik to'qnashuv", values: { restitution: 0 } },
      { id: "billiard", nameUz: "🎱 Bilyard", description: "Bilyard to'plari", values: { mass1: 1, mass2: 1, velocity1: 5, velocity2: 0, restitution: 0.95 } },
      { id: "heavyVsLight", nameUz: "⚖️ Og'ir va yengil", description: "Massa farqi katta", values: { mass1: 5, mass2: 0.5, velocity1: 3, velocity2: 0 } },
      { id: "headOn", nameUz: "💥 Qarama-qarshi", description: "Bir-biriga qarab harakat", values: { velocity1: 5, velocity2: -5, mass1: 2, mass2: 2 } },
      { id: "carCrash", nameUz: "🚗 Avtomobil", description: "Avtomobil to'qnashuvi", values: { mass1: 1.5, mass2: 2, velocity1: 8, velocity2: -3, restitution: 0.3 } },
    ],
    theoryUz: `Elastik to'qnashuv - bu to'qnashuvda ham impuls, ham kinetik energiya saqlanadigan to'qnashuv turi.

Impulsning saqlanish qonuni: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'`,
    theory: `In elastic collisions, both momentum and kinetic energy are conserved.`,
    formulas: [
      { formula: "p = mv", latex: "p = mv", description: "Momentum", descriptionUz: "Impuls" },
      { formula: "Σp = const", latex: "\\sum p = \\text{const}", description: "Momentum conservation", descriptionUz: "Impulsning saqlanishi" },
      { formula: "KE = ½mv²", latex: "KE = \\frac{1}{2}mv^2", description: "Kinetic energy", descriptionUz: "Kinetik energiya" },
      { formula: "v₁' = ...", latex: "v_1' = \\frac{(m_1-m_2)v_1 + 2m_2v_2}{m_1+m_2}", description: "Final velocity 1", descriptionUz: "1-jism yakuniy tezligi" },
      { formula: "v₂' = ...", latex: "v_2' = \\frac{(m_2-m_1)v_2 + 2m_1v_1}{m_1+m_2}", description: "Final velocity 2", descriptionUz: "2-jism yakuniy tezligi" },
    ],
  },
  {
    id: "inclinedPlane",
    title: "Inclined Plane",
    titleUz: "Qiya tekislik",
    description: "Analyze motion on an inclined surface with friction.",
    descriptionUz: "Ishqalanish kuchili qiya sirtda harakatni tahlil qiling.",
    icon: "📐",
    parameters: [
      { id: "angle", name: "Inclination Angle", nameUz: "Qiyalik burchagi", min: 5, max: 60, step: 1, value: 30, unit: "°" },
      { id: "mass", name: "Mass", nameUz: "Massa", min: 0.5, max: 10, step: 0.5, value: 2, unit: "kg" },
      { id: "friction", name: "Friction Coefficient", nameUz: "Ishqalanish koeffitsienti", min: 0, max: 1, step: 0.05, value: 0.2, unit: "" },
      { id: "gravity", name: "Gravity", nameUz: "Erkin tushish tezlanishi", min: 1, max: 25, step: 0.1, value: 9.8, unit: "m/s²" },
      { id: "initialVelocity", name: "Initial Velocity", nameUz: "Boshlang'ich tezlik", min: 0, max: 10, step: 0.5, value: 0, unit: "m/s" },
      { id: "planeLength", name: "Plane Length", nameUz: "Tekislik uzunligi", min: 5, max: 30, step: 1, value: 10, unit: "m" },
    ],
    presets: [
      { id: "frictionless", nameUz: "🧊 Muz ustida", description: "Ishqalanishsiz sirt", values: { friction: 0, angle: 30 } },
      { id: "steepIcy", nameUz: "🏔️ Tik tog'", description: "Qor-muzli tik qiyalik", values: { angle: 45, friction: 0.1 } },
      { id: "gentleSlope", nameUz: "🛝 Sekin qiyalik", description: "Past burchakli sirt", values: { angle: 15, friction: 0.3 } },
      { id: "roughSurface", nameUz: "🪨 Dag'al sirt", description: "Yuqori ishqalanish", values: { friction: 0.7, angle: 40 } },
      { id: "skiSlope", nameUz: "⛷️ Chang'i yo'li", description: "Qor ustida sirpanish", values: { angle: 25, friction: 0.05, planeLength: 20 } },
      { id: "skateboard", nameUz: "🛹 Skeytbord rampa", description: "Skeytbord uchun rampa", values: { angle: 35, friction: 0.15, initialVelocity: 2 } },
    ],
    theoryUz: `Qiya tekislik - bu oddiy mexanizmlardan biri. Jism qiya tekislikda joylashganda, og'irlik kuchi ikki komponentga ajraladi.

Jism harakati uchun tanθ > μ bo'lishi kerak.`,
    theory: `An inclined plane decomposes gravitational force into parallel and perpendicular components. Motion occurs when tanθ > μ.`,
    formulas: [
      { formula: "a = g(sinθ - μcosθ)", latex: "a = g(\\sin\\theta - \\mu\\cos\\theta)", description: "Acceleration", descriptionUz: "Tezlanish" },
      { formula: "F∥ = mg·sinθ", latex: "F_{\\parallel} = mg\\sin\\theta", description: "Parallel force", descriptionUz: "Parallel kuch" },
      { formula: "N = mg·cosθ", latex: "N = mg\\cos\\theta", description: "Normal force", descriptionUz: "Normal kuch" },
      { formula: "Ff = μN", latex: "F_f = \\mu N = \\mu mg\\cos\\theta", description: "Friction force", descriptionUz: "Ishqalanish kuchi" },
      { formula: "v = √(2as)", latex: "v = \\sqrt{2as}", description: "Final velocity", descriptionUz: "Yakuniy tezlik" },
    ],
  },
  {
    id: "circularMotion",
    title: "Circular Motion",
    titleUz: "Aylana bo'ylab harakat",
    description: "Study uniform circular motion and centripetal force.",
    descriptionUz: "Tekis aylana bo'ylab harakat va markazga intiluvchi kuchni o'rganing.",
    icon: "🔵",
    parameters: [
      { id: "radius", name: "Radius", nameUz: "Radius", min: 0.5, max: 5, step: 0.1, value: 2, unit: "m" },
      { id: "angularVelocity", name: "Angular Velocity", nameUz: "Burchak tezligi", min: 0.5, max: 10, step: 0.1, value: 2, unit: "rad/s" },
      { id: "mass", name: "Mass", nameUz: "Massa", min: 0.1, max: 5, step: 0.1, value: 1, unit: "kg" },
      { id: "initialAngle", name: "Initial Angle", nameUz: "Boshlang'ich burchak", min: 0, max: 360, step: 15, value: 0, unit: "°" },
    ],
    presets: [
      { id: "satellite", nameUz: "🛰️ Sun'iy yo'ldosh", description: "Yer atrofida aylanish", values: { radius: 4, angularVelocity: 1.5, mass: 2 } },
      { id: "ferrisWheel", nameUz: "🎡 Charxpalak", description: "Sekin aylanadigan charxpalak", values: { radius: 5, angularVelocity: 0.5, mass: 3 } },
      { id: "centrifuge", nameUz: "🔬 Sentrifuga", description: "Tez aylanadigan sentrifuga", values: { radius: 1, angularVelocity: 10, mass: 0.5 } },
      { id: "carTurn", nameUz: "🚗 Avtomobil burilishi", description: "Burilishdagi avtomobil", values: { radius: 3, angularVelocity: 2, mass: 1.5 } },
      { id: "planetOrbit", nameUz: "🌍 Sayyora orbita", description: "Quyosh atrofida aylanish", values: { radius: 4.5, angularVelocity: 0.8 } },
    ],
    theoryUz: `Tekis aylana bo'ylab harakat - bu jism bir xil tezlik bilan aylana bo'ylab harakatlangandagi harakat turi.

Markazga intilma tezlanish doimo aylana markaziga yo'nalgan.`,
    theory: `Uniform circular motion occurs when an object moves in a circle at constant speed. Centripetal acceleration always points toward the center.`,
    formulas: [
      { formula: "ac = v²/r", latex: "a_c = \\frac{v^2}{r} = \\omega^2 r", description: "Centripetal acceleration", descriptionUz: "Markazga intilma tezlanish" },
      { formula: "Fc = mv²/r", latex: "F_c = \\frac{mv^2}{r} = m\\omega^2 r", description: "Centripetal force", descriptionUz: "Markazga intilma kuch" },
      { formula: "v = ωr", latex: "v = \\omega r", description: "Linear velocity", descriptionUz: "Chiziqli tezlik" },
      { formula: "T = 2π/ω", latex: "T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi r}{v}", description: "Period", descriptionUz: "Aylanish davri" },
      { formula: "f = 1/T", latex: "f = \\frac{1}{T} = \\frac{\\omega}{2\\pi}", description: "Frequency", descriptionUz: "Chastota" },
    ],
  },
  {
    id: "electricField",
    title: "Electric Field",
    titleUz: "Elektr maydon",
    description: "Visualize electric field lines between point charges.",
    descriptionUz: "Nuqtaviy zaryadlar orasidagi elektr maydon chiziqlarini vizualizatsiya qiling.",
    icon: "⚡",
    parameters: [
      { id: "charge1", name: "Charge 1", nameUz: "1-zaryad", min: -5, max: 5, step: 0.5, value: 2, unit: "µC" },
      { id: "charge2", name: "Charge 2", nameUz: "2-zaryad", min: -5, max: 5, step: 0.5, value: -2, unit: "µC" },
      { id: "distance", name: "Distance", nameUz: "Masofa", min: 1, max: 10, step: 0.5, value: 5, unit: "m" },
      { id: "fieldLines", name: "Field Lines", nameUz: "Maydon chiziqlari soni", min: 8, max: 24, step: 2, value: 12, unit: "" },
    ],
    presets: [
      { id: "dipole", nameUz: "➕➖ Dipol", description: "Musbat va manfiy zaryad", values: { charge1: 3, charge2: -3, distance: 6 } },
      { id: "sameCharges", nameUz: "➕➕ Bir xil zaryadlar", description: "Ikki musbat zaryad (itarishadi)", values: { charge1: 3, charge2: 3, distance: 5 } },
      { id: "strongField", nameUz: "⚡ Kuchli maydon", description: "Katta zaryadlar, yaqin masofa", values: { charge1: 5, charge2: -5, distance: 3, fieldLines: 20 } },
      { id: "weakField", nameUz: "💫 Zaif maydon", description: "Kichik zaryadlar, uzoq masofa", values: { charge1: 1, charge2: -1, distance: 8, fieldLines: 8 } },
      { id: "asymmetric", nameUz: "⚖️ Asimmetrik", description: "Turli kattalikdagi zaryadlar", values: { charge1: 5, charge2: -2, distance: 6 } },
    ],
    theoryUz: `Elektr maydon - bu zaryadli jism atrofidagi fazoda mavjud bo'lgan maydon. U boshqa zaryadlarga kuch ta'sir qilish qobiliyatiga ega.

Kulon qonuni zaryadlar orasidagi kuchni tavsiflaydi. Bir nomdagi zaryadlar itarishadi, turli nomdagi zaryadlar tortishadi.`,
    theory: `An electric field is a region around a charged object where it exerts force on other charges. Coulomb's Law describes the force between charges.`,
    formulas: [
      { formula: "F = kq₁q₂/r²", latex: "F = k\\frac{q_1 q_2}{r^2}", description: "Coulomb's Law", descriptionUz: "Kulon qonuni" },
      { formula: "E = kQ/r²", latex: "E = k\\frac{Q}{r^2}", description: "Electric field", descriptionUz: "Elektr maydon kuchlanganligi" },
      { formula: "k = 8.99×10⁹", latex: "k = 8.99 \\times 10^9 \\, \\frac{N \\cdot m^2}{C^2}", description: "Coulomb constant", descriptionUz: "Kulon doimiysi" },
      { formula: "U = kq/r", latex: "U = k\\frac{q}{r}", description: "Electric potential", descriptionUz: "Elektr potensial" },
      { formula: "W = qU", latex: "W = qU = k\\frac{q_1 q_2}{r}", description: "Potential energy", descriptionUz: "Potensial energiya" },
    ],
  },
  {
    id: "magneticInduction",
    title: "Magnetic Induction",
    titleUz: "Magnit induksiya",
    description: "Explore magnetic field in a solenoid and electromagnetic induction.",
    descriptionUz: "Solenoiddagi magnit maydon va elektromagnit induksiyani o'rganing.",
    icon: "🧲",
    parameters: [
      { id: "current", name: "Current", nameUz: "Tok kuchi", min: 0, max: 10, step: 0.5, value: 5, unit: "A" },
      { id: "coilTurns", name: "Coil Turns", nameUz: "O'ramlar soni", min: 5, max: 30, step: 1, value: 15, unit: "" },
      { id: "velocity", name: "Animation Speed", nameUz: "Animatsiya tezligi", min: 0.5, max: 3, step: 0.1, value: 1, unit: "" },
      { id: "coilLength", name: "Coil Length", nameUz: "G'altak uzunligi", min: 5, max: 30, step: 1, value: 15, unit: "sm" },
    ],
    presets: [
      { id: "strongMagnet", nameUz: "🧲 Kuchli magnit", description: "Yuqori tok va ko'p o'ramlar", values: { current: 10, coilTurns: 30, coilLength: 20 } },
      { id: "weakMagnet", nameUz: "💫 Zaif magnit", description: "Past tok, kam o'ramlar", values: { current: 2, coilTurns: 8, coilLength: 10 } },
      { id: "compactCoil", nameUz: "🔌 Ixcham g'altak", description: "Qisqa, zich g'altak", values: { coilLength: 5, coilTurns: 25 } },
      { id: "longSolenoid", nameUz: "📏 Uzun solenoid", description: "Uzun solenoid", values: { coilLength: 30, coilTurns: 20 } },
      { id: "motor", nameUz: "⚡ Elektr motor", description: "Motor uchun o'ram", values: { current: 8, coilTurns: 20, coilLength: 15 } },
    ],
    theoryUz: `Magnit induksiya - bu elektr tokining magnit maydon hosil qilishi va magnit maydon o'zgarishi natijasida elektr toki paydo bo'lishi hodisasi.

Solenoid ichida bir jinsli magnit maydon hosil bo'ladi. Faradey qonuni elektromagnit induksiyani tavsiflaydi.`,
    theory: `Magnetic induction involves electric current creating magnetic fields and changing magnetic fields inducing electric current.`,
    formulas: [
      { formula: "B = μ₀nI", latex: "B = \\mu_0 n I", description: "Magnetic field in solenoid", descriptionUz: "Solenoiddagi magnit maydon" },
      { formula: "μ₀ = 4π×10⁻⁷", latex: "\\mu_0 = 4\\pi \\times 10^{-7} \\, \\frac{T \\cdot m}{A}", description: "Permeability", descriptionUz: "Magnit doimiysi" },
      { formula: "Φ = B·S·cosθ", latex: "\\Phi = BS\\cos\\theta", description: "Magnetic flux", descriptionUz: "Magnit oqimi" },
      { formula: "ε = -dΦ/dt", latex: "\\varepsilon = -\\frac{d\\Phi}{dt}", description: "Faraday's Law", descriptionUz: "Faradey qonuni" },
      { formula: "F = BIL", latex: "F = BIL", description: "Force on wire", descriptionUz: "Simga ta'sir etuvchi kuch" },
    ],
  },
  {
    id: "refraction",
    title: "Light Refraction",
    titleUz: "Nur sinishi",
    description: "Study Snell's law and total internal reflection.",
    descriptionUz: "Snell qonuni va to'liq ichki qaytishni o'rganing.",
    icon: "🌈",
    parameters: [
      { id: "incidentAngle", name: "Incident Angle", nameUz: "Tushish burchagi", min: 0, max: 89, step: 1, value: 45, unit: "°" },
      { id: "n1", name: "Refractive Index 1", nameUz: "Sindirish ko'rsatkichi 1", min: 1, max: 2.5, step: 0.1, value: 1.5, unit: "" },
      { id: "n2", name: "Refractive Index 2", nameUz: "Sindirish ko'rsatkichi 2", min: 1, max: 2.5, step: 0.1, value: 1, unit: "" },
      { id: "rayIntensity", name: "Ray Intensity", nameUz: "Nur intensivligi", min: 0.3, max: 1, step: 0.1, value: 0.8, unit: "" },
    ],
    presets: [
      { id: "glassToAir", nameUz: "🪟 Shisha → Havo", description: "Shishadan havoga o'tish", values: { n1: 1.5, n2: 1, incidentAngle: 30 } },
      { id: "waterToAir", nameUz: "💧 Suv → Havo", description: "Suvdan havoga o'tish", values: { n1: 1.33, n2: 1, incidentAngle: 40 } },
      { id: "totalReflection", nameUz: "🔄 To'liq qaytish", description: "To'liq ichki qaytish", values: { n1: 1.5, n2: 1, incidentAngle: 45 } },
      { id: "diamond", nameUz: "💎 Olmos", description: "Olmosda nur sinishi", values: { n1: 2.4, n2: 1, incidentAngle: 20 } },
      { id: "airToWater", nameUz: "🌊 Havo → Suv", description: "Havodan suvga o'tish", values: { n1: 1, n2: 1.33, incidentAngle: 50 } },
      { id: "fiber", nameUz: "📡 Optik tolali", description: "Optik tolada yorug'lik", values: { n1: 1.5, n2: 1.4, incidentAngle: 80 } },
    ],
    theoryUz: `Nur sinishi - bu yorug'likning bir muhitdan ikkinchi muhitga o'tishda yo'nalishini o'zgartirishi.

To'liq ichki qaytish: Agar n₁ > n₂ va θ₁ > θc (kritik burchak), yorug'lik to'liq qaytadi.`,
    theory: `Refraction is the bending of light when passing between media. Total internal reflection occurs at angles greater than the critical angle.`,
    formulas: [
      { formula: "n₁sinθ₁ = n₂sinθ₂", latex: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2", description: "Snell's Law", descriptionUz: "Snell qonuni" },
      { formula: "n = c/v", latex: "n = \\frac{c}{v}", description: "Refractive index", descriptionUz: "Sindirish ko'rsatkichi" },
      { formula: "sinθc = n₂/n₁", latex: "\\sin\\theta_c = \\frac{n_2}{n_1}", description: "Critical angle", descriptionUz: "Kritik burchak" },
      { formula: "v = c/n", latex: "v = \\frac{c}{n}", description: "Speed in medium", descriptionUz: "Muhitdagi tezlik" },
      { formula: "λ₂ = λ₁(n₁/n₂)", latex: "\\lambda_2 = \\lambda_1 \\frac{n_1}{n_2}", description: "Wavelength change", descriptionUz: "To'lqin uzunligi" },
    ],
  },
  {
    id: "lens",
    title: "Thin Lens",
    titleUz: "Yupqa linza",
    description: "Study image formation through thin lenses.",
    descriptionUz: "Yupqa linzalar orqali tasvir hosil bo'lishini o'rganing.",
    icon: "🔍",
    parameters: [
      { id: "focalLength", name: "Focal Length", nameUz: "Fokus masofasi", min: 5, max: 50, step: 1, value: 20, unit: "sm" },
      { id: "objectDistance", name: "Object Distance", nameUz: "Buyum masofasi", min: 10, max: 100, step: 1, value: 40, unit: "sm" },
      { id: "objectHeight", name: "Object Height", nameUz: "Buyum balandligi", min: 5, max: 30, step: 1, value: 15, unit: "sm" },
      { id: "lensType", name: "Lens Type", nameUz: "Linza turi", min: -1, max: 1, step: 2, value: 1, unit: "" },
    ],
    presets: [
      { id: "magnifier", nameUz: "🔍 Lupa", description: "Kattalashtiruvchi shisha", values: { focalLength: 10, objectDistance: 15, lensType: 1 } },
      { id: "camera", nameUz: "📷 Kamera", description: "Fotoapparat linzasi", values: { focalLength: 35, objectDistance: 80, lensType: 1 } },
      { id: "eyeglasses", nameUz: "👓 Ko'zoynak", description: "Yaqinni ko'rish uchun", values: { focalLength: 25, objectDistance: 30, lensType: 1 } },
      { id: "myopia", nameUz: "👁️ Miyopiya", description: "Yaqinko'rlik uchun sochuvchi linza", values: { focalLength: 20, objectDistance: 50, lensType: -1 } },
      { id: "projector", nameUz: "📽️ Projektor", description: "Katta tasvir hosil qilish", values: { focalLength: 15, objectDistance: 18, lensType: 1 } },
      { id: "microscope", nameUz: "🔬 Mikroskop", description: "Kuchli kattalashtirish", values: { focalLength: 5, objectDistance: 6, objectHeight: 5, lensType: 1 } },
    ],
    theoryUz: `Yupqa linza - bu qalinligi fokus masofasiga nisbatan juda kichik bo'lgan optik asbob.

Yig'uvchi linza: Parallel nurlarni bir nuqtaga yig'adi (haqiqiy fokus).
Sochuvchi linza: Parallel nurlarni sochib yuboradi (mavhum fokus).

Linza formulasi 1/f = 1/d₀ + 1/dᵢ linza orqali tasvir hosil bo'lishini tavsiflaydi.`,
    theory: `A thin lens is an optical device with thickness much smaller than its focal length. Converging lenses focus light to a real point; diverging lenses scatter it.`,
    formulas: [
      { formula: "1/f = 1/d₀ + 1/dᵢ", latex: "\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}", description: "Lens equation", descriptionUz: "Linza formulasi" },
      { formula: "m = -dᵢ/d₀", latex: "m = -\\frac{d_i}{d_o}", description: "Magnification", descriptionUz: "Kattalashtirish" },
      { formula: "m = hᵢ/h₀", latex: "m = \\frac{h_i}{h_o}", description: "Height ratio", descriptionUz: "Balandliklar nisbati" },
      { formula: "P = 1/f", latex: "P = \\frac{1}{f}", description: "Optical power (diopters)", descriptionUz: "Optik quvvat (dioptriya)" },
    ],
  },
  {
    id: "idealGas",
    title: "Ideal Gas",
    titleUz: "Ideal gaz",
    description: "Visualize the kinetic theory of gases.",
    descriptionUz: "Gazlarning kinetik nazariyasini vizualizatsiya qiling.",
    icon: "💨",
    parameters: [
      { id: "temperature", name: "Temperature", nameUz: "Harorat", min: 100, max: 600, step: 10, value: 300, unit: "K" },
      { id: "volume", name: "Volume", nameUz: "Hajm", min: 50, max: 200, step: 10, value: 100, unit: "L" },
      { id: "particles", name: "Particles", nameUz: "Zarrachalar soni", min: 10, max: 100, step: 5, value: 50, unit: "" },
      { id: "pressure", name: "Pressure", nameUz: "Bosim", min: 0.5, max: 5, step: 0.5, value: 1, unit: "atm" },
    ],
    presets: [
      { id: "roomTemp", nameUz: "🏠 Xona harorati", description: "Standart sharoitlar (25°C)", values: { temperature: 298, pressure: 1 } },
      { id: "coldGas", nameUz: "❄️ Sovuq gaz", description: "Past haroratli gaz", values: { temperature: 150, pressure: 0.5 } },
      { id: "hotGas", nameUz: "🔥 Issiq gaz", description: "Yuqori haroratli gaz", values: { temperature: 500, pressure: 3 } },
      { id: "compressed", nameUz: "💪 Siqilgan gaz", description: "Yuqori bosimli kichik hajm", values: { volume: 50, pressure: 4, particles: 80 } },
      { id: "expanded", nameUz: "🎈 Kengaygan gaz", description: "Katta hajm, past bosim", values: { volume: 200, pressure: 0.5, particles: 30 } },
    ],
    theoryUz: `Ideal gaz - bu zarrachalari o'zaro ta'sirlashmaydigan va o'lchamlari e'tiborga olinmaydigan nazariy gaz modeli.

Ideal gaz holat tenglamasi: PV = nRT
Bu yerda P - bosim, V - hajm, n - mol soni, R - universal gaz doimiysi, T - harorat.

Zarrachalar tezligi haroratga proporsional: v ∝ √T`,
    theory: `Ideal gas is a theoretical model where particles don't interact and have negligible size. The ideal gas law PV = nRT describes its behavior.`,
    formulas: [
      { formula: "PV = nRT", latex: "PV = nRT", description: "Ideal gas law", descriptionUz: "Ideal gaz holat tenglamasi" },
      { formula: "KE = 3/2 kT", latex: "KE = \\frac{3}{2}kT", description: "Average kinetic energy", descriptionUz: "O'rtacha kinetik energiya" },
      { formula: "v = √(3kT/m)", latex: "v_{rms} = \\sqrt{\\frac{3kT}{m}}", description: "RMS velocity", descriptionUz: "O'rtacha kvadratik tezlik" },
      { formula: "P = 1/3 ρv²", latex: "P = \\frac{1}{3}\\rho v^2", description: "Pressure from kinetic theory", descriptionUz: "Kinetik nazariyadan bosim" },
    ],
  },
  {
    id: "interference",
    title: "Wave Interference",
    titleUz: "To'lqin interferensiyasi",
    description: "Explore double-slit interference patterns.",
    descriptionUz: "Ikki tirqishli interferensiya rasmini o'rganing.",
    icon: "🌀",
    parameters: [
      { id: "wavelength", name: "Wavelength", nameUz: "To'lqin uzunligi", min: 20, max: 100, step: 5, value: 50, unit: "nm" },
      { id: "slitDistance", name: "Slit Distance", nameUz: "Tirqishlar oralig'i", min: 5, max: 30, step: 1, value: 15, unit: "mm" },
      { id: "frequency", name: "Animation Speed", nameUz: "Animatsiya tezligi", min: 0.5, max: 3, step: 0.1, value: 1, unit: "" },
      { id: "screenDistance", name: "Screen Distance", nameUz: "Ekran masofasi", min: 50, max: 200, step: 10, value: 100, unit: "sm" },
    ],
    presets: [
      { id: "youngExperiment", nameUz: "🔬 Yung tajribasi", description: "Klassik ikki tirqishli tajriba", values: { wavelength: 50, slitDistance: 15, screenDistance: 100 } },
      { id: "redLight", nameUz: "🔴 Qizil yorug'lik", description: "Uzun to'lqin uzunligi", values: { wavelength: 80, slitDistance: 20 } },
      { id: "blueLight", nameUz: "🔵 Ko'k yorug'lik", description: "Qisqa to'lqin uzunligi", values: { wavelength: 30, slitDistance: 10 } },
      { id: "wideSlits", nameUz: "📏 Keng tirqishlar", description: "Tirqishlar oralig'i katta", values: { slitDistance: 30, wavelength: 50 } },
      { id: "closeScreen", nameUz: "📺 Yaqin ekran", description: "Ekran yaqinroq", values: { screenDistance: 50, slitDistance: 15 } },
    ],
    theoryUz: `Interferensiya - bu ikki yoki undan ortiq to'lqinlarning ustma-ust tushishi natijasida kuchayish yoki susayish hodisasi.

Konstruktiv interferensiya: to'lqinlar bir xil fazada bo'lsa (Δ = nλ)
Destruktiv interferensiya: to'lqinlar qarama-qarshi fazada bo'lsa (Δ = (n+½)λ)

Yung tajribasi yorug'likning to'lqin tabiatini isbotladi.`,
    theory: `Interference occurs when two or more waves superpose, creating regions of constructive and destructive interference. Young's double-slit experiment demonstrated the wave nature of light.`,
    formulas: [
      { formula: "Δ = d·sinθ", latex: "\\Delta = d \\sin\\theta", description: "Path difference", descriptionUz: "Yo'l farqi" },
      { formula: "d·sinθ = nλ", latex: "d \\sin\\theta = n\\lambda", description: "Constructive interference", descriptionUz: "Konstruktiv interferensiya" },
      { formula: "d·sinθ = (n+½)λ", latex: "d \\sin\\theta = (n+\\frac{1}{2})\\lambda", description: "Destructive interference", descriptionUz: "Destruktiv interferensiya" },
      { formula: "x = nλL/d", latex: "x_n = \\frac{n\\lambda L}{d}", description: "Fringe position", descriptionUz: "Yorug' chiziq joyi" },
    ],
  },
  {
    id: "capacitor",
    title: "Capacitor",
    titleUz: "Kondensator",
    description: "Study capacitor charging and electric field.",
    descriptionUz: "Kondensator zaryadlanishi va elektr maydonini o'rganing.",
    icon: "🔋",
    parameters: [
      { id: "capacitance", name: "Capacitance", nameUz: "Sig'im", min: 1, max: 100, step: 1, value: 10, unit: "µF" },
      { id: "voltage", name: "Voltage", nameUz: "Kuchlanish", min: 5, max: 50, step: 1, value: 12, unit: "V" },
      { id: "plateDistance", name: "Plate Distance", nameUz: "Plastinalar oralig'i", min: 1, max: 20, step: 1, value: 5, unit: "mm" },
      { id: "plateArea", name: "Plate Area", nameUz: "Plastina yuzasi", min: 10, max: 100, step: 5, value: 50, unit: "sm²" },
    ],
    presets: [
      { id: "smallCapacitor", nameUz: "🔋 Kichik kondensator", description: "Kichik sig'imli kondensator", values: { capacitance: 5, voltage: 12, plateArea: 30 } },
      { id: "powerSupply", nameUz: "⚡ Elektr manbai", description: "Yuqori kuchlanishli", values: { voltage: 50, capacitance: 20 } },
      { id: "thinGap", nameUz: "📄 Yupqa oraliq", description: "Plastinalar oralig'i kichik", values: { plateDistance: 2, capacitance: 50 } },
      { id: "largeArea", nameUz: "📐 Katta yuza", description: "Katta plastinali kondensator", values: { plateArea: 100, capacitance: 80 } },
      { id: "energyStorage", nameUz: "🔌 Energiya saqlash", description: "Ko'p energiya saqlaydigan", values: { capacitance: 100, voltage: 40, plateArea: 80 } },
    ],
    theoryUz: `Kondensator - bu elektr energiyasini elektr maydon ko'rinishida saqlaydigan qurilma. Yassi kondensator ikkita parallel plastinadan iborat.

Sig'im C = ε₀εᵣA/d formula bilan aniqlanadi.
Saqlanadigan energiya W = ½CU² formula bilan hisoblanadi.`,
    theory: `A capacitor stores electrical energy in an electric field. A parallel plate capacitor consists of two conducting plates separated by a dielectric material.`,
    formulas: [
      { formula: "C = ε₀εᵣA/d", latex: "C = \\frac{\\varepsilon_0 \\varepsilon_r A}{d}", description: "Capacitance", descriptionUz: "Sig'im" },
      { formula: "Q = CU", latex: "Q = CU", description: "Charge", descriptionUz: "Zaryad" },
      { formula: "W = ½CU²", latex: "W = \\frac{1}{2}CU^2", description: "Stored energy", descriptionUz: "Saqlanadigan energiya" },
      { formula: "E = U/d", latex: "E = \\frac{U}{d}", description: "Electric field", descriptionUz: "Elektr maydon kuchlanganligi" },
    ],
  },
  {
    id: "doppler",
    title: "Doppler Effect",
    titleUz: "Dopler effekti",
    description: "Visualize frequency shift due to motion.",
    descriptionUz: "Harakat tufayli chastota o'zgarishini vizualizatsiya qiling.",
    icon: "🚗",
    parameters: [
      { id: "sourceSpeed", name: "Source Speed", nameUz: "Manba tezligi", min: 0, max: 100, step: 5, value: 30, unit: "m/s" },
      { id: "waveSpeed", name: "Wave Speed", nameUz: "To'lqin tezligi", min: 200, max: 400, step: 10, value: 340, unit: "m/s" },
      { id: "frequency", name: "Source Frequency", nameUz: "Manba chastotasi", min: 1, max: 10, step: 0.5, value: 5, unit: "Hz" },
      { id: "observerSpeed", name: "Observer Speed", nameUz: "Kuzatuvchi tezligi", min: 0, max: 50, step: 5, value: 0, unit: "m/s" },
    ],
    presets: [
      { id: "ambulance", nameUz: "🚑 Tez yordam", description: "Tez yordamning sirena ovozi", values: { sourceSpeed: 30, frequency: 8 } },
      { id: "train", nameUz: "🚂 Poyezd", description: "O'tayotgan poyezd", values: { sourceSpeed: 50, frequency: 3 } },
      { id: "car", nameUz: "🚗 Avtomobil", description: "Tez harakatlanuvchi avtomobil", values: { sourceSpeed: 25, frequency: 5 } },
      { id: "supersonic", nameUz: "✈️ Tovushdan tez", description: "Tovush tezligiga yaqin", values: { sourceSpeed: 95, waveSpeed: 340 } },
      { id: "movingObserver", nameUz: "🏃 Harakatdagi kuzatuvchi", description: "Kuzatuvchi ham harakat qiladi", values: { observerSpeed: 20, sourceSpeed: 40 } },
    ],
    theoryUz: `Dopler effekti - bu to'lqin manbasi yoki kuzatuvchi harakatlanayotganda chastotaning o'zgarishi hodisasi.

Manba yaqinlashganda: chastota oshadi (tovush balandroq)
Manba uzoqlashganda: chastota kamayadi (tovush pastroq)

Bu effekt tibbiyotda (ultrazvuk), aviatsiyada va astronomiyada keng qo'llaniladi.`,
    theory: `The Doppler effect is the change in frequency of a wave due to relative motion between source and observer. It's used in medical imaging, radar, and astronomy.`,
    formulas: [
      { formula: "f' = f₀(c/(c-v))", latex: "f' = f_0 \\frac{c}{c - v_s}", description: "Approaching source", descriptionUz: "Yaqinlashayotgan manba" },
      { formula: "f' = f₀(c/(c+v))", latex: "f' = f_0 \\frac{c}{c + v_s}", description: "Receding source", descriptionUz: "Uzoqlashayotgan manba" },
      { formula: "Δf/f = v/c", latex: "\\frac{\\Delta f}{f} = \\frac{v}{c}", description: "Relative frequency shift", descriptionUz: "Nisbiy chastota siljishi" },
      { formula: "λ' = λ(c±v)/c", latex: "\\lambda' = \\lambda \\frac{c \\pm v_s}{c}", description: "Wavelength change", descriptionUz: "To'lqin uzunligi o'zgarishi" },
    ],
  },
  {
    id: "atwoodMachine",
    title: "Atwood Machine",
    titleUz: "Atvud mashinasi",
    description: "Study the motion of two masses connected by a string over a pulley.",
    descriptionUz: "Blok orqali ip bilan bog'langan ikki yuk harakatini o'rganing.",
    icon: "⚖️",
    parameters: [
      { id: "mass1", name: "Mass 1", nameUz: "1-yuk massasi", min: 0.5, max: 10, step: 0.5, value: 2, unit: "kg" },
      { id: "mass2", name: "Mass 2", nameUz: "2-yuk massasi", min: 0.5, max: 10, step: 0.5, value: 3, unit: "kg" },
      { id: "gravity", name: "Gravity", nameUz: "Erkin tushish tezlanishi", min: 1, max: 25, step: 0.1, value: 9.8, unit: "m/s²" },
    ],
    presets: [
      { id: "equal", nameUz: "⚖️ Teng massalar", description: "Massalar teng - muvozanat", values: { mass1: 2, mass2: 2 } },
      { id: "double", nameUz: "📊 2:1 nisbat", description: "Ikki baravar farq", values: { mass1: 2, mass2: 4 } },
      { id: "slight", nameUz: "🔍 Kichik farq", description: "Oz farqli massalar", values: { mass1: 2.5, mass2: 3 } },
      { id: "moon", nameUz: "🌙 Oyda", description: "Oy gravitatsiyasida", values: { gravity: 1.62 } },
    ],
    theoryUz: `Atvud mashinasi - bu ikki yuk blok orqali ip bilan bog'langan tizim. Bu klassik mexanikaning asosiy tajribalaridan biri.

Tizim tezlanishi: a = (m₂ - m₁)g / (m₁ + m₂)
Ipdagi tarang kuch: T = 2m₁m₂g / (m₁ + m₂)

Agar massalar teng bo'lsa, tizim muvozanatda turadi.`,
    theory: `The Atwood machine consists of two masses connected by a string over a pulley. It's used to study uniform acceleration and tension.`,
    formulas: [
      { formula: "a = (m₂-m₁)g/(m₁+m₂)", latex: "a = \\frac{(m_2 - m_1)g}{m_1 + m_2}", description: "Acceleration", descriptionUz: "Tezlanish" },
      { formula: "T = 2m₁m₂g/(m₁+m₂)", latex: "T = \\frac{2m_1 m_2 g}{m_1 + m_2}", description: "Tension", descriptionUz: "Tarang kuch" },
      { formula: "v = at", latex: "v = at", description: "Velocity", descriptionUz: "Tezlik" },
    ],
  },
  {
    id: "ohmsLaw",
    title: "Ohm's Law",
    titleUz: "Om qonuni",
    description: "Explore the relationship between voltage, current, and resistance.",
    descriptionUz: "Kuchlanish, tok kuchi va qarshilik orasidagi bog'liqlikni o'rganing.",
    icon: "⚡",
    parameters: [
      { id: "voltage", name: "Voltage", nameUz: "Kuchlanish", min: 1, max: 24, step: 1, value: 12, unit: "V" },
      { id: "resistance", name: "Resistance", nameUz: "Qarshilik", min: 10, max: 1000, step: 10, value: 100, unit: "Ω" },
    ],
    presets: [
      { id: "led", nameUz: "💡 LED", description: "LED uchun", values: { voltage: 3, resistance: 220 } },
      { id: "phone", nameUz: "📱 Telefon zaryadkasi", description: "5V zaryadka", values: { voltage: 5, resistance: 50 } },
      { id: "car", nameUz: "🚗 Avtomobil", description: "12V tizim", values: { voltage: 12, resistance: 100 } },
      { id: "highV", nameUz: "⚡ Yuqori kuchlanish", description: "24V tizim", values: { voltage: 24, resistance: 200 } },
    ],
    theoryUz: `Om qonuni - elektr zanjirlarning asosiy qonuni. U kuchlanish, tok kuchi va qarshilik orasidagi bog'liqlikni ifodalaydi.

V = I × R
Bu yerda V - kuchlanish (Volt), I - tok kuchi (Amper), R - qarshilik (Om)`,
    theory: `Ohm's Law states that current is directly proportional to voltage and inversely proportional to resistance.`,
    formulas: [
      { formula: "V = IR", latex: "V = IR", description: "Ohm's Law", descriptionUz: "Om qonuni" },
      { formula: "I = V/R", latex: "I = \\frac{V}{R}", description: "Current", descriptionUz: "Tok kuchi" },
      { formula: "P = VI = I²R", latex: "P = VI = I^2R", description: "Power", descriptionUz: "Quvvat" },
    ],
  },
  {
    id: "thermalExpansion",
    title: "Thermal Expansion",
    titleUz: "Issiqlik kengayishi",
    description: "Observe how materials expand when heated.",
    descriptionUz: "Materiallarning isitilganda kengayishini kuzating.",
    icon: "🌡️",
    parameters: [
      { id: "initialLength", name: "Initial Length", nameUz: "Boshlang'ich uzunlik", min: 0.5, max: 3, step: 0.1, value: 1, unit: "m" },
      { id: "temperature", name: "Final Temperature", nameUz: "Oxirgi harorat", min: 0, max: 200, step: 5, value: 100, unit: "°C" },
      { id: "initialTemp", name: "Initial Temperature", nameUz: "Boshlang'ich harorat", min: 0, max: 50, step: 5, value: 20, unit: "°C" },
      { id: "coefficient", name: "Expansion Coefficient", nameUz: "Kengayish koeffitsienti", min: 0.000005, max: 0.00005, step: 0.000001, value: 0.000012, unit: "1/°C" },
    ],
    presets: [
      { id: "steel", nameUz: "🔩 Po'lat", description: "Po'lat (α = 12×10⁻⁶)", values: { coefficient: 0.000012 } },
      { id: "aluminum", nameUz: "🥫 Alyuminiy", description: "Alyuminiy (α = 23×10⁻⁶)", values: { coefficient: 0.000023 } },
      { id: "copper", nameUz: "🔶 Mis", description: "Mis (α = 17×10⁻⁶)", values: { coefficient: 0.000017 } },
      { id: "hot", nameUz: "🔥 Juda issiq", description: "200°C gacha", values: { temperature: 200 } },
    ],
    theoryUz: `Chiziqli issiqlik kengayishi - bu jismning harorat oshganda uzunligining ortishi.

ΔL = L₀ × α × ΔT
Bu yerda L₀ - boshlang'ich uzunlik, α - chiziqli kengayish koeffitsienti, ΔT - harorat o'zgarishi.`,
    theory: `Linear thermal expansion describes how a material's length changes with temperature.`,
    formulas: [
      { formula: "ΔL = L₀αΔT", latex: "\\Delta L = L_0 \\alpha \\Delta T", description: "Length change", descriptionUz: "Uzunlik o'zgarishi" },
      { formula: "L = L₀(1 + αΔT)", latex: "L = L_0(1 + \\alpha \\Delta T)", description: "Final length", descriptionUz: "Oxirgi uzunlik" },
    ],
  },
  {
    id: "harmonicOscillator",
    title: "Harmonic Oscillator",
    titleUz: "Garmonik tebranish",
    description: "Study simple harmonic motion with damping.",
    descriptionUz: "So'nuvchi garmonik tebranishni o'rganing.",
    icon: "〰️",
    parameters: [
      { id: "amplitude", name: "Amplitude", nameUz: "Amplituda", min: 0.1, max: 1, step: 0.05, value: 0.5, unit: "m" },
      { id: "frequency", name: "Frequency", nameUz: "Chastota", min: 0.5, max: 3, step: 0.1, value: 1, unit: "Hz" },
      { id: "phase", name: "Initial Phase", nameUz: "Boshlang'ich faza", min: 0, max: 6.28, step: 0.1, value: 0, unit: "rad" },
      { id: "damping", name: "Damping", nameUz: "So'nish koeffitsienti", min: 0, max: 0.5, step: 0.02, value: 0.05, unit: "" },
    ],
    presets: [
      { id: "ideal", nameUz: "✨ Ideal", description: "So'nishsiz tebranish", values: { damping: 0, amplitude: 0.5 } },
      { id: "light", nameUz: "🌊 Yengil so'nish", description: "Sekin so'nadi", values: { damping: 0.05 } },
      { id: "heavy", nameUz: "🛑 Kuchli so'nish", description: "Tez so'nadi", values: { damping: 0.3 } },
      { id: "fast", nameUz: "⚡ Tez tebranish", description: "Yuqori chastota", values: { frequency: 2.5, amplitude: 0.3 } },
    ],
    theoryUz: `Garmonik tebranish - bu vaqt bo'yicha sinusoidal o'zgaruvchi harakat.

x(t) = A × e^(-γt) × sin(ωt + φ)
Bu yerda A - amplituda, γ - so'nish koeffitsienti, ω - burchak chastotasi, φ - boshlang'ich faza.`,
    theory: `Simple harmonic motion is sinusoidal oscillation. Damping causes amplitude to decrease over time.`,
    formulas: [
      { formula: "x = A·sin(ωt + φ)", latex: "x = A \\sin(\\omega t + \\varphi)", description: "Position", descriptionUz: "Joy" },
      { formula: "v = Aω·cos(ωt + φ)", latex: "v = A\\omega \\cos(\\omega t + \\varphi)", description: "Velocity", descriptionUz: "Tezlik" },
      { formula: "ω = 2πf", latex: "\\omega = 2\\pi f", description: "Angular frequency", descriptionUz: "Burchak chastotasi" },
      { formula: "T = 1/f", latex: "T = \\frac{1}{f}", description: "Period", descriptionUz: "Davr" },
    ],
  },
  {
    id: "newtonRings",
    title: "Newton's Rings",
    titleUz: "Nyuton halqalari",
    description: "Observe interference patterns formed by light reflected from curved and flat surfaces.",
    descriptionUz: "Qavariq va tekis sirtlardan qaytgan yorug'lik interferensiyasini kuzating.",
    icon: "🔴",
    parameters: [
      { id: "wavelength", name: "Wavelength", nameUz: "To'lqin uzunligi", min: 400, max: 700, step: 10, value: 550, unit: "nm" },
      { id: "radius", name: "Lens Radius", nameUz: "Linza radiusi", min: 0.5, max: 5, step: 0.1, value: 2, unit: "m" },
      { id: "refractiveIndex", name: "Refractive Index", nameUz: "Sindirish ko'rsatkichi", min: 1, max: 1.5, step: 0.01, value: 1, unit: "" },
    ],
    presets: [
      { id: "red", nameUz: "🔴 Qizil", description: "Qizil yorug'lik (700 nm)", values: { wavelength: 700 } },
      { id: "green", nameUz: "🟢 Yashil", description: "Yashil yorug'lik (550 nm)", values: { wavelength: 550 } },
      { id: "blue", nameUz: "🔵 Ko'k", description: "Ko'k yorug'lik (450 nm)", values: { wavelength: 450 } },
      { id: "largeRadius", nameUz: "📐 Katta radius", description: "Katta radiusli linza", values: { radius: 5 } },
    ],
    theoryUz: `Nyuton halqalari - bu qavariq linza va tekis shisha orasidagi havo qatlamida hosil bo'ladigan interferensiya hodisasi.

Halqalar radiusi: r = √(mλR)
m-chi yorug' halqa uchun: r_m = √(mλR)`,
    theory: `Newton's rings are interference patterns formed between a convex lens and a flat glass plate.`,
    formulas: [
      { formula: "r = √(mλR)", latex: "r_m = \\sqrt{m\\lambda R}", description: "Ring radius", descriptionUz: "Halqa radiusi" },
      { formula: "2t = mλ", latex: "2t = m\\lambda", description: "Bright ring condition", descriptionUz: "Yorug' halqa sharti" },
    ],
  },
  {
    id: "electromagneticInduction",
    title: "Electromagnetic Induction",
    titleUz: "Elektromagnit induksiya",
    description: "Study Faraday's law of electromagnetic induction.",
    descriptionUz: "Faradey elektromagnit induksiya qonunini o'rganing.",
    icon: "🧲",
    parameters: [
      { id: "magnetStrength", name: "Magnet Strength", nameUz: "Magnit kuchi", min: 0.1, max: 2, step: 0.1, value: 1, unit: "T" },
      { id: "coilTurns", name: "Coil Turns", nameUz: "O'ramlar soni", min: 5, max: 50, step: 5, value: 20, unit: "" },
      { id: "velocity", name: "Magnet Velocity", nameUz: "Magnit tezligi", min: 1, max: 10, step: 0.5, value: 5, unit: "m/s" },
    ],
    presets: [
      { id: "fast", nameUz: "⚡ Tez harakat", description: "Tez harakatlanuvchi magnit", values: { velocity: 10 } },
      { id: "strong", nameUz: "🧲 Kuchli magnit", description: "Kuchli magnit maydoni", values: { magnetStrength: 2 } },
      { id: "manyTurns", nameUz: "🔄 Ko'p o'ram", description: "Ko'p o'ramli g'altak", values: { coilTurns: 50 } },
      { id: "slow", nameUz: "🐢 Sekin", description: "Sekin harakat", values: { velocity: 2 } },
    ],
    theoryUz: `Elektromagnit induksiya - bu magnit oqimining o'zgarishi natijasida o'tkazgichda EYK hosil bo'lishi.

Faradey qonuni: ε = -N(dΦ/dt)
Magnit harakatlanganda g'altakda induksion tok hosil bo'ladi.`,
    theory: `Electromagnetic induction is the production of EMF due to changing magnetic flux through a coil.`,
    formulas: [
      { formula: "ε = -N(dΦ/dt)", latex: "\\varepsilon = -N\\frac{d\\Phi}{dt}", description: "Faraday's Law", descriptionUz: "Faradey qonuni" },
      { formula: "Φ = BA", latex: "\\Phi = BA", description: "Magnetic flux", descriptionUz: "Magnit oqimi" },
    ],
  },
  {
    id: "archimedes",
    title: "Archimedes' Principle",
    titleUz: "Arximed qonuni",
    description: "Explore buoyancy and floating objects.",
    descriptionUz: "Suzish va cho'kish hodisalarini o'rganing.",
    icon: "🚢",
    parameters: [
      { id: "objectDensity", name: "Object Density", nameUz: "Jism zichligi", min: 200, max: 2000, step: 50, value: 800, unit: "kg/m³" },
      { id: "fluidDensity", name: "Fluid Density", nameUz: "Suyuqlik zichligi", min: 500, max: 1500, step: 50, value: 1000, unit: "kg/m³" },
      { id: "objectVolume", name: "Object Volume", nameUz: "Jism hajmi", min: 0.001, max: 0.01, step: 0.001, value: 0.005, unit: "m³" },
      { id: "gravity", name: "Gravity", nameUz: "Gravitatsiya", min: 1, max: 25, step: 0.1, value: 9.8, unit: "m/s²" },
    ],
    presets: [
      { id: "wood", nameUz: "🪵 Yog'och", description: "Yog'och suvda suzadi", values: { objectDensity: 600 } },
      { id: "iron", nameUz: "🔩 Temir", description: "Temir suvda cho'kadi", values: { objectDensity: 7800 } },
      { id: "ice", nameUz: "🧊 Muz", description: "Muz suvda suzadi", values: { objectDensity: 917 } },
      { id: "oil", nameUz: "🛢️ Neftda", description: "Neft suyuqligi", values: { fluidDensity: 800 } },
      { id: "saltWater", nameUz: "🌊 Sho'r suv", description: "Dengiz suvi", values: { fluidDensity: 1025 } },
    ],
    theoryUz: `Arximed qonuni: Suyuqlikka botirilgan jismga suyuqlik tomonidan yuqoriga yo'nalgan kuch ta'sir etadi.

Arximed kuchi: F = ρVg
Bu kuch jism siqib chiqargan suyuqlik og'irligiga teng.`,
    theory: `Archimedes' principle states that a body submerged in fluid experiences an upward force equal to the weight of displaced fluid.`,
    formulas: [
      { formula: "F = ρVg", latex: "F_a = \\rho V g", description: "Buoyant force", descriptionUz: "Arximed kuchi" },
      { formula: "ρ_jism < ρ_suv → suzadi", latex: "\\rho_{obj} < \\rho_{fluid} \\rightarrow \\text{floats}", description: "Floating condition", descriptionUz: "Suzish sharti" },
    ],
  },
  {
    id: "illumination",
    title: "Illumination Law",
    titleUz: "Yoritilganlik qonuni",
    description: "Study how light intensity varies with distance and angle.",
    descriptionUz: "Yorug'lik intensivligining masofa va burchakka bog'liqligini o'rganing.",
    icon: "💡",
    parameters: [
      { id: "luminousIntensity", name: "Luminous Intensity", nameUz: "Yorug'lik kuchi", min: 100, max: 2000, step: 100, value: 1000, unit: "cd" },
      { id: "distance", name: "Distance", nameUz: "Masofa", min: 1, max: 10, step: 0.5, value: 2, unit: "m" },
      { id: "angle", name: "Incident Angle", nameUz: "Tushish burchagi", min: 0, max: 80, step: 5, value: 0, unit: "°" },
    ],
    presets: [
      { id: "close", nameUz: "📍 Yaqin", description: "Yaqin masofa", values: { distance: 1 } },
      { id: "far", nameUz: "📏 Uzoq", description: "Uzoq masofa", values: { distance: 8 } },
      { id: "angled", nameUz: "📐 Burchakli", description: "45° burchakda", values: { angle: 45 } },
      { id: "bright", nameUz: "🔆 Yorqin", description: "Kuchli yorug'lik", values: { luminousIntensity: 2000 } },
    ],
    theoryUz: `Yoritilganlik - bu yuzaga tushayotgan yorug'lik oqimi zichligi.

E = I·cos(θ) / r²
Bu yerda I - yorug'lik kuchi, θ - tushish burchagi, r - masofa.`,
    theory: `Illumination follows the inverse square law and depends on the angle of incidence.`,
    formulas: [
      { formula: "E = I/r²", latex: "E = \\frac{I}{r^2}", description: "Inverse square law", descriptionUz: "Teskari kvadrat qonuni" },
      { formula: "E = I·cos(θ)/r²", latex: "E = \\frac{I \\cos\\theta}{r^2}", description: "With angle", descriptionUz: "Burchak bilan" },
    ],
  },
  {
    id: "transformerEfficiency",
    title: "Transformer Efficiency",
    titleUz: "Transformator FIK",
    description: "Study transformer efficiency and power losses.",
    descriptionUz: "Transformatorning foydali ish koeffitsientini va quvvat yo'qotishlarini o'rganing.",
    icon: "🔌",
    parameters: [
      { id: "primaryVoltage", name: "Primary Voltage", nameUz: "Birlamchi kuchlanish", min: 100, max: 500, step: 10, value: 220, unit: "V" },
      { id: "primaryTurns", name: "Primary Turns", nameUz: "Birlamchi o'ramlar", min: 100, max: 1000, step: 50, value: 500, unit: "" },
      { id: "secondaryTurns", name: "Secondary Turns", nameUz: "Ikkilamchi o'ramlar", min: 50, max: 500, step: 25, value: 250, unit: "" },
      { id: "loadPower", name: "Load Power", nameUz: "Yuk quvvati", min: 50, max: 500, step: 10, value: 200, unit: "W" },
      { id: "coreLoss", name: "Core Loss", nameUz: "Yadro yo'qotishi", min: 0, max: 50, step: 2, value: 10, unit: "W" },
      { id: "copperLoss", name: "Copper Loss", nameUz: "Mis yo'qotishi", min: 0, max: 50, step: 2, value: 8, unit: "W" },
    ],
    presets: [
      { id: "ideal", nameUz: "✨ Ideal transformator", description: "Yo'qotishsiz ideal holat", values: { coreLoss: 0, copperLoss: 0 } },
      { id: "highEfficiency", nameUz: "⚡ Yuqori FIK", description: "95%+ samaradorlik", values: { coreLoss: 5, copperLoss: 5, loadPower: 300 } },
      { id: "lowEfficiency", nameUz: "📉 Past FIK", description: "Ko'p yo'qotishlar bilan", values: { coreLoss: 40, copperLoss: 35, loadPower: 150 } },
      { id: "stepDown", nameUz: "⬇️ Pasaytiruvchi", description: "Kuchlanishni pasaytiradi", values: { primaryTurns: 1000, secondaryTurns: 100 } },
      { id: "stepUp", nameUz: "⬆️ Ko'taruvchi", description: "Kuchlanishni ko'taradi", values: { primaryTurns: 200, secondaryTurns: 400 } },
      { id: "industrial", nameUz: "🏭 Sanoat", description: "Sanoat transformatori", values: { primaryVoltage: 380, loadPower: 400, coreLoss: 15, copperLoss: 12 } },
    ],
    theoryUz: `Transformator - bu o'zgaruvchan tokning kuchlanishini o'zgartirish uchun ishlatiladigan elektromagnit qurilma. U ikki yoki undan ortiq elektr o'tkazgichlarning birgalikdagi magnit oqimi orqali ishlaydi.

Transformatorning asosiy qismlari:
• Birlamchi chulg'am (primer) - kirishga ulangan
• Ikkilamchi chulg'am (sekunder) - chiqishga ulangan  
• Yadro - magnit oqimini o'tkazadi

Foydali ish koeffitsienti (FIK) - bu chiqish quvvatining kirish quvvatiga nisbati:

η = P₂/P₁ × 100% = P₂/(P₂ + ΔP) × 100%

Bu yerda:
• P₁ - kirish quvvati
• P₂ - chiqish (foydali) quvvati
• ΔP - quvvat yo'qotishlari

Quvvat yo'qotishlari ikki turga bo'linadi:
1. Yadro yo'qotishlari (temir yo'qotishlari) - gisterezis va girdobli toklar
2. Mis yo'qotishlari - chulg'amlardagi qarshilikda issiqlik ajralishi

Ideal transformatorda FIK = 100%, ammo real transformatorlarda 90-99% oralig'ida bo'ladi.

Transformatsiya koeffitsienti: k = U₂/U₁ = n₂/n₁
Bu yerda n₁ va n₂ - mos ravishda birlamchi va ikkilamchi o'ramlar soni.`,
    theory: `A transformer is an electromagnetic device that changes AC voltage levels through mutual induction between two or more windings sharing a common magnetic flux.`,
    formulas: [
      { formula: "η = P₂/P₁ × 100%", latex: "\\eta = \\frac{P_2}{P_1} \\times 100\\%", description: "Efficiency", descriptionUz: "Foydali ish koeffitsienti" },
      { formula: "η = P₂/(P₂+ΔP)", latex: "\\eta = \\frac{P_2}{P_2 + \\Delta P}", description: "Efficiency with losses", descriptionUz: "Yo'qotishlar bilan FIK" },
      { formula: "k = U₂/U₁ = n₂/n₁", latex: "k = \\frac{U_2}{U_1} = \\frac{n_2}{n_1}", description: "Transformation ratio", descriptionUz: "Transformatsiya koeffitsienti" },
      { formula: "P₁ = P₂ + ΔP", latex: "P_1 = P_2 + \\Delta P", description: "Power balance", descriptionUz: "Quvvat balansi" },
      { formula: "ΔP = Pyadro + Pmis", latex: "\\Delta P = P_{yadro} + P_{mis}", description: "Total losses", descriptionUz: "Umumiy yo'qotishlar" },
      { formula: "I₁U₁ = I₂U₂ (ideal)", latex: "I_1 U_1 = I_2 U_2 \\text{ (ideal)}", description: "Ideal transformer", descriptionUz: "Ideal transformator" },
    ],
  },
];
