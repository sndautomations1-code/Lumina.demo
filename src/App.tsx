import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Banner from './components/Banner';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <HowItWorks />
        <Testimonials />
        <Contact />
        <Footer />
        <Banner />
      </div>
      <SpeedInsights />
    </LanguageProvider>
  );
}

export default App;
