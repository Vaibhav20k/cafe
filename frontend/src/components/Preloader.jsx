import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "./Logo";

export default function Preloader({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setLeaving(true);
      onDone();
    }, 1500);
    const t2 = setTimeout(() => setGone(true), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-linen"
        initial={{ y: 0 }}
        animate={leaving ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="flex flex-col items-center gap-5">
          <motion.svg width="56" height="56" viewBox="0 0 32 32" fill="none">
            <motion.path
              d="M9 27V15.5a7 7 0 0 1 14 0V27"
              stroke="#C28C48"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.circle
              cx="16"
              cy="13"
              r="2.2"
              fill="#C28C48"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
            <motion.path
              d="M5 27h22"
              stroke="#C28C48"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
            />
          </motion.svg>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-2xl tracking-[0.35em] text-ink"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              SARAI
            </motion.p>
          </div>
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-stonemute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Specialty Indian Coffee House
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
