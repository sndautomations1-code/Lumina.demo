import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'en' | 'ro';

interface LanguageContextType {
  lang: Language;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',

    // Hero
    'hero.slogan': 'Radiance Redefined',
    'hero.subtitle': 'Where artistry meets precision in aesthetic medicine',
    'hero.cta': 'Book an Appointment',
    'hero.scroll': 'Discover More',

    // Services
    'services.title': 'Our Treatments',
    'services.subtitle': 'Curated procedures designed to illuminate your natural beauty',
    'services.botox.title': 'Botox & Neuromodulators',
    'services.botox.desc': 'Precision-administered neuromodulators that soften lines while preserving your natural expressiveness. Results that whisper, never shout.',
    'services.botox.duration': '30 min',
    'services.botox.price': 'From €200',
    'services.fillers.title': 'Dermal Fillers',
    'services.fillers.desc': 'Hand-sculpted hyaluronic acid enhancements for volume restoration and contour refinement. Subtle transformation, striking results.',
    'services.fillers.duration': '45 min',
    'services.fillers.price': 'From €350',
    'services.meso.title': 'Mesotherapy',
    'services.meso.desc': 'Micro-injection cocktail of vitamins, peptides, and hyaluronic acid to revitalize skin from within. The ultimate skin luminosity treatment.',
    'services.meso.duration': '40 min',
    'services.meso.price': 'From €180',
    'services.laser.title': 'Laser Treatments',
    'services.laser.desc': 'Advanced fractional and IPL technologies for skin resurfacing, pigmentation correction, and collagen stimulation. Science meets radiance.',
    'services.laser.duration': '60 min',
    'services.laser.price': 'From €250',
    'services.facial.title': 'Premium Facial Care',
    'services.facial.desc': 'Bespoke facial protocols combining medical-grade peels, LED therapy, and lymphatic drainage for unparalleled skin transformation.',
    'services.facial.duration': '75 min',
    'services.facial.price': 'From €150',

    // About
    'about.title': 'About Lumina',
    'about.subtitle': 'A legacy of excellence in aesthetic medicine',
    'about.p1': 'Founded in 2018, Lumina Aesthetics was born from a singular vision — to create a sanctuary where medical precision meets artistic sensibility. Nestled in the heart of Beverly Hills, our clinic has become the destination for those who understand that true beauty lies in refinement, not excess.',
    'about.p2': 'Every treatment at Lumina is a collaboration between physician and patient, a bespoke journey calibrated to your unique anatomy and aspirations. We believe the most compelling results are those that feel entirely your own — as though nature herself intended them.',
    'about.team.title': 'Our Specialists',
    'about.team.subtitle': 'World-class expertise, compassionate care',
    'about.doc1.name': 'Dr. Elena Vasilescu',
    'about.doc1.title': 'Lead Aesthetic Physician',
    'about.doc1.desc': 'Over 15 years of experience in minimally invasive aesthetics. Certified by the International Association of Aesthetic Medicine.',
    'about.doc2.name': 'Dr. Andrei Ionescu',
    'about.doc2.title': 'Dermatology Specialist',
    'about.doc2.desc': 'Expert in laser dermatology and skin rejuvenation with publications in leading dermatological journals.',
    'about.doc3.name': 'Dr. Maria Constantinescu',
    'about.doc3.title': 'Aesthetic Nurse Practitioner',
    'about.doc3.desc': 'Specialized in advanced facial treatments and mesotherapy protocols with a holistic approach to skin health.',

    // Gallery
    'gallery.title': 'Results Gallery',
    'gallery.subtitle': 'Natural transformations that speak for themselves',
    'gallery.drag': 'Drag to compare',
    'gallery.case1.before': 'Before Treatment',
    'gallery.case1.after': 'After 3 Sessions',
    'gallery.case2.before': 'Before Treatment',
    'gallery.case2.after': 'After 6 Weeks',
    'gallery.case3.before': 'Before Treatment',
    'gallery.case3.after': 'After 2 Months',
    'gallery.case1.label': 'Skin Rejuvenation',
    'gallery.case2.label': 'Laser Resurfacing',
    'gallery.case3.label': 'Facial Contouring',

    // Testimonials
    'testimonials.title': 'Client Voices',
    'testimonials.subtitle': 'Experiences from those who chose Lumina',
    'testimonials.1.text': 'Lumina didn\'t just transform my skin — they transformed how I feel about myself. The results are so natural that even my closest friends can\'t tell, yet I see a radiant version of myself every morning.',
    'testimonials.1.name': 'Alexandra M.',
    'testimonials.1.detail': 'Skin Rejuvenation Client',
    'testimonials.2.text': 'The level of care and precision is unmatched. Dr. Vasilescu took the time to understand exactly what I wanted and delivered beyond my expectations. This is aesthetic medicine at its finest.',
    'testimonials.2.name': 'Cristina D.',
    'testimonials.2.detail': 'Dermal Fillers Client',
    'testimonials.3.text': 'I\'ve visited clinics across Europe, but Lumina offers something rare — genuine artistry combined with medical excellence. The results speak louder than words ever could.',
    'testimonials.3.name': 'Radu P.',
    'testimonials.3.detail': 'Laser Treatment Client',
    'testimonials.4.text': 'From the moment I walked in, I felt I was somewhere special. The attention to detail, the personalized approach, and the stunning results — Lumina is simply in a league of its own.',
    'testimonials.4.name': 'Ioana T.',
    'testimonials.4.detail': 'Premium Facial Care Client',

