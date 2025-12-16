import { LabExperiment } from "@/types/physics";

export const laboratories: LabExperiment[] = [
  {
    id: "lab-1-pendulum",
    title: "Determining Pendulum Period",
    titleUz: "Matematik mayatnik yordamida erkin tushish tezlanishini aniqlash",
    purpose: "To determine gravitational acceleration using a mathematical pendulum.",
    purposeUz: "Matematik mayatnik yordamida erkin tushish tezlanishini aniqlash.",
    equipment: [
      "Mathematical pendulum",
      "Ruler",
      "Stopwatch",
      "Stand with clamp"
    ],
    equipmentUz: [
      "Matematik mayatnik",
      "Chizg'ich",
      "Sekundomer",
      "Shtativ"
    ],
    theory: "The period T of a simple pendulum is given by T = 2π√(L/g), where L is the length and g is gravitational acceleration. By measuring T and L, we can calculate g = 4π²L/T².",
    theoryUz: "Matematik mayatnikning T davri T = 2π√(L/g) formula bilan aniqlanadi, bu yerda L - mayatnik uzunligi, g - erkin tushish tezlanishi. T va L ni o'lchab, g = 4π²L/T² formula yordamida g ni hisoblash mumkin.",
    procedure: [
      "Mayatnikni o'lchangan L uzunlikda o'rnating",
      "Mayatnikni kichik burchakka (< 10°) burib qo'yib yuboring",
      "n ta to'liq tebranish vaqtini o'lchang",
      "Davrni T = t/n formula bilan hisoblang",
      "g = 4π²L/T² formula yordamida g ni hisoblang"
    ],
    procedureUz: [
      "Mayatnikni o'lchangan L uzunlikda o'rnating",
      "Mayatnikni kichik burchakka (< 10°) burib qo'yib yuboring",
      "n ta to'liq tebranish vaqtini o'lchang",
      "Davrni T = t/n formula bilan hisoblang",
      "g = 4π²L/T² formula yordamida g ni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "length", name: "Length L", nameUz: "Uzunlik L", unit: "m", isInput: true },
      { id: "oscillations", name: "Number n", nameUz: "Soni n", unit: "", isInput: true },
      { id: "time", name: "Time t", nameUz: "Vaqt t", unit: "s", isInput: true },
      { id: "period", name: "Period T", nameUz: "Davr T", unit: "s", isInput: false },
      { id: "gravity", name: "g", nameUz: "g", unit: "m/s²", isInput: false },
    ],
    calculations: (inputs) => {
      const period = inputs.time / inputs.oscillations;
      const gravity = (4 * Math.PI * Math.PI * inputs.length) / (period * period);
      return {
        period: Math.round(period * 1000) / 1000,
        gravity: Math.round(gravity * 100) / 100,
      };
    },
  },
  {
    id: "lab-2-free-fall",
    title: "Free Fall Acceleration Measurement",
    titleUz: "Erkin tushish tezlanishini o'lchash",
    purpose: "To measure the acceleration due to gravity using free fall motion.",
    purposeUz: "Erkin tushish harakati yordamida tortishish tezlanishini o'lchash.",
    equipment: [
      "Steel ball",
      "Electromagnetic release mechanism",
      "Timer with sensors",
      "Measuring tape"
    ],
    equipmentUz: [
      "Po'lat shar",
      "Elektromagnit mexanizm",
      "Sensorli taymer",
      "O'lchov lentasi"
    ],
    theory: "In free fall, the distance h traveled is given by h = ½gt², where g is gravitational acceleration and t is time. Therefore, g = 2h/t².",
    theoryUz: "Erkin tushishda bosib o'tilgan h masofa h = ½gt² formula bilan aniqlanadi, bu yerda g - tortishish tezlanishi, t - vaqt. Demak, g = 2h/t².",
    procedure: [
      "Sharni o'lchangan h balandlikka o'rnating",
      "Sharni elektromagnit mexanizm yordamida qo'yib yuboring",
      "Tushish vaqti t ni yozib oling",
      "g = 2h/t² ni hisoblang",
      "O'rtacha qiymatni toping"
    ],
    procedureUz: [
      "Sharni o'lchangan h balandlikka o'rnating",
      "Sharni elektromagnit mexanizm yordamida qo'yib yuboring",
      "Tushish vaqti t ni yozib oling",
      "g = 2h/t² ni hisoblang",
      "O'rtacha qiymatni toping"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "height", name: "Height h", nameUz: "Balandlik h", unit: "m", isInput: true },
      { id: "time", name: "Time t", nameUz: "Vaqt t", unit: "s", isInput: true },
      { id: "gravity", name: "g", nameUz: "g", unit: "m/s²", isInput: false },
    ],
    calculations: (inputs) => {
      const gravity = (2 * inputs.height) / (inputs.time * inputs.time);
      return {
        gravity: Math.round(gravity * 100) / 100,
      };
    },
  },
  {
    id: "lab-3-hookes-law",
    title: "Hooke's Law and Spring Constant",
    titleUz: "Guk qonuni va prujina bikrligi",
    purpose: "To verify Hooke's Law and determine the spring constant k.",
    purposeUz: "Guk qonunini tekshirish va prujina bikrligi k ni aniqlash.",
    equipment: [
      "Spring",
      "Set of masses",
      "Ruler with stand",
      "Mass holder"
    ],
    equipmentUz: [
      "Prujina",
      "Yuklar to'plami",
      "Shtativli chizg'ich",
      "Yuk ushlagich"
    ],
    theory: "Hooke's Law states F = kx, where F is the applied force (mg), k is spring constant, and x is extension. The spring constant k = F/x = mg/x.",
    theoryUz: "Guk qonuni F = kx ko'rinishda, bu yerda F - qo'yilgan kuch (mg), k - prujina bikrligi, x - cho'zilish. Prujina bikrligi k = F/x = mg/x.",
    procedure: [
      "Prujinaning boshlang'ich uzunligini (L₀) o'lchang",
      "Ma'lum m massali yukni osing",
      "Yangi L uzunlikni o'lchang",
      "x = L - L₀ cho'zilishni hisoblang",
      "k = mg/x ni hisoblang"
    ],
    procedureUz: [
      "Prujinaning boshlang'ich uzunligini (L₀) o'lchang",
      "Ma'lum m massali yukni osing",
      "Yangi L uzunlikni o'lchang",
      "x = L - L₀ cho'zilishni hisoblang",
      "k = mg/x ni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "mass", name: "Mass m", nameUz: "Massa m", unit: "kg", isInput: true },
      { id: "initialLength", name: "L₀", nameUz: "L₀", unit: "m", isInput: true },
      { id: "finalLength", name: "L", nameUz: "L", unit: "m", isInput: true },
      { id: "extension", name: "Extension x", nameUz: "Cho'zilish x", unit: "m", isInput: false },
      { id: "force", name: "Force F", nameUz: "Kuch F", unit: "N", isInput: false },
      { id: "springConstant", name: "k", nameUz: "k", unit: "N/m", isInput: false },
    ],
    calculations: (inputs) => {
      const extension = inputs.finalLength - inputs.initialLength;
      const force = inputs.mass * 9.8;
      const springConstant = extension > 0 ? force / extension : 0;
      return {
        extension: Math.round(extension * 1000) / 1000,
        force: Math.round(force * 100) / 100,
        springConstant: Math.round(springConstant * 10) / 10,
      };
    },
  },
  {
    id: "lab-4-young-modulus",
    title: "Young's Modulus by Bending Method",
    titleUz: "Egilish usuli orqali Yung modulini aniqlash",
    purpose: "To determine the elastic modulus of a solid using the bending deformation method.",
    purposeUz: "Qattiq jismning (sterjenning) elastiklik modulini egilish deformatsiyasi metodi bilan aniqlashni o'rganish.",
    equipment: [
      "Two support prisms",
      "Test rod (metal or plastic)",
      "Set of 0.5 kg weights (4 pieces)",
      "Scale ruler",
      "Vernier caliper"
    ],
    equipmentUz: [
      "Ikkita tayanch prizma",
      "Tekshiriluvchi sterjen (metalldan yoki plastmassadan)",
      "4 ta 0,5 kg li toshlar",
      "Masshtabli lineyka",
      "Shtangensirkul"
    ],
    theory: "Elastic modulus (Young's modulus) E characterizes the material's resistance to deformation. According to Hooke's law: σ = Eε, where σ is stress and ε is relative deformation. For a beam bent by a central load: E = Fl³/(48If), where F is force, l is span length, I is moment of inertia, f is deflection.",
    theoryUz: "Elastiklik moduli (Yung moduli) E - materialning deformatsiyaga qarshiligini xarakterlaydigan kattalik. Guk qonuniga ko'ra: σ = Eε, bu yerda σ - kuchlanganlik, ε - nisbiy deformatsiya. Markaziy yuk bilan egilgan sterjen uchun: E = Fl³/(48If), bu yerda F - kuch, l - tayanch oraligi, I - inersiya momenti, f - egilish.",
    procedure: [
      "Sterjen o'lchamlarini shtangensirkul bilan o'lchang",
      "Sterjenni tayanch prizmalarga joylashtiring",
      "Sterjen markaziga yuk osing va egilishni o'lchang",
      "Yukni o'zgartirib, o'lchashlarni takrorlang",
      "E = Fl³/(48If) formula bilan Yung modulini hisoblang"
    ],
    procedureUz: [
      "Sterjen o'lchamlarini shtangensirkul bilan o'lchang",
      "Sterjenni tayanch prizmalarga joylashtiring",
      "Sterjen markaziga yuk osing va egilishni o'lchang",
      "Yukni o'zgartirib, o'lchashlarni takrorlang",
      "E = Fl³/(48If) formula bilan Yung modulini hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "mass", name: "Mass m", nameUz: "Massa m", unit: "kg", isInput: true },
      { id: "length", name: "Span l", nameUz: "Oraliq l", unit: "m", isInput: true },
      { id: "width", name: "Width b", nameUz: "Kengligi b", unit: "m", isInput: true },
      { id: "height", name: "Height h", nameUz: "Balandligi h", unit: "m", isInput: true },
      { id: "deflection", name: "Deflection f", nameUz: "Egilish f", unit: "m", isInput: true },
      { id: "youngModulus", name: "E", nameUz: "E", unit: "Pa", isInput: false },
    ],
    calculations: (inputs) => {
      const force = inputs.mass * 9.8;
      const momentOfInertia = (inputs.width * Math.pow(inputs.height, 3)) / 12;
      const youngModulus = inputs.deflection > 0 
        ? (force * Math.pow(inputs.length, 3)) / (48 * momentOfInertia * inputs.deflection)
        : 0;
      return {
        youngModulus: Math.round(youngModulus / 1e9 * 100) / 100 * 1e9,
      };
    },
  },
  {
    id: "lab-5-physical-pendulum",
    title: "Physical Pendulum - Ring Method",
    titleUz: "Tebranma harakat qonunlarini (halqa yordamida) o'rganish",
    purpose: "To determine gravitational acceleration using a physical pendulum (ring).",
    purposeUz: "Halqa yordamida tortishish kuchi tezlanishini aniqlash.",
    equipment: [
      "Ring (physical pendulum)",
      "Vernier caliper",
      "Stopwatch",
      "Stand"
    ],
    equipmentUz: [
      "Halqa",
      "Shtangensirkul",
      "Sekundomer",
      "Fizik mayatnik stendi"
    ],
    theory: "A physical pendulum oscillates under the influence of gravity. Period: T = 2π√(K/(mgl)), where K is moment of inertia, l is distance from pivot to center of mass. For a ring: K = ½m(R₁² + R₂²) + mR₁², so g = 4π²K/(mlT²).",
    theoryUz: "Fizik mayatnik og'irlik kuchi ta'sirida tebranadi. Davri: T = 2π√(K/(mgl)), bu yerda K - inersiya momenti, l - osilgan nuqtadan og'irlik markazigacha masofa. Halqa uchun: K = ½m(R₁² + R₂²) + mR₁², demak g = 4π²K/(mlT²).",
    procedure: [
      "Halqaning ichki va tashqi diametrlarini o'lchang",
      "R₁ va R₂ radiuslarini hisoblang",
      "Halqani osilgan nuqtadan tebrantirib, n ta tebranish vaqtini o'lchang",
      "Davrni T = t/n formula bilan hisoblang",
      "g = 4π²K/(mlT²) formula bilan g ni hisoblang"
    ],
    procedureUz: [
      "Halqaning ichki va tashqi diametrlarini o'lchang",
      "R₁ va R₂ radiuslarini hisoblang",
      "Halqani osilgan nuqtadan tebrantirib, n ta tebranish vaqtini o'lchang",
      "Davrni T = t/n formula bilan hisoblang",
      "g = 4π²K/(mlT²) formula bilan g ni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "d1", name: "d₁", nameUz: "d₁", unit: "mm", isInput: true },
      { id: "d2", name: "d₂", nameUz: "d₂", unit: "mm", isInput: true },
      { id: "oscillations", name: "n", nameUz: "n", unit: "", isInput: true },
      { id: "time", name: "t", nameUz: "t", unit: "s", isInput: true },
      { id: "r1", name: "R₁", nameUz: "R₁", unit: "mm", isInput: false },
      { id: "r2", name: "R₂", nameUz: "R₂", unit: "mm", isInput: false },
      { id: "period", name: "T", nameUz: "T", unit: "s", isInput: false },
      { id: "gravity", name: "g", nameUz: "g", unit: "m/s²", isInput: false },
    ],
    calculations: (inputs) => {
      const r1 = inputs.d1 / 2;
      const r2 = inputs.d2 / 2;
      const period = inputs.time / inputs.oscillations;
      const r1m = r1 / 1000;
      const r2m = r2 / 1000;
      const inertiaCoeff = 0.5 * (r1m * r1m + r2m * r2m) + r1m * r1m;
      const gravity = (4 * Math.PI * Math.PI * inertiaCoeff) / (r1m * period * period);
      return {
        r1: Math.round(r1 * 100) / 100,
        r2: Math.round(r2 * 100) / 100,
        period: Math.round(period * 1000) / 1000,
        gravity: Math.round(gravity * 100) / 100,
      };
    },
  },
  {
    id: "lab-6-sound-speed",
    title: "Speed of Sound in Air",
    titleUz: "Tovushning havoda tarqalish tezligini o'lchash",
    purpose: "To determine the speed of sound propagation in air at room temperature.",
    purposeUz: "Xona haroratida tovushning tarqalish tezligini aniqlash.",
    equipment: [
      "12V power source",
      "Cobra3 base unit",
      "RS 232 cable",
      "Timer/counter",
      "Microphone",
      "9V battery",
      "Connecting wires",
      "Personal computer"
    ],
    equipmentUz: [
      "12 V li tok manbai",
      "Cobra3 bazaviy bloki",
      "RS 232 tipli kabel",
      "Taymer/hisoblagich",
      "Mikrofon",
      "9V li batareya",
      "Ulovchi simlar",
      "Personal kompyuter"
    ],
    theory: "Sound travels through air at a constant speed that depends on temperature. At 0°C, v₀ = 331.8 m/s. Temperature dependence: vT = v₀√(T/273), where T is absolute temperature in Kelvin.",
    theoryUz: "Tovush havoda doimiy tezlik bilan tarqaladi, bu tezlik haroratga bog'liq. 0°C da v₀ = 331.8 m/s. Haroratga bog'liqligi: vT = v₀√(T/273), bu yerda T - Kelvin shkalasidagi mutlaq harorat.",
    procedure: [
      "Qurilmani sxema bo'yicha yig'ing",
      "Tovushni tarqatish va qabul qilish oralig'ini 30-40 sm qilib belgilang",
      "Tovush tezligini o'lchang",
      "O'lchashni 5 marta takrorlang",
      "Mikrofonni 10-15 sm ga o'zgartiring va takrorlang",
      "O'rtacha tezlikni hisoblang"
    ],
    procedureUz: [
      "Qurilmani sxema bo'yicha yig'ing",
      "Tovushni tarqatish va qabul qilish oralig'ini 30-40 sm qilib belgilang",
      "Tovush tezligini o'lchang",
      "O'lchashni 5 marta takrorlang",
      "Mikrofonni 10-15 sm ga o'zgartiring va takrorlang",
      "O'rtacha tezlikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "distance", name: "Distance S", nameUz: "Masofa S", unit: "m", isInput: true },
      { id: "time", name: "Time t", nameUz: "Vaqt t", unit: "ms", isInput: true },
      { id: "temperature", name: "Temp T", nameUz: "Harorat T", unit: "°C", isInput: true },
      { id: "velocity", name: "v", nameUz: "v", unit: "m/s", isInput: false },
      { id: "theoreticalV", name: "v (theory)", nameUz: "v (nazariy)", unit: "m/s", isInput: false },
    ],
    calculations: (inputs) => {
      const velocity = inputs.distance / (inputs.time / 1000);
      const tempK = inputs.temperature + 273;
      const theoreticalV = 331.8 * Math.sqrt(tempK / 273);
      return {
        velocity: Math.round(velocity * 10) / 10,
        theoreticalV: Math.round(theoreticalV * 10) / 10,
      };
    },
  },
  {
    id: "lab-7-adiabatic-expansion",
    title: "Adiabatic Expansion - Heat Capacity Ratio",
    titleUz: "Havoning issiqlik sig'imlari nisbatini adiabatik kengayish yordamida aniqlash",
    purpose: "To determine the ratio of specific heat capacities of gases using adiabatic expansion and compare with theoretical values.",
    purposeUz: "Gazlarning solishtirma issiqlik sig'imlari nisbatini tajribada aniqlash va molekulyar kinetik nazariyaga asoslanib hisoblangan qiymati bilan solishtirish.",
    equipment: [
      "Large glass vessel",
      "Water manometer",
      "Hand pump",
      "Valves C and D"
    ],
    equipmentUz: [
      "Katta shisha idish",
      "Suvli manometr",
      "Qo'l nasosi",
      "C va D jumraklar"
    ],
    theory: "The ratio of heat capacities γ = Cp/Cv = (i+2)/i, where i is degrees of freedom (3 for monatomic, 5 for diatomic gases). For air (diatomic), γ ≈ 1.4. Using adiabatic expansion: γ = h₁/(h₁-h₂), where h₁ is initial excess pressure, h₂ is final excess pressure.",
    theoryUz: "Issiqlik sig'imlari nisbati γ = Cp/Cv = (i+2)/i, bu yerda i - erkinlik darajasi (bir atomli gazlar uchun 3, ikki atomli gazlar uchun 5). Havo (ikki atomli) uchun γ ≈ 1.4. Adiabatik kengayish yordamida: γ = h₁/(h₁-h₂), bu yerda h₁ - boshlang'ich ortiqcha bosim, h₂ - oxirgi ortiqcha bosim.",
    procedure: [
      "C jumrakni yopiq holda D jumrakni ochib, idishga havo damlang",
      "Manometrda h₁ = 20-25 sm farqga erishgunga qadar damlang",
      "D jumrakni yoping va harorat tenglashishini kuting",
      "C jumrakni tez ochib, bosimni atmosfera bosimiga tenglashtiring",
      "C ni yoping va harorat tenglashgach h₂ ni o'lchang",
      "γ = h₁/(h₁-h₂) formula bilan hisoblang"
    ],
    procedureUz: [
      "C jumrakni yopiq holda D jumrakni ochib, idishga havo damlang",
      "Manometrda h₁ = 20-25 sm farqga erishgunga qadar damlang",
      "D jumrakni yoping va harorat tenglashishini kuting",
      "C jumrakni tez ochib, bosimni atmosfera bosimiga tenglashtiring",
      "C ni yoping va harorat tenglashgach h₂ ni o'lchang",
      "γ = h₁/(h₁-h₂) formula bilan hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "h1", name: "h₁", nameUz: "h₁", unit: "cm", isInput: true },
      { id: "h2", name: "h₂", nameUz: "h₂", unit: "cm", isInput: true },
      { id: "gamma", name: "γ", nameUz: "γ", unit: "", isInput: false },
      { id: "error", name: "Δγ", nameUz: "Δγ", unit: "%", isInput: false },
    ],
    calculations: (inputs) => {
      const gamma = inputs.h1 / (inputs.h1 - inputs.h2);
      const theoreticalGamma = 1.4;
      const error = Math.abs((gamma - theoreticalGamma) / theoreticalGamma) * 100;
      return {
        gamma: Math.round(gamma * 1000) / 1000,
        error: Math.round(error * 10) / 10,
      };
    },
  },
  {
    id: "lab-8-surface-tension",
    title: "Surface Tension Coefficient",
    titleUz: "Sirt taranglik koeffitsientini aniqlash",
    purpose: "To determine the surface tension coefficient of a liquid using the capillary method.",
    purposeUz: "Kapillyar usul yordamida suyuqlikning sirt taranglik koeffitsientini aniqlash.",
    equipment: [
      "Capillary tubes of different diameters",
      "Vessel with liquid",
      "Traveling microscope",
      "Ruler"
    ],
    equipmentUz: [
      "Turli diametrli kapillyar naylar",
      "Suyuqlikli idish",
      "Ko'chma mikroskop",
      "Chizg'ich"
    ],
    theory: "Surface tension causes liquid to rise in a capillary tube. The height h is related to surface tension σ by: h = 2σcosθ/(ρgr), where ρ is liquid density, g is gravity, r is tube radius, θ is contact angle. For water θ ≈ 0, so σ = ρghr/2.",
    theoryUz: "Sirt taranglik suyuqlikning kapillyar naychada ko'tarilishiga sabab bo'ladi. Balandlik h va sirt taranglik σ o'rtasidagi bog'lanish: h = 2σcosθ/(ρgr), bu yerda ρ - suyuqlik zichligi, g - erkin tushish tezlanishi, r - naycha radiusi, θ - ho'llash burchagi. Suv uchun θ ≈ 0, demak σ = ρghr/2.",
    procedure: [
      "Kapillyar naychaning ichki diametrini o'lchang",
      "Naychani suyuqlikka tushiring",
      "Suyuqlikning ko'tarilish balandligini o'lchang",
      "Turli diametrli naychalar uchun takrorlang",
      "σ = ρghr/2 formula bilan hisoblang"
    ],
    procedureUz: [
      "Kapillyar naychaning ichki diametrini o'lchang",
      "Naychani suyuqlikka tushiring",
      "Suyuqlikning ko'tarilish balandligini o'lchang",
      "Turli diametrli naychalar uchun takrorlang",
      "σ = ρghr/2 formula bilan hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "diameter", name: "Diameter d", nameUz: "Diametr d", unit: "mm", isInput: true },
      { id: "height", name: "Height h", nameUz: "Balandlik h", unit: "mm", isInput: true },
      { id: "density", name: "Density ρ", nameUz: "Zichlik ρ", unit: "kg/m³", isInput: true },
      { id: "surfaceTension", name: "σ", nameUz: "σ", unit: "N/m", isInput: false },
    ],
    calculations: (inputs) => {
      const radius = (inputs.diameter / 2) / 1000;
      const height = inputs.height / 1000;
      const surfaceTension = (inputs.density * 9.8 * height * radius) / 2;
      return {
        surfaceTension: Math.round(surfaceTension * 10000) / 10000,
      };
    },
  },
  {
    id: "lab-9-viscosity",
    title: "Liquid Viscosity - Stokes Method",
    titleUz: "Suyuqlikning qovushoqligini Stoks usulida aniqlash",
    purpose: "To determine the viscosity coefficient of a liquid using Stokes method (falling ball).",
    purposeUz: "Stoks usuli (tushuvchi shar) yordamida suyuqlikning qovushoqlik koeffitsientini aniqlash.",
    equipment: [
      "Tall glass cylinder with viscous liquid",
      "Small steel balls",
      "Micrometer",
      "Stopwatch",
      "Thermometer"
    ],
    equipmentUz: [
      "Qovushoq suyuqlikli baland silindr",
      "Kichik po'lat sharlar",
      "Mikrometr",
      "Sekundomer",
      "Termometr"
    ],
    theory: "A sphere falling through a viscous liquid reaches terminal velocity when gravitational force equals drag force. Stokes formula: η = 2r²(ρs-ρl)g/(9v), where r is sphere radius, ρs and ρl are densities of sphere and liquid, v is terminal velocity.",
    theoryUz: "Qovushoq suyuqlikda tushayotgan shar, og'irlik kuchi qarshilik kuchiga tenglashganda, doimiy tezlikka erishadi. Stoks formulasi: η = 2r²(ρs-ρl)g/(9v), bu yerda r - shar radiusi, ρs va ρl - shar va suyuqlik zichliklari, v - doimiy tezlik.",
    procedure: [
      "Shar diametrini mikrometr bilan o'lchang",
      "Silindrdagi belgilangan masofani o'lchang",
      "Sharni suyuqlik yuzasiga qo'ying",
      "Shar belgilangan masofani bosib o'tish vaqtini o'lchang",
      "η = 2r²(ρs-ρl)g/(9v) formula bilan hisoblang"
    ],
    procedureUz: [
      "Shar diametrini mikrometr bilan o'lchang",
      "Silindrdagi belgilangan masofani o'lchang",
      "Sharni suyuqlik yuzasiga qo'ying",
      "Shar belgilangan masofani bosib o'tish vaqtini o'lchang",
      "η = 2r²(ρs-ρl)g/(9v) formula bilan hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "diameter", name: "Diameter d", nameUz: "Diametr d", unit: "mm", isInput: true },
      { id: "distance", name: "Distance L", nameUz: "Masofa L", unit: "m", isInput: true },
      { id: "time", name: "Time t", nameUz: "Vaqt t", unit: "s", isInput: true },
      { id: "sphereDensity", name: "ρs", nameUz: "ρs", unit: "kg/m³", isInput: true },
      { id: "liquidDensity", name: "ρl", nameUz: "ρl", unit: "kg/m³", isInput: true },
      { id: "velocity", name: "v", nameUz: "v", unit: "m/s", isInput: false },
      { id: "viscosity", name: "η", nameUz: "η", unit: "Pa·s", isInput: false },
    ],
    calculations: (inputs) => {
      const radius = (inputs.diameter / 2) / 1000;
      const velocity = inputs.distance / inputs.time;
      const viscosity = (2 * radius * radius * (inputs.sphereDensity - inputs.liquidDensity) * 9.8) / (9 * velocity);
      return {
        velocity: Math.round(velocity * 10000) / 10000,
        viscosity: Math.round(viscosity * 10000) / 10000,
      };
    },
  },
  {
    id: "lab-10-wheatstone-bridge",
    title: "Wheatstone Bridge - Resistance Measurement",
    titleUz: "O'tkazgichning qarshiligini o'zgarmas tok ko'prigi yordamida aniqlash",
    purpose: "To study the laws of branched electrical circuits and determine unknown resistance using Wheatstone bridge.",
    purposeUz: "Tarmoqlangan elektr zanjirlari qonuniyatlarini o'rganish va Uitston ko'prigi yordamida noma'lum qarshilikni aniqlash.",
    equipment: [
      "Rheochord (slide wire bridge)",
      "Galvanometer",
      "Resistance box",
      "Set of unknown resistances",
      "Power source",
      "Switch and connecting wires"
    ],
    equipmentUz: [
      "Reoxord",
      "Galvanometr",
      "Qarshiliklar magazini",
      "Noma'lum qarshiliklar to'plami",
      "Tok manbai",
      "Kalit va ulovchi simlar"
    ],
    theory: "Wheatstone bridge uses Kirchhoff's laws for precise resistance measurement. At balance: Rx/R0 = l1/l2, where Rx is unknown resistance, R0 is known resistance, l1 and l2 are bridge arm lengths. Therefore: Rx = R0(l1/l2).",
    theoryUz: "Uitston ko'prigi Kirxgof qonunlariga asoslanib qarshilikni aniq o'lchash imkonini beradi. Muvozanat holatida: Rx/R0 = l1/l2, bu yerda Rx - noma'lum qarshilik, R0 - ma'lum qarshilik, l1 va l2 - ko'prik yelkalari uzunliklari. Demak: Rx = R0(l1/l2).",
    procedure: [
      "Sxemani yig'ing",
      "D jilgichni reoxord o'rtasiga qo'ying",
      "R0 qarshilikni tanlab, galvanometrda tok bo'lmasligiga erishing",
      "Galvanometr strelkasi 0 ga kelguncha D jilgichni harakatlantiring",
      "l1 va l2 uzunliklarni yozib oling",
      "Rx = R0(l1/l2) formula bilan hisoblang"
    ],
    procedureUz: [
      "Sxemani yig'ing",
      "D jilgichni reoxord o'rtasiga qo'ying",
      "R0 qarshilikni tanlab, galvanometrda tok bo'lmasligiga erishing",
      "Galvanometr strelkasi 0 ga kelguncha D jilgichni harakatlantiring",
      "l1 va l2 uzunliklarni yozib oling",
      "Rx = R0(l1/l2) formula bilan hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "r0", name: "R₀", nameUz: "R₀", unit: "Ω", isInput: true },
      { id: "l1", name: "l₁", nameUz: "l₁", unit: "cm", isInput: true },
      { id: "l2", name: "l₂", nameUz: "l₂", unit: "cm", isInput: true },
      { id: "rx", name: "Rx", nameUz: "Rx", unit: "Ω", isInput: false },
    ],
    calculations: (inputs) => {
      const rx = inputs.r0 * (inputs.l1 / inputs.l2);
      return {
        rx: Math.round(rx * 100) / 100,
      };
    },
  },
];
