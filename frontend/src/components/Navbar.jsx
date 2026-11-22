import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "./Logo";
import { scrollToId } from "../context";

const LINKS = [
  { id: "story", label: "The Story" },
  { id: "ritual", label: "Ritual" },
  { id: "menu", label: "Menu" },
  { id: "visit", label: "Visit" },
];

export default function Navbar({ onAsk }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-obsidian/80 backdrop-blur-xl border-b border-brass/15"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-10 py-4">
          <button
            data-testid="nav-brand-logo"
            onClick={() => window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo(0, 0)}
            className="flex items-center gap-3 text-brass cursor-pointer"
          >
            <LogoMark size={26} />
            <span className="font-display text-lg font-semibold tracking-[0.25em] text-cream">SARAI</span>
            <span className="hidden sm:block font-dev text-xs text-brass/70 mt-0.5">सराय</span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-${l.id}-link`}
                onClick={() => go(l.id)}
                className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-stoneish hover:text-cream transition-colors duration-300 cursor-pointer"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-brass/20 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="font-mono text-[10px] tracking-[0.15em] text-stoneish">OPEN • 07:30 — 23:00</span>
            </span>
            <button
              data-testid="nav-ai-chat-button"
              onClick={onAsk}
              className="rounded-full border border-brass/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-brass hover:bg-brass hover:text-obsidian transition-colors duration-300 cursor-pointer"
            >
              Ask Sarai
            </button>
            <button
              data-testid="nav-reserve-button"
              onClick={() => go("visit")}
              className="rounded-full bg-cream px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian hover:bg-brass transition-colors duration-300 cursor-pointer"
            >
              Reserve
            </button>
          </div>

          <button
            data-testid="nav-mobile-toggle"
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`h-px w-7 bg-cream transition-transform duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`h-px w-7 bg-cream transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-obsidian/97 backdrop-blur-xl flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...LINKS, { id: "chat", label: "Ask Sarai AI" }].map((l, i) => (
              <div key={l.id} className="overflow-hidden">
                <motion.button
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%" }}
                  transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => (l.id === "chat" ? (setOpen(false), onAsk()) : go(l.id))}
                  className="text-left font-display text-4xl text-cream py-3 cursor-pointer hover:text-brass transition-colors duration-300"
                >
                  {l.label}
                </motion.button>
              </div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-faint"
            >
              100 Feet Road, Indiranagar, Bengaluru
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
