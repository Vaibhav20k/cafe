import { motion } from "framer-motion";

const PHRASES = [
  "SHADE-GROWN WESTERN GHATS MICROLOTS",
  "THE 18-HOUR COLD DRIP DRUM",
  "COPPER KAAPI EXTRACTION",
  "DIRECT TRADE — CHIKMAGALUR & ARAKU",
  "A RESTING HOUSE FOR TRAVELLERS",
];

export default function MarqueeRibbon() {
  const track = (ariaHidden = false) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {PHRASES.map((p, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-mono text-[12px] uppercase tracking-[0.35em] text-brass/50">
            {p}
          </span>
          <span className="text-brass/40 text-xs">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <motion.div
      className="relative overflow-hidden border-y border-brass/10 py-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1 }}
    >
      <div className="flex w-max animate-marquee">
        {track(false)}
        {track(true)}
      </div>
    </motion.div>
  );
}
