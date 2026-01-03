import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Adds scroll-triggered reveal animations to common content elements.
 * - Auto-tags typical elements inside <main> with `reveal-on-scroll` unless opted-out.
 * - Supports variants via `data-reveal="up|down|left|right"` and delay via `data-delay`.
 * - Stagger groups by adding `data-reveal-group` to a parent container.
 */
const ScrollRevealManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const root: HTMLElement | null = document.querySelector("main");
    if (!root) return;

    const candidates = root.querySelectorAll<HTMLElement>(
      [
        "[data-reveal]",
        "[data-reveal-group] > *",
        // Common content elements
        "h1, h2, h3, h4, p, li, img, section, article, .card, .button, button, .stagger-item",
      ].join(",")
    );

    // Add base class if not opted-out
    const toObserve: HTMLElement[] = [];
    candidates.forEach((el) => {
      if (el.closest("[data-reveal=off], .no-reveal")) return;
      if (!el.classList.contains("reveal-on-scroll")) {
        el.classList.add("reveal-on-scroll");
      }
      toObserve.push(el);
    });

    // Handle group staggering
    root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      const children = Array.from(group.children) as HTMLElement[];
      children.forEach((child, idx) => {
        if (!child.classList.contains("reveal-on-scroll")) child.classList.add("reveal-on-scroll");
        const baseDelay = Number(child.getAttribute("data-delay") || 0);
        child.style.transitionDelay = `${baseDelay + idx * 80}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("in-view");
          } else {
            // Remove to allow re-animating when scrolling back
            el.classList.remove("in-view");
          }
        });
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    toObserve.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
};

export default ScrollRevealManager;
