import React, { useEffect, useRef, useState, useMemo } from "react";
import "./ScrollReveal.css";

interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  const text = typeof children === "string" ? children : "";
  const words = useMemo(() => {
    return text.split(/\s+/).filter(Boolean);
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on position in viewport
      const start = windowHeight * 0.9;
      const end = windowHeight * 0.3;
      
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerRotate = baseRotation * (1 - progress);

  return (
    <h2
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`}
      style={{
        transform: `rotate(${containerRotate}deg)`,
        transformOrigin: "0% 50%",
        transition: "transform 200ms ease-out",
      }}
    >
      <div className={`scroll-reveal-text ${textClassName}`}>
        {words.map((word, index) => {
          const wordThreshold = index / words.length;
          const isRevealed = progress >= wordThreshold;

          const opacity = isRevealed ? 1 : baseOpacity;
          const blur = isRevealed ? 0 : enableBlur ? blurStrength : 0;

          return (
            <span
              key={index}
              className="scroll-reveal-word"
              style={{
                opacity,
                filter: `blur(${blur}px)`,
                transform: isRevealed ? "translateY(0)" : "translateY(4px)",
                transitionDelay: `${(index % 6) * 20}ms`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </h2>
  );
}
