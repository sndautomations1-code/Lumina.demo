import { useState, useEffect } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PromoPopup() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay */}
      <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={close} />

      {/* Popup */}
      <div className="relative bg-white border border-gold-300/40 rounded-sm p-8 sm:p-10 max-w-md w-full luxury-shadow animate-scale-in">
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-600 transition-colors"
          aria-label={t('promo.close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 gold-gradient rounded-t-sm" />

        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-beige-100 border border-gold-300/30 flex items-center justify-center mx-auto mb-5">
            <Gift className="w-7 h-7 text-gold-500" />
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <h3 className="font-serif text-2xl font-medium text-stone-800">{t('promo.title')}</h3>
            <Sparkles className="w-4 h-4 text-gold-400" />
          </div>

          {/* Offer text */}
          <p className="font-sans text-base text-stone-600 mb-5">{t('promo.text')}</p>

          {/* Promo code */}
          <div className="inline-block px-6 py-2.5 bg-beige-50 border-2 border-dashed border-gold-300/50 rounded-sm">
            <span className="font-sans text-sm font-semibold tracking-[0.25em] uppercase gold-text">
              {t('promo.code')}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              close();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full mt-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-sans text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg"
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </div>
  );
}
