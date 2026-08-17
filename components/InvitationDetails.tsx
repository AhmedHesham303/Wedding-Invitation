"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING_DETAILS } from "@/app/_config/constants";

export default function InvitationDetails() {
  const targetDate = new Date(WEDDING_DETAILS.weddingDateISO).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [guestName, setGuestName] = useState("");
  const [wishMessage, setWishMessage] = useState("");

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
          WEDDING INVITATION
        </span>

        <p className="text-amber-100 font-serif text-sm md:text-base leading-relaxed px-2">
          {WEDDING_DETAILS.quranVerse}
        </p>

        <div className="flex items-center justify-center gap-3 text-amber-500/60 my-2">
          <span className="h-[1px] w-12 bg-amber-500/30"></span>
          <span>◆</span>
          <span className="h-[1px] w-12 bg-amber-500/30"></span>
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
          <span className="h-[1px] w-12 bg-amber-500/30"></span>
          <span>◆</span>
          <span className="h-[1px] w-12 bg-amber-500/30"></span>
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
        <span className="text-amber-500 tracking-[0.25em] text-xs font-sans uppercase">
          EVENT DETAILS
        </span>

        <h2 className="text-3xl font-serif text-amber-300">
          تفاصيل الحفل والمكان
        </h2>

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
        <div className="bg-neutral-900/60 border border-amber-500/20 rounded-xl p-5 text-center space-y-3">
          <p className="text-lg font-medium text-amber-300">🏛️ مكان الاحتفال</p>
          <p className="text-neutral-300 text-sm">
            {WEDDING_DETAILS.venueName}
          </p>
          <p className="text-neutral-400 text-xs">
            {WEDDING_DETAILS.venueAddress}
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={WEDDING_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/50 text-amber-300 text-xs hover:bg-amber-500/10 transition-colors"
            >
              <span>📍</span> خرائط جوجل
            </a>

            <a
              href={WEDDING_DETAILS.uberLocationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/50 text-amber-300 text-xs hover:bg-amber-500/10 transition-colors"
            >
              <span>🚗</span> طلب Uber للموقع
            </a>
          </div>
        </div>
      </motion.div>

      {/* 3. Wishes Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-xl bg-neutral-950/90 border border-amber-500/20 rounded-2xl p-6 md:p-10 text-center shadow-2xl space-y-6"
      >
        <span className="text-amber-500 tracking-[0.25em] text-xs font-sans uppercase">
          WISHES
        </span>

        <h2 className="text-2xl font-serif text-amber-300">
          اترك مباركة للعروسين
        </h2>

        <form
          className="space-y-4 text-right"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="اسمك الكريم..."
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full bg-neutral-900 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/60"
          />

          <textarea
            rows={4}
            placeholder="اكتب مباركتك الطيبة للعروسين..."
            value={wishMessage}
            onChange={(e) => setWishMessage(e.target.value)}
            className="w-full bg-neutral-900 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/60 resize-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-amber-400 text-neutral-950 font-semibold rounded-full hover:bg-amber-300 transition-colors shadow-lg text-sm cursor-pointer"
          >
            إرسال التهنئة 💫
          </button>
        </form>
      </motion.div>
    </div>
  );
}
