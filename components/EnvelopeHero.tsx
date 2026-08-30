"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { WEDDING_DETAILS } from "@/app/_config/constants";

export default function EnvelopeHero({ onOpen }: { onOpen?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);

    const confetti = (await import("canvas-confetti")).default;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f3e5ab", "#e8b4b8", "#f7d6d0", "#c5a059"],
    });

    setTimeout(() => {
      if (onOpen) onOpen();
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center justify-center px-4 py-12 overflow-hidden dir-rtl">
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-100/60 blur-3xl rounded-full pointer-events-none" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 z-10 space-y-2"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-900 tracking-wider text-xs font-semibold shadow-xs">
          ✨ يشرفنا ويسعدنا دعوتكم لحضور عقد قران
        </span>

        <h1 className="text-4xl md:text-6xl font-serif text-stone-800 tracking-tight pt-2">
          <span>{WEDDING_DETAILS.groomName}</span>
          <span className="text-amber-600 font-sans mx-3">&</span>
          <span>{WEDDING_DETAILS.brideName}</span>
        </h1>

        <p className="text-stone-500 text-xs md:text-sm font-medium pt-1">
          اضغط على الختم الذهبي لفتح الدعوة 💌
        </p>
      </motion.div>

      {/* Envelope Outer Container */}
      <div
        className="relative w-full max-w-md h-72 cursor-pointer rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-transform duration-300 hover:scale-[1.01]"
        onClick={handleOpen}
      >
        {/* Back Flap / Interior Envelope Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-amber-50 to-stone-200 rounded-2xl border border-amber-200/80 shadow-inner" />

        {/* Invitation Card inside envelope */}
        <motion.div
          animate={isOpen ? { y: -130, zIndex: 10 } : { y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-x-4 top-4 bottom-4 bg-gradient-to-b from-white to-amber-50/40 rounded-xl p-6 border border-amber-300/60 shadow-xl flex flex-col items-center justify-center text-center space-y-3"
        >
          <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />

          <h2 className="text-2xl font-serif text-stone-800 leading-relaxed font-semibold">
            بارَكَ اللَّهُ لَهُما وَبارَكَ عَلَيْهِما
          </h2>

          <p className="text-amber-700 text-xs md:text-sm font-semibold tracking-wide bg-amber-100/60 px-4 py-1 rounded-full border border-amber-200">
            {WEDDING_DETAILS.displayDateArabic}
          </p>
        </motion.div>

        {/* Envelope Front Overlay / Flaps */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {/* Bottom Flap Triangle */}
          <div className="absolute bottom-0 inset-x-0 h-3/5 bg-gradient-to-t from-stone-200/90 to-amber-100/70 backdrop-blur-xs border-t border-amber-300/40 [clip-path:polygon(0_100%,100%_100%,50%_0)]" />

          {/* Top Flap Triangle */}
          <div className="absolute top-0 inset-x-0 h-3/5 bg-gradient-to-b from-stone-100/95 to-amber-100/80 backdrop-blur-xs border-b border-amber-300/40 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
        </div>

        {/* Premium Gold Wax Seal Button */}
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 rounded-full shadow-[0_8px_25px_rgba(217,119,6,0.4)] border-2 border-amber-100 flex items-center justify-center group cursor-pointer"
          >
            <Heart className="w-8 h-8 text-amber-50 fill-amber-50 group-hover:scale-110 transition-transform drop-shadow-sm" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
