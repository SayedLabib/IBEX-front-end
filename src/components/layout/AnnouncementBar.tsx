"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";

const messages = [
  "Free Shipping On Orders Over TK 1000  |  Up To 50% Off On Selected Items",
  "New Arrivals Every Week — Shop The Latest Drops",
  "Your IBEX, Our Promise.",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % messages.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + messages.length) % messages.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="bg-cream text-ink text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center gap-4">
        <button onClick={prev} aria-label="Previous announcement" className="text-ink/60 hover:text-ink transition-colors shrink-0">
          <Icon name="chevron-left" size={12} color="0a0a0a" />
        </button>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-center font-semibold uppercase tracking-wide"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
        <button onClick={next} aria-label="Next announcement" className="text-ink/60 hover:text-ink transition-colors shrink-0">
          <Icon name="chevron-right" size={12} color="0a0a0a" />
        </button>
      </div>
    </div>
  );
}
