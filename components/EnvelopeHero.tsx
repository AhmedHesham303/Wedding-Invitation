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
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d97706", "#f59e0b", "#fef3c7", "#b45309"],
    });

    setTimeout(() => {
      if (onOpen) onOpen();
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <span className="text-amber-400 tracking-wider text-sm font-semibold">
          يشرفنا ويسعدنا دعوتكم لحضور عقد قران
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-amber-200 mt-2 drop-shadow-md">
          {WEDDING_DETAILS.groomName} & {WEDDING_DETAILS.brideName}
        </h1>
        <p className="text-amber-300/70 mt-2 text-sm">
          اضغط على الختم لفتح الدعوة
        </p>
        <p>متزعليش يا ماما</p>
      </motion.div>

      {/* Envelope Outer Container */}
      <div
        className="relative w-full max-w-md h-72 cursor-pointer shadow-2xl rounded-xl"
        onClick={handleOpen}
      >
        {/* Back Flap / Interior */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950 to-neutral-900 rounded-xl border border-amber-500/40 shadow-inner" />

        {/* Invitation Card inside envelope */}
        <motion.div
          animate={isOpen ? { y: -130, zIndex: 10 } : { y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-x-4 top-4 bottom-4 bg-gradient-to-b from-neutral-900 to-amber-950/80 rounded-lg p-6 border border-amber-400/30 shadow-xl flex flex-col items-center justify-center text-center"
        >
          <Sparkles className="w-6 h-6 text-amber-400 mb-2 animate-pulse" />
          <h2 className="text-2xl font-serif text-amber-200 leading-relaxed">
            بارَكَ اللَّهُ لَهُما وَبارَكَ عَلَيْهِما
          </h2>
          <p className="text-amber-400 text-sm font-medium mt-2">
            {WEDDING_DETAILS.displayDateArabic}
          </p>
        </motion.div>

        {/* Envelope Front Overlay / Flaps */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          {/* Bottom Flap Triangle */}
          <div className="absolute bottom-0 inset-x-0 h-3/5 bg-amber-900/40 backdrop-blur-xs border-t border-amber-500/30 [clip-path:polygon(0_100%,100%_100%,50%_0)]" />
          {/* Top Flap Triangle */}
          <div className="absolute top-0 inset-x-0 h-3/5 bg-amber-950/60 backdrop-blur-xs border-b border-amber-500/30 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
        </div>

        {/* Wax Seal Button */}
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 rounded-full shadow-2xl border-2 border-amber-200/80 flex items-center justify-center group cursor-pointer"
          >
            <Heart className="w-8 h-8 text-amber-100 fill-amber-100 group-hover:scale-110 transition-transform drop-shadow" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
