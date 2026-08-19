import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | number[];
  splitType?: "chars" | "words";
  textAlign?: "left" | "center" | "right";
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
}

export default function SplitText({
  text,
  className = "",
  delay = 30,
  duration = 0.6,
  splitType = "chars",
  textAlign = "left",
  tag: Tag = "p",
}: SplitTextProps) {
  if (splitType === "words") {
    const words = text.split(" ");
    return (
      <Tag
        className={className}
        style={{ textAlign, display: "inline-flex", flexWrap: "wrap", gap: "0.28em" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration,
              delay: (i * delay) / 1000,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
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
      style={{ textAlign, display: "inline-block", overflow: "hidden" }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration,
            delay: (i * delay) / 1000,
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
