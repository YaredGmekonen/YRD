import React, { useEffect, useRef, useState, useMemo } from "react";
import "./ScrollReveal.css";

interface ScrollRevealProps {
  children: React.ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.35,
  baseRotation = 0,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isInView, setIsInView] = useState(false);

  const text = typeof children === "string" ? children : "";
  const words = useMemo(() => {
    return text.split(/\s+/).filter(Boolean);
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`}
      style={{
        transform: isInView ? "none" : `rotate(${baseRotation}deg)`,
        transition: "transform 400ms cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div className={`scroll-reveal-text ${textClassName}`}>
        {words.map((word, index) => {
          return (
            <span
              key={index}
              className="scroll-reveal-word"
              style={{
                opacity: isInView ? 1 : baseOpacity,
                filter: isInView ? "blur(0px)" : enableBlur ? `blur(${blurStrength}px)` : "none",
                transform: isInView ? "translateY(0)" : "translateY(6px)",
                transitionDelay: `${Math.min(index * 25, 600)}ms`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}
