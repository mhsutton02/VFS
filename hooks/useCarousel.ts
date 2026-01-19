"use client";

import { useEffect, useRef, useState } from "react";

export function useCarousel<T>(items: T[], intervalMs = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = isMobile ? 1 : 2;

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
  }, [paused, items.length, intervalMs, visibleCount]);

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
    next,
    prev,
    onMouseEnter,
    onMouseLeave,
    getVisibleItems
  };
}