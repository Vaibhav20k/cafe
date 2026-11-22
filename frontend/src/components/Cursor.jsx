import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 160, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 160, damping: 24, mass: 0.6 });
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (ref.current) ref.current.style.opacity = "1";
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <div ref={ref} style={{ opacity: 0 }} className="pointer-events-none fixed left-0 top-0 z-[96] hidden lg:block">
      <motion.div
        style={{ x: sx, y: sy }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-brassantique" />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-7 w-7 rounded-full border border-brassantique/40" />
      </motion.div>
    </div>
  );
}
