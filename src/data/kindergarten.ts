/**
 * Единый источник данных сайта. Desktop- и mobile-компоненты берут всё отсюда.
 * Вся информация предоставлена заказчиком — не добавляйте сюда непроверенные факты.
 */
import photosJson from "./photos.generated.json";

export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

type PhotosManifest = {
  main: Photo | null;
  logo: Photo | null;
  about: Photo | null;
  gallery: Photo[];
};

export const photos = photosJson as PhotosManifest;

/** Фото для раздела «Біз туралы»: about.* → первое фото галереи → заглушка. */
export const aboutPhoto: Photo | null = photos.about ?? photos.gallery[0] ?? null;

export const site = {
  name: "«Байкадам» балабақшасы",
  shortName: "Байкадам",
  legalName:
    "Частное учреждение образования \"Воспитательно-образовательный Центр \"Ақбота\"\" Детский сад «Байкадам»",
  tagline: "Балалардың бақытты мекені",
  heroSubtitle: "Әр балаға мейірім, қамқорлық және жарқын балалық шақ сыйлайтын жылы орта.",
  about:
    "«Байкадам» балабақшасы — балалардың жан-жақты дамуына, қызығушылықтарын ашуына және жаңа достар табуына бағытталған жылы орта. Біз үшін әр баланың қуанышы, қауіпсіздігі мен дамуы маңызды.",
  footerText: "Әр балаға мейірім, қамқорлық және жарқын балалық шақ сыйлайтын жылы орта.",
} as const;

export const contacts = {
  phoneDisplay: "+7 707 723 22 37",
  phoneHref: "tel:+77077232237",
  whatsapp: "https://wa.me/77077232237",
  instagram: "https://www.instagram.com/baiqadam_sadik/",
  instagramHandle: "@baiqadam_sadik",
  twoGis: "https://2gis.kz/almaty/geo/9429940000791853/76.850514,43.193619",
  /** Основной адрес, предоставленный заказчиком. */
  address: "Алматы қаласы, Сельхозработника көшесі, 71А",
  addressFull: "Қазақстан, Алматы қаласы, Сельхозработника көшесі, 71А",
  /** Адрес, указанный в карточке 2ГИС (это отдельный вариант, не объединять с основным). */
  address2Gis: "Таугуль-3, Дауленова көшесі, 100Б",
  address2GisFull: "Алматы қаласы, Таугуль-3, Дауленова көшесі, 100Б",
  scheduleDays: "Дүйсенбі–жұма",
  scheduleHours: "08:00–18:00",
} as const;

export type SectionKey = "home" | "about" | "activities" | "nutrition" | "gallery" | "contacts";

/** Навигация. Отдельного пункта «Топтар» нет — группы находятся внутри «Біз туралы». */
export const navItems: { key: SectionKey; label: string }[] = [
  { key: "home", label: "Басты бет" },
  { key: "about", label: "Біз туралы" },
  { key: "activities", label: "Үйірмелер" },
  { key: "nutrition", label: "Тамақтану" },
  { key: "gallery", label: "Галерея" },
  { key: "contacts", label: "Байланыс" },
];

export const highlights = [
  { key: "age", value: "1,5–6 жас", label: "Балалардың жасы" },
  { key: "groups", value: "3 топ", label: "Топ саны" },
  { key: "meals", value: "4 мезгіл", label: "Тамақтану" },
  { key: "lang", value: "Қазақ тілінде", label: "Тәрбие және оқыту" },
] as const;

/** Короткие подписи преимуществ для Hero. */
export const heroHighlights = [
  { key: "age", text: "1,5–6 жас" },
  { key: "groups", text: "3 топ" },
  { key: "meals", text: "4 мезгіл тамақтану" },
  { key: "lang", text: "Қазақ тілінде тәрбие" },
] as const;

