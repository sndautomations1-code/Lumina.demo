export default function Banner() {
  return (
    <div
      role="complementary"
      aria-label="Demo disclosure"
      className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-sm border-t border-gold-300/15 shadow-[0_-4px_20px_rgba(0,0,0,0.18)]"
    >
      <p className="max-w-3xl mx-auto px-4 py-2.5 text-center font-sans text-[11px] sm:text-xs font-light tracking-wide leading-snug text-cream/90">
        <span className="text-gold-300" aria-hidden="true">✦</span>{' '}
        This is a live demo by Splendessa — your clinic&rsquo;s site can look like this in 5 days
      </p>
    </div>
  );
}
