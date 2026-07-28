import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Direct from '@/components/Direct';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhoWeAre from '@/components/WhoWeAre';
import Philosophy from '@/components/Philosophy';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <WhoWeAre />

        <Services />
        <Features />

        <Direct />
        <Projects />
        <Achievements />
        <Reviews />
        <Philosophy />
        <FAQSection />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
