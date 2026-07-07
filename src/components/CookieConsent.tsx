import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lumina-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  // Offset above the demo bar; measured so wrapping text never causes overlap
  const [barHeight, setBarHeight] = useState(40);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // localStorage unavailable — show the banner without persistence
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const bar = document.querySelector('[aria-label="Demo disclosure"]');
    if (!(bar instanceof HTMLElement)) return;
    const update = () => setBarHeight(bar.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => observer.disconnect();
  }, [visible]);

  const choose = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore — banner still dismisses for this visit
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{ bottom: barHeight, animationDelay: '1000ms' }}
      className="fixed left-0 right-0 z-40 bg-stone-900/80 backdrop-blur-md border-t border-gold-300/20 shadow-[0_-4px_20px_rgba(0,0,0,0.18)] opacity-0 animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <p className="font-sans text-sm font-light tracking-wide text-cream/90 text-center sm:text-left">
          We use cookies to enhance your experience
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => choose('accepted')}
            className="px-6 py-2.5 bg-gold-400 hover:bg-gold-500 text-stone-900 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold-300/20"
          >
            Accept
          </button>
          <button
            onClick={() => choose('declined')}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-gold-300/40 hover:border-gold-300/70 text-white font-sans text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
