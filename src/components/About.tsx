import { Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

const docKeys = ['doc1', 'doc2', 'doc3'] as const;

const docImages: Record<string, string> = {
  doc1: 'https://images.pexels.com/photos/545229/pexels-photo-545229.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  doc2: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  doc3: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
};

export default function About() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="about" className="section-padding bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-300" />
            <Sparkles className="w-4 h-4 text-gold-400" />
            <div className="w-8 h-px bg-gold-300" />
          </div>
          <h2 className="heading-md text-stone-800 mb-4">{t('about.title')}</h2>
          <p className="body-text max-w-xl mx-auto">{t('about.subtitle')}</p>
        </div>

        {/* Story */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20 sm:mb-28 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden luxury-shadow">
              <img
                src="https://images.pexels.com/photos/6627461/pexels-photo-6627461.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                alt="Lumina Clinic Interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold-300/30 rounded-sm hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-gold-300/30 rounded-sm hidden lg:block" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-gold-400" />
              <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold-600">Est. 2018</span>
            </div>
            <p className="font-sans text-base sm:text-lg font-light leading-relaxed text-stone-600 mb-6">
              {t('about.p1')}
            </p>
            <p className="font-sans text-base sm:text-lg font-light leading-relaxed text-stone-600">
              {t('about.p2')}
            </p>
          </div>
        </div>

        {/* Team */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h3 className="heading-sm text-stone-800 mb-2">{t('about.team.title')}</h3>
            <p className="font-sans text-sm text-stone-400 tracking-wide">{t('about.team.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {docKeys.map((key, i) => (
              <div
                key={key}
                className={`text-center group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: isVisible ? `${400 + i * 150}ms` : '0ms' }}
              >
                {/* Photo */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-5">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gold-300/30 group-hover:border-gold-400/50 transition-colors duration-500">
                    <img
                      src={docImages[key]}
                      alt={t(`about.${key}.name`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Gold ring accent */}
                  <div className="absolute inset-0 rounded-full border border-gold-200/20 scale-110" />
                </div>

                <h4 className="font-serif text-xl font-medium text-stone-800 mb-1">
                  {t(`about.${key}.name`)}
                </h4>
                <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-gold-600 mb-3">
                  {t(`about.${key}.title`)}
                </p>
                <p className="font-sans text-sm font-light leading-relaxed text-stone-500 max-w-xs mx-auto">
                  {t(`about.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
