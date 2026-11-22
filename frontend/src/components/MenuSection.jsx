import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { API, CATEGORIES, MENU_FALLBACK, CATEGORY_IMAGES } from "../data/cafe";

export default function MenuSection() {
  const [items, setItems] = useState(MENU_FALLBACK);
  const [cat, setCat] = useState("signature");
  const [query, setQuery] = useState("");
  const [hoverImg, setHoverImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const mx = useRef(0);
  const my = useRef(0);
  const ghost = useRef(null);

  useEffect(() => {
    let alive = true;
    fetch(`${API}/menu`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (alive && d.items?.length) setItems(d.items);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      items
        .filter((i) => i.category === cat)
        .filter((i) =>
          !query ||
          `${i.name} ${i.notes} ${i.estate}`.toLowerCase().includes(query.toLowerCase())
        ),
    [items, cat, query]
  );

  const onMove = (e) => {
    mx.current = e.clientX;
    my.current = e.clientY;
    if (ghost.current) {
      ghost.current.style.transform = `translate(${mx.current + 24}px, ${my.current - 140}px)`;
    }
  };

  return (
    <section id="menu" className="relative py-28 lg:py-40" onMouseMove={onMove}>
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
              The Menu — <span className="font-dev tracking-normal text-sm">मेन्यू</span>
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="max-w-xl font-display text-4xl leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]">
              Brewed slow, poured <span className="italic text-brass font-serif2 font-light">tall.</span>
            </h2>
            <input
              data-testid="menu-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes, estates, cravings…"
              className="w-full max-w-xs rounded-full border border-brass/25 bg-coal px-5 py-3 font-mono text-xs text-cream placeholder:text-faint focus:border-brass/60 focus:outline-none transition-colors duration-300"
            />
          </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              data-testid={`menu-category-tab-${c.id}`}
              onClick={() => setCat(c.id)}
              className={`relative rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${
                cat === c.id ? "text-obsidian" : "text-stoneish hover:text-cream border border-brass/20"
              }`}
            >
              {cat === c.id && (
                <motion.span
                  layoutId="menu-tab-pill"
                  className="absolute inset-0 rounded-full bg-brass"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 border-t border-brass/10">
          {loading && (
            <p className="py-16 text-center font-mono text-xs uppercase tracking-[0.3em] text-faint">
              Grinding the menu…
            </p>
          )}
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                data-testid="menu-item-card"
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                onMouseEnter={() => setHoverImg(CATEGORY_IMAGES[item.category])}
                onMouseLeave={() => setHoverImg(null)}
                className="group border-b border-brass/10 py-7 transition-colors duration-300 hover:bg-ember/40 sm:px-4"
              >
                <div className="flex items-start justify-between gap-4 sm:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-display text-xl text-cream transition-colors duration-300 group-hover:text-brass sm:text-2xl">
                        {item.name}
                      </h3>
                      {item.dev && <span className="font-dev text-sm text-brass/60">{item.dev}</span>}
                    </div>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {item.estate}{item.roast ? ` • ${item.roast} roast` : ""}
                    </p>
                    <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-stoneish">{item.desc}</p>
                    <p className="mt-2 font-mono text-[11px] tracking-wide text-brass/70">{item.notes}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags?.map((t) => (
                        <span key={t} className="rounded-full border border-brass/25 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-brass/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className="font-mono text-lg font-medium text-brass sm:text-xl">₹{item.price}</span>
                    <button
                      data-testid="menu-item-order-button"
                      onClick={() =>
                        toast(`Noted — ${item.name} coming right up.`, {
                          description: "The demo kitchen hears you. Add your OpenRouter key and the sommelier never sleeps.",
                        })
                      }
                      className="rounded-full border border-brass/35 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brass transition-colors duration-300 hover:bg-brass hover:text-obsidian cursor-pointer"
                    >
                      Order Note
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!loading && filtered.length === 0 && (
            <p className="py-16 text-center font-serif2 text-xl italic text-stoneish">
              Nothing on the shelf matches that — ask the sommelier instead.
            </p>
          )}
        </div>
      </div>

      <div ref={ghost} className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block">
        <AnimatePresence>
          {hoverImg && (
            <motion.img
              key={hoverImg}
              src={hoverImg}
              alt=""
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-52 w-44 rounded-xl border border-brass/30 object-cover shadow-2xl shadow-obsidian"
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
