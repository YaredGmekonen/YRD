import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="initial-loader-curtain"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          <div className="loader-content">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
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
              transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            />

            <motion.span
              className="loader-meta-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              YRD. DIGITAL PRODUCT STUDIO · ADDIS ABABA
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
