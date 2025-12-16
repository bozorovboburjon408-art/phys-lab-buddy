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

Tebranish davri: T = 2π√(L/g)

Mayatnikning energiyasi tebranish davomida kinetik va potensial energiya o'rtasida almashib turadi, lekin to'liq mexanik energiya saqlanib qoladi (ishqalanish hisobga olinmasa).`,
    theory: `A simple pendulum consists of a point mass suspended from an inextensible string, oscillating under the influence of gravity. For small angles (< 15°), it exhibits simple harmonic motion.

The period T depends only on the string length L and gravitational acceleration g, independent of mass - a property discovered by Galileo.`,
    formulas: [
      { formula: "T = 2π√(L/g)", description: "Period of oscillation", descriptionUz: "Tebranish davri" },
      { formula: "f = 1/T = (1/2π)√(g/L)", description: "Frequency", descriptionUz: "Chastota" },
      { formula: "ω = √(g/L)", description: "Angular frequency", descriptionUz: "Burchak chastotasi" },
      { formula: "θ(t) = θ₀cos(ωt)", description: "Angular displacement", descriptionUz: "Burchak siljishi" },
      { formula: "E = mgh = ½mv²", description: "Energy conservation", descriptionUz: "Energiyaning saqlanishi" },
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

Traektoriya parabolik shaklga ega. Maksimal uzoqlik 45° burchakda erishiladi. Havo qarshiligi hisobga olinmasa, gorizontal tezlik o'zgarmaydi.

Maksimal balandlik va uchish masofasi boshlang'ich tezlik va otish burchagiga bog'liq.`,
    theory: `Projectile motion is the motion of an object launched at an initial velocity at an angle. It consists of two independent components: uniform horizontal motion and uniformly accelerated vertical motion (free fall).

The trajectory is parabolic. Maximum range is achieved at 45°.`,
    formulas: [
      { formula: "R = v₀²sin(2θ)/g", description: "Range (horizontal distance)", descriptionUz: "Uchish masofasi" },
      { formula: "H = v₀²sin²(θ)/2g", description: "Maximum height", descriptionUz: "Maksimal balandlik" },
      { formula: "t = 2v₀sin(θ)/g", description: "Time of flight", descriptionUz: "Uchish vaqti" },
      { formula: "x = v₀cos(θ)·t", description: "Horizontal position", descriptionUz: "Gorizontal joy" },
      { formula: "y = v₀sin(θ)·t - ½gt²", description: "Vertical position", descriptionUz: "Vertikal joy" },
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
    theoryUz: `Prujinali tebranish - bu Guk qonuniga bo'ysunadigan elastik kuch ta'sirida hosil bo'ladigan garmonik tebranish. Prujinaga bog'langan jism muvozanat holatidan chetlashtirilganda, qaytaruvchi kuch paydo bo'ladi.

Guk qonuni: F = -kx (bu yerda k - prujina bikrligi, x - cho'zilish)

Tebranish davri faqat prujina bikrligi va yuk massasiga bog'liq. Tebranish amplitudasiga bog'liq emas.

Haqiqiy tizimlarda ishqalanish va havo qarshiligi tufayli tebranish so'nadi. So'nish koeffitsienti qancha katta bo'lsa, tebranish shuncha tez so'nadi.`,
    theory: `Spring oscillation is simple harmonic motion governed by Hooke's Law. When displaced from equilibrium, a restoring force proportional to displacement acts on the mass.

The period depends only on spring constant and mass, not amplitude.`,
    formulas: [
      { formula: "F = -kx", description: "Hooke's Law (restoring force)", descriptionUz: "Guk qonuni" },
      { formula: "T = 2π√(m/k)", description: "Period of oscillation", descriptionUz: "Tebranish davri" },
      { formula: "ω = √(k/m)", description: "Angular frequency", descriptionUz: "Burchak chastotasi" },
      { formula: "x(t) = A·cos(ωt + φ)", description: "Position function", descriptionUz: "Joy funksiyasi" },
      { formula: "E = ½kA²", description: "Total energy", descriptionUz: "To'liq energiya" },
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

To'lqinning asosiy xarakteristikalari:
- Amplituda (A) - maksimal siljish
- To'lqin uzunligi (λ) - ikkita qo'shni fazadagi nuqtalar orasidagi masofa
- Chastota (f) - bir sekunddagi tebranishlar soni
- Davr (T) - bitta to'liq tebranish vaqti

To'lqin tezligi v = λf formula bilan aniqlanadi. Bu universal formula barcha to'lqin turlari uchun amal qiladi.`,
    theory: `A wave is the propagation of oscillations through a medium. In transverse waves, particles oscillate perpendicular to the direction of wave propagation.

Key properties include amplitude, wavelength, frequency, and period. Wave speed equals wavelength times frequency.`,
    formulas: [
      { formula: "v = λf", description: "Wave speed equation", descriptionUz: "To'lqin tezligi" },
      { formula: "T = 1/f", description: "Period-frequency relation", descriptionUz: "Davr va chastota" },
      { formula: "λ = vT", description: "Wavelength", descriptionUz: "To'lqin uzunligi" },
      { formula: "y = A·sin(kx - ωt)", description: "Wave equation", descriptionUz: "To'lqin tenglamasi" },
      { formula: "k = 2π/λ", description: "Wave number", descriptionUz: "To'lqin soni" },
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

Yerda erkin tushish tezlanishi g ≈ 9.8 m/s². Bu qiymat Yer yuzasida kenglik va balandlikka qarab biroz farq qiladi.

Havo qarshiligi mavjud bo'lganda, jism ma'lum tezlikka (chegara tezligi) yetganda, og'irlik kuchi va havo qarshiligi tenglashadi va jism bir xil tezlik bilan tushishda davom etadi.

Chegara tezligi jism shakli, o'lchami va massasiga bog'liq.`,
    theory: `Free fall is motion under gravity alone. In a vacuum, all objects fall with the same acceleration regardless of mass.

On Earth, g ≈ 9.8 m/s². With air resistance, objects reach terminal velocity when drag equals weight.`,
    formulas: [
      { formula: "h = ½gt²", description: "Distance fallen", descriptionUz: "Bosib o'tilgan masofa" },
      { formula: "v = gt", description: "Velocity", descriptionUz: "Tezlik" },
      { formula: "v = √(2gh)", description: "Velocity from height", descriptionUz: "Balandlikdan tezlik" },
      { formula: "t = √(2h/g)", description: "Time to fall", descriptionUz: "Tushish vaqti" },
      { formula: "F = mg", description: "Weight force", descriptionUz: "Og'irlik kuchi" },
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
    theoryUz: `Elastik to'qnashuv - bu to'qnashuvda ham impuls, ham kinetik energiya saqlanadigan to'qnashuv turi. Ideal elastik to'qnashuvlar atomlar va molekulalar orasida sodir bo'ladi.

Impulsning saqlanish qonuni: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'

Kinetik energiyaning saqlanishi: ½m₁v₁² + ½m₂v₂² = ½m₁v₁'² + ½m₂v₂'²

Noelastik to'qnashuvda kinetik energiyaning bir qismi issiqlik, tovush yoki deformatsiya energiyasiga aylanadi.

Massalar teng bo'lganda, jismlar tezliklarini almashtirishadi.`,
    theory: `In elastic collisions, both momentum and kinetic energy are conserved. Perfect elastic collisions occur between atoms and molecules.

In inelastic collisions, some kinetic energy converts to heat, sound, or deformation.`,
    formulas: [
      { formula: "m₁v₁ + m₂v₂ = const", description: "Momentum conservation", descriptionUz: "Impulsning saqlanishi" },
      { formula: "½m₁v₁² + ½m₂v₂² = const", description: "Energy conservation", descriptionUz: "Energiyaning saqlanishi" },
      { formula: "v₁' = ((m₁-m₂)v₁ + 2m₂v₂)/(m₁+m₂)", description: "Final velocity 1", descriptionUz: "1-jism yakuniy tezligi" },
      { formula: "v₂' = ((m₂-m₁)v₂ + 2m₁v₁)/(m₁+m₂)", description: "Final velocity 2", descriptionUz: "2-jism yakuniy tezligi" },
      { formula: "p = mv", description: "Momentum", descriptionUz: "Impuls" },
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
    theoryUz: `Qiya tekislik - bu oddiy mexanizmlardan biri. Jism qiya tekislikda joylashganda, og'irlik kuchi ikki komponentga ajraladi:

1. Tekislikka parallel komponent: F∥ = mg·sinθ (jismni pastga tortadi)
2. Tekislikka perpendikulyar komponent: F⊥ = mg·cosθ (normal kuch)

Ishqalanish kuchi: Fᵢ = μN = μmg·cosθ

Jism harakati uchun F∥ > Fᵢ bo'lishi kerak, ya'ni: tanθ > μ

Tezlanish: a = g(sinθ - μcosθ)

Agar μ > tanθ bo'lsa, jism harakatsiz qoladi (statik muvozanat).`,
    theory: `An inclined plane decomposes gravitational force into components parallel and perpendicular to the surface.

Motion occurs when the parallel component exceeds friction. If μ > tanθ, the object remains stationary.`,
    formulas: [
      { formula: "a = g(sinθ - μcosθ)", description: "Acceleration on incline", descriptionUz: "Qiya tekislikda tezlanish" },
      { formula: "F∥ = mg·sinθ", description: "Parallel force component", descriptionUz: "Parallel kuch" },
      { formula: "N = mg·cosθ", description: "Normal force", descriptionUz: "Normal kuch" },
      { formula: "Ff = μN = μmg·cosθ", description: "Friction force", descriptionUz: "Ishqalanish kuchi" },
      { formula: "v = √(2as)", description: "Velocity after distance s", descriptionUz: "s masofadan keyingi tezlik" },
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
    theoryUz: `Tekis aylana bo'ylab harakat - bu jism bir xil tezlik bilan aylana bo'ylab harakatlangandagi harakat turi. Tezlik kattaligi o'zgarmasa-da, yo'nalishi doimo o'zgaradi.

Markazga intilma tezlanish (sentripetal tezlanish) doimo aylana markaziga yo'nalgan va jismni egri chiziq bo'ylab harakatlantirishga sabab bo'ladi.

Bu tezlanishni hosil qiluvchi kuch markazga intilma kuch deyiladi. U ip tarangligi, tortishish kuchi, ishqalanish yoki boshqa kuchlar bo'lishi mumkin.

Davr (T) - bir marta to'liq aylanish uchun ketadigan vaqt.`,
    theory: `Uniform circular motion occurs when an object moves in a circle at constant speed. Though speed is constant, velocity direction changes continuously.

Centripetal acceleration always points toward the center, causing the curved path.`,
    formulas: [
      { formula: "ac = v²/r = ω²r", description: "Centripetal acceleration", descriptionUz: "Markazga intilma tezlanish" },
      { formula: "Fc = mac = mv²/r", description: "Centripetal force", descriptionUz: "Markazga intilma kuch" },
      { formula: "v = ωr", description: "Linear velocity", descriptionUz: "Chiziqli tezlik" },
      { formula: "T = 2πr/v = 2π/ω", description: "Period of rotation", descriptionUz: "Aylanish davri" },
      { formula: "f = 1/T = ω/2π", description: "Frequency", descriptionUz: "Chastota" },
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

Kulon qonuni: F = k·q₁q₂/r²
Bu yerda k = 8.99×10⁹ N·m²/C² - Kulon doimiysi

Maydon chiziqlari:
- Musbat zaryaddan chiqadi, manfiy zaryadga kiradi
- Bir-birini kesishmaydi
- Chiziqlar zichligi maydon kuchini ko'rsatadi

Bir nomdagi zaryadlar itarishadi, turli nomdagi zaryadlar tortishadi.

Elektr maydon kuchlanganligi: E = F/q = kQ/r²`,
    theory: `An electric field is a region around a charged object where it exerts force on other charges.

Coulomb's Law describes the force between charges. Field lines emerge from positive charges and enter negative ones.`,
    formulas: [
      { formula: "F = k·q₁q₂/r²", description: "Coulomb's Law", descriptionUz: "Kulon qonuni" },
      { formula: "E = F/q = kQ/r²", description: "Electric field strength", descriptionUz: "Elektr maydon kuchlanganligi" },
      { formula: "k = 8.99×10⁹ N·m²/C²", description: "Coulomb constant", descriptionUz: "Kulon doimiysi" },
      { formula: "U = kq/r", description: "Electric potential", descriptionUz: "Elektr potensial" },
      { formula: "W = qU = kq₁q₂/r", description: "Potential energy", descriptionUz: "Potensial energiya" },
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

Solenoid - bu spiral shaklida o'ralgan sim. Uning ichida bir jinsli magnit maydon hosil bo'ladi.

Solenoid ichidagi magnit induksiya: B = μ₀nI
Bu yerda:
- μ₀ = 4π×10⁻⁷ T·m/A - magnit doimiysi
- n = N/L - birlik uzunlikdagi o'ramlar soni
- I - tok kuchi

Faradey qonuni: ε = -dΦ/dt
Magnit oqimining o'zgarishi EYK hosil qiladi.

Magnit oqimi: Φ = B·S·cosθ`,
    theory: `Magnetic induction involves electric current creating magnetic fields and changing magnetic fields inducing electric current.

A solenoid creates a uniform magnetic field inside. Faraday's Law describes electromagnetic induction.`,
    formulas: [
      { formula: "B = μ₀nI", description: "Magnetic field in solenoid", descriptionUz: "Solenoiddagi magnit maydon" },
      { formula: "μ₀ = 4π×10⁻⁷ T·m/A", description: "Permeability of free space", descriptionUz: "Magnit doimiysi" },
      { formula: "Φ = B·S·cosθ", description: "Magnetic flux", descriptionUz: "Magnit oqimi" },
      { formula: "ε = -dΦ/dt", description: "Faraday's Law (induced EMF)", descriptionUz: "Faradey qonuni (induksiya EYK)" },
      { formula: "F = BIL", description: "Force on wire in field", descriptionUz: "Maydondagi simga ta'sir etuvchi kuch" },
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
    theoryUz: `Nur sinishi - bu yorug'likning bir muhitdan ikkinchi muhitga o'tishda yo'nalishini o'zgartirishi. Bu hodisa muhitlarda yorug'lik tezligining farqi tufayli sodir bo'ladi.

Snell qonuni: n₁sinθ₁ = n₂sinθ₂

Sindirish ko'rsatkichi: n = c/v
Bu yerda c - vakuumdagi yorug'lik tezligi, v - muhitdagi tezlik

To'liq ichki qaytish:
Agar n₁ > n₂ va θ₁ > θc (kritik burchak), yorug'lik to'liq qaytadi.
Kritik burchak: sinθc = n₂/n₁

Ba'zi sindirish ko'rsatkichlari:
- Vakuum: 1.00
- Havo: 1.0003
- Suv: 1.33
- Shisha: 1.5
- Olmos: 2.42`,
    theory: `Refraction is the bending of light when passing between media with different optical densities due to speed changes.

Snell's Law relates incident and refracted angles. Total internal reflection occurs when light travels from denser to less dense medium at angles greater than the critical angle.`,
    formulas: [
      { formula: "n₁sinθ₁ = n₂sinθ₂", description: "Snell's Law", descriptionUz: "Snell qonuni" },
      { formula: "n = c/v", description: "Refractive index", descriptionUz: "Sindirish ko'rsatkichi" },
      { formula: "sinθc = n₂/n₁", description: "Critical angle", descriptionUz: "Kritik burchak" },
      { formula: "v = c/n", description: "Speed in medium", descriptionUz: "Muhitdagi tezlik" },
      { formula: "λ₂ = λ₁·(n₁/n₂)", description: "Wavelength change", descriptionUz: "To'lqin uzunligi o'zgarishi" },
    ],
  },
];
