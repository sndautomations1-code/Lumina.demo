import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
            <span className="font-serif text-xl font-light tracking-wider">Lumina Aesthetics</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-xs tracking-wide text-stone-400 hover:text-gold-300 transition-colors">
              {t('footer.privacy')}
            </a>
            <span className="text-stone-600">|</span>
            <a href="#" className="font-sans text-xs tracking-wide text-stone-400 hover:text-gold-300 transition-colors">
              {t('footer.terms')}
            </a>
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs text-stone-500 tracking-wide">
            &copy; {new Date().getFullYear()} Lumina Aesthetics. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
