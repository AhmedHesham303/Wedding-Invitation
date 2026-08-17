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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#ec4899", "#fef3c7"],
    });

    setTimeout(() => {
      if (onOpen) onOpen();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <span className="text-amber-700 tracking-wider text-sm font-semibold">
          يشرفنا ويسعدنا دعوتكم لحضور حفل زفاف
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-amber-300 mt-2">
          {WEDDING_DETAILS.groomName} & {WEDDING_DETAILS.brideName}
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          اضغط على الختم لفتح الدعوة
        </p>
      </motion.div>

      {/* Envelope Outer Container */}
      <div
        className="relative w-full max-w-md h-72 cursor-pointer"
        onClick={handleOpen}
      >
        {/* Back Flap */}
        <div className="absolute inset-0 bg-neutral-900 rounded-lg shadow-xl border border-amber-500/30" />

        {/* Invitation Card inside envelope */}
        <motion.div
          animate={isOpen ? { y: -120, zIndex: 10 } : { y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-x-4 top-4 bottom-4 bg-neutral-950 rounded-md p-6 border border-amber-500/20 shadow-md flex flex-col items-center justify-center text-center"
        >
          <Sparkles className="w-6 h-6 text-amber-500 mb-2" />
          <h2 className="text-2xl font-serif text-amber-300">
            بارَكَ اللَّهُ لَهُما وَبارَكَ عَلَيْهِما
          </h2>
          <p className="text-amber-500 text-sm font-medium mt-2">
            {WEDDING_DETAILS.displayDateArabic}
          </p>
        </motion.div>

        {/* Envelope Front Flaps */}
        <div className="absolute inset-0 border-t-[140px] border-t-neutral-900/80 border-x-[200px] border-x-transparent border-b-[140px] border-b-neutral-900/90 rounded-lg pointer-events-none" />

        {/* Wax Seal Button */}
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-rose-800 rounded-full shadow-lg border-2 border-amber-400/50 flex items-center justify-center group cursor-pointer"
          >
            <Heart className="w-8 h-8 text-rose-100 fill-rose-100 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
