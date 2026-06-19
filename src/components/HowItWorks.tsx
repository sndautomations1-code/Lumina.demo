import { CalendarDays, ClipboardList, HandHeart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

const steps = [
  { key: 'step1', Icon: CalendarDays },
  { key: 'step2', Icon: ClipboardList },
  { key: 'step3', Icon: HandHeart },
  { key: 'step4', Icon: Sparkles },
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
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Connecting line — desktop only, fades at the ends so it stays subtle */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/50 to-transparent"
            aria-hidden="true"
          />

          {steps.map(({ key, Icon }, i) => (
            <div
              key={key}
              className={`group relative z-10 flex flex-col items-center text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : '0ms' }}
            >
              {/* Icon badge */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-gold-100 to-[#BF6073]/15 ring-1 ring-gold-300/40 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:ring-gold-400/50">
                  <Icon className="w-8 h-8 text-[#BF6073]" strokeWidth={1.5} />
                </div>
                {/* Step number */}
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-stone-800 text-white font-sans text-xs font-medium flex items-center justify-center shadow-md">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-800 mb-3 tracking-wide">
                {t(`howItWorks.${key}.title`)}
              </h3>
              <p className="font-sans text-sm font-light leading-relaxed text-stone-500 max-w-xs mx-auto">
                {t(`howItWorks.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