/** Информационные карточки раздела «Біз туралы». */
export const aboutFacts = [
  { key: "age", label: "Балалардың жасы", value: "1,5–6 жас" },
  { key: "groups", label: "Топ саны", value: "3 топ" },
  { key: "lang", label: "Тәрбие және оқыту тілі", value: "Қазақ тілі" },
  { key: "schedule", label: "Жұмыс уақыты", value: "Дүйсенбі–жұма, 08:00–18:00" },
] as const;

export type GroupKey = "zhurekshe" | "kunshuak" | "kulynshak";

export const groups: { key: GroupKey; name: string; level: string; description: string }[] = [
  {
    key: "zhurekshe",
    name: "Жүрекше",
    level: "Кіші топ",
    description: "Алғашқы достық, қызықты ойындар және айналаны танып-білу кезеңі.",
  },
  {
    key: "kunshuak",
    name: "Күншуақ",
    level: "Ортаңғы топ",
    description: "Балалардың қызығушылығы мен шығармашылық қабілетін дамытуға бағытталған орта.",
  },
  {
    key: "kulynshak",
    name: "Құлыншақ",
    level: "Ересек топ",
    description: "Дербестікке, танымға және жаңа білімге ұмтылуға баулитын орта.",
  },
];

export type ActivityKey = "karate" | "dance" | "clay" | "speech";

export const activities: { key: ActivityKey; title: string; description: string }[] = [
  { key: "karate", title: "Каратэ", description: "Шапшаңдықты, үйлесімді қимылды және тәртіпті дамыту." },
  { key: "dance", title: "Би", description: "Музыканы сезіну, ырғақ пен әдемі қозғалыстарды үйрену." },
  { key: "clay", title: "Сазбен жұмыс", description: "Қиялды, шығармашылық ойлауды және ұсақ моториканы дамыту." },
  {
    key: "speech",
    title: "Логопед",
    description: "Сөйлеу және дыбыстарды дұрыс айту дағдыларын дамытуға бағытталған сабақтар.",
  },
];

export const nutrition = {
  title: "Дұрыс тамақтану — денсаулық кепілі",
  accent: "Күніне 4 мезгіл тамақтану",
  text: "Балабақшада балаларға күніне төрт мезгіл тамақтану ұйымдастырылған.",
  /**
   * Визуальная структура из четырёх приёмов пищи. Время и меню не указываются —
   * заказчик их не предоставил. Названия можно заменить при необходимости.
   */
  meals: [
    { key: "breakfast", label: "Таңғы ас" },
    { key: "second-breakfast", label: "Екінші таңғы ас" },
    { key: "lunch", label: "Түскі ас" },
    { key: "snack", label: "Бесін ас" },
  ],
} as const;

export const sectionText = {
  about: { eyebrow: "Біз туралы", title: "Біздің балабақша", groupsTitle: "Біздің топтар" },
  activities: { eyebrow: "Үйірмелер", title: "Балалардың жан-жақты дамуы", subtitle: "Қызықты үйірмелер мен қосымша сабақтар" },
  nutrition: { eyebrow: "Тамақтану" },
  gallery: {
    eyebrow: "Галерея",
    title: "Балабақша өмірінен сәттер",
    subtitle: "Күнделікті қызықты сәттер мен қуанышты естеліктер",
    more: "Көбірек көрсету",
    less: "Жасыру",
    emptyTitle: "Фотосуреттер жақын арада қосылады",
    emptyText: "Балабақша өмірінен қуанышты сәттерді осы жерден көре аласыз.",
  },
  contacts: { eyebrow: "Байланыс", title: "Бізбен байланысыңыз", subtitle: "Сұрақтарыңыз болса, бізге хабарласыңыз!" },
} as const;

export const ctaText = {
  contact: "Бізбен байланысу",
  explore: "Балабақшамен танысу",
  whatsapp: "WhatsApp-қа жазу",
  instagram: "Instagram",
  open2Gis: "2ГИС-те ашу",
  call: "Қоңырау шалу",
} as const;

export const GALLERY_INITIAL = 6;
