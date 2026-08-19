import React from "react";
import { motion } from "framer-motion";

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
  baseOpacity = 0.3,
  blurStrength = 6,
  containerClassName = "",
  textClassName = "",
}: ScrollRevealProps) {
  // If children is plain text, split into words and animate progressively
  if (typeof children === "string") {
    const words = children.split(/\s+/).filter(Boolean);
    return (
      <div className={`scroll-reveal ${containerClassName}`}>
        <p className={`scroll-reveal-text ${textClassName}`} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.28em" }}>
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: baseOpacity,
                filter: enableBlur ? `blur(${blurStrength}px)` : "none",
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.02, 0.4),
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    );
  }

  // If children is JSX components / sections, animate the container smoothly
  return (
    <motion.div
      className={`scroll-reveal-container ${containerClassName}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
