"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WEDDING_DETAILS } from "@/app/_config/constants";

export default function InvitationDetails() {
  const [recipientType, setRecipientType] = useState<"groom" | "bride">(
    "groom",
  );
  const [guestName, setGuestName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Modals state for Ride & Transit
  const [showRideModal, setShowRideModal] = useState(false);
  const [showTransitModal, setShowTransitModal] = useState(false);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || !wishMessage.trim()) {
      setStatusMessage("يرجى إدخال الاسم والتهنئة.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("جاري إرسال التهنئة...");

    try {
      const response = await fetch("/api/send-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientType,
          guestName,
          wishMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const recipientName =
          recipientType === "bride"
            ? WEDDING_DETAILS.brideName
            : WEDDING_DETAILS.groomName;

        setStatusMessage(`تم إرسال تهنئتك إلى ${recipientName} بنجاح! 🤍`);

        setGuestName("");
        setWishMessage("");
      } else {
        setStatusMessage(`خطأ: ${data.error || "تعذر إرسال التهنئة"}`);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("حدث خطأ في الاتصال بالشبكة.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const targetDate = new Date(WEDDING_DETAILS.weddingDateISO).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Detect mobile / tablet
  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // Open ride application on mobile,
  // website on laptop / PC
  const openRideService = (appUrl: string, webUrl: string) => {
    if (!isMobileDevice()) {
      // Laptop / PC
      window.open(webUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // Mobile / Tablet
    window.location.href = appUrl;

    // Fallback to website if the app is not installed
    setTimeout(() => {
      window.location.href = webUrl;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] text-stone-800 px-4 py-12 flex flex-col items-center gap-8 dir-rtl relative overflow-hidden">
      {/* Background Soft Glow Effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-100/50 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-rose-100/40 blur-3xl rounded-full pointer-events-none" />

      {/* 1. Main Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-3xl p-6 md:p-10 text-center shadow-[0_15px_35px_rgba(212,175,55,0.08)] space-y-6 relative z-10 flex flex-col items-center"
      >
        <span className="inline-block px-4 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 tracking-[0.2em] text-xs font-semibold uppercase shadow-xs">
          دعوة عقد قران
        </span>

        <p className="text-amber-900 font-serif text-sm md:text-base leading-relaxed px-2 font-medium">
          {WEDDING_DETAILS.quranVerse}
        </p>

        <div className="flex items-center justify-center gap-3 text-amber-400/80 my-2">
          <span className="h-[1px] w-12 bg-amber-200" />
          <span>◆</span>
          <span className="h-[1px] w-12 bg-amber-200" />
        </div>

        <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
          {WEDDING_DETAILS.invitationMessage}
        </p>

        {/* Bride & Groom Names */}
        <h1 className="text-3xl md:text-5xl font-serif text-stone-800 py-2 tracking-wide">
          <span>{WEDDING_DETAILS.groomName}</span>
          <span className="text-amber-600 font-sans mx-3">&</span>
          <span>{WEDDING_DETAILS.brideName}</span>
        </h1>

        <div className="flex items-center justify-center gap-3 text-amber-400/80 my-2">
          <span className="h-[1px] w-12 bg-amber-200" />
          <span>◆</span>
          <span className="h-[1px] w-12 bg-amber-200" />
        </div>

        <p className="text-amber-800 font-semibold text-sm md:text-base bg-amber-50/80 inline-block px-5 py-2 rounded-full border border-amber-200/60">
          {WEDDING_DETAILS.displayDateArabic} •{" "}
          {WEDDING_DETAILS.displayTimeArabic}
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 pt-4 max-w-md mx-auto w-full">
          {[
            { label: "يوم", value: timeLeft.days },
            { label: "ساعة", value: timeLeft.hours },
            { label: "دقيقة", value: timeLeft.minutes },
            { label: "ثانية", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-amber-50/50 border border-amber-200/70 rounded-2xl p-3 flex flex-col items-center justify-center shadow-xs"
            >
              <span className="text-xl md:text-2xl font-bold text-amber-800 font-mono">
                {String(item.value).padStart(2, "0")}
              </span>

              <span className="text-xs text-stone-500 mt-1 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="pt-6 flex flex-col items-center gap-1 text-amber-800 pointer-events-none"
        >
          <span className="text-xs font-semibold tracking-wide">
            تصفح للأسفل
          </span>
          <ChevronDown className="w-5 h-5 text-amber-600" />
        </motion.div>
      </motion.div>

      {/* 2. Event Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-3xl p-6 md:p-10 text-center shadow-[0_15px_35px_rgba(212,175,55,0.08)] space-y-6 relative z-10"
      >
        <h2 className="text-3xl font-serif text-stone-800 font-semibold">
          التفاصيل
        </h2>

        {/* Date Box */}
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 text-center space-y-1">
          <p className="text-base md:text-lg font-semibold text-amber-900">
            📅 الموعد والتوقيت
          </p>

          <p className="text-stone-700 text-sm font-medium">
            {WEDDING_DETAILS.displayDateArabic}
          </p>

          <p className="text-stone-500 text-xs">
            {WEDDING_DETAILS.displayTimeArabic}
          </p>
        </div>

        {/* Venue Box */}
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 text-center space-y-4">
          <p className="text-base md:text-lg font-semibold text-amber-900">
            🕌 مكان الاحتفال
          </p>

          {/* Masjid Image */}
          <div className="overflow-hidden rounded-2xl border border-amber-200 shadow-xs">
            <img
              src="/masjed.webp"
              alt={WEDDING_DETAILS.venueName}
              className="w-full h-56 md:h-64 object-cover"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <p className="text-stone-800 text-sm font-bold">
              {WEDDING_DETAILS.venueName}
            </p>

            <p className="text-stone-500 text-xs leading-relaxed">
              {WEDDING_DETAILS.venueAddress}
            </p>
          </div>

          {/* Location Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={WEDDING_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs hover:bg-amber-100/50 transition-colors"
            >
              <span>📍</span>
              خرائط جوجل
            </a>

            <button
              type="button"
              onClick={() => setShowRideModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs hover:bg-amber-100/50 transition-colors cursor-pointer"
            >
              <span>🚗</span>
              اطلب توصيلة
            </button>
          </div>
        </div>
      </motion.div>

      {/* Ride Applications Modal */}
      <AnimatePresence>
        {showRideModal && (
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-amber-200 rounded-3xl p-6 w-full max-w-sm text-center relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setShowRideModal(false)}
                className="absolute top-4 left-4 text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>

              <h3 className="text-xl font-serif text-stone-800 font-semibold">
                اختر خدمة التوصيل
              </h3>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {WEDDING_DETAILS.rideServices.map((app) => (
                  <button
                    key={app.name}
                    type="button"
                    onClick={() => openRideService(app.appUrl, app.webUrl)}
                    className="flex items-center justify-center py-3 px-4 rounded-xl border border-amber-200 bg-amber-50/40 text-amber-900 hover:bg-amber-100/60 text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    {app.name} ↗
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowRideModal(false);
                  setShowTransitModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-200/60 transition-all mt-2 cursor-pointer"
              >
                🚌 الذهاب بالمواصلات العامة
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Transit Modal */}
      <AnimatePresence>
        {showTransitModal && (
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-amber-200 rounded-3xl p-6 w-full max-w-md relative shadow-2xl text-right space-y-4"
            >
              <button
                onClick={() => setShowTransitModal(false)}
                className="absolute top-4 left-4 text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>

              <h3 className="text-lg font-serif text-stone-800 font-semibold">
                {WEDDING_DETAILS.publicTransit.title}
              </h3>

              <div className="text-xs text-stone-700 space-y-3 leading-relaxed bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60">
                <p>
                  <strong className="text-amber-800">🚇 المترو: </strong>
                  {WEDDING_DETAILS.publicTransit.metro}
                </p>

                <p>
                  <strong className="text-amber-800">🚌 الأتوبيسات: </strong>
                  {WEDDING_DETAILS.publicTransit.bus}
                </p>

                <p>
                  <strong className="text-amber-800">📍 علامة مميزة: </strong>
                  {WEDDING_DETAILS.publicTransit.landmark}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Wishes Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-3xl p-6 md:p-10 text-center shadow-[0_15px_35px_rgba(212,175,55,0.08)] space-y-6 relative z-10"
      >
        <h2 className="text-2xl font-serif text-stone-800 font-semibold">
          اترك مباركة للعروسين
        </h2>

        <form className="space-y-4 text-right" onSubmit={handleSubmitWish}>
          {/* Recipient Selection Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-amber-900 font-semibold">
              إلى من ترغب بإرسال التهنئة؟
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRecipientType("groom")}
                className={`py-2.5 px-4 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                  recipientType === "groom"
                    ? "bg-amber-100 border-amber-400 text-amber-950 shadow-xs"
                    : "bg-stone-50 border-stone-200 text-stone-500 hover:border-amber-200"
                }`}
              >
                🤵 العريس ({WEDDING_DETAILS.groomName})
              </button>

              <button
                type="button"
                onClick={() => setRecipientType("bride")}
                className={`py-2.5 px-4 rounded-2xl text-xs font-semibold transition-all border cursor-pointer ${
                  recipientType === "bride"
                    ? "bg-amber-100 border-amber-400 text-amber-950 shadow-xs"
                    : "bg-stone-50 border-stone-200 text-stone-500 hover:border-amber-200"
                }`}
              >
                👰 العروسة ({WEDDING_DETAILS.brideName})
              </button>
            </div>
          </div>

          {/* Guest Name */}
          <input
            type="text"
            placeholder="اسمك الكريم..."
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full bg-stone-50 border border-amber-200/80 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
            required
          />

          {/* Wish Message */}
          <textarea
            rows={4}
            placeholder="اكتب مباركتك الطيبة..."
            value={wishMessage}
            onChange={(e) => setWishMessage(e.target.value)}
            className="w-full bg-stone-50 border border-amber-200/80 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white font-bold rounded-full hover:brightness-105 transition-all shadow-md text-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال التهنئة 💫"}
          </button>

          {statusMessage && (
            <p className="text-xs text-center text-amber-900 font-medium mt-2">
              {statusMessage}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
