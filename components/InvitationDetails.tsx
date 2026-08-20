"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex flex-col items-center gap-8 dir-rtl">
      {/* 1. Main Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-neutral-950/90 border border-amber-500/20 rounded-2xl p-6 md:p-10 text-center shadow-2xl space-y-6"
      >
        <span className="text-amber-500 tracking-[0.25em] text-xs font-sans uppercase">
          دعوة عقد قران
        </span>

        <p className="text-amber-100 font-serif text-sm md:text-base leading-relaxed px-2">
          {WEDDING_DETAILS.quranVerse}
        </p>

        <div className="flex items-center justify-center gap-3 text-amber-500/60 my-2">
          <span className="h-[1px] w-12 bg-amber-500/30" />
          <span>◆</span>
          <span className="h-[1px] w-12 bg-amber-500/30" />
        </div>

        <p className="text-neutral-300 text-sm leading-relaxed max-w-md mx-auto">
          {WEDDING_DETAILS.invitationMessage}
        </p>

        {/* Bride & Groom Names */}
        <h1 className="text-4xl md:text-5xl font-serif text-amber-300 py-2 tracking-wide">
          {WEDDING_DETAILS.groomName}{" "}
          <span className="text-amber-500 text-3xl mx-2 font-sans">&</span>{" "}
          {WEDDING_DETAILS.brideName}
        </h1>

        <div className="flex items-center justify-center gap-3 text-amber-500/60 my-2">
          <span className="h-[1px] w-12 bg-amber-500/30" />
          <span>◆</span>
          <span className="h-[1px] w-12 bg-amber-500/30" />
        </div>

        <p className="text-amber-400 font-medium text-sm md:text-base">
          {WEDDING_DETAILS.displayDateArabic} •{" "}
          {WEDDING_DETAILS.displayTimeArabic}
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 pt-4 max-w-md mx-auto">
          {[
            { label: "يوم", value: timeLeft.days },
            { label: "ساعة", value: timeLeft.hours },
            { label: "دقيقة", value: timeLeft.minutes },
            { label: "ثانية", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/80 border border-amber-500/30 rounded-xl p-3 flex flex-col items-center justify-center"
            >
              <span className="text-xl md:text-2xl font-semibold text-amber-400 font-mono">
                {String(item.value).padStart(2, "0")}
              </span>

              <span className="text-xs text-neutral-400 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. Event Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-xl bg-neutral-950/90 border border-amber-500/20 rounded-2xl p-6 md:p-10 text-center shadow-2xl space-y-6"
      >
        {/* <span className="text-amber-500 tracking-[0.25em] text-xs font-sans uppercase">
          EVENT DETAILS
        </span> */}

        <h2 className="text-3xl font-serif text-amber-300">التفاصيل</h2>

        {/* Date Box */}
        <div className="bg-neutral-900/60 border border-amber-500/20 rounded-xl p-5 text-center space-y-1">
          <p className="text-lg font-medium text-amber-300">
            📅 الموعد والتوقيت
          </p>

          <p className="text-neutral-300 text-sm">
            {WEDDING_DETAILS.displayDateArabic}
          </p>

          <p className="text-neutral-400 text-xs">
            {WEDDING_DETAILS.displayTimeArabic}
          </p>
        </div>

        {/* Venue Box */}
        <div className="bg-neutral-900/60 border border-amber-500/20 rounded-xl p-5 text-center space-y-4">
          <p className="text-lg font-medium text-amber-300">🕌 مكان الاحتفال</p>

          {/* Masjid Image */}
          <div className="overflow-hidden rounded-xl border border-amber-500/20">
            <img
              src="/masjed.webp"
              alt={WEDDING_DETAILS.venueName}
              className="w-full h-56 md:h-64 object-cover"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <p className="text-neutral-200 text-sm font-medium">
              {WEDDING_DETAILS.venueName}
            </p>

            <p className="text-neutral-400 text-xs leading-relaxed">
              {WEDDING_DETAILS.venueAddress}
            </p>
          </div>

          {/* Location Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={WEDDING_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/50 text-amber-300 text-xs hover:bg-amber-500/10 transition-colors"
            >
              <span>📍</span>
              خرائط جوجل
            </a>

            <button
              type="button"
              onClick={() => setShowRideModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/50 text-amber-300 text-xs hover:bg-amber-500/10 transition-colors cursor-pointer"
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 w-full max-w-sm text-center relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setShowRideModal(false)}
                className="absolute top-4 left-4 text-amber-400 hover:text-amber-200 text-sm font-bold"
              >
                ✕
              </button>

              <h3 className="text-xl font-serif text-amber-300">
                اختر خدمة التوصيل
              </h3>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {WEDDING_DETAILS.rideServices.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center py-3 px-4 rounded-xl border bg-neutral-950 text-amber-200 text-xs font-semibold transition-all ${app.color}`}
                  >
                    {app.name} ↗
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowRideModal(false);
                  setShowTransitModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium hover:bg-amber-500/20 transition-all mt-2"
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 w-full max-w-md relative shadow-2xl text-right space-y-4"
            >
              <button
                onClick={() => setShowTransitModal(false)}
                className="absolute top-4 left-4 text-amber-400 hover:text-amber-200 text-sm font-bold"
              >
                ✕
              </button>

              <h3 className="text-lg font-serif text-amber-300">
                {WEDDING_DETAILS.publicTransit.title}
              </h3>

              <div className="text-xs text-neutral-300 space-y-3 leading-relaxed bg-neutral-950 p-4 rounded-xl border border-amber-500/10">
                <p>
                  <strong className="text-amber-400">🚇 المترو: </strong>
                  {WEDDING_DETAILS.publicTransit.metro}
                </p>
                <p>
                  <strong className="text-amber-400">🚌 الأتوبيسات: </strong>
                  {WEDDING_DETAILS.publicTransit.bus}
                </p>
                <p>
                  <strong className="text-amber-400">📍 علامة مميزة: </strong>
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
        className="w-full max-w-xl bg-neutral-950/90 border border-amber-500/20 rounded-2xl p-6 md:p-10 text-center shadow-2xl space-y-6"
      >
        {/* <span className="text-amber-500 tracking-[0.25em] text-xs font-sans uppercase">
          WISHES
        </span> */}

        <h2 className="text-2xl font-serif text-amber-300">
          اترك مباركة للعروسين
        </h2>

        <form className="space-y-4 text-right" onSubmit={handleSubmitWish}>
          {/* Recipient Selection Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-amber-400 font-medium">
              إلى من ترغب بإرسال التهنئة؟
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRecipientType("groom")}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border ${
                  recipientType === "groom"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md"
                    : "bg-neutral-900 border-amber-500/10 text-neutral-400 hover:border-amber-500/30"
                }`}
              >
                🤵 العريس ({WEDDING_DETAILS.groomName})
              </button>

              <button
                type="button"
                onClick={() => setRecipientType("bride")}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border ${
                  recipientType === "bride"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md"
                    : "bg-neutral-900 border-amber-500/10 text-neutral-400 hover:border-amber-500/30"
                }`}
              >
                👰 العروس ({WEDDING_DETAILS.brideName})
              </button>
            </div>
          </div>

          {/* Guest Name */}
          <input
            type="text"
            placeholder="اسمك الكريم..."
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full bg-neutral-900 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/60"
            required
          />

          {/* Wish Message */}
          <textarea
            rows={4}
            placeholder="اكتب مباركتك الطيبة..."
            value={wishMessage}
            onChange={(e) => setWishMessage(e.target.value)}
            className="w-full bg-neutral-900 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/60 resize-none"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-400 text-neutral-950 font-semibold rounded-full hover:bg-amber-300 transition-colors shadow-lg text-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال التهنئة 💫"}
          </button>

          {statusMessage && (
            <p className="text-xs text-center text-amber-300 mt-2">
              {statusMessage}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
