import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LogoMark } from "./Logo";
import { scrollToId } from "../context";

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("That email looks under-extracted. Try again?");
      return;
    }
    toast.success("You're on the microlot list.", {
      description: "First word on limited-batch drops, before the drum even cools. (Demo signup.)",
    });
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-brass/10 pt-24 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {[ "Come as wanderers,", "leave as roasters." ].map((line, i) => (
              <div key={line} className="mask-line">
                <motion.p
                  className={`font-display leading-[1.05] tracking-tight text-cream text-[clamp(2.2rem,4.6vw,3.9rem)] ${
                    i === 1 ? "italic text-brass font-serif2 font-light" : ""
                  }`}
                  initial={{ y: "115%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.p>
              </div>
            ))}

            <form onSubmit={subscribe} className="mt-12 flex max-w-md items-center gap-3">
              <input
                data-testid="footer-newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@wanderer.in"
                className="w-full rounded-full border border-brass/25 bg-coal px-5 py-3.5 font-mono text-xs text-cream placeholder:text-faint focus:border-brass/60 focus:outline-none transition-colors duration-300"
              />
              <button
                data-testid="footer-newsletter-submit"
                type="submit"
                className="shrink-0 rounded-full bg-brass px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian transition-colors duration-300 hover:bg-cream cursor-pointer"
              >
                Microlot Drops
              </button>
            </form>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              Limited-batch release notes, once a fortnight
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass/80">Now playing</p>
            <p className="mt-4 font-serif2 text-xl italic text-cream/90">
              Sarai Night Sessions — lo-fi sitar & dusty beats, curated on vinyl every evening.
            </p>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full border border-brass/35 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-brass transition-colors duration-300 hover:bg-brass hover:text-obsidian cursor-pointer"
            >
              Open the Playlist
            </a>

            <div className="mt-12 flex flex-col gap-3">
              {[
                { l: "Instagram — @sarai.coffee", h: "https://instagram.com" },
                { l: "Substack — The Sarai Letters", h: "https://substack.com" },
                { l: "Roaster Guild — Member #019", h: "https://sca.coffee" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-stoneish transition-colors duration-300 hover:text-cream cursor-pointer"
                >
                  <span className="h-px w-6 bg-brass/40 transition-all duration-300 group-hover:w-10 group-hover:bg-brass" />
                  {s.l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-brass/10 py-8 sm:flex-row">
          <button
            onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo(0, 0))}
            className="flex items-center gap-3 text-brass cursor-pointer"
          >
            <LogoMark size={22} />
            <span className="font-display text-sm font-semibold tracking-[0.25em] text-cream">SARAI</span>
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
            © {new Date().getFullYear()} Sarai Coffee House — Crafted slow in Bengaluru
          </p>
          <button
            onClick={() => scrollToId("visit")}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-stoneish transition-colors duration-300 hover:text-brass cursor-pointer"
          >
            100 Feet Road, Indiranagar ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
