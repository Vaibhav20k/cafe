import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { IMAGES } from "../data/cafe";

const TABS = [
  { id: "bean", label: "The Bean", text: "Every lot is cupped on the farm before it ships — washed, honey or monsooned, from estates we visit each harvest.", img: IMAGES.beans },
  { id: "soil", label: "The Soil", text: "Laterite and forest loam in the Western Ghats, shaded by pepper vines and silver oak. The terroir tastes like rain.", img: IMAGES.storyBrass },
  { id: "extraction", label: "The Extraction", text: "Brass davarah frothing, 18-hour drip towers, syphons under glass. Old instruments, obsessive precision.", img: IMAGES.storyCraft },
];

const METRICS = [
  { n: "05", l: "Single origins" },
  { n: "18h", l: "Cold drip drum" },
  { n: "795", l: "Washed selection" },
  { n: "2019", l: "First pour" },
];

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function StorySection() {
  const [tab, setTab] = useState("bean");
  const imgWrap = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  const active = TABS.find((t) => t.id === tab);

  return (
    <section id="story" className="relative overflow-hidden py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-brass/50" />
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass/80">
              Our Story — <span className="font-dev tracking-normal text-sm">कहानी</span>
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]">
                In old Hindustan, a <span className="italic text-brass font-serif2 font-light">sarai</span> was
                where caravans rested — stories traded over spice and dark water.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-stoneish sm:text-lg">
                We carried that idea into a coffee house. Today SARAI takes Indian
                coffee — long sold as a faceless commodity — and treats it like the
                microlot treasure it is: competition-grade, single-estate, roasted in
                small drums, poured with ceremony.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-stoneish sm:text-lg">
                Come as wanderers. Leave with a favourite origin.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brass/15 bg-brass/10 sm:grid-cols-4">
              {METRICS.map((m, i) => (
                <div key={m.l} className="bg-coal p-5 sm:p-6">
                  <motion.p
                    className="font-display text-3xl text-brass sm:text-4xl"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                  >
                    {m.n}
                  </motion.p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{m.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div ref={imgWrap} className="relative grid grid-cols-5 gap-5">
              <div className="col-span-3 overflow-hidden rounded-2xl border border-brass/15">
                <motion.img
                  src={IMAGES.brassCups}
                  alt="Indian filter coffee in brass davarah cups"
                  style={{ y: y1, scale: 1.15 }}
                  className="h-[380px] w-full object-cover sm:h-[460px]"
                />
              </div>
              <div className="col-span-2 mt-16 overflow-hidden rounded-t-[999px] rounded-b-2xl border border-brass/15">
                <motion.img
                  src={IMAGES.storyCraft}
                  alt="Artisan espresso on dark timber"
                  style={{ y: y2, scale: 1.15 }}
                  className="h-[380px] w-full object-cover sm:h-[460px]"
                />
              </div>
            </div>

            <div className="mt-10">
              <div className="flex gap-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${
                      tab === t.id ? "text-obsidian" : "text-stoneish hover:text-cream"
                    }`}
                  >
                    {tab === t.id && (
                      <motion.span
                        layoutId="story-tab-pill"
                        className="absolute inset-0 rounded-full bg-brass"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-6 min-h-[88px] overflow-hidden rounded-2xl border border-brass/15 bg-coal p-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                    className="font-serif2 text-lg italic leading-relaxed text-cream/90 sm:text-xl"
                  >
                    "{active.text}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
