import { useRef, useState, useCallback } from 'react';
import { Sparkles, GripVertical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

interface ComparisonSliderProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  label: string;
}

function ComparisonSlider({ beforeImg, afterImg, beforeLabel, afterLabel, label }: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => { if (isDragging) updatePosition(e.clientX); },
    [isDragging, updatePosition]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => { if (isDragging) updatePosition(e.touches[0].clientX); },
    [isDragging, updatePosition]
  );

  return (
    <div className="group">
      <p className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold-600 mb-3 text-center">
        {label}
      </p>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-sm overflow-hidden cursor-col-resize select-none luxury-shadow"
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={() => setIsDragging(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After (background) */}
        <img src={afterImg} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={beforeImg} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: `${containerRef.current?.offsetWidth ?? 0}px` }} />
        </div>

        {/* Slider line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white/90 z-10" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
            <GripVertical className="w-4 h-4 text-stone-600" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-white font-sans text-[10px] tracking-wider uppercase z-10">
          {beforeLabel}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-white font-sans text-[10px] tracking-wider uppercase z-10">
          {afterLabel}
        </div>
      </div>
    </div>
  );
}

const cases = ['case1', 'case2', 'case3'] as const;

const beforeImages: Record<string, string> = {
  case1: 'https://images.pexels.com/photos/4040542/pexels-photo-4040542.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
  case2: 'https://images.pexels.com/photos/4040552/pexels-photo-4040552.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
  case3: 'https://images.pexels.com/photos/4040562/pexels-photo-4040562.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
};

const afterImages: Record<string, string> = {
  case1: 'https://images.pexels.com/photos/4040543/pexels-photo-4040543.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
  case2: 'https://images.pexels.com/photos/4040553/pexels-photo-4040553.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
  case3: 'https://images.pexels.com/photos/4040563/pexels-photo-4040563.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
};

export default function Gallery() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="gallery" className="section-padding bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-300" />
            <Sparkles className="w-4 h-4 text-gold-400" />
            <div className="w-8 h-px bg-gold-300" />
          </div>
          <h2 className="heading-md text-stone-800 mb-4">{t('gallery.title')}</h2>
          <p className="body-text max-w-xl mx-auto">{t('gallery.subtitle')}</p>
          <p className="font-sans text-xs text-stone-400 tracking-wide mt-3">{t('gallery.drag')}</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((key, i) => (
            <div
              key={key}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : '0ms' }}
            >
              <ComparisonSlider
                beforeImg={beforeImages[key]}
                afterImg={afterImages[key]}
                beforeLabel={t(`gallery.${key}.before`)}
                afterLabel={t(`gallery.${key}.after`)}
                label={t(`gallery.${key}.label`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
