import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  textAlign?: "left" | "center" | "right";
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
}

export default function SplitText({
  text,
  className = "",
  delay = 25,
  duration = 0.5,
  splitType = "words",
  textAlign = "left",
  tag: Tag = "p",
}: SplitTextProps) {
  if (splitType === "words") {
    const words = text.split(" ");
    return (
      <Tag
        className={className}
        style={{ textAlign, display: "inline-flex", flexWrap: "wrap", gap: "0.25em" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration,
              delay: Math.min((i * delay) / 1000, 0.4),
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  // Character split
  const letters = Array.from(text);
  return (
    <Tag
      className={className}
      style={{ textAlign, display: "inline-block" }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration,
            delay: Math.min((i * delay) / 1000, 0.5),
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            willChange: "transform, opacity",
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}
