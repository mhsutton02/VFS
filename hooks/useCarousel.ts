// hooks/useCarousel.ts
"use client";

import { useCallback, useEffect, useState } from "react";

export function useCarousel<T>(items: T[], intervalMs = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const visibleCount = 2;

  const triggerTransition = useCallback((updateFn: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      updateFn();
      setTransitioning(false);
    }, 200);
  }, []);

  const len = items.length;

  const next = useCallback(() => {
    triggerTransition(() => {
      setIndex((prev) => (prev + 1) % len);
    });
  }, [len, triggerTransition]);

  const prev = useCallback(() => {
    triggerTransition(() => {
      setIndex((prev) =>
        (prev - 1 + len) % len
      );
    });
  }, [len, triggerTransition]);

  useEffect(() => {
    if (paused || len <= visibleCount) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [paused, len, intervalMs, next]);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  const getVisibleItems = () => {
    const result: T[] = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(items[(index + i) % items.length]);
    }
    return result;
  };

  return {
    index,
    transitioning,
    next,
    prev,
    onMouseEnter,
    onMouseLeave,
    getVisibleItems
  };
}