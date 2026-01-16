// hooks/useCarousel.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useCarousel<T>(items: T[], intervalMs = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visibleCount = 2;

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
    timerRef.current = setInterval(next, intervalMs);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [paused, items.length, intervalMs]);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  // Compute a slice of items (2 visible + 1 extra for seamless feel if needed)
  const getVisibleItems = () => {
    const result: T[] = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(items[(index + i) % items.length]);
    }
    return result;
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