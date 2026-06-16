import { Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

const serviceKeys = ['botox', 'fillers', 'meso', 'laser', 'facial'] as const;

const serviceIcons: Record<string, string> = {
  botox: '✦',
  fillers: '◇',
  meso: '◈',
  laser: '✧',
  facial: '❋',
};

const serviceImages: Record<string, string> = {
  botox: 'https://images.pexels.com/photos/7415932/pexels-photo-7415932.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  fillers: 'https://images.pexels.com/photos/6533326/pexels-photo-6533326.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  meso: 'https://images.pexels.com/photos/7201444/pexels-photo-7201444.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  laser: 'https://images.pexels.com/photos/6627465/pexels-photo-6627465.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  facial: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
};

export default function Services() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInView();

  return (
    <section id="services" className="section-padding bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-300" />
            <Sparkles className="w-4 h-4 text-gold-400" />
            <div className="w-8 h-px bg-gold-300" />
          </div>
          <h2 className="heading-md text-stone-800 mb-4">{t('services.title')}</h2>
          <p className="body-text max-w-xl mx-auto">{t('services.subtitle')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceKeys.map((key, i) => (
            <div
              key={key}
              className={`group relative bg-white rounded-sm border border-beige-200 hover:border-gold-300/50 overflow-hidden luxury-shadow hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : '0ms' }}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={serviceImages[key]}
                  alt={t(`services.${key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-gold-400 text-2xl opacity-80">
                  {serviceIcons[key]}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-800 mb-3 tracking-wide">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-stone-500 mb-5">
                  {t(`services.${key}.desc`)}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-beige-200">
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-sans text-xs font-medium tracking-wide">
                      {t(`services.${key}.duration`)}
                    </span>
                  </div>
                  <span className="font-serif text-lg font-medium gold-text">
                    {t(`services.${key}.price`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
