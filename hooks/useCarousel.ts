// hooks/useCarousel.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useCarousel<T>(
  items: T[],
  intervalMs = 5000,
  direction: "left" | "right" = "right"
) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visibleCount = 1;

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setIndex((prev) =>
      (prev - 1 + items.length) % items.length
    );
  };

  useEffect(() => {
    if (paused || items.length <= visibleCount) return;
    timerRef.current && clearInterval(timerRef.current);
    const tick = () => {
      if (direction === "right") next();
      else prev();
    };
    timerRef.current = setInterval(tick, intervalMs);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [paused, items.length, intervalMs, direction]);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  // Compute a slice of items (2 visible + 1 extra for seamless feel if needed)
  const getVisibleItems = () => {
    return [items[index % items.length]];
  };

  return {
    index,
    next,
    prev,
    onMouseEnter,
    onMouseLeave,
    getVisibleItems
  };
}