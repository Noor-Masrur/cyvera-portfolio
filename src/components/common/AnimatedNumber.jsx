import { useEffect, useState } from "react";
import { useInView } from "./useInView";

export default function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);

  useEffect(() => {
    if (!inView) return;

    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const duration = 1800;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  const prefix = target.match(/^[^0-9]*/)[0];
  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