    // Contact
    'contact.title': 'Your Journey Begins Here',
    'contact.subtitle': 'Book your personalized consultation today',
    'contact.form.name': 'Full Name',
    'contact.form.phone': 'Phone Number',
    'contact.form.service': 'Select Service',
    'contact.form.service.default': 'Choose a treatment',
    'contact.form.date': 'Preferred Date',
    'contact.form.time': 'Preferred Time',
    'contact.form.submit': 'Request Appointment',
    'contact.form.success': 'Thank you! We will contact you shortly to confirm your appointment.',
    'contact.info.title': 'Visit Us',
    'contact.info.address': 'Beverly Hills, CA 90210',
    'contact.info.address2': '8500 Wilshire Blvd, Suite 210',
    'contact.info.phone': '+1 (310) 555 0182',
    'contact.info.email': 'hello@luminaaesthetics.com',
    'contact.info.hours': 'Working Hours',
    'contact.info.hours.weekdays': 'Mon – Fri: 9:00 AM – 7:00 PM',
    'contact.info.hours.saturday': 'Saturday: 10:00 AM – 4:00 PM',
    'contact.info.hours.sunday': 'Sunday: Closed',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // WhatsApp
    'whatsapp.text': 'Chat with us on WhatsApp',
  },
  ro: {
    // Nav
    'nav.home': 'Acasă',
    'nav.services': 'Servicii',
    'nav.about': 'Despre Noi',
    'nav.gallery': 'Galerie',
    'nav.testimonials': 'Testimoniale',
    'nav.contact': 'Contact',
    'nav.book': 'Programare',

    // Hero
    'hero.slogan': 'Frumusețe Redefinită',
    'hero.subtitle': 'Unde arta întâlnește precizia în medicina estetică',
    'hero.cta': 'Programare Online',
    'hero.scroll': 'Descoperă Mai Mult',

    // Services
    'services.title': 'Tratamentele Noastre',
    'services.subtitle': 'Proceduri curate concepute pentru a ilumina frumusețea ta naturală',
    'services.botox.title': 'Botox & Neuromodulatori',
    'services.botox.desc': 'Neuromodulatori administrați cu precizie care atenuează liniile, păstrând expresivitatea ta naturală. Rezultate care șoptesc, nu strigă.',
    'services.botox.duration': '30 min',
    'services.botox.price': 'De la €200',
    'services.fillers.title': 'Fillere Dermale',
    'services.fillers.desc': 'Augmentare cu acid hialuronic sculptat manual pentru restaurarea volumului și rafinarea contururilor. Transformare subtilă, rezultate remarcabile.',
    'services.fillers.duration': '45 min',
    'services.fillers.price': 'De la €350',
    'services.meso.title': 'Mezoterapie',
    'services.meso.desc': 'Cocktail de micro-injecții cu vitamine, peptide și acid hialuronic pentru revitalizarea pielii din interior. Tratamentul suprem pentru luminozitatea tenului.',
    'services.meso.duration': '40 min',
    'services.meso.price': 'De la €180',
    'services.laser.title': 'Tratamente Laser',
    'services.laser.desc': 'Tehnologii avansate fracționale și IPL pentru resurfacing, corectarea pigmentației și stimularea colagenului. Știința întâlnește radianța.',
    'services.laser.duration': '60 min',
    'services.laser.price': 'De la €250',
    'services.facial.title': 'Îngrijire Facială Premium',
    'services.facial.desc': 'Protocoale faciale personalizate combinate cu peeling medical, terapie LED și drenaj limfatic pentru o transformare fără egal a pielii.',
    'services.facial.duration': '75 min',
    'services.facial.price': 'De la €150',

    // About
    'about.title': 'Despre Lumina',
    'about.subtitle': 'O moștenire a excelenței în medicina estetică',
    'about.p1': 'Fondată în 2018, Lumina Aesthetics s-a născut dintr-o viziune singulară — de a crea un sanctuar unde precizia medicală întâlnește sensibilitatea artistică. Situată în inima Beverly Hills, clinica noastră a devenit destinația pentru cei care înțeleg că adevărata frumusețe stă în rafinament, nu în exces.',
    'about.p2': 'Fiecare tratament la Lumina este o colaborare între medic și pacient, o călătorie personalizată calibrată anatomiei și aspirațiilor tale unice. Credem că cele mai convingătoare rezultate sunt cele care par complet ale tale — de parcă natura însăși le-a intenționat.',
    'about.team.title': 'Specialiștii Noștri',
    'about.team.subtitle': 'Expertiză de clasă mondială, îngrijire plină de compasiune',
    'about.doc1.name': 'Dr. Elena Vasilescu',
    'about.doc1.title': 'Medic Estetician Principal',
    'about.doc1.desc': 'Peste 15 ani de experiență în estetică minim invazivă. Certificată de Asociația Internațională de Medicină Estetică.',
    'about.doc2.name': 'Dr. Andrei Ionescu',
    'about.doc2.title': 'Specialist Dermatologie',
    'about.doc2.desc': 'Expert în dermatologie laser și rejuvenare cutanată cu publicații în reviste de specialitate de prestigiu.',
    'about.doc3.name': 'Dr. Maria Constantinescu',
    'about.doc3.title': 'Asistent Medical Estetician',
    'about.doc3.desc': 'Specializată în tratamente faciale avansate și protocoale de mezoterapie cu o abordare holistică a sănătății pielii.',

    // Gallery
    'gallery.title': 'Galerie Rezultate',
    'gallery.subtitle': 'Transformări naturale care vorbesc de la sine',
    'gallery.drag': 'Trage pentru a compara',
    'gallery.case1.before': 'Înainte de Tratament',
    'gallery.case1.after': 'După 3 Ședințe',
    'gallery.case2.before': 'Înainte de Tratament',
    'gallery.case2.after': 'După 6 Săptămâni',
    'gallery.case3.before': 'Înainte de Tratament',
    'gallery.case3.after': 'După 2 Luni',
    'gallery.case1.label': 'Rejuvenare Cutanată',
    'gallery.case2.label': 'Resurfacing Laser',
    'gallery.case3.label': 'Conturare Facială',

    // Testimonials
    'testimonials.title': 'Vocile Clienților',
    'testimonials.subtitle': 'Experiențe de la cei care au ales Lumina',
    'testimonials.1.text': 'Lumina nu mi-a transformat doar pielea — mi-a transformat modul în care mă simt despre mine. Rezultatele sunt atât de naturale că nici prietenii mei apropiați nu-și dau seama, dar în fiecare dimineață văd o versiune radiantă a mea.',
    'testimonials.1.name': 'Alexandra M.',
    'testimonials.1.detail': 'Clientă Rejuvenare Cutanată',
    'testimonials.2.text': 'Nivelul de îngrijire și precizie este fără egal. Dr. Vasilescu a făcut timp să înțeleagă exact ce doream și a livrat dincolo de așteptările mele. Aceasta este medicina estetică la cea mai înaltă treaptă.',
    'testimonials.2.name': 'Cristina D.',
    'testimonials.2.detail': 'Clientă Fillere Dermale',
    'testimonials.3.text': 'Am vizitat clinici în toată Europa, dar Lumina oferă ceva rar — autentică artă combinată cu excelență medicală. Rezultatele vorbesc mai tare decât orice cuvinte.',
    'testimonials.3.name': 'Radu P.',
    'testimonials.3.detail': 'Client Tratament Laser',
    'testimonials.4.text': 'Din momentul în care am intrat, am simțit că sunt undeva special. Atenția la detalii, abordarea personalizată și rezultatele uimitoare — Lumina este pur și simplu într-o clasă aparte.',
    'testimonials.4.name': 'Ioana T.',
    'testimonials.4.detail': 'Clientă Îngrijire Facială Premium',

    // Contact
    'contact.title': 'Călătoria Ta Începe Aici',
    'contact.subtitle': 'Programează consultația ta personalizată astăzi',
    'contact.form.name': 'Nume Complet',
    'contact.form.phone': 'Număr de Telefon',
    'contact.form.service': 'Selectează Serviciul',
    'contact.form.service.default': 'Alege un tratament',
    'contact.form.date': 'Data Preferată',
    'contact.form.time': 'Ora Preferată',
    'contact.form.submit': 'Solicită Programarea',
    'contact.form.success': 'Vă mulțumim! Vă vom contacta în curând pentru a confirma programarea.',
    'contact.info.title': 'Vizitați-ne',
    'contact.info.address': 'Beverly Hills, CA 90210',
    'contact.info.address2': '8500 Wilshire Blvd, Suite 210',
    'contact.info.phone': '+1 (310) 555 0182',
    'contact.info.email': 'hello@luminaaesthetics.com',
    'contact.info.hours': 'Program',
    'contact.info.hours.weekdays': 'Luni – Vineri: 9:00 – 19:00',
    'contact.info.hours.saturday': 'Sâmbătă: 10:00 – 16:00',
    'contact.info.hours.sunday': 'Duminică: Închis',

    // Footer
    'footer.rights': 'Toate drepturile rezervate.',
    'footer.privacy': 'Politica de Confidențialitate',
    'footer.terms': 'Termeni și Condiții',

    // WhatsApp
    'whatsapp.text': 'Discută cu noi pe WhatsApp',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang] = useState<Language>('en');

  const t = useCallback(
    (key: string) => translations[lang][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
