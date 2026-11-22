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
          <span className="whitespace-nowrap px-8 font-mono text-[12px] font-medium uppercase tracking-[0.35em] text-brassantique">
            {p}
          </span>
          <span className="text-terracotta text-xs">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <motion.div
      className="relative overflow-hidden border-y border-brassantique/20 bg-linen2/70 py-5"
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
