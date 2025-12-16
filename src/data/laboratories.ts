import { LabExperiment } from "@/types/physics";

export const laboratories: LabExperiment[] = [
  {
    id: "lab-1-projectile-motion",
    title: "Gorizontga nisbatan burchak ostida otilgan jismning harakatini o'rganish",
    titleUz: "Gorizontga nisbatan burchak ostida otilgan jismning harakatini o'rganish",
    purpose: "Gorizontga nisbatan burchak ostida otilgan jismning harakatini o'rganish va harakat parametrlarini tajribada aniqlash.",
    purposeUz: "Gorizontga nisbatan burchak ostida otilgan jismning harakatini o'rganish va harakat parametrlarini tajribada aniqlash.",
    equipment: [
      "Ballistik qurilma (otish burchagini o'zgartirish imkoniyati bilan)",
      "Po'lat sharcha",
      "Masshtabli koordinata to'ri yoki millimetrli qog'oz",
      "Transportir (burchakni o'lchash uchun)",
      "Metr lentasi yoki chizg'ich",
      "Sekundomer"
    ],
    equipmentUz: [
      "Ballistik qurilma (otish burchagini o'zgartirish imkoniyati bilan)",
      "Po'lat sharcha",
      "Masshtabli koordinata to'ri yoki millimetrli qog'oz",
      "Transportir (burchakni o'lchash uchun)",
      "Metr lentasi yoki chizg'ich",
      "Sekundomer"
    ],
    theory: `Gorizontga nisbatan α burchak ostida v₀ boshlang'ich tezlik bilan otilgan jism parabolik traektoriya bo'ylab harakat qiladi.

Harakat tenglamalari:
- Gorizontal bo'yicha: x = v₀·cos(α)·t
- Vertikal bo'yicha: y = v₀·sin(α)·t - gt²/2

Asosiy formulalar:

1. Parvoz vaqti:
   T = 2v₀·sin(α)/g

2. Maksimal ko'tarilish balandligi:
   H = v₀²·sin²(α)/(2g)

3. Parvoz masofasi (uzoqligi):
   L = v₀²·sin(2α)/g

4. Traektoriya tenglamasi:
   y = x·tg(α) - gx²/(2v₀²cos²(α))

Maksimal uzoqlik α = 45° burchakda erishiladi.

Bir xil uzoqlikka α va (90° - α) burchaklarda otilganda erishiladi (masalan, 30° va 60°).

Boshlang'ich tezlik:
v₀ = √(gL/sin(2α))`,
    theoryUz: `Gorizontga nisbatan α burchak ostida v₀ boshlang'ich tezlik bilan otilgan jism parabolik traektoriya bo'ylab harakat qiladi.

Harakat tenglamalari:
- Gorizontal bo'yicha: x = v₀·cos(α)·t
- Vertikal bo'yicha: y = v₀·sin(α)·t - gt²/2

Asosiy formulalar:

1. Parvoz vaqti:
   T = 2v₀·sin(α)/g

2. Maksimal ko'tarilish balandligi:
   H = v₀²·sin²(α)/(2g)

3. Parvoz masofasi (uzoqligi):
   L = v₀²·sin(2α)/g

4. Traektoriya tenglamasi:
   y = x·tg(α) - gx²/(2v₀²cos²(α))

Maksimal uzoqlik α = 45° burchakda erishiladi.

Bir xil uzoqlikka α va (90° - α) burchaklarda otilganda erishiladi (masalan, 30° va 60°).

Boshlang'ich tezlik:
v₀ = √(gL/sin(2α))`,
    procedure: [
      "Ballistik qurilmani gorizontal tekislikka o'rnating",
      "Otish burchagini α = 30° ga sozlang",
      "Sharchani otib, tushgan joyni belgilang",
      "Parvoz masofasi L ni o'lchang",
      "Tajribani 3-5 marta takrorlang va o'rtacha L ni toping",
      "v₀ = √(gL/sin(2α)) formula bilan boshlang'ich tezlikni hisoblang",
      "Burchakni 45° va 60° ga o'zgartirib tajribani takrorlang",
      "Har bir burchak uchun H va T qiymatlarini hisoblang",
      "Natijalarni taqqoslang va xulosalar chiqaring"
    ],
    procedureUz: [
      "Ballistik qurilmani gorizontal tekislikka o'rnating",
      "Otish burchagini α = 30° ga sozlang",
      "Sharchani otib, tushgan joyni belgilang",
      "Parvoz masofasi L ni o'lchang",
      "Tajribani 3-5 marta takrorlang va o'rtacha L ni toping",
      "v₀ = √(gL/sin(2α)) formula bilan boshlang'ich tezlikni hisoblang",
      "Burchakni 45° va 60° ga o'zgartirib tajribani takrorlang",
      "Har bir burchak uchun H va T qiymatlarini hisoblang",
      "Natijalarni taqqoslang va xulosalar chiqaring"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "angle", name: "Burchak α", nameUz: "Burchak α", unit: "°", isInput: true },
      { id: "distance", name: "Masofa L", nameUz: "Masofa L", unit: "m", isInput: true },
      { id: "v0", name: "v₀", nameUz: "v₀", unit: "m/s", isInput: false },
      { id: "height", name: "Balandlik H", nameUz: "Balandlik H", unit: "m", isInput: false },
      { id: "flightTime", name: "Vaqt T", nameUz: "Vaqt T", unit: "s", isInput: false },
    ],
    calculations: (inputs) => {
      const angleRad = (inputs.angle * Math.PI) / 180;
      const g = 9.8;
      const v0 = Math.sqrt((g * inputs.distance) / Math.sin(2 * angleRad));
      const height = (v0 * v0 * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g);
      const flightTime = (2 * v0 * Math.sin(angleRad)) / g;
      return {
        v0: Math.round(v0 * 100) / 100,
        height: Math.round(height * 1000) / 1000,
        flightTime: Math.round(flightTime * 1000) / 1000,
      };
    },
  },
  {
    id: "lab-2-ballistic-pendulum",
    title: "Impulsning saqlanish qonunini ballistik mayatnik yordamida o'rganish",
    titleUz: "Impulsning saqlanish qonunini ballistik mayatnik yordamida o'rganish",
    purpose: "Ballistik mayatnik yordamida impulsning saqlanish qonunini tekshirish va o'q tezligini aniqlash.",
    purposeUz: "Ballistik mayatnik yordamida impulsning saqlanish qonunini tekshirish va o'q tezligini aniqlash.",
    equipment: [
      "Ballistik mayatnik (og'ir silindr yoki qum bilan to'ldirilgan quti)",
      "Prujinali miltiq yoki havo to'pponchasI",
      "Po'lat sharcha (o'q)",
      "Burchak shkalali mayatnik tayanchi",
      "Analitik tarozi",
      "Metr lentasi"
    ],
    equipmentUz: [
      "Ballistik mayatnik (og'ir silindr yoki qum bilan to'ldirilgan quti)",
      "Prujinali miltiq yoki havo to'pponchasI",
      "Po'lat sharcha (o'q)",
      "Burchak shkalali mayatnik tayanchi",
      "Analitik tarozi",
      "Metr lentasi"
    ],
    theory: `Ballistik mayatnik - o'q tezligini aniqlash uchun ishlatiladigan qurilma. U impulsning saqlanish qonuniga asoslangan.

Impulsning saqlanish qonuni:
Yopiq sistemada jismlar impulslarining vektoriy yig'indisi o'zgarmaydi:
Σp = const  yoki  m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'

Noelastik to'qnashuvda:
O'q (m) mayatnikka (M) kirib qoladi va ular birgalikda harakat qiladi.

Impuls saqlanishi:
mv = (m + M)u

bu yerda:
- m - o'q massasi
- v - o'q tezligi
- M - mayatnik massasi
- u - to'qnashuvdan keyingi tezlik

Energiya saqlanishi (mayatnik ko'tarilganda):
(m + M)u²/2 = (m + M)gh

Bu yerdan:
u = √(2gh)

O'q tezligi:
v = (m + M)√(2gh)/m

Agar mayatnik θ burchakka og'ilsa va ip uzunligi L bo'lsa:
h = L(1 - cosθ)

O'q tezligi:
v = (m + M)√(2gL(1 - cosθ))/m`,
    theoryUz: `Ballistik mayatnik - o'q tezligini aniqlash uchun ishlatiladigan qurilma. U impulsning saqlanish qonuniga asoslangan.

Impulsning saqlanish qonuni:
Yopiq sistemada jismlar impulslarining vektoriy yig'indisi o'zgarmaydi:
Σp = const  yoki  m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'

Noelastik to'qnashuvda:
O'q (m) mayatnikka (M) kirib qoladi va ular birgalikda harakat qiladi.

Impuls saqlanishi:
mv = (m + M)u

bu yerda:
- m - o'q massasi
- v - o'q tezligi
- M - mayatnik massasi
- u - to'qnashuvdan keyingi tezlik

Energiya saqlanishi (mayatnik ko'tarilganda):
(m + M)u²/2 = (m + M)gh

Bu yerdan:
u = √(2gh)

O'q tezligi:
v = (m + M)√(2gh)/m

Agar mayatnik θ burchakka og'ilsa va ip uzunligi L bo'lsa:
h = L(1 - cosθ)

O'q tezligi:
v = (m + M)√(2gL(1 - cosθ))/m`,
    procedure: [
      "O'q (sharcha) massasi m ni tarozida o'lchang",
      "Mayatnik massasi M ni aniqlang",
      "Mayatnik ipining uzunligi L ni o'lchang",
      "Mayatnikni muvozanat holatiga keltiring",
      "O'qni mayatnikka oting",
      "Mayatnikning og'ilish burchagi θ yoki ko'tarilish balandligi h ni o'lchang",
      "v = (m + M)√(2gL(1 - cosθ))/m formula bilan o'q tezligini hisoblang",
      "Tajribani 5 marta takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    procedureUz: [
      "O'q (sharcha) massasi m ni tarozida o'lchang",
      "Mayatnik massasi M ni aniqlang",
      "Mayatnik ipining uzunligi L ni o'lchang",
      "Mayatnikni muvozanat holatiga keltiring",
      "O'qni mayatnikka oting",
      "Mayatnikning og'ilish burchagi θ yoki ko'tarilish balandligi h ni o'lchang",
      "v = (m + M)√(2gL(1 - cosθ))/m formula bilan o'q tezligini hisoblang",
      "Tajribani 5 marta takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "bulletMass", name: "m (o'q)", nameUz: "m (o'q)", unit: "g", isInput: true },
      { id: "pendulumMass", name: "M (mayatnik)", nameUz: "M (mayatnik)", unit: "g", isInput: true },
      { id: "length", name: "L (ip)", nameUz: "L (ip)", unit: "m", isInput: true },
      { id: "angle", name: "θ (burchak)", nameUz: "θ (burchak)", unit: "°", isInput: true },
      { id: "height", name: "h", nameUz: "h", unit: "m", isInput: false },
      { id: "velocity", name: "v (o'q)", nameUz: "v (o'q)", unit: "m/s", isInput: false },
    ],
    calculations: (inputs) => {
      const m = inputs.bulletMass / 1000;
      const M = inputs.pendulumMass / 1000;
      const L = inputs.length;
      const angleRad = (inputs.angle * Math.PI) / 180;
      const h = L * (1 - Math.cos(angleRad));
      const g = 9.8;
      const velocity = ((m + M) * Math.sqrt(2 * g * h)) / m;
      return {
        height: Math.round(h * 10000) / 10000,
        velocity: Math.round(velocity * 100) / 100,
      };
    },
  },
  {
    id: "lab-3-moment-of-inertia",
    title: "Maxovik g'ildirakning inersiya momentini aniqlash",
    titleUz: "Maxovik g'ildirakning inersiya momentini aniqlash",
    purpose: "Maxovik g'ildirakning inersiya momentini tajribada aniqlash va aylanma harakat qonunlarini o'rganish.",
    purposeUz: "Maxovik g'ildirakning inersiya momentini tajribada aniqlash va aylanma harakat qonunlarini o'rganish.",
    equipment: [
      "Maxovik g'ildirak (o'qqa o'rnatilgan)",
      "Yuklar to'plami (50g - 500g)",
      "Ip va g'ildirak uchi",
      "Shtangensirkul",
      "Sekundomer",
      "Metr lentasi"
    ],
    equipmentUz: [
      "Maxovik g'ildirak (o'qqa o'rnatilgan)",
      "Yuklar to'plami (50g - 500g)",
      "Ip va g'ildirak uchi",
      "Shtangensirkul",
      "Sekundomer",
      "Metr lentasi"
    ],
    theory: `Inersiya momenti - jismning aylanma harakatdagi "inertsiyasi"ning o'lchovidir. Moddiy nuqta uchun:
I = mr²

bu yerda:
- m - nuqta massasi
- r - aylanish o'qigacha masofa

Qattiq jism uchun:
I = Σmᵢrᵢ² = ∫r²dm

Aylanma harakat uchun Nyutonning ikkinchi qonuni:
M = Iε

bu yerda:
- M - kuch momenti
- ε - burchak tezlanishi

G'ildirakka osilgan yuk ta'sirida:
- Yukka ta'sir etuvchi kuchlar: og'irlik kuchi mg va ip taranglik kuchi T
- Nyuton qonuni (yuk uchun): ma = mg - T
- G'ildirak uchun: Iε = Tr

Agar a = εr (tangensal tezlanish) bo'lsa:
I = mr(g - a)/ε = mr²(g - a)/a

Yuk h balandlikdan t vaqtda tushsa:
a = 2h/t²

Inersiya momenti:
I = mr²(gt² - 2h)/(2h)

yoki soddaroq:
I = m(grt² - 2hr)/(2h/r)`,
    theoryUz: `Inersiya momenti - jismning aylanma harakatdagi "inertsiyasi"ning o'lchovidir. Moddiy nuqta uchun:
I = mr²

bu yerda:
- m - nuqta massasi
- r - aylanish o'qigacha masofa

Qattiq jism uchun:
I = Σmᵢrᵢ² = ∫r²dm

Aylanma harakat uchun Nyutonning ikkinchi qonuni:
M = Iε

bu yerda:
- M - kuch momenti
- ε - burchak tezlanishi

G'ildirakka osilgan yuk ta'sirida:
- Yukka ta'sir etuvchi kuchlar: og'irlik kuchi mg va ip taranglik kuchi T
- Nyuton qonuni (yuk uchun): ma = mg - T
- G'ildirak uchun: Iε = Tr

Agar a = εr (tangensal tezlanish) bo'lsa:
I = mr(g - a)/ε = mr²(g - a)/a

Yuk h balandlikdan t vaqtda tushsa:
a = 2h/t²

Inersiya momenti:
I = mr²(gt² - 2h)/(2h)

yoki soddaroq:
I = m(grt² - 2hr)/(2h/r)`,
    procedure: [
      "G'ildirak o'qi radiusi r ni shtangensirkul bilan o'lchang",
      "Ipni g'ildirak o'qiga o'rang va yukni osing",
      "Yuk tushish balandligi h ni o'lchang",
      "Yukni qo'yib yuborib, tushish vaqti t ni sekundomer bilan o'lchang",
      "a = 2h/t² formula bilan tezlanishni hisoblang",
      "I = mr²(gt² - 2h)/(2h) formula bilan inersiya momentini hisoblang",
      "Turli yuklar bilan tajribani takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    procedureUz: [
      "G'ildirak o'qi radiusi r ni shtangensirkul bilan o'lchang",
      "Ipni g'ildirak o'qiga o'rang va yukni osing",
      "Yuk tushish balandligi h ni o'lchang",
      "Yukni qo'yib yuborib, tushish vaqti t ni sekundomer bilan o'lchang",
      "a = 2h/t² formula bilan tezlanishni hisoblang",
      "I = mr²(gt² - 2h)/(2h) formula bilan inersiya momentini hisoblang",
      "Turli yuklar bilan tajribani takrorlang",
      "O'rtacha qiymat va xatolikni hisoblang"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "mass", name: "Massa m", nameUz: "Massa m", unit: "kg", isInput: true },
      { id: "radius", name: "Radius r", nameUz: "Radius r", unit: "mm", isInput: true },
      { id: "height", name: "Balandlik h", nameUz: "Balandlik h", unit: "m", isInput: true },
      { id: "time", name: "Vaqt t", nameUz: "Vaqt t", unit: "s", isInput: true },
      { id: "acceleration", name: "Tezlanish a", nameUz: "Tezlanish a", unit: "m/s²", isInput: false },
      { id: "momentOfInertia", name: "I", nameUz: "I", unit: "kg·m²", isInput: false },
    ],
    calculations: (inputs) => {
      const r = inputs.radius / 1000;
      const h = inputs.height;
      const t = inputs.time;
      const m = inputs.mass;
      const g = 9.8;
      const acceleration = (2 * h) / (t * t);
      const momentOfInertia = (m * r * r * (g * t * t - 2 * h)) / (2 * h);
      return {
        acceleration: Math.round(acceleration * 1000) / 1000,
        momentOfInertia: Math.round(momentOfInertia * 100000) / 100000,
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
    id: "lab-8-viscosity",
    title: "Suyuqlikning ichki ishqalanish koeffitsiyentini Stoks usuli bilan aniqlash",
    titleUz: "Suyuqlikning ichki ishqalanish koeffitsiyentini Stoks usuli bilan aniqlash",
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
    id: "lab-9-incandescent-lamp",
    title: "Cho'g'lanma lampaning quvvati va qarshiligini aniqlash",
    titleUz: "Cho'g'lanma lampaning quvvati va qarshiligini aniqlash",
    purpose: "Cho'g'lanma lampaning volt-amper xarakteristikasini o'rganish, quvvat va qarshilikni aniqlash.",
    purposeUz: "Cho'g'lanma lampaning volt-amper xarakteristikasini o'rganish, quvvat va qarshilikni aniqlash.",
    equipment: [
      "Cho'g'lanma lampa (6V yoki 12V)",
      "O'zgaruvchan kuchlanish manbai (0-12V)",
      "Ampermetr (0-1A, 0,01A aniqlikda)",
      "Voltmetr (0-15V, 0,1V aniqlikda)",
      "Reostat",
      "Kalit va ulovchi simlar"
    ],
    equipmentUz: [
      "Cho'g'lanma lampa (6V yoki 12V)",
      "O'zgaruvchan kuchlanish manbai (0-12V)",
      "Ampermetr (0-1A, 0,01A aniqlikda)",
      "Voltmetr (0-15V, 0,1V aniqlikda)",
      "Reostat",
      "Kalit va ulovchi simlar"
    ],
    theory: `Cho'g'lanma lampaning spirali volfram simdan yasalgan. Volfram qarshiligi haroratga kuchli bog'liq.

Om qonuni:
U = IR  yoki  R = U/I

bu yerda:
- U - kuchlanish (V)
- I - tok kuchi (A)
- R - qarshilik (Ω)

Elektr quvvati:
P = UI = I²R = U²/R

bu yerda P - quvvat (Vt).

Metallar qarshiligining haroratga bog'liqligi:
R = R₀(1 + αΔT)

bu yerda:
- R₀ - boshlang'ich haroratdagi qarshilik
- α - qarshilikning harorat koeffitsienti
- ΔT - harorat o'zgarishi

Volfram uchun α ≈ 0,0045 K⁻¹

Cho'g'lanma lampada spiral harorati 2500-3000 K ga yetadi, shuning uchun issiq holda qarshilik sovuq holatdagidan 10-15 marta katta bo'ladi.

Volt-amper xarakteristikasi chiziqli emas (Om qonunidan og'ish).`,
    theoryUz: `Cho'g'lanma lampaning spirali volfram simdan yasalgan. Volfram qarshiligi haroratga kuchli bog'liq.

Om qonuni:
U = IR  yoki  R = U/I

bu yerda:
- U - kuchlanish (V)
- I - tok kuchi (A)
- R - qarshilik (Ω)

Elektr quvvati:
P = UI = I²R = U²/R

bu yerda P - quvvat (Vt).

Metallar qarshiligining haroratga bog'liqligi:
R = R₀(1 + αΔT)

bu yerda:
- R₀ - boshlang'ich haroratdagi qarshilik
- α - qarshilikning harorat koeffitsienti
- ΔT - harorat o'zgarishi

Volfram uchun α ≈ 0,0045 K⁻¹

Cho'g'lanma lampada spiral harorati 2500-3000 K ga yetadi, shuning uchun issiq holda qarshilik sovuq holatdagidan 10-15 marta katta bo'ladi.

Volt-amper xarakteristikasi chiziqli emas (Om qonunidan og'ish).`,
    procedure: [
      "Sxemani rasmdagidek yig'ing: lampa, ampermetr ketma-ket, voltmetr lampaga parallel",
      "Kuchlanishni 0 dan boshlab asta-sekin oshiring",
      "Har bir kuchlanish qiymatida U va I ni yozib boring",
      "Kuchlanishni nominal qiymatgacha (6V yoki 12V) oshiring",
      "R = U/I formula bilan har bir holatda qarshilikni hisoblang",
      "P = UI formula bilan quvvatni hisoblang",
      "U(I) grafigini chizing (volt-amper xarakteristika)",
      "R(U) yoki R(P) grafigini chizing",
      "Sovuq va issiq holatlardagi qarshiliklarni solishtiring"
    ],
    procedureUz: [
      "Sxemani rasmdagidek yig'ing: lampa, ampermetr ketma-ket, voltmetr lampaga parallel",
      "Kuchlanishni 0 dan boshlab asta-sekin oshiring",
      "Har bir kuchlanish qiymatida U va I ni yozib boring",
      "Kuchlanishni nominal qiymatgacha (6V yoki 12V) oshiring",
      "R = U/I formula bilan har bir holatda qarshilikni hisoblang",
      "P = UI formula bilan quvvatni hisoblang",
      "U(I) grafigini chizing (volt-amper xarakteristika)",
      "R(U) yoki R(P) grafigini chizing",
      "Sovuq va issiq holatlardagi qarshiliklarni solishtiring"
    ],
    tableColumns: [
      { id: "n", name: "№", nameUz: "№", unit: "", isInput: false },
      { id: "voltage", name: "Kuchlanish U", nameUz: "Kuchlanish U", unit: "V", isInput: true },
      { id: "current", name: "Tok I", nameUz: "Tok I", unit: "A", isInput: true },
      { id: "resistance", name: "Qarshilik R", nameUz: "Qarshilik R", unit: "Ω", isInput: false },
      { id: "power", name: "Quvvat P", nameUz: "Quvvat P", unit: "Vt", isInput: false },
    ],
    calculations: (inputs) => {
      const resistance = inputs.current > 0 ? inputs.voltage / inputs.current : 0;
      const power = inputs.voltage * inputs.current;
      return {
        resistance: Math.round(resistance * 100) / 100,
        power: Math.round(power * 1000) / 1000,
      };
    },
  },
];
