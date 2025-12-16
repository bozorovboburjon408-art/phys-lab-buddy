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
];
