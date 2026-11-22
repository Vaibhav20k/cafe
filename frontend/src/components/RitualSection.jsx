import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../data/cafe";

const RITUALS = [
  {
    id: "kaapi-meter",
    n: "01",
    name: "The Royal Kaapi Meter",
    one: "Brass davarah-tumbler, frothed from two feet up",
    body: "South Indian filter decoction, aerated through a brass davarah until the crema turns to velvet. Poured from a height of two feet — the meter that names it.",
    img: IMAGES.steamPour,
    temp: 82, grind: "FINE 220µ", time: "45s froth", ratio: "1:3 decoction",
  },
  {
    id: "kyoto-drip",
    n: "02",
    name: "Smoked Jaggery Kyoto Drip",
    one: "Twelve hours down the cold drip tower",
    body: "One drop per second through wild palmyra jaggery and smoked malt. The tower hums all night; the cup arrives like dark silk by morning.",
    img: IMAGES.ritualSyphon,
    temp: 8, grind: "MEDIUM 400µ", time: "12h drip", ratio: "1:8 tower",
  },
  {
    id: "malabar-aero",
    n: "03",
    name: "Monsooned Malabar Aeropress",
    one: "Ocean-aged beans, pressed slow",
    body: "Green beans swelled by coastal monsoon winds to pale gold, revealing earthy hazelnut and cigar leaf. Pressed slow, never forced.",
    img: IMAGES.ritualPour,
    temp: 88, grind: "FINE-MED 260µ", time: "90s press", ratio: "1:11 inverted",
  },
  {
    id: "saffron-tonic",
    n: "04",
    name: "Saffron & Pistachio Espresso Tonic",
    one: "Washed espresso over house saffron tonic",
    body: "A double shot of Baba Budangiri espresso layered over saffron-infused tonic and orange oils. Built like a sunset, drunk in layers.",
    img: IMAGES.brassCups,
    temp: 4, grind: "FINE 240µ", time: "27s shot", ratio: "1:2 ristretto",
  },
];

function Dial({ label, value, max, unit }) {
  const pct = Math.min(value / max, 1);
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="68" height="68" viewBox="0 0 68 68" className="-rotate-90">
        <circle cx="34" cy="34" r={R} fill="none" stroke="rgba(224,169,109,0.15)" strokeWidth="3" />
        <motion.circle
          cx="34"
          cy="34"
          r={R}
          fill="none"
          stroke="#E0A96D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C * (1 - pct) }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <text
          x="34" y="34" textAnchor="middle" dominantBaseline="central"
          transform="rotate(90 34 34)"
          className="fill-cream font-mono"
          fontSize="11"
        >
          {value}{unit}
        </text>
      </svg>
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-faint">{label}</span>
    </div>
  );
}

export default function RitualSection() {
  const [active, setActive] = useState(RITUALS[0]);

  return (
    <section id="ritual" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-brass/50" />
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass/80">
              The Rituals — <span className="font-dev tracking-normal text-sm">रीति</span>
            </p>
          </div>
          <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]">
            Four ways we refuse to <span className="italic text-brass font-serif2 font-light">hurry</span> a cup.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {RITUALS.map((r) => (
              <button
                key={r.id}
                data-testid="ritual-step-selector"
                onClick={() => setActive(r)}
                className={`group relative block w-full border-b border-brass/10 py-7 text-left transition-colors duration-300 cursor-pointer ${
                  active.id === r.id ? "" : "opacity-50 hover:opacity-90"
                }`}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-brass/70">{r.n}</span>
                  <div>
                    <h3 className="font-display text-2xl text-cream sm:text-[1.7rem]">{r.name}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{r.one}</p>
                  </div>
                  <motion.span
                    className="ml-auto h-2 w-2 rounded-full bg-brass"
                    animate={{ opacity: active.id === r.id ? 1 : 0, scale: active.id === r.id ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {active.id === r.id && (
                  <motion.span
                    layoutId="ritual-marker"
                    className="absolute left-0 top-0 h-full w-px bg-brass"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-brass/15">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.img}
                  alt={active.name}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[300px] w-full object-cover sm:h-[380px]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="max-w-lg font-serif2 text-lg italic leading-relaxed text-cream/90 sm:text-xl">
                      {active.body}
                    </p>
                    <div className="mt-6 flex items-center gap-6 sm:gap-8">
                      <Dial label="Temp" value={active.temp} max={100} unit="°" />
                      <div>
                        <p className="font-mono text-xs text-brass">{active.grind}</p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-faint">Grind</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-brass">{active.time}</p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-faint">Time</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-brass">{active.ratio}</p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-faint">Ratio</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
