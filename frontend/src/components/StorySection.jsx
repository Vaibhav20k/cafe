import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { IMAGES } from "../data/cafe";

function Word({ progress, range, word, cls }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${cls}`}>
      {word}
    </motion.span>
  );
}

function ScrollWords({ segments, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "start 0.4"] });
  const words = [];
  segments.forEach((seg) => {
    seg.t.split(" ").forEach((w) => words.push({ w, c: seg.c }));
  });
  return (
    <span ref={ref} className={className}>
      {words.map((item, i) => (
        <span key={i}>
          <Word
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
            word={item.w}
            cls={item.c || ""}
          />
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

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

export default function StorySection() {
  const [tab, setTab] = useState("bean");
  const imgWrap = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  const active = TABS.find((t) => t.id === tab);

  return (
    <section id="story" className="relative overflow-hidden bg-linen py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-brassantique/60" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brassantique">
            Our Story — <span className="font-dev text-sm tracking-normal">कहानी</span>
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.2rem]">
              <ScrollWords
                segments={[
                  { t: "In old Hindustan, a", c: "" },
                  { t: "sarai", c: "italic text-brassantique font-serif2 font-light" },
                  { t: "was where caravans rested — stories traded over spice and dark water.", c: "" },
                ]}
              />
            </h2>

            <motion.p
              className="mt-8 max-w-lg text-base leading-relaxed text-roast sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              We carried that idea into a coffee house. Today SARAI takes Indian
              coffee — long sold as a faceless commodity — and treats it like the
              microlot treasure it is: competition-grade, single-estate, roasted in
              small drums, poured with ceremony.
            </motion.p>
            <motion.p
              className="mt-5 max-w-lg text-base leading-relaxed text-roast sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Come as wanderers. Leave with a favourite origin.
            </motion.p>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brassantique/20 bg-brassantique/15 sm:grid-cols-4">
              {METRICS.map((m, i) => (
                <div key={m.l} className="bg-paper p-5 transition-colors duration-300 hover:bg-creamlift sm:p-6">
                  <motion.p
                    className="font-display text-3xl text-brassantique sm:text-4xl"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                  >
                    {m.n}
                  </motion.p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-stonemute">{m.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div ref={imgWrap} className="relative grid grid-cols-5 gap-5">
              <div className="col-span-3 overflow-hidden rounded-2xl border border-brassantique/20 shadow-lg shadow-brassantique/10">
                <motion.img
                  src={IMAGES.storyBrass}
                  alt="Indian brass filter coffee davarah with golden froth"
                  style={{ y: y1, scale: 1.18 }}
                  className="h-[380px] w-full object-cover sm:h-[460px]"
                />
              </div>
              <div className="col-span-2 mt-16 overflow-hidden rounded-t-[999px] rounded-b-2xl border border-brassantique/20 shadow-lg shadow-brassantique/10">
                <motion.img
                  src={IMAGES.beans}
                  alt="Roasted specialty coffee beans"
                  style={{ y: y2, scale: 1.18 }}
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
                      tab === t.id ? "text-white" : "text-roast hover:text-brassantique"
                    }`}
                  >
                    {tab === t.id && (
                      <motion.span
                        layoutId="story-tab-pill"
                        className="absolute inset-0 rounded-full bg-brassantique shadow-sm"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-6 min-h-[96px] overflow-hidden rounded-2xl border border-brassantique/20 bg-paper p-5 shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                    className="font-serif2 text-lg italic leading-relaxed text-roast sm:text-xl"
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
