"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element when it scrolls into view. Returns a ref to attach and a
 * boolean that flips to true once (and stays true). Used with the
 * `.reveal` / `.reveal-in` CSS classes in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown, options]);

  return { ref, shown };
}
