import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { IMAGES } from "../data/cafe";
import { scrollToId } from "../context";

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
        <circle cx="34" cy="34" r={R} fill="none" stroke="rgba(194,140,72,0.2)" strokeWidth="3" />
        <motion.circle
          cx="34"
          cy="34"
          r={R}
          fill="none"
          stroke="#C28C48"
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
          className="fill-ink font-mono"
          fontSize="11"
        >
          {value}{unit}
        </text>
      </svg>
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-stonemute">{label}</span>
    </div>
  );
}

function Detail({ r }) {
  return (
    <motion.div
      key={r.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <p className="font-serif2 text-lg italic leading-relaxed text-roast sm:text-xl">{r.body}</p>
      <div className="mt-5 flex flex-wrap items-center gap-5 sm:gap-8">
        <Dial label="Temp" value={r.temp} max={100} unit="°" />
        <div>
          <p className="font-mono text-xs text-brassantique">{r.grind}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-caption">Grind</p>
        </div>
        <div>
          <p className="font-mono text-xs text-brassantique">{r.time}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-caption">Time</p>
        </div>
        <div>
          <p className="font-mono text-xs text-brassantique">{r.ratio}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-caption">Ratio</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function RitualSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.6", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(RITUALS.length - 1, Math.max(0, Math.floor(v * RITUALS.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const current = RITUALS[active];

  const goToStep = (i) => {
    const el = stepRefs.current[i];
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -110, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ritual" className="relative border-y border-brassantique/15 bg-linen2 py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-brassantique/60" />
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brassantique">
              The Rituals — <span className="font-dev text-sm tracking-normal">रीति</span>
            </p>
          </div>
          <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.2rem]">
            Four ways we refuse to <span className="italic text-brassantique font-serif2 font-light">hurry</span> a cup.
          </h2>
        </motion.div>

        <div ref={containerRef} className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {RITUALS.map((r, i) => (
              <div
                key={r.id}
                ref={(el) => (stepRefs.current[i] = el)}
                className="flex min-h-[58vh] items-center lg:min-h-[72vh]"
              >
                <div
                  data-testid="ritual-step-selector"
                  onClick={() => goToStep(i)}
                  className={`w-full cursor-pointer rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${
                    active === i
                      ? "border-brassantique/30 bg-paper shadow-lg shadow-brassantique/10"
                      : "border-brassantique/15 bg-paper/50 hover:bg-paper/80"
                  }`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className={`font-mono text-[11px] tracking-[0.2em] ${active === i ? "text-brassantique" : "text-caption"}`}>
                      {r.n}
                    </span>
                    <div>
                      <h3 className={`font-display text-2xl sm:text-[1.7rem] ${active === i ? "text-ink" : "text-stonemute"}`}>
                        {r.name}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-caption">{r.one}</p>
                    </div>
                    <motion.span
                      className="ml-auto h-2 w-2 rounded-full bg-brassantique"
                      animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.4 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="mt-5 lg:hidden">
                    <img src={r.img} alt={r.name} className="h-44 w-full rounded-xl border border-brassantique/20 object-cover" />
                    <div className="mt-4">
                      <Detail r={r} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-brassantique/25 bg-paper shadow-xl shadow-brassantique/10">
              <div className="relative h-[400px]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={current.id}
                    src={current.img}
                    alt={current.name}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink backdrop-blur">
                  {current.n} — {current.name}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <Detail key={current.id} r={current} />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
