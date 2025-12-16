import { LabExperiment } from "@/types/physics";

export const laboratories: LabExperiment[] = [
  {
    id: "pendulum-period",
    title: "Determining Pendulum Period",
    titleUz: "Mayatnik davrini aniqlash",
    purpose: "To verify the relationship between pendulum length and period, and to determine the local gravitational acceleration.",
    purposeUz: "Mayatnik uzunligi va davri o'rtasidagi bog'liqlikni tekshirish va mahalliy tortishish tezlanishini aniqlash.",
    equipment: [
      "String (1-2 meters)",
      "Small heavy ball (bob)",
      "Ruler or measuring tape",
      "Stopwatch",
      "Stand with clamp"
    ],
    equipmentUz: [
      "Ip (1-2 metr)",
      "Kichik og'ir shar (yuk)",
      "O'lchagich yoki metr lentasi",
      "Sekundomer",
      "Qisqich bilan shtativ"
    ],
    theory: "The period T of a simple pendulum is given by T = 2π√(L/g), where L is the length and g is gravitational acceleration. By measuring T and L, we can calculate g.",
    theoryUz: "Oddiy mayatnikning T davri T = 2π√(L/g) formula bilan aniqlanadi, bu yerda L - uzunlik, g - erkin tushish tezlanishi. T va L ni o'lchab, g ni hisoblash mumkin.",
    procedure: [
      "Set up the pendulum with a measured length L",
      "Displace the bob by a small angle (< 15°) and release",
      "Measure time for 10 complete oscillations",
      "Calculate the period T = time/10",
      "Repeat for different lengths",
      "Calculate g using the formula g = 4π²L/T²"
    ],
    procedureUz: [
      "Mayatnikni o'lchangan L uzunlikda o'rnating",
      "Yukni kichik burchakka (< 15°) burib qo'yib yuboring",
      "10 ta to'liq tebranish vaqtini o'lchang",
      "Davrni T = vaqt/10 formula bilan hisoblang",
      "Turli uzunliklar uchun takrorlang",
      "g ni g = 4π²L/T² formula yordamida hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "length", name: "Length L", nameUz: "Uzunlik L", unit: "m", isInput: true },
      { id: "time10", name: "Time for 10 osc.", nameUz: "10 tebranish vaqti", unit: "s", isInput: true },
      { id: "period", name: "Period T", nameUz: "Davr T", unit: "s", isInput: false },
      { id: "gravity", name: "g", nameUz: "g", unit: "m/s²", isInput: false },
    ],
    calculations: (inputs) => {
      const period = inputs.time10 / 10;
      const gravity = (4 * Math.PI * Math.PI * inputs.length) / (period * period);
      return {
        period: Math.round(period * 1000) / 1000,
        gravity: Math.round(gravity * 100) / 100,
      };
    },
  },
  {
    id: "free-fall-g",
    title: "Free Fall Acceleration",
    titleUz: "Erkin tushish tezlanishi",
    purpose: "To measure the acceleration due to gravity using free fall motion.",
    purposeUz: "Erkin tushish harakati yordamida tortishish tezlanishini o'lchash.",
    equipment: [
      "Steel ball",
      "Electromagnetic release mechanism",
      "Timer with sensors",
      "Measuring tape",
      "Receiving pad"
    ],
    equipmentUz: [
      "Po'lat shar",
      "Elektromagnit qo'yib yuborish mexanizmi",
      "Sensorli taymer",
      "O'lchov lentasi",
      "Qabul qiluvchi taglik"
    ],
    theory: "In free fall, the distance h traveled is given by h = ½gt², where g is gravitational acceleration and t is time. Therefore, g = 2h/t².",
    theoryUz: "Erkin tushishda bosib o'tilgan h masofa h = ½gt² formula bilan aniqlanadi, bu yerda g - tortishish tezlanishi, t - vaqt. Demak, g = 2h/t².",
    procedure: [
      "Set up the ball at a measured height h above the sensor",
      "Release the ball using the electromagnetic mechanism",
      "Record the fall time t",
      "Repeat 5 times for each height",
      "Calculate g = 2h/t² for each trial",
      "Find the average value of g"
    ],
    procedureUz: [
      "Sharni sensordan o'lchangan h balandlikka o'rnating",
      "Sharni elektromagnit mexanizm yordamida qo'yib yuboring",
      "Tushish vaqti t ni yozib oling",
      "Har bir balandlik uchun 5 marta takrorlang",
      "Har bir tajriba uchun g = 2h/t² ni hisoblang",
      "g ning o'rtacha qiymatini toping"
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
    id: "hookes-law",
    title: "Hooke's Law Verification",
    titleUz: "Guk qonunini tekshirish",
    purpose: "To verify Hooke's Law and determine the spring constant k.",
    purposeUz: "Guk qonunini tekshirish va prujina bikrligi k ni aniqlash.",
    equipment: [
      "Spring",
      "Set of masses (50g - 500g)",
      "Ruler with stand",
      "Mass holder",
      "Clamp and support"
    ],
    equipmentUz: [
      "Prujina",
      "Yuklar to'plami (50g - 500g)",
      "Shtativli chizg'ich",
      "Yuk ushlagich",
      "Qisqich va tayanchlar"
    ],
    theory: "Hooke's Law states F = kx, where F is the applied force (mg), k is spring constant, and x is extension. The spring constant k = F/x = mg/x.",
    theoryUz: "Guk qonuni F = kx ko'rinishda, bu yerda F - qo'yilgan kuch (mg), k - prujina bikrligi, x - cho'zilish. Prujina bikrligi k = F/x = mg/x.",
    procedure: [
      "Measure the initial length of the spring (L₀)",
      "Hang a known mass m on the spring",
      "Measure the new length L and calculate extension x = L - L₀",
      "Calculate the force F = mg",
      "Repeat for different masses",
      "Calculate k = F/x for each measurement"
    ],
    procedureUz: [
      "Prujinaning boshlang'ich uzunligini (L₀) o'lchang",
      "Ma'lum m massali yukni osing",
      "Yangi L uzunlikni o'lchang va x = L - L₀ cho'zilishni hisoblang",
      "F = mg kuchni hisoblang",
      "Turli massalar uchun takrorlang",
      "Har bir o'lchov uchun k = F/x ni hisoblang"
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
    id: "friction-coefficient",
    title: "Coefficient of Friction",
    titleUz: "Ishqalanish koeffitsienti",
    purpose: "To determine the coefficient of static and kinetic friction between two surfaces.",
    purposeUz: "Ikki sirt orasidagi statik va kinetik ishqalanish koeffitsientini aniqlash.",
    equipment: [
      "Inclined plane with angle scale",
      "Wooden or metal block",
      "Set of masses",
      "Protractor",
      "Spring balance"
    ],
    equipmentUz: [
      "Burchak shkalali qiya tekislik",
      "Yog'och yoki metall blok",
      "Yuklar to'plami",
      "Transportir",
      "Prujinali tarozi"
    ],
    theory: "On an inclined plane, the friction coefficient μ = tan(θ) when the object just begins to slide. For kinetic friction, μk = F/(mg·cos(θ)) where F is the friction force.",
    theoryUz: "Qiya tekislikda, jism sirpanishni boshlagan paytda ishqalanish koeffitsienti μ = tan(θ). Kinetik ishqalanish uchun μk = F/(mg·cos(θ)), bu yerda F - ishqalanish kuchi.",
    procedure: [
      "Place the block on the inclined plane",
      "Slowly increase the angle until the block starts to slide",
      "Record the angle θ (critical angle)",
      "Calculate μs = tan(θ)",
      "Repeat 5 times and find the average",
      "For kinetic friction, measure the force needed to move the block at constant speed"
    ],
    procedureUz: [
      "Blokni qiya tekislikka qo'ying",
      "Blok sirpana boshlaguncha burchakni asta-sekin oshiring",
      "θ burchakni (kritik burchak) yozib oling",
      "μs = tan(θ) ni hisoblang",
      "5 marta takrorlang va o'rtacha qiymatni toping",
      "Kinetik ishqalanish uchun blokni doimiy tezlikda harakatlantirish uchun kerakli kuchni o'lchang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "angle", name: "Critical Angle θ", nameUz: "Kritik burchak θ", unit: "°", isInput: true },
      { id: "frictionCoeff", name: "μs = tan(θ)", nameUz: "μs = tan(θ)", unit: "", isInput: false },
    ],
    calculations: (inputs) => {
      const angleRad = (inputs.angle * Math.PI) / 180;
      const frictionCoeff = Math.tan(angleRad);
      return {
        frictionCoeff: Math.round(frictionCoeff * 1000) / 1000,
      };
    },
  },
];
