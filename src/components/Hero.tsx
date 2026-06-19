import { ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3757944/pexels-photo-3757944.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Luxury clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-beige-50/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/30 via-transparent to-stone-900/20" />
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-32 left-10 w-20 h-20 rounded-full border border-gold-300/15 animate-float animate-delay-300 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo mark */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-gold-300 mx-auto" strokeWidth={1} />
        </div>

        {/* Main heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-wider mb-4 sm:mb-6 animate-fade-in-up">
          {t('hero.slogan')}
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6 animate-fade-in animate-delay-200">
          <div className="w-12 sm:w-20 h-px bg-gold-300/50" />
          <div className="w-2 h-2 rounded-full bg-gold-300/70" />
          <div className="w-12 sm:w-20 h-px bg-gold-300/50" />
        </div>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl font-light text-white/80 tracking-wide max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in animate-delay-300">
          {t('hero.subtitle')}
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animate-delay-400">
          <a
            href="#contact"
            className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-gold-300/40 hover:border-gold-300/70 text-white font-sans text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-lg hover:shadow-gold-300/10"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animate-delay-500">
        <button
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-white hover:text-gold-300 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
