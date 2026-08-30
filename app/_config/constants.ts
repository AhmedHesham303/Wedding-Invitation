export const WEDDING_DETAILS = {
  // Couple Names
  groomName: "أحمد",
  brideName: "أريچ",
  coupleNames: "أحمد و أريچ",

  // Date & Time
  weddingDateISO: "2026-09-11T05:30:00",
  hijriDate: "٢٤ محرم ١٤٤٨ هـ",
  displayDateArabic: "يوم الجمعة 11 سبتمبر 2026",
  displayTimeArabic: "الساعة 5:30 مساءً",

  // Location & Venue
  venueName: "مسجد الحسن",
  venueAddress: "التجمع الأول",
  googleMapsUrl:
    "https://www.google.com/maps/dir//%D9%85%D8%B3%D8%AC%D8%AF+%D8%A7%D9%84%D8%AD%D8%B3%D9%86%D8%8C+2FJC%2BM9J,+New+Cairo+1,+Cairo+Governorate+4735033%E2%80%AD/@30.071862,31.3655983,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x145823000ea9641d:0x6469fd37f3b2c76!2m2!1d31.4708801!2d30.0317007?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D",
  uberLocationUrl: "https://m.uber.com/ul/?action=setPickup&pickup=my_location",

  // Ride Services Options
  rideServices: [
    {
      name: "Uber",
      appUrl: "uber://",
      webUrl: "https://m.uber.com/ul/?action=setPickup&pickup=my_location",
      color: "hover:bg-black hover:text-white border-neutral-700",
    },
    {
      name: "Careem",
      appUrl: "careem://",
      webUrl: "https://careem.me",
      color: "hover:bg-emerald-600 hover:text-white border-emerald-500/30",
    },
    {
      name: "DiDi",
      appUrl: "didi://",
      webUrl: "https://didi-global.com",
      color: "hover:bg-orange-500 hover:text-white border-orange-500/30",
    },
    {
      name: "inDrive",
      appUrl: "indrive://",
      webUrl: "https://indrive.com",
      color: "hover:bg-lime-500 hover:text-black border-lime-500/30",
    },
  ],

  // Public Transportation Info
  publicTransit: {
    title: "تفاصيل المواصلات العامة",
    metro:
      "أقرب محطة مترو هي (محطة العباسية / أرض المعارض) ثم استقلال مواصلات التجمع الأول.",
    bus: "يمكن استقلال حافلات النقل العام الخطوط المتجهة إلى التجمع الأول والنزول بالقرب من محور السادات / مسجد الحسن.",
    landmark: "المسجد في التجمع الأول بجوار المنطقة الخدمية الرئيسية.",
  },

  // Contact & RSVP
  phoneNumbers: {
    groom: "+201025743812",
    bride: "+201553152337",
  },

  // Media
  audioFilePath: "/wedding.mp3",

  // Quran Verse / Invitation Text
  quranVerse:
    '"وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"',
  invitationMessage:
    "نتشرف بدعوتكم لحضور عقد قراننا ، لتشاركونا فرحتنا بهذا اليوم المبارك ",
};
