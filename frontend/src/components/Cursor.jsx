import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
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
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[96] hidden -translate-x-1/2 -translate-y-1/2 lg:block mix-blend-difference"
    >
      <div className="h-3 w-3 rounded-full bg-brass" />
    </motion.div>
  );
}
