// YRD. Technical Gallery: Zero-dependency smooth inertial scroll physics engine.
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isScrolling = false;
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    const ease = 0.09;

    const onWheel = (e: WheelEvent) => {
      // Don't intercept if modifier keys are pressed or inside horizontal scroll areas
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "TEXTAREA" || target.tagName === "SELECT")) return;

      e.preventDefault();

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY += e.deltaY * 1.05;
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      currentY += (targetY - currentY) * ease;
      window.scrollTo(0, Math.round(currentY));

      if (Math.abs(targetY - currentY) > 0.5) {
        requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
      }
    };

    const onScroll = () => {
      if (!isScrolling) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <>{children}</>;
}
