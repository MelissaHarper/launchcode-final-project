import { useEffect, useRef } from "react";

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export function useFitText(maxFontSize = 80) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const parent = element.parentElement;

    const fitText = () => {
      if (!element || !parent) return;

      const parentWidth = parent.offsetWidth;
      element.style.fontSize = `${maxFontSize}px`; // reset to max
      let fontSize = maxFontSize;

      // Shrink text until it fits
      while (element.scrollWidth > parentWidth - 25 && fontSize > 0) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
      }
    };

    // Observe both parent and text
    const observer = new ResizeObserver(fitText);
    observer.observe(parent);
    observer.observe(element);

    // Run immediately on mount
    fitText();

    return () => {
      observer.disconnect();
    };
  }, [maxFontSize]);

  return ref;
}

export function getRandomMovies(list, count) {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function sortByRank(watchProviderArr) {
  const sorted = [...watchProviderArr].sort((a, b) => {
    const priorityA = a.display_priorities.US || 0; // default to 0 if not present
    const priorityB = b.display_priorities.US || 0; // default to 0 if not present

    if (priorityA === 0 && priorityB !== 0) {
      return -1;
    } else if (priorityA !== 0 && priorityB === 0) {
      return 1;
    } else {
      return priorityA - priorityB;
    }
  });
  return sorted;
}

export function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 80000);
  return randomNumber;
}

export function getRandomNumberBelow10() {
  let randomNumber = Math.floor(Math.random() * 10) + 1;
  return randomNumber;
}

export function getRandomElement(arr) {
  let randomIndex = Math.floor(Math.random() * 20) + 1;
  return arr[randomIndex];
}
