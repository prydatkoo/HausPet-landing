import React, { Suspense, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const LazyLoad = ({ children, fallback = <div className="animate-pulse h-64 bg-gray-100 rounded-lg flex items-center justify-center"><span className="text-gray-500">Loading...</span></div> }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin: '300px', // Increased for earlier loading
    threshold: 0,
  });
  
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isIntersecting, hasLoaded]);

  return (
    <div ref={ref}>
      {hasLoaded ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyLoad;
