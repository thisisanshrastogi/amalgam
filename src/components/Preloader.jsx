import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Logo from './Logo';

export default function Preloader({ images = [], children }) {
  const DEBUG_MODE = false; // Set to true to freeze the loading screen
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [renderChildren, setRenderChildren] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    if (!images || images.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const total = images.length;

    const handleLoad = () => {
      loadedCount++;
      if (isMounted) setProgress(Math.round((loadedCount / total) * 100));
      if (loadedCount === total && isMounted && !DEBUG_MODE) {
        setLoaded(true);
      }
    };

    // Timeout fallback (max 4 seconds) to ensure the site loads even if an image fails or hangs
    const fallbackTimeout = setTimeout(() => {
      if (isMounted && !DEBUG_MODE) setLoaded(true);
    }, 4000);

    images.forEach(src => {
      const img = new Image();
      img.onload = handleLoad;
      img.onerror = handleLoad; // Proceed even if one image fails
      img.src = src;
    });

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimeout);
    };
  }, [images]);

  useEffect(() => {
    if (loaded && overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInOutSine',
        complete: () => {
          setRenderChildren(true);
        }
      });
    }
  }, [loaded]);

  return (
    <>
      {!renderChildren && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper text-ink"
        >
          <div className="opacity-90 mb-8">
            <div className="w-12 h-12 bg-ink rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-paper rounded-[3px]"></div>
            </div>
          </div>

          <div className="w-48 h-[2px] bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="mt-4 text-[9px] font-bold uppercase tracking-widest text-muted">
            {progress}% — Optimizing Assets
          </div>
        </div>
      )}

      {/* We wait for the fade out to finish before mounting the app so animations start perfectly */}
      {renderChildren && children}
    </>
  );
}
