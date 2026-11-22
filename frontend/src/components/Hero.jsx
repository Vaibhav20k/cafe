import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { IMAGES } from "../data/cafe";

const lineReveal = (text, ready, i, cls = "") => (
  <span key={i} className="mask-line">
    <motion.span
      className={`block ${cls}`}
      initial={{ y: "115%" }}
      animate={ready ? { y: "0%" } : {}}
      transition={{ duration: 1.05, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  </span>
);

export default function Hero({ ready, onAsk }) {
  const frameRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });

  const secRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start start", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const onMove = (e) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={secRef} className="relative min-h-screen overflow-hidden flex items-center">
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none select-none absolute -right-[6%] top-[8%] font-dev text-[38vw] leading-none text-cream opacity-[0.035]"
      >
        सराय
      </motion.span>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-14 px-5 sm:px-10 pt-28 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div className="lg:col-span-7">
          <div className="overflow-hidden">
            <motion.div
              className="mb-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass/80">
                Est. 2019 — Indiranagar, Bengaluru
              </span>
              <span className="hidden sm:block h-px w-16 bg-brass/30" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                12.9716° N / 77.6412° E — ELEV 920M
              </span>
            </motion.div>
          </div>

          <h1 className="font-display leading-[1.02] tracking-tight text-cream text-[clamp(2.75rem,6vw,4.75rem)]">
            {lineReveal("A sanctuary for the", ready, 0)}
            {lineReveal("restless", ready, 1, "italic text-brass font-serif2 font-light")}
            {lineReveal(
              <span className="flex items-baseline gap-4 sm:gap-6">
                palate.
                <span className="font-dev text-[0.42em] text-brass/70">सराय — विश्राम</span>
              </span>,
              ready,
              2
            )}
          </h1>

          <div className="overflow-hidden">
            <motion.p
              className="mt-8 max-w-md text-base leading-relaxed text-stoneish sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.65 }}
            >
              Ancient spice routes meet third-wave roasting. Single-origin Indian
              microlots, brewed slow in a resting house for travellers.
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.8 }}
            >
              <button
                data-testid="hero-explore-menu-cta"
                onClick={() => {
                  const el = document.getElementById("menu");
                  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -64, duration: 1.5 });
                  else el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative overflow-hidden rounded-full bg-brass px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-obsidian cursor-pointer"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-cream">Explore the Menu</span>
                <span className="absolute inset-0 translate-y-full bg-obsidian transition-transform duration-500 ease-out group-hover:translate-y-0" />
              </button>
              <button
                data-testid="hero-ask-ai-cta"
                onClick={onAsk}
                className="rounded-full border border-brass/40 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-brass hover:bg-brass/10 transition-colors duration-300 cursor-pointer"
              >
                Ask the AI Barista
              </button>
            </motion.div>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            ref={frameRef}
            onMouseMove={onMove}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ rotateX: rX, rotateY: rY, transformPerspective: 1000 }}
            className="relative mx-auto w-[82%] max-w-[420px] lg:w-full"
            initial={{ opacity: 0, y: 60 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-t-[999px] rounded-b-2xl border border-brass/20">
              <motion.img
                src={IMAGES.hero}
                alt="Barista pouring specialty coffee in moody warm light"
                style={{ y: imgY, scale: 1.18 }}
                className="h-[520px] w-full object-cover sm:h-[560px]"
              />
            </div>
            <motion.div
              className="absolute -left-6 bottom-10 w-56 rounded-xl border border-brass/20 bg-glass p-4 backdrop-blur-xl sm:-left-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}
            >
              <div className="animate-float-soft">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-brass/80">Today's Roast</p>
                <p className="mt-2 font-display text-sm text-cream">Chikmagalur Estate #44</p>
                <p className="mt-1 font-mono text-[10px] leading-relaxed text-stoneish">
                  WASHED 795 — Batch 019
                  <br />
                  FIG / CACAO / CARDAMOM
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-faint">Scroll</span>
        <div className="h-12 w-px overflow-hidden bg-brass/15">
          <motion.span
            className="block h-1/2 w-px bg-brass"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
