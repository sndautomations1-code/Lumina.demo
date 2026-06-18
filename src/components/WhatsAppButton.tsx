import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/13105550182"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label={t('whatsapp.text')}
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />

        {/* Button */}
        <div className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="w-6 h-6 text-white" fill="white" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-white rounded-lg shadow-lg border border-beige-200 font-sans text-xs text-stone-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {t('whatsapp.text')}
        <div className="absolute top-full right-5 w-2 h-2 bg-white border-r border-b border-beige-200 transform rotate-45 -translate-y-1" />
      </div>
    </a>
  );
}
