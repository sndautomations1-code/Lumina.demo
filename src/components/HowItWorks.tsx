import { CalendarDays, ClipboardList, HandHeart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

const steps = [
  { key: 'step1', num: '01', Icon: CalendarDays },
  { key: 'step2', num: '02', Icon: ClipboardList },
  { key: 'step3', num: '03', Icon: HandHeart },
  { key: 'step4', num: '04', Icon: Sparkles },
] as const;

export default function HowItWorks() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="process" className="section-padding bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-300" />
            <Sparkles className="w-4 h-4 text-gold-400" />
            <div className="w-8 h-px bg-gold-300" />
          </div>
          <h2 className="heading-md text-stone-800 mb-4">{t('howItWorks.title')}</h2>
          <p className="body-text max-w-xl mx-auto">{t('howItWorks.subtitle')}</p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {/* Connector rail — desktop only; the icon nodes sit on it and mask it */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-28 left-[12%] right-[12%] h-px bg-gold-300/50"
          />

          {steps.map(({ key, num, Icon }, i) => (
            <div
              key={key}
              className={`group relative z-10 flex flex-col items-center text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : '0ms' }}
            >
              {/* Editorial number */}
              <span
                aria-hidden="true"
                className="font-serif text-5xl sm:text-6xl font-light leading-none text-gold-400/70 select-none"
              >
                {num}
              </span>

              {/* Icon node — thin onyx line in a gold hairline ring, cream fill masks the rail */}
              <div className="relative z-10 mt-5 mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold-300/60 bg-cream transition-colors duration-500 group-hover:border-[#BF6073]/60">
                <Icon className="h-6 w-6 text-stone-700" strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-800 mb-3 tracking-wide">
                {t(`howItWorks.${key}.title`)}
              </h3>
              <p className="font-sans text-sm font-light leading-relaxed text-stone-500 max-w-[15rem] mx-auto">
                {t(`howItWorks.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
