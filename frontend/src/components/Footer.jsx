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
    <footer className="relative overflow-hidden border-t border-brassantique/25 bg-espresso pt-24 text-linen lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {["Come as wanderers,", "leave as roasters."].map((line, i) => (
              <div key={line} className="mask-line">
                <motion.p
                  className={`font-display leading-[1.05] tracking-tight text-linen text-[clamp(2.2rem,4.6vw,3.9rem)] ${
                    i === 1 ? "italic text-brassbright font-serif2 font-light" : ""
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
                className="w-full rounded-full border border-brassantique/30 bg-espressocard px-5 py-3.5 font-mono text-xs text-linen placeholder:text-[#8E847C] focus:border-brassantique focus:outline-none transition-colors duration-300"
              />
              <button
                data-testid="footer-newsletter-submit"
                type="submit"
                className="shrink-0 rounded-full bg-brassantique px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-espresso transition-colors duration-300 hover:bg-linen cursor-pointer"
              >
                Microlot Drops
              </button>
            </form>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E847C]">
              Limited-batch release notes, once a fortnight
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brassbright">Now playing</p>
            <p className="mt-4 font-serif2 text-xl italic text-[#D8CFBE]">
              Sarai Night Sessions — lo-fi sitar & dusty beats, curated on vinyl every evening.
            </p>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full border border-brassantique/50 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-brassbright transition-colors duration-300 hover:bg-brassantique hover:text-espresso cursor-pointer"
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
                  className="group flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#D8CFBE] transition-colors duration-300 hover:text-linen cursor-pointer"
                >
                  <span className="h-px w-6 bg-brassantique/50 transition-all duration-300 group-hover:w-10 group-hover:bg-brassbright" />
                  {s.l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-brassantique/20 bg-espressocard/70 px-5 py-4">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#B0A79C]">
            Demo notice — all addresses, phone numbers, hours, reservations and coordinates on this site are fictional sample data
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-brassantique/15 py-8 sm:flex-row">
          <button
            onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo(0, 0))}
            className="flex items-center gap-3 text-brassbright cursor-pointer"
          >
            <LogoMark size={22} />
            <span className="font-display text-sm font-semibold tracking-[0.25em] text-linen">SARAI</span>
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8E847C]">
            © {new Date().getFullYear()} Sarai Coffee House — Crafted slow, demoed proud
          </p>
          <button
            onClick={() => scrollToId("visit")}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D8CFBE] transition-colors duration-300 hover:text-brassbright cursor-pointer"
          >
            404 Fictional Spice Lane ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
