import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navKeys = ['home', 'services', 'about', 'process', 'testimonials', 'contact'] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-effect shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group"
          >
            <Sparkles
              className="w-7 h-7 text-gold-500 transition-transform duration-300 group-hover:rotate-12"
              strokeWidth={1.5}
            />
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-wider text-stone-800">
              Lumina
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navKeys.map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className="font-sans text-sm font-medium tracking-wide text-stone-600 hover:text-gold-600 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {t(`nav.${key}`)}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Book CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:block px-5 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-sans font-medium tracking-widest uppercase rounded-none transition-all duration-300 hover:shadow-lg hover:shadow-gold-200/20"
            >
              {t('nav.book')}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-gold-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-effect border-t border-beige-200/50 px-4 py-6 space-y-1">
          {navKeys.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="block w-full text-left px-4 py-3 font-sans text-sm font-medium tracking-wide text-stone-600 hover:text-gold-600 hover:bg-beige-100/50 rounded-lg transition-all duration-200"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="w-full mt-4 px-5 py-3 bg-stone-800 text-white text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300"
          >
            {t('nav.book')}
          </button>
        </div>
      </div>
    </nav>
  );
}
