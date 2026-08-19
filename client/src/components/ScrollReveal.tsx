import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

export default function ScrollReveal({
  children,
  containerClassName = "",
  textClassName = "",
}: ScrollRevealProps) {
  // If string, animate words progressively while ensuring base text is always visible
  if (typeof children === "string") {
    const words = children.split(/\s+/).filter(Boolean);
    return (
      <div className={`scroll-reveal-block ${containerClassName}`}>
        <p className={`scroll-reveal-text ${textClassName}`} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.28em" }}>
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.35, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.35,
                delay: Math.min(index * 0.015, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: "inline-block", willChange: "transform, opacity" }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    );
  }

  // If JSX children, smoothly lift container into place without hiding
  return (
    <motion.div
      className={containerClassName}
      initial={{ opacity: 0.7, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
