import { LabExperiment } from "@/types/physics";

export const laboratories: LabExperiment[] = [
  {
    id: "lab-1-pendulum",
    title: "Matematik mayatnik yordamida erkin tushish tezlanishini aniqlash",
    titleUz: "Matematik mayatnik yordamida erkin tushish tezlanishini aniqlash",
    purpose: "Matematik mayatnik yordamida erkin tushish tezlanishini aniqlash va mayatnik uzunligi bilan davri orasidagi bog'lanishni tekshirish.",
    purposeUz: "Matematik mayatnik yordamida erkin tushish tezlanishini aniqlash va mayatnik uzunligi bilan davri orasidagi bog'lanishni tekshirish.",
    equipment: [
      "Matematik mayatnik (ip bilan kichik shar)",
      "Chizg'ich yoki metr lentasi (1-2 m)",
      "Sekundomer (0,1 s aniqlikda)",
      "Qisqichli shtativ",
      "Burchakni o'lchash uchun transportir"
    ],
    equipmentUz: [
      "Matematik mayatnik (ip bilan kichik shar)",
      "Chizg'ich yoki metr lentasi (1-2 m)",
      "Sekundomer (0,1 s aniqlikda)",
      "Qisqichli shtativ",
      "Burchakni o'lchash uchun transportir"
    ],
    theory: `Matematik mayatnik - bu massasi e'tiborga olinmaydigan cho'zilmaydigan ipga osilgan moddiy nuqtadir. Kichik burchaklar (10° dan kam) uchun mayatnikning tebranish davri quyidagi formula bilan aniqlanadi:

T = 2π√(L/g)

bu yerda:
- T - tebranish davri (s)
- L - mayatnik uzunligi (m)  
- g - erkin tushish tezlanishi (m/s²)

Bu formuladan erkin tushish tezlanishini aniqlash mumkin:

g = 4π²L/T²

Mayatnik davri faqat uning uzunligi va erkin tushish tezlanishiga bog'liq, massaga bog'liq emas. Bu xususiyat Galiley tomonidan kashf etilgan.

Tajribada n ta tebranish vaqti o'lchanilib, bitta tebranish davri T = t/n formula bilan hisoblanadi.`,
    theoryUz: `Matematik mayatnik - bu massasi e'tiborga olinmaydigan cho'zilmaydigan ipga osilgan moddiy nuqtadir. Kichik burchaklar (10° dan kam) uchun mayatnikning tebranish davri quyidagi formula bilan aniqlanadi:

T = 2π√(L/g)

bu yerda:
- T - tebranish davri (s)
- L - mayatnik uzunligi (m)
- g - erkin tushish tezlanishi (m/s²)

Bu formuladan erkin tushish tezlanishini aniqlash mumkin:

g = 4π²L/T²

Mayatnik davri faqat uning uzunligi va erkin tushish tezlanishiga bog'liq, massaga bog'liq emas. Bu xususiyat Galiley tomonidan kashf etilgan.

Tajribada n ta tebranish vaqti o'lchanilib, bitta tebranish davri T = t/n formula bilan hisoblanadi.`,
    procedure: [
      "Mayatnikni shtativga mahkamlang va ipning uzunligini L o'lchang (osish nuqtasidan sharning markazigacha)",
      "Mayatnikni muvozanat holatidan 5-10° ga og'iring va qo'yib yuboring",
      "Sekundomer yordamida n = 20-30 ta to'liq tebranish vaqtini o'lchang",
      "Tebranish davrini T = t/n formula bilan hisoblang",
      "g = 4π²L/T² formula yordamida erkin tushish tezlanishini hisoblang",
      "Tajribani 3-5 marta turli uzunliklar uchun takrorlang",
      "O'rtacha qiymatni va nisbiy xatolikni hisoblang"
    ],
    procedureUz: [
      "Mayatnikni shtativga mahkamlang va ipning uzunligini L o'lchang (osish nuqtasidan sharning markazigacha)",
      "Mayatnikni muvozanat holatidan 5-10° ga og'iring va qo'yib yuboring",
      "Sekundomer yordamida n = 20-30 ta to'liq tebranish vaqtini o'lchang",
      "Tebranish davrini T = t/n formula bilan hisoblang",
      "g = 4π²L/T² formula yordamida erkin tushish tezlanishini hisoblang",
      "Tajribani 3-5 marta turli uzunliklar uchun takrorlang",
      "O'rtacha qiymatni va nisbiy xatolikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "length", name: "Uzunlik L", nameUz: "Uzunlik L", unit: "m", isInput: true },
      { id: "oscillations", name: "Soni n", nameUz: "Soni n", unit: "", isInput: true },
      { id: "time", name: "Vaqt t", nameUz: "Vaqt t", unit: "s", isInput: true },
      { id: "period", name: "Davr T", nameUz: "Davr T", unit: "s", isInput: false },
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
    title: "Erkin tushish tezlanishini o'lchash",
    titleUz: "Erkin tushish tezlanishini o'lchash",
    purpose: "Erkin tushish harakati yordamida tortishish tezlanishini o'lchash va tekis tezlanuvchan harakat qonunlarini tekshirish.",
    purposeUz: "Erkin tushish harakati yordamida tortishish tezlanishini o'lchash va tekis tezlanuvchan harakat qonunlarini tekshirish.",
    equipment: [
      "Po'lat shar (kichik, zich)",
      "Elektromagnit qo'yib yuborish mexanizmi",
      "Fotoelektrik sensorli elektron taymer",
      "Balandlik shkalali vertikal shtativ",
      "Qabul qiluvchi taglik"
    ],
    equipmentUz: [
      "Po'lat shar (kichik, zich)",
      "Elektromagnit qo'yib yuborish mexanizmi",
      "Fotoelektrik sensorli elektron taymer",
      "Balandlik shkalali vertikal shtativ",
      "Qabul qiluvchi taglik"
    ],
    theory: `Erkin tushish - bu faqat og'irlik kuchi ta'sirida sodir bo'ladigan harakat. Yer sirtida havo qarshiligini hisobga olmaganda, barcha jismlar bir xil tezlanish bilan tushadi.

Tekis tezlanuvchan harakat qonuniga ko'ra:
h = v₀t + ½gt²

Boshlang'ich tezlik v₀ = 0 bo'lganda:
h = ½gt²

Bu yerdan erkin tushish tezlanishi:
g = 2h/t²

bu yerda:
- h - tushish balandligi (m)
- t - tushish vaqti (s)
- g - erkin tushish tezlanishi (m/s²)

Yer sirtida g ≈ 9.8 m/s² (kenglik va balandlikka qarab 9.78 - 9.83 m/s² oralig'ida o'zgaradi).`,
    theoryUz: `Erkin tushish - bu faqat og'irlik kuchi ta'sirida sodir bo'ladigan harakat. Yer sirtida havo qarshiligini hisobga olmaganda, barcha jismlar bir xil tezlanish bilan tushadi.

Tekis tezlanuvchan harakat qonuniga ko'ra:
h = v₀t + ½gt²

Boshlang'ich tezlik v₀ = 0 bo'lganda:
h = ½gt²

Bu yerdan erkin tushish tezlanishi:
g = 2h/t²

bu yerda:
- h - tushish balandligi (m)
- t - tushish vaqti (s)
- g - erkin tushish tezlanishi (m/s²)

Yer sirtida g ≈ 9.8 m/s² (kenglik va balandlikka qarab 9.78 - 9.83 m/s² oralig'ida o'zgaradi).`,
    procedure: [
      "Shtativni vertikal holatda o'rnating va tekisligini tekshiring",
      "Sharni elektromagnit mexanizmga mahkamlang",
      "Sharning tushish balandligini h ni chizg'ich bilan o'lchang",
      "Elektromagnitni o'chirib, sharni qo'yib yuboring va vaqtni o'lchang",
      "Har bir balandlik uchun tajribani 5 marta takrorlang",
      "g = 2h/t² formula bilan hisoblang",
      "Turli balandliklar uchun tajribani qaytaring",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    procedureUz: [
      "Shtativni vertikal holatda o'rnating va tekisligini tekshiring",
      "Sharni elektromagnit mexanizmga mahkamlang",
      "Sharning tushish balandligini h ni chizg'ich bilan o'lchang",
      "Elektromagnitni o'chirib, sharni qo'yib yuboring va vaqtni o'lchang",
      "Har bir balandlik uchun tajribani 5 marta takrorlang",
      "g = 2h/t² formula bilan hisoblang",
      "Turli balandliklar uchun tajribani qaytaring",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "height", name: "Balandlik h", nameUz: "Balandlik h", unit: "m", isInput: true },
      { id: "time", name: "Vaqt t", nameUz: "Vaqt t", unit: "s", isInput: true },
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
    title: "Guk qonunini tekshirish va prujina bikrligi",
    titleUz: "Guk qonunini tekshirish va prujina bikrligi",
    purpose: "Elastik deformatsiya uchun Guk qonunini tekshirish va prujina bikrlik koeffitsientini tajribada aniqlash.",
    purposeUz: "Elastik deformatsiya uchun Guk qonunini tekshirish va prujina bikrlik koeffitsientini tajribada aniqlash.",
    equipment: [
      "Spiral prujina (po'lat yoki bronza)",
      "Kalibrlangan yuklar to'plami (50g - 500g)",
      "Millimetrli shkala bilan vertikal chizg'ich",
      "Yuk ushlagich va ilgak",
      "Qisqichli shtativ"
    ],
    equipmentUz: [
      "Spiral prujina (po'lat yoki bronza)",
      "Kalibrlangan yuklar to'plami (50g - 500g)",
      "Millimetrli shkala bilan vertikal chizg'ich",
      "Yuk ushlagich va ilgak",
      "Qisqichli shtativ"
    ],
    theory: `Guk qonuni elastik deformatsiya uchun kuch va cho'zilish o'rtasidagi chiziqli bog'lanishni ifodalaydi:

F = kx

bu yerda:
- F - prujinaga ta'sir etuvchi kuch (N)
- k - prujina bikrlik koeffitsienti (N/m)
- x - cho'zilish (m)

Og'irlik kuchi ta'sirida:
F = mg

bu yerda m - yuk massasi, g - erkin tushish tezlanishi.

Prujina bikrligi:
k = F/x = mg/x

Guk qonuni faqat elastiklik chegarasigacha amal qiladi. Elastiklik chegarasidan oshganda plastik deformatsiya sodir bo'ladi va jism avvalgi shakliga qaytmaydi.

Prujinaning potensial energiyasi:
E = kx²/2`,
    theoryUz: `Guk qonuni elastik deformatsiya uchun kuch va cho'zilish o'rtasidagi chiziqli bog'lanishni ifodalaydi:

F = kx

bu yerda:
- F - prujinaga ta'sir etuvchi kuch (N)
- k - prujina bikrlik koeffitsienti (N/m)
- x - cho'zilish (m)

Og'irlik kuchi ta'sirida:
F = mg

bu yerda m - yuk massasi, g - erkin tushish tezlanishi.

Prujina bikrligi:
k = F/x = mg/x

Guk qonuni faqat elastiklik chegarasigacha amal qiladi. Elastiklik chegarasidan oshganda plastik deformatsiya sodir bo'ladi va jism avvalgi shakliga qaytmaydi.

Prujinaning potensial energiyasi:
E = kx²/2`,
    procedure: [
      "Prujinani shtativga osilgan holatda mustahkamlang",
      "Prujinaning boshlang'ich uzunligini L₀ ni o'lchang (yuksiz)",
      "Birinchi yukni (masalan, 50g) osing va yangi uzunlikni L o'lchang",
      "Cho'zilishni x = L - L₀ formula bilan hisoblang",
      "Yukni bosqichma-bosqich oshiring (100g, 150g, 200g, ...)",
      "Har bir yuk uchun cho'zilishni yozib boring",
      "k = mg/x formula bilan bikrlikni hisoblang",
      "F(x) grafigini chizing va uning chiziqliligini tekshiring"
    ],
    procedureUz: [
      "Prujinani shtativga osilgan holatda mustahkamlang",
      "Prujinaning boshlang'ich uzunligini L₀ ni o'lchang (yuksiz)",
      "Birinchi yukni (masalan, 50g) osing va yangi uzunlikni L o'lchang",
      "Cho'zilishni x = L - L₀ formula bilan hisoblang",
      "Yukni bosqichma-bosqich oshiring (100g, 150g, 200g, ...)",
      "Har bir yuk uchun cho'zilishni yozib boring",
      "k = mg/x formula bilan bikrlikni hisoblang",
      "F(x) grafigini chizing va uning chiziqliligini tekshiring"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "mass", name: "Massa m", nameUz: "Massa m", unit: "kg", isInput: true },
      { id: "initialLength", name: "L₀", nameUz: "L₀", unit: "m", isInput: true },
      { id: "finalLength", name: "L", nameUz: "L", unit: "m", isInput: true },
      { id: "extension", name: "Cho'zilish x", nameUz: "Cho'zilish x", unit: "m", isInput: false },
      { id: "force", name: "Kuch F", nameUz: "Kuch F", unit: "N", isInput: false },
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
    title: "Egilish usuli orqali Yung modulini aniqlash",
    titleUz: "Egilish usuli orqali Yung modulini aniqlash",
    purpose: "Qattiq jismning (sterjenning) elastiklik modulini egilish deformatsiyasi metodi bilan aniqlashni o'rganish.",
    purposeUz: "Qattiq jismning (sterjenning) elastiklik modulini egilish deformatsiyasi metodi bilan aniqlashni o'rganish.",
    equipment: [
      "Ikkita tayanch prizma (uchburchak kesimli)",
      "Tekshiriluvchi sterjen (metall yoki plastmassa)",
      "4 ta 0,5 kg li toshlar",
      "Masshtabli lineyka (mm aniqlikda)",
      "Shtangensirkul (0,1 mm aniqlikda)"
    ],
    equipmentUz: [
      "Ikkita tayanch prizma (uchburchak kesimli)",
      "Tekshiriluvchi sterjen (metall yoki plastmassa)",
      "4 ta 0,5 kg li toshlar",
      "Masshtabli lineyka (mm aniqlikda)",
      "Shtangensirkul (0,1 mm aniqlikda)"
    ],
    theory: `Elastiklik nazariyasida deformatsiya deb tashqi kuch ta'sirida qattiq jism zarralarining bir-biriga nisbatan vaziyatini o'zgarishi tushuniladi. Deformatsiya elastik va plastik bo'ladi.

Elastik deformatsiya - tashqi kuch olib tashlanganda jism avvalgi shakli va o'lchamini tiklaydi. Plastik deformatsiya - jism avvalgi shakliga qaytmaydi.

Deformatsiya turlari: cho'zilish, siqilish, siljish, buralish, egilish.

Nisbiy deformatsiya:
ε = Δl/l

Mexanik kuchlanganlik:
σ = F/S

Guk qonuni:
σ = Eε  yoki  E = σ/ε

bu yerda E - Yung moduli (elastiklik moduli), [E] = Pa = N/m².

Yung moduli son jihatidan jism uzunligini ikki marta uzaytirish uchun kerak bo'lgan kuchlanganlikka teng.

Egilish usulida sterjen ikkita tayanchga qo'yiladi va o'rtasiga yuk osiladi. Egilish kattaligi (strelasi):

λ = 4Pl³/(3Eab³)

bu yerda:
- l - tayanch nuqtalari orasidagi masofa
- P = mg - egiluvchi kuch
- a - sterjen eni
- b - sterjen qalinligi

Yung moduli:
E = 4Pl³/(3λab³)`,
    theoryUz: `Elastiklik nazariyasida deformatsiya deb tashqi kuch ta'sirida qattiq jism zarralarining bir-biriga nisbatan vaziyatini o'zgarishi tushuniladi. Deformatsiya elastik va plastik bo'ladi.

Elastik deformatsiya - tashqi kuch olib tashlanganda jism avvalgi shakli va o'lchamini tiklaydi. Plastik deformatsiya - jism avvalgi shakliga qaytmaydi.

Deformatsiya turlari: cho'zilish, siqilish, siljish, buralish, egilish.

Nisbiy deformatsiya:
ε = Δl/l

Mexanik kuchlanganlik:
σ = F/S

Guk qonuni:
σ = Eε  yoki  E = σ/ε

bu yerda E - Yung moduli (elastiklik moduli), [E] = Pa = N/m².

Yung moduli son jihatidan jism uzunligini ikki marta uzaytirish uchun kerak bo'lgan kuchlanganlikka teng.

Egilish usulida sterjen ikkita tayanchga qo'yiladi va o'rtasiga yuk osiladi. Egilish kattaligi (strelasi):

λ = 4Pl³/(3Eab³)

bu yerda:
- l - tayanch nuqtalari orasidagi masofa
- P = mg - egiluvchi kuch
- a - sterjen eni
- b - sterjen qalinligi

Yung moduli:
E = 4Pl³/(3λab³)`,
    procedure: [
      "Shtangensirkul bilan sterjen enini (a) va qalinligini (b) 4 joyidan o'lchab, o'rtacha qiymatni toping",
      "Sterjenni A va B prizmalar ustiga o'rnating va ikkita tayanch nuqtalari orasidagi masofani (l) o'lchang",
      "Sterjen o'rtasiga halqa osib, shtangensirkul bo'yicha boshlang'ich holatni belgilang (n₀)",
      "Halqaga 0,5 kg, 1,0 kg, 1,5 kg, 2,0 kg massali toshlarni ketma-ket joylashtiring",
      "Har bir yuk uchun shtangensirkul ko'rsatishini (nᵢ) yozing va egilish λ = nᵢ - n₀ ni hisoblang",
      "P = mg (g = 9,8 m/s²) kuchni hisoblang",
      "E = 4Pl³/(3λab³) formula bilan Yung modulini hisoblang",
      "Yukni bittadan kamaytirib, o'lchashlarni takrorlang va o'rtacha qiymatni toping"
    ],
    procedureUz: [
      "Shtangensirkul bilan sterjen enini (a) va qalinligini (b) 4 joyidan o'lchab, o'rtacha qiymatni toping",
      "Sterjenni A va B prizmalar ustiga o'rnating va ikkita tayanch nuqtalari orasidagi masofani (l) o'lchang",
      "Sterjen o'rtasiga halqa osib, shtangensirkul bo'yicha boshlang'ich holatni belgilang (n₀)",
      "Halqaga 0,5 kg, 1,0 kg, 1,5 kg, 2,0 kg massali toshlarni ketma-ket joylashtiring",
      "Har bir yuk uchun shtangensirkul ko'rsatishini (nᵢ) yozing va egilish λ = nᵢ - n₀ ni hisoblang",
      "P = mg (g = 9,8 m/s²) kuchni hisoblang",
      "E = 4Pl³/(3λab³) formula bilan Yung modulini hisoblang",
      "Yukni bittadan kamaytirib, o'lchashlarni takrorlang va o'rtacha qiymatni toping"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "mass", name: "Massa m", nameUz: "Massa m", unit: "kg", isInput: true },
      { id: "length", name: "Oraliq l", nameUz: "Oraliq l", unit: "m", isInput: true },
      { id: "width", name: "Eni a", nameUz: "Eni a", unit: "mm", isInput: true },
      { id: "thickness", name: "Qalinligi b", nameUz: "Qalinligi b", unit: "mm", isInput: true },
      { id: "deflection", name: "Egilish λ", nameUz: "Egilish λ", unit: "mm", isInput: true },
      { id: "youngModulus", name: "E", nameUz: "E", unit: "GPa", isInput: false },
    ],
    calculations: (inputs) => {
      const force = inputs.mass * 9.8;
      const a = inputs.width / 1000;
      const b = inputs.thickness / 1000;
      const lambda = inputs.deflection / 1000;
      const youngModulus = lambda > 0 
        ? (4 * force * Math.pow(inputs.length, 3)) / (3 * lambda * a * Math.pow(b, 3))
        : 0;
      return {
        youngModulus: Math.round(youngModulus / 1e9 * 100) / 100,
      };
    },
  },
  {
    id: "lab-5-physical-pendulum",
    title: "Tebranma harakat qonunlarini (halqa yordamida) o'rganish",
    titleUz: "Tebranma harakat qonunlarini (halqa yordamida) o'rganish",
    purpose: "Halqa yordamida tortishish kuchi tezlanishini aniqlash va tebranma harakat qonunlarini o'rganish.",
    purposeUz: "Halqa yordamida tortishish kuchi tezlanishini aniqlash va tebranma harakat qonunlarini o'rganish.",
    equipment: [
      "Halqa (metall, bir tekis qalinlikda)",
      "Shtangensirkul (0,1 mm aniqlikda)",
      "Sekundomer (0,1 s aniqlikda)",
      "Pichoqsimon tayanchli fizik mayatnik stendi"
    ],
    equipmentUz: [
      "Halqa (metall, bir tekis qalinlikda)",
      "Shtangensirkul (0,1 mm aniqlikda)",
      "Sekundomer (0,1 s aniqlikda)",
      "Pichoqsimon tayanchli fizik mayatnik stendi"
    ],
    theory: `Fizik mayatnik - bu og'irlik markazidan o'tmagan gorizontal o'qqa osilgan qattiq jism. Og'irlik markaziga qo'yilgan M moment ta'sirida tebranma harakat qiladi:

M = mgl·sinφ

bu yerda l - og'irlik markazi bilan osilgan o'q orasidagi masofa.

Fizik mayatnik tebranish davri:
T = 2π√(K/(mgl))

bu yerda K - osilgan o'qqa nisbatan inersiya momenti.

Halqa uchun Shteyner teoremasiga ko'ra:
K = Kc + mR₁²

bu yerda Kc = ½m(R₁² + R₂²) - og'irlik markaziga nisbatan inersiya momenti.

Demak:
K = ½m(R₁² + R₂²) + mR₁² = ½m(3R₁² + R₂²)

Erkin tushish tezlanishi:
g = 4π²K/(mlT²)

Halqa ichki radiusdan osilganda l = R₁, demak:
g = 4π²(3R₁² + R₂²)/(2R₁T²)`,
    theoryUz: `Fizik mayatnik - bu og'irlik markazidan o'tmagan gorizontal o'qqa osilgan qattiq jism. Og'irlik markaziga qo'yilgan M moment ta'sirida tebranma harakat qiladi:

M = mgl·sinφ

bu yerda l - og'irlik markazi bilan osilgan o'q orasidagi masofa.

Fizik mayatnik tebranish davri:
T = 2π√(K/(mgl))

bu yerda K - osilgan o'qqa nisbatan inersiya momenti.

Halqa uchun Shteyner teoremasiga ko'ra:
K = Kc + mR₁²

bu yerda Kc = ½m(R₁² + R₂²) - og'irlik markaziga nisbatan inersiya momenti.

Demak:
K = ½m(R₁² + R₂²) + mR₁² = ½m(3R₁² + R₂²)

Erkin tushish tezlanishi:
g = 4π²K/(mlT²)

Halqa ichki radiusdan osilganda l = R₁, demak:
g = 4π²(3R₁² + R₂²)/(2R₁T²)`,
    procedure: [
      "Shtangensirkul yordamida halqaning ichki diametrini d₁ ni bir necha joyidan o'lchang",
      "Tashqi diametr d₂ ni ham bir necha joyidan o'lchang",
      "R₁ = d₁/2 va R₂ = d₂/2 radiuslarni hisoblang",
      "Halqani ichki tomonidan pichoqsimon tayanchga osing",
      "Halqani kichik burchakka (5-10°) og'irib qo'yib yuboring",
      "n = 20-30 ta to'liq tebranish vaqtini t o'lchang",
      "Davrni T = t/n formula bilan hisoblang",
      "g = 4π²(3R₁² + R₂²)/(2R₁T²) formula bilan hisoblang",
      "Tajribani 3-5 marta takrorlang va o'rtacha qiymatni toping"
    ],
    procedureUz: [
      "Shtangensirkul yordamida halqaning ichki diametrini d₁ ni bir necha joyidan o'lchang",
      "Tashqi diametr d₂ ni ham bir necha joyidan o'lchang",
      "R₁ = d₁/2 va R₂ = d₂/2 radiuslarni hisoblang",
      "Halqani ichki tomonidan pichoqsimon tayanchga osing",
      "Halqani kichik burchakka (5-10°) og'irib qo'yib yuboring",
      "n = 20-30 ta to'liq tebranish vaqtini t o'lchang",
      "Davrni T = t/n formula bilan hisoblang",
      "g = 4π²(3R₁² + R₂²)/(2R₁T²) formula bilan hisoblang",
      "Tajribani 3-5 marta takrorlang va o'rtacha qiymatni toping"
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
      const gravity = (4 * Math.PI * Math.PI * (3 * r1m * r1m + r2m * r2m)) / (2 * r1m * period * period);
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
    title: "Tovushning havoda tarqalish tezligini o'lchash",
    titleUz: "Tovushning havoda tarqalish tezligini o'lchash",
    purpose: "Xona haroratida tovushning tarqalish tezligini aniqlash va uning haroratga bog'liqligini tekshirish.",
    purposeUz: "Xona haroratida tovushning tarqalish tezligini aniqlash va uning haroratga bog'liqligini tekshirish.",
    equipment: [
      "12 V li tok manbai",
      "Cobra3 bazaviy bloki va RS-232 tipli kabel",
      "Taymer/hisoblagich moduli",
      "Kuchaytirgichli mikrofon",
      "9V li batareya (mikrofon uchun)",
      "Aylana tayanchlar va ulovchi simlar",
      "O'lchash dasturi bilan personal kompyuter",
      "Laboratoriya termometri"
    ],
    equipmentUz: [
      "12 V li tok manbai",
      "Cobra3 bazaviy bloki va RS-232 tipli kabel",
      "Taymer/hisoblagich moduli",
      "Kuchaytirgichli mikrofon",
      "9V li batareya (mikrofon uchun)",
      "Aylana tayanchlar va ulovchi simlar",
      "O'lchash dasturi bilan personal kompyuter",
      "Laboratoriya termometri"
    ],
    theory: `Tovush - bu muhitda tarqaluvchi mexanik to'lqindir. Havoda tovush bo'ylama to'lqin sifatida tarqaladi.

Tovush tezligi haroratga bog'liq:
vT = v₀√(T/273)

bu yerda:
- v₀ = 331,8 m/s - 0°C dagi tovush tezligi
- T - mutlaq harorat (Kelvin)

Selsiy bo'yicha:
vt = v₀√(1 + t/273) ≈ v₀(1 + t/546)

yoki taxminiy formula:
vt = 331,8 + 0,6t (m/s)

bu yerda t - harorat (°C).

18°C da nazariy tezlik: v = 342,6 m/s

Tovush tezligi muhit xossalariga ham bog'liq. Qattiq jismlarda va suyuqliklarda tovush havodagiga qaraganda tezroq tarqaladi.

Tajribada masofa va vaqtni o'lchab, tezlik v = S/t formula bilan aniqlanadi.`,
    theoryUz: `Tovush - bu muhitda tarqaluvchi mexanik to'lqindir. Havoda tovush bo'ylama to'lqin sifatida tarqaladi.

Tovush tezligi haroratga bog'liq:
vT = v₀√(T/273)

bu yerda:
- v₀ = 331,8 m/s - 0°C dagi tovush tezligi
- T - mutlaq harorat (Kelvin)

Selsiy bo'yicha:
vt = v₀√(1 + t/273) ≈ v₀(1 + t/546)

yoki taxminiy formula:
vt = 331,8 + 0,6t (m/s)

bu yerda t - harorat (°C).

18°C da nazariy tezlik: v = 342,6 m/s

Tovush tezligi muhit xossalariga ham bog'liq. Qattiq jismlarda va suyuqliklarda tovush havodagiga qaraganda tezroq tarqaladi.

Tajribada masofa va vaqtni o'lchab, tezlik v = S/t formula bilan aniqlanadi.`,
    procedure: [
      "Qurilmani sxema bo'yicha yig'ing",
      "Cobra3 blokidagi 'Taymer 1' kirish qismini mikrofon-kuchaytirgich chiqishi bilan ulang",
      "'Taymer/hisoblagich' dasturini ishga tushiring va parametrlarni sozlang",
      "Tovush uzatgich va qabul qilgich orasidagi masofani S = 30-40 sm qilib belgilang",
      "Tovush tezligini o'lchang (tajribani 5 marta takrorlang)",
      "Mikrofon masofasini 10-15 sm ga o'zgartiring va o'lchashlarni takrorlang",
      "Masofani 60-70 sm qilib ham o'lchashlarni bajaring",
      "Xona haroratini termometr bilan o'lchang",
      "O'rtacha tezlikni hisoblang va nazariy qiymat bilan solishtiring"
    ],
    procedureUz: [
      "Qurilmani sxema bo'yicha yig'ing",
      "Cobra3 blokidagi 'Taymer 1' kirish qismini mikrofon-kuchaytirgich chiqishi bilan ulang",
      "'Taymer/hisoblagich' dasturini ishga tushiring va parametrlarni sozlang",
      "Tovush uzatgich va qabul qilgich orasidagi masofani S = 30-40 sm qilib belgilang",
      "Tovush tezligini o'lchang (tajribani 5 marta takrorlang)",
      "Mikrofon masofasini 10-15 sm ga o'zgartiring va o'lchashlarni takrorlang",
      "Masofani 60-70 sm qilib ham o'lchashlarni bajaring",
      "Xona haroratini termometr bilan o'lchang",
      "O'rtacha tezlikni hisoblang va nazariy qiymat bilan solishtiring"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "distance", name: "Masofa S", nameUz: "Masofa S", unit: "m", isInput: true },
      { id: "time", name: "Vaqt t", nameUz: "Vaqt t", unit: "ms", isInput: true },
      { id: "temperature", name: "Harorat T", nameUz: "Harorat T", unit: "°C", isInput: true },
      { id: "velocity", name: "v (tajriba)", nameUz: "v (tajriba)", unit: "m/s", isInput: false },
      { id: "theoreticalV", name: "v (nazariy)", nameUz: "v (nazariy)", unit: "m/s", isInput: false },
      { id: "error", name: "ε", nameUz: "ε", unit: "%", isInput: false },
    ],
    calculations: (inputs) => {
      const velocity = inputs.distance / (inputs.time / 1000);
      const tempK = inputs.temperature + 273;
      const theoreticalV = 331.8 * Math.sqrt(tempK / 273);
      const error = Math.abs((velocity - theoreticalV) / theoreticalV) * 100;
      return {
        velocity: Math.round(velocity * 10) / 10,
        theoreticalV: Math.round(theoreticalV * 10) / 10,
        error: Math.round(error * 10) / 10,
      };
    },
  },
  {
    id: "lab-7-adiabatic-expansion",
    title: "Havoning issiqlik sig'imlari nisbatini adiabatik kengayish yordamida aniqlash",
    titleUz: "Havoning issiqlik sig'imlari nisbatini adiabatik kengayish yordamida aniqlash",
    purpose: "Gazlarning solishtirma issiqlik sig'imlari nisbatini tajribada aniqlash va molekulyar kinetik nazariyaga asoslanib hisoblangan qiymat bilan solishtirish.",
    purposeUz: "Gazlarning solishtirma issiqlik sig'imlari nisbatini tajribada aniqlash va molekulyar kinetik nazariyaga asoslanib hisoblangan qiymat bilan solishtirish.",
    equipment: [
      "Katta shisha idish (12-20 litr)",
      "Suvli manometr (rangli suvli U-simon naycha)",
      "Qo'l nasosi",
      "C va D jumraklar (tez ochiluvchi)"
    ],
    equipmentUz: [
      "Katta shisha idish (12-20 litr)",
      "Suvli manometr (rangli suvli U-simon naycha)",
      "Qo'l nasosi",
      "C va D jumraklar (tez ochiluvchi)"
    ],
    theory: `Jismning haroratini 1K ga ko'tarish uchun ketgan issiqlik miqdori shu jismning issiqlik sig'imi deyiladi:
C = dQ/dT

Solishtirma issiqlik sig'imi (birlik massa uchun):
c = C/m = dQ/(mdT)

Molyar issiqlik sig'imi (bir mol uchun):
Cμ = C/ν

O'zgarmas hajmda: Cv = (i/2)R/μ
O'zgarmas bosimda: Cp = ((i+2)/2)R/μ

bu yerda i - erkinlik darajasi (bir atomli gaz uchun i=3, ikki atomli uchun i=5).

Puasson koeffitsienti (adiabata ko'rsatkichi):
γ = Cp/Cv = (i+2)/i

Havo uchun (ikki atomli): γ = 7/5 = 1,4

Adiabatik jarayon tenglamasi (Puasson tenglamasi):
PVᵞ = const

Klement-Dezorm usuli:

1-holat: Idishga havo damlanadi, bosim p₁ = p₀ + h₁
2-holat: Jumrak tez ochilib, bosim p₀ ga tushadi (adiabatik kengayish)
3-holat: Harorat tenglashgandan keyin bosim p₂ = p₀ + h₂

Puasson formulasini qo'llab:
γ = h₁/(h₁ - h₂)`,
    theoryUz: `Jismning haroratini 1K ga ko'tarish uchun ketgan issiqlik miqdori shu jismning issiqlik sig'imi deyiladi:
C = dQ/dT

Solishtirma issiqlik sig'imi (birlik massa uchun):
c = C/m = dQ/(mdT)

Molyar issiqlik sig'imi (bir mol uchun):
Cμ = C/ν

O'zgarmas hajmda: Cv = (i/2)R/μ
O'zgarmas bosimda: Cp = ((i+2)/2)R/μ

bu yerda i - erkinlik darajasi (bir atomli gaz uchun i=3, ikki atomli uchun i=5).

Puasson koeffitsienti (adiabata ko'rsatkichi):
γ = Cp/Cv = (i+2)/i

Havo uchun (ikki atomli): γ = 7/5 = 1,4

Adiabatik jarayon tenglamasi (Puasson tenglamasi):
PVᵞ = const

Klement-Dezorm usuli:

1-holat: Idishga havo damlanadi, bosim p₁ = p₀ + h₁
2-holat: Jumrak tez ochilib, bosim p₀ ga tushadi (adiabatik kengayish)
3-holat: Harorat tenglashgandan keyin bosim p₂ = p₀ + h₂

Puasson formulasini qo'llab:
γ = h₁/(h₁ - h₂)`,
    procedure: [
      "C va D jumraklarni oching, manometrdagi ustunlar bir xil bo'lsin",
      "C jumrakni yoping, nasos bilan manometrdagi ustunlar farqi h₁ = 20-25 sm bo'lguncha havo damlang",
      "D jumrakni yoping va havoning harorati atrofdagiga tenglashishini kuting (1-2 minut)",
      "Manometrdagi h₁ qiymatini yozib oling",
      "C jumrakni tez oching - idishdagi bosim atmosfera bosimiga tushadi",
      "Havo butunlay chiqib bo'lmasdan C jumrakni tez yoping",
      "Harorat tenglashgandan keyin (1-2 minut) h₂ qiymatini o'lchang",
      "γ = h₁/(h₁ - h₂) formula bilan hisoblang",
      "Tajribani 3-5 marta takrorlang va o'rtacha qiymatni toping",
      "Nazariy qiymat (γ = 1,4) bilan solishtiring va nisbiy xatolikni hisoblang"
    ],
    procedureUz: [
      "C va D jumraklarni oching, manometrdagi ustunlar bir xil bo'lsin",
      "C jumrakni yoping, nasos bilan manometrdagi ustunlar farqi h₁ = 20-25 sm bo'lguncha havo damlang",
      "D jumrakni yoping va havoning harorati atrofdagiga tenglashishini kuting (1-2 minut)",
      "Manometrdagi h₁ qiymatini yozib oling",
      "C jumrakni tez oching - idishdagi bosim atmosfera bosimiga tushadi",
      "Havo butunlay chiqib bo'lmasdan C jumrakni tez yoping",
      "Harorat tenglashgandan keyin (1-2 minut) h₂ qiymatini o'lchang",
      "γ = h₁/(h₁ - h₂) formula bilan hisoblang",
      "Tajribani 3-5 marta takrorlang va o'rtacha qiymatni toping",
      "Nazariy qiymat (γ = 1,4) bilan solishtiring va nisbiy xatolikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "h1", name: "h₁", nameUz: "h₁", unit: "sm", isInput: true },
      { id: "h2", name: "h₂", nameUz: "h₂", unit: "sm", isInput: true },
      { id: "gamma", name: "γ", nameUz: "γ", unit: "", isInput: false },
      { id: "error", name: "ε", nameUz: "ε", unit: "%", isInput: false },
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
    title: "Kapillyar usul bilan sirt taranglik koeffitsientini aniqlash",
    titleUz: "Kapillyar usul bilan sirt taranglik koeffitsientini aniqlash",
    purpose: "Kapillyar usul yordamida suyuqlikning sirt taranglik koeffitsientini aniqlash.",
    purposeUz: "Kapillyar usul yordamida suyuqlikning sirt taranglik koeffitsientini aniqlash.",
    equipment: [
      "Turli diametrli kapillyar naychalar to'plami (0,5-2 mm)",
      "Sinov suyuqligi bilan idish (suv, spirt)",
      "Sayohat mikroskopi yoki katetometr",
      "Millimetrli shkala bilan chizg'ich",
      "Termometr"
    ],
    equipmentUz: [
      "Turli diametrli kapillyar naychalar to'plami (0,5-2 mm)",
      "Sinov suyuqligi bilan idish (suv, spirt)",
      "Sayohat mikroskopi yoki katetometr",
      "Millimetrli shkala bilan chizg'ich",
      "Termometr"
    ],
    theory: `Sirt taranglik - bu suyuqlik yuzasining qisqarishga intilish xossasidir. Sirt taranglik koeffitsienti σ birlik uzunlikdagi chiziq bo'ylab ta'sir etuvchi kuchga teng.

Kapillyar hodisa - tor naychada suyuqlikning ko'tarilishi yoki tushishi. Ho'llovchi suyuqliklar (suv) ko'tariladi, ho'llamaydigan suyuqliklar (simob) tushadi.

Kapillyarda suyuqlik balandligi:
h = 2σcosθ/(ρgr)

bu yerda:
- σ - sirt taranglik koeffitsienti (N/m)
- θ - ho'llash burchagi (suv uchun θ ≈ 0)
- ρ - suyuqlik zichligi (kg/m³)
- r - kapillyar radiusi (m)

Suv uchun (θ = 0, cosθ = 1):
σ = ρghr/2

yoki diametr orqali:
σ = ρghd/4

20°C da suvning sirt taranglik koeffitsienti: σ ≈ 0.0728 N/m`,
    theoryUz: `Sirt taranglik - bu suyuqlik yuzasining qisqarishga intilish xossasidir. Sirt taranglik koeffitsienti σ birlik uzunlikdagi chiziq bo'ylab ta'sir etuvchi kuchga teng.

Kapillyar hodisa - tor naychada suyuqlikning ko'tarilishi yoki tushishi. Ho'llovchi suyuqliklar (suv) ko'tariladi, ho'llamaydigan suyuqliklar (simob) tushadi.

Kapillyarda suyuqlik balandligi:
h = 2σcosθ/(ρgr)

bu yerda:
- σ - sirt taranglik koeffitsienti (N/m)
- θ - ho'llash burchagi (suv uchun θ ≈ 0)
- ρ - suyuqlik zichligi (kg/m³)
- r - kapillyar radiusi (m)

Suv uchun (θ = 0, cosθ = 1):
σ = ρghr/2

yoki diametr orqali:
σ = ρghd/4

20°C da suvning sirt taranglik koeffitsienti: σ ≈ 0.0728 N/m`,
    procedure: [
      "Kapillyar naychaning ichki diametrini mikroskop yordamida o'lchang",
      "Naychani vertikal holatda suyuqlikka tushiring",
      "Suyuqlikning ko'tarilish balandligini h katetometr bilan o'lchang",
      "Suyuqlik haroratini va zichligini aniqlang",
      "σ = ρghd/4 formula bilan sirt taranglikni hisoblang",
      "Turli diametrli naychalar uchun tajribani takrorlang",
      "O'rtacha qiymatni va xatolikni hisoblang"
    ],
    procedureUz: [
      "Kapillyar naychaning ichki diametrini mikroskop yordamida o'lchang",
      "Naychani vertikal holatda suyuqlikka tushiring",
      "Suyuqlikning ko'tarilish balandligini h katetometr bilan o'lchang",
      "Suyuqlik haroratini va zichligini aniqlang",
      "σ = ρghd/4 formula bilan sirt taranglikni hisoblang",
      "Turli diametrli naychalar uchun tajribani takrorlang",
      "O'rtacha qiymatni va xatolikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "diameter", name: "Diametr d", nameUz: "Diametr d", unit: "mm", isInput: true },
      { id: "height", name: "Balandlik h", nameUz: "Balandlik h", unit: "mm", isInput: true },
      { id: "density", name: "Zichlik ρ", nameUz: "Zichlik ρ", unit: "kg/m³", isInput: true },
      { id: "surfaceTension", name: "σ", nameUz: "σ", unit: "N/m", isInput: false },
    ],
    calculations: (inputs) => {
      const d = inputs.diameter / 1000;
      const h = inputs.height / 1000;
      const surfaceTension = (inputs.density * 9.8 * h * d) / 4;
      return {
        surfaceTension: Math.round(surfaceTension * 10000) / 10000,
      };
    },
  },
  {
    id: "lab-9-viscosity",
    title: "Suyuqlikning qovushoqligini Stoks usulida aniqlash",
    titleUz: "Suyuqlikning qovushoqligini Stoks usulida aniqlash",
    purpose: "Stoks usuli (tushuvchi sharcha) yordamida suyuqlikning qovushoqlik koeffitsientini aniqlash.",
    purposeUz: "Stoks usuli (tushuvchi sharcha) yordamida suyuqlikning qovushoqlik koeffitsientini aniqlash.",
    equipment: [
      "Qovushoq suyuqlikli (glitserin, moy) baland shisha silindr",
      "Kichik po'lat sharchalar to'plami (turli diametrli)",
      "Mikrometr (0,01 mm aniqlikda)",
      "Sekundomer (0,1 s aniqlikda)",
      "Millimetrli shkala bilan chizg'ich",
      "Termometr"
    ],
    equipmentUz: [
      "Qovushoq suyuqlikli (glitserin, moy) baland shisha silindr",
      "Kichik po'lat sharchalar to'plami (turli diametrli)",
      "Mikrometr (0,01 mm aniqlikda)",
      "Sekundomer (0,1 s aniqlikda)",
      "Millimetrli shkala bilan chizg'ich",
      "Termometr"
    ],
    theory: `Qovushoqlik (ichki ishqalanish) - suyuqlik yoki gazning oqishiga qarshilik ko'rsatish xossasidir.

Nyuton qonuni:
F = η·S·(dv/dx)

bu yerda:
- F - ichki ishqalanish kuchi
- η - dinamik qovushoqlik koeffitsienti (Pa·s)
- S - qatlamlar orasidagi yuza
- dv/dx - tezlik gradienti

Qovushoq suyuqlikda tushayotgan sharga uchta kuch ta'sir etadi:
1. Og'irlik kuchi: Fg = (4/3)πr³ρs·g
2. Arximed kuchi: Fa = (4/3)πr³ρl·g
3. Stoks qarshilik kuchi: Fs = 6πηrv

Doimiy tezlikda (Fg = Fa + Fs):
η = 2r²(ρs - ρl)g/(9v)

bu yerda:
- r - shar radiusi
- ρs - shar zichligi
- ρl - suyuqlik zichligi
- v = L/t - shar tezligi

Stoks formulasi Reynolds soni Re < 0.5 bo'lganda amal qiladi.`,
    theoryUz: `Qovushoqlik (ichki ishqalanish) - suyuqlik yoki gazning oqishiga qarshilik ko'rsatish xossasidir.

Nyuton qonuni:
F = η·S·(dv/dx)

bu yerda:
- F - ichki ishqalanish kuchi
- η - dinamik qovushoqlik koeffitsienti (Pa·s)
- S - qatlamlar orasidagi yuza
- dv/dx - tezlik gradienti

Qovushoq suyuqlikda tushayotgan sharga uchta kuch ta'sir etadi:
1. Og'irlik kuchi: Fg = (4/3)πr³ρs·g
2. Arximed kuchi: Fa = (4/3)πr³ρl·g
3. Stoks qarshilik kuchi: Fs = 6πηrv

Doimiy tezlikda (Fg = Fa + Fs):
η = 2r²(ρs - ρl)g/(9v)

bu yerda:
- r - shar radiusi
- ρs - shar zichligi
- ρl - suyuqlik zichligi
- v = L/t - shar tezligi

Stoks formulasi Reynolds soni Re < 0.5 bo'lganda amal qiladi.`,
    procedure: [
      "Silindrdagi suyuqlik haroratini termometr bilan o'lchang",
      "Shar diametrini mikrometr bilan bir necha joyidan o'lchang",
      "Silindrda o'lchash boshlang'ich va oxirgi belgilarini belgilang (L masofani o'lchang)",
      "Sharni suyuqlik yuzasiga sekin qo'ying",
      "Shar belgilangan L masofani bosib o'tish vaqtini t o'lchang",
      "v = L/t tezlikni hisoblang",
      "η = 2r²(ρs - ρl)g/(9v) formula bilan qovushoqlikni hisoblang",
      "Turli diametrli sharlar uchun tajribani takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    procedureUz: [
      "Silindrdagi suyuqlik haroratini termometr bilan o'lchang",
      "Shar diametrini mikrometr bilan bir necha joyidan o'lchang",
      "Silindrda o'lchash boshlang'ich va oxirgi belgilarini belgilang (L masofani o'lchang)",
      "Sharni suyuqlik yuzasiga sekin qo'ying",
      "Shar belgilangan L masofani bosib o'tish vaqtini t o'lchang",
      "v = L/t tezlikni hisoblang",
      "η = 2r²(ρs - ρl)g/(9v) formula bilan qovushoqlikni hisoblang",
      "Turli diametrli sharlar uchun tajribani takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "diameter", name: "Diametr d", nameUz: "Diametr d", unit: "mm", isInput: true },
      { id: "distance", name: "Masofa L", nameUz: "Masofa L", unit: "m", isInput: true },
      { id: "time", name: "Vaqt t", nameUz: "Vaqt t", unit: "s", isInput: true },
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
    title: "O'tkazgichning qarshiligini o'zgarmas tok ko'prigi yordamida aniqlash",
    titleUz: "O'tkazgichning qarshiligini o'zgarmas tok ko'prigi yordamida aniqlash",
    purpose: "Tarmoqlangan elektr zanjirlari qonuniyatlarini o'rganish va Uitston ko'prigi yordamida noma'lum qarshilikni aniqlash.",
    purposeUz: "Tarmoqlangan elektr zanjirlari qonuniyatlarini o'rganish va Uitston ko'prigi yordamida noma'lum qarshilikni aniqlash.",
    equipment: [
      "Reoxord (1 m uzunlikdagi sim ko'prik)",
      "Galvanometr (sezgir, nol markazli)",
      "Qarshiliklar magazini (o'nlik tipli)",
      "Noma'lum qarshiliklar to'plami",
      "O'zgarmas tok manbai (2-4 V)",
      "Kalit va ulovchi simlar"
    ],
    equipmentUz: [
      "Reoxord (1 m uzunlikdagi sim ko'prik)",
      "Galvanometr (sezgir, nol markazli)",
      "Qarshiliklar magazini (o'nlik tipli)",
      "Noma'lum qarshiliklar to'plami",
      "O'zgarmas tok manbai (2-4 V)",
      "Kalit va ulovchi simlar"
    ],
    theory: `Uitston ko'prigi - bu noma'lum qarshilikni aniq o'lchash qurilmasi. U Kirxgof qonunlariga asoslangan.

Kirxgofning birinchi qonuni (tugunlar qonuni):
Tugunga kiruvchi va chiquvchi toklarning algebraik yig'indisi nolga teng:
ΣIk = 0

Kirxgofning ikkinchi qonuni (konturlar qonuni):
Yopiq konturda EYK yig'indisi kuchlanishlar tushumi yig'indisiga teng:
ΣEk = ΣIkRk

Uitston ko'prigi sxemasida (4 ta qarshilik: Rx, R0, R1, R2):
- Rx - noma'lum qarshilik
- R0 - ma'lum qarshilik (magazin)
- R1 va R2 - reoxord yelkalari

Ko'prik muvozanatda bo'lganda (galvanometrdan tok o'tmaydi):
Rx/R0 = R1/R2

Reoxordda qarshilik uzunlikka proporsional:
R1/R2 = l1/l2

Demak:
Rx = R0·(l1/l2)

bu yerda l1 va l2 - reoxord yelkalarining uzunliklari (santimetrda).

Ketma-ket ulanganda: R = R1 + R2
Parallel ulanganda: 1/R = 1/R1 + 1/R2`,
    theoryUz: `Uitston ko'prigi - bu noma'lum qarshilikni aniq o'lchash qurilmasi. U Kirxgof qonunlariga asoslangan.

Kirxgofning birinchi qonuni (tugunlar qonuni):
Tugunga kiruvchi va chiquvchi toklarning algebraik yig'indisi nolga teng:
ΣIk = 0

Kirxgofning ikkinchi qonuni (konturlar qonuni):
Yopiq konturda EYK yig'indisi kuchlanishlar tushumi yig'indisiga teng:
ΣEk = ΣIkRk

Uitston ko'prigi sxemasida (4 ta qarshilik: Rx, R0, R1, R2):
- Rx - noma'lum qarshilik
- R0 - ma'lum qarshilik (magazin)
- R1 va R2 - reoxord yelkalari

Ko'prik muvozanatda bo'lganda (galvanometrdan tok o'tmaydi):
Rx/R0 = R1/R2

Reoxordda qarshilik uzunlikka proporsional:
R1/R2 = l1/l2

Demak:
Rx = R0·(l1/l2)

bu yerda l1 va l2 - reoxord yelkalarining uzunliklari (santimetrda).

Ketma-ket ulanganda: R = R1 + R2
Parallel ulanganda: 1/R = 1/R1 + 1/R2`,
    procedure: [
      "Sxemani rasmdagidek yig'ing va tekshiring",
      "Sirpanuvchi D jilgichni reoxord o'rtasiga (50 sm) qo'ying",
      "R0 qarshilikni shunday tanlangki, galvanometrda tok deyarli bo'lmasin",
      "D jilgichni chap yoki o'ng tomonga siljitib, galvanometr strelkasini 0 ga keltiring",
      "Reoxord yelkalarining l1 va l2 uzunliklarini yozing",
      "Rx = R0·(l1/l2) formula bilan noma'lum qarshilikni hisoblang",
      "R0 ni o'zgartirib, tajribani 3 marta takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang",
      "Qarshiliklarni ketma-ket va parallel ulab, tajribani takrorlang",
      "Natijalarni nazariy qiymatlar bilan solishtiring"
    ],
    procedureUz: [
      "Sxemani rasmdagidek yig'ing va tekshiring",
      "Sirpanuvchi D jilgichni reoxord o'rtasiga (50 sm) qo'ying",
      "R0 qarshilikni shunday tanlangki, galvanometrda tok deyarli bo'lmasin",
      "D jilgichni chap yoki o'ng tomonga siljitib, galvanometr strelkasini 0 ga keltiring",
      "Reoxord yelkalarining l1 va l2 uzunliklarini yozing",
      "Rx = R0·(l1/l2) formula bilan noma'lum qarshilikni hisoblang",
      "R0 ni o'zgartirib, tajribani 3 marta takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang",
      "Qarshiliklarni ketma-ket va parallel ulab, tajribani takrorlang",
      "Natijalarni nazariy qiymatlar bilan solishtiring"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "r0", name: "R₀", nameUz: "R₀", unit: "Ω", isInput: true },
      { id: "l1", name: "l₁", nameUz: "l₁", unit: "sm", isInput: true },
      { id: "l2", name: "l₂", nameUz: "l₂", unit: "sm", isInput: true },
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
