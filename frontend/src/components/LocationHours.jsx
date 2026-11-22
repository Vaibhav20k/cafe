import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";
import { HOURS, AMENITIES, IMAGES, CAFE } from "../data/cafe";
import { useRef } from "react";

function istOpenNow() {
  const now = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
  const h = now.getHours() + now.getMinutes() / 60;
  const day = now.getDay();
  const open = day === 0 || day === 6 ? 8 : 7.5;
  const close = day === 0 || day === 6 ? 23.5 : 23;
  return h >= open && h < close;
}

export default function LocationHours() {
  const [openNow, setOpenNow] = useState(true);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2" });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    setOpenNow(istOpenNow());
    const t = setInterval(() => setOpenNow(istOpenNow()), 60000);
    return () => clearInterval(t);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date) {
      toast.error("A name, a phone number and a date — that's all we need.");
      return;
    }
    toast.success(`Table for ${form.guests} held for ${form.name}. See you at the sarai.`, {
      description: `${form.date} — we'll confirm on ${form.phone}. (Demo reservation.)`,
    });
    setBooking(false);
    setForm({ name: "", phone: "", date: "", guests: "2" });
  };

  const field =
    "w-full rounded-lg border border-brass/25 bg-obsidian px-4 py-3 font-mono text-xs text-cream placeholder:text-faint focus:border-brass/60 focus:outline-none transition-colors duration-300";

  return (
    <section id="visit" className="relative overflow-hidden py-28 lg:py-40">
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
              The Sanctuary — <span className="font-dev tracking-normal text-sm">पता</span>
            </p>
          </div>
          <h2 className="mt-8 font-display text-4xl leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-[3.4rem]">
            Find the <span className="italic text-brass font-serif2 font-light">sarai.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.div
              ref={imgRef}
              className="relative overflow-hidden rounded-t-[999px] rounded-b-2xl border border-brass/15"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src={IMAGES.interior}
                alt="Moody interior of the SARAI coffee house"
                style={{ y, scale: 1.16 }}
                className="h-[420px] w-full object-cover"
              />
            </motion.div>
            <p className="mt-6 max-w-md font-serif2 text-lg italic leading-relaxed text-cream/85 sm:text-xl">
              "{CAFE.address}"
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-faint">{CAFE.coords} — HAL 2ND STAGE</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {AMENITIES.map((a) => (
                <span key={a} className="rounded-full border border-brass/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-stoneish">
                  {a}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                data-testid="visit-reserve-open-button"
                onClick={() => setBooking(!booking)}
                className="rounded-full bg-cream px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian transition-colors duration-300 hover:bg-brass cursor-pointer"
              >
                {booking ? "Close booking" : "Book a Table"}
              </button>
              <a
                href={CAFE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brass/35 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-brass transition-colors duration-300 hover:bg-brass/10 cursor-pointer"
              >
                Get Directions
              </a>
            </div>

            <motion.div
              initial={false}
              animate={{ height: booking ? "auto" : 0, opacity: booking ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <form onSubmit={submit} className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-brass/15 bg-coal p-6">
                <input data-testid="reservation-form-name" className={field} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input data-testid="reservation-form-phone" className={field} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input data-testid="reservation-form-date" type="date" className={field} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <select data-testid="reservation-form-guests" className={`${field} appearance-none`} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}>
                  {["2", "3", "4", "6", "8+"].map((g) => (
                    <option key={g} value={g} className="bg-obsidian">Guests: {g}</option>
                  ))}
                </select>
                <button
                  data-testid="reservation-form-submit"
                  type="submit"
                  className="col-span-2 rounded-full bg-brass py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-obsidian transition-colors duration-300 hover:bg-cream cursor-pointer"
                >
                  Hold the Table
                </button>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-brass/15">
              <div className="flex items-center justify-between border-b border-brass/10 bg-coal px-6 py-5 sm:px-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-stoneish">Hours — हर दिन</span>
                <span
                  data-testid="visit-open-status"
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] ${
                    openNow ? "border-emerald-400/40 text-emerald-300" : "border-terra/40 text-terra"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${openNow ? "bg-emerald-400 animate-pulse-dot" : "bg-terra"}`} />
                  {openNow ? "Open now" : "Closed — back at 07:30"}
                </span>
              </div>
              {HOURS.map((h, i) => (
                <motion.div
                  key={h.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-center justify-between border-b border-brass/10 px-6 py-4 transition-colors duration-300 last:border-b-0 hover:bg-ember/40 sm:px-8"
                >
                  <span className="font-display text-lg text-cream/90">{h.day}</span>
                  <span className="font-mono text-xs tracking-[0.15em] text-brass">{h.time}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-brass/15 bg-coal p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass/80">House note</p>
              <p className="mt-4 font-serif2 text-xl italic leading-relaxed text-cream/90">
                Cupping tables run every Sunday at 10am — six seats, one hour,
                the whole story of an estate in six slurps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
