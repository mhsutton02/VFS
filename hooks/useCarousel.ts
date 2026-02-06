// hooks/useCarousel.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCarousel<T>(items: T[], intervalMs = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visibleCount = 2;

  const triggerTransition = useCallback((updateFn: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      updateFn();
      setTransitioning(false);
    }, 200);
  }, []);

  const next = useCallback(() => {
    triggerTransition(() => {
      setIndex((prev) => (prev + 1) % items.length);
    });
  }, [items.length, triggerTransition]);

  const prev = useCallback(() => {
    triggerTransition(() => {
      setIndex((prev) =>
        (prev - 1 + items.length) % items.length
      );
    });
  }, [items.length, triggerTransition]);

  useEffect(() => {
    if (paused || items.length <= visibleCount) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(next, intervalMs);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [paused, items.length, intervalMs, next]);

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