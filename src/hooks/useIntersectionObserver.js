import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options) => {
  const [entry, setEntry] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    const node = observer.current;
    if (node) {
      const observerInstance = new IntersectionObserver(([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
      }, options);

      observerInstance.observe(node);

      return () => {
        observerInstance.disconnect();
      };
    }
  }, [options]);

  return [observer, isIntersecting, entry];
};
