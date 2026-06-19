import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

const testimonialKeys = ['1', '2', '3', '4'] as const;

export default function Testimonials() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInView(0.1);
  const [active, setActive] = useState(0);
  const count = testimonialKeys.length;

  const next = useCallback(() => setActive((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setActive((p) => (p - 1 + count) % count), [count]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-beige-100/50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-beige-100/40 translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-300" />
            <Sparkles className="w-4 h-4 text-gold-400" />
            <div className="w-8 h-px bg-gold-300" />
          </div>
          <h2 className="heading-md text-stone-800 mb-4">{t('testimonials.title')}</h2>
          <p className="body-text max-w-xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        {/* Carousel */}
        <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Cards */}
          <div className="relative min-h-[280px] sm:min-h-[240px]">
            {testimonialKeys.map((key, i) => (
              <div
                key={key}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === active ? 'opacity-100 translate-x-0' : i < active ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="bg-ivory border border-beige-200 rounded-sm p-8 sm:p-10 luxury-shadow max-w-2xl mx-auto text-center">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-lg sm:text-xl font-light italic text-stone-700 leading-relaxed mb-6 max-w-xl mx-auto">
                    &ldquo;{t(`testimonials.${key}.text`)}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="font-serif text-lg font-medium text-stone-800">{t(`testimonials.${key}.name`)}</p>
                    <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-gold-600 mt-1">
                      {t(`testimonials.${key}.detail`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-beige-300 hover:border-gold-400 text-stone-400 hover:text-gold-600 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-gold-400 w-6' : 'bg-beige-300 hover:bg-beige-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-beige-300 hover:border-gold-400 text-stone-400 hover:text-gold-600 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
