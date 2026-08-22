import React, { useEffect, useRef } from 'react';

export const MagneticCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable if pointer is fine and not a touch device
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;
    let isHovered = false;
    let isClicking = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${isClicking ? 0.7 : 1})`;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(0.7)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(0.85)`;
    };

    const onMouseUp = () => {
      isClicking = false;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
    };

    const render = () => {
      // Smooth lerp for ring and trail
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${isHovered ? 1.6 : 1})`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    const attachHoverListeners = () => {
      const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .glass-card, .tech-item');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          isHovered = true;
          if (ringRef.current) {
            ringRef.current.classList.add('border-accent-primary', 'bg-accent-primary/10');
          }
        });
        el.addEventListener('mouseleave', () => {
          isHovered = false;
          if (ringRef.current) {
            ringRef.current.classList.remove('border-accent-primary', 'bg-accent-primary/10');
          }
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    attachHoverListeners();
    const rafId = requestAnimationFrame(render);

    // Reattach listeners after DOM updates
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Heart Icon Center */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-2 -mt-2 w-4 h-4 text-accent-primary flex items-center justify-center transition-transform duration-75 will-change-transform drop-shadow-[0_0_8px_rgba(255,45,85,0.8)]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Magnetic Smooth Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border border-accent-primary/40 transition-colors duration-200 will-change-transform"
      />

      {/* Trailing Dot */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent-primary/30 will-change-transform"
      />
    </div>
  );
};
