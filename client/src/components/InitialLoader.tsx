// YRD. Technical Gallery: Sleek first-load studio monogram reveal with automatic dismiss.
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("yrd_intro_seen");
  });

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem("yrd_intro_seen", "true");
      } catch (_) {}
    }, 900);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="initial-loader-curtain"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
          }}
          style={{ pointerEvents: "none" }}
        >
          <div className="loader-content">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="loader-symbol-wrapper"
            >
              <img
                src="/manus-storage/03_symbol_mark.png"
                alt="YRD. Monogram"
                className="loader-symbol-img"
              />
            </motion.div>

            <motion.div
              className="loader-progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.span
              className="loader-meta-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              YRD. DIGITAL PRODUCT STUDIO · ADDIS ABABA
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
