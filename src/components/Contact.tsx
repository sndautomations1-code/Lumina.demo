import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const { t } = useLanguage();
  const { ref, isVisible } = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', phone: '', service: '', date: '', time: '' });
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const inputClass =
    'w-full px-4 py-3 bg-ivory border border-beige-200 rounded-sm font-sans text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-300/30 transition-all duration-300';

  return (
    <section id="contact" className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-beige-100/40 -translate-y-1/2" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-300" />
            <Sparkles className="w-4 h-4 text-gold-400" />
            <div className="w-8 h-px bg-gold-300" />
          </div>
          <h2 className="heading-md text-stone-800 mb-4">{t('contact.title')}</h2>
          <p className="body-text max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form onSubmit={handleSubmit} className="bg-white border border-beige-200 rounded-sm p-6 sm:p-8 luxury-shadow">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                  <p className="font-serif text-xl text-stone-800">{t('contact.form.success')}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block font-sans text-xs font-medium tracking-wide uppercase text-stone-500 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium tracking-wide uppercase text-stone-500 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium tracking-wide uppercase text-stone-500 mb-2">
                      {t('contact.form.service')}
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => update('service', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">{t('contact.form.service.default')}</option>
                      <option value="botox">{t('services.botox.title')}</option>
                      <option value="fillers">{t('services.fillers.title')}</option>
                      <option value="meso">{t('services.meso.title')}</option>
                      <option value="laser">{t('services.laser.title')}</option>
                      <option value="facial">{t('services.facial.title')}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-medium tracking-wide uppercase text-stone-500 mb-2">
                        {t('contact.form.date')}
                      </label>
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) => update('date', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium tracking-wide uppercase text-stone-500 mb-2">
                        {t('contact.form.time')}
                      </label>
                      <input
                        type="time"
                        required
                        value={form.time}
                        onChange={(e) => update('time', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-stone-800 hover:bg-stone-700 text-white font-sans text-xs font-medium tracking-[0.2em] uppercase rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold-200/20 mt-2"
                  >
                    {t('contact.form.submit')}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-8">
              <div>
                <h3 className="heading-sm text-stone-800 mb-6">{t('contact.info.title')}</h3>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-beige-100 border border-beige-200 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-stone-700">{t('contact.info.address')}</p>
                  <p className="font-sans text-sm text-stone-500">{t('contact.info.address2')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-beige-100 border border-beige-200 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-stone-700">{t('contact.info.phone')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-beige-100 border border-beige-200 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-stone-700">{t('contact.info.email')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-beige-100 border border-beige-200 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-stone-700 mb-1">{t('contact.info.hours')}</p>
                  <p className="font-sans text-sm text-stone-500">{t('contact.info.hours.weekdays')}</p>
                  <p className="font-sans text-sm text-stone-500">{t('contact.info.hours.saturday')}</p>
                  <p className="font-sans text-sm text-stone-500">{t('contact.info.hours.sunday')}</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="w-full h-48 rounded-sm border border-beige-200 bg-beige-100 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold-300 mx-auto mb-2" />
                  <p className="font-sans text-xs text-stone-400 tracking-wide">luminaaesthetics.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
