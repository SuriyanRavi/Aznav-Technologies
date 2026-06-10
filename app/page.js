import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Technologies from '../components/Technologies';

import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import Careers from '../components/Careers';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatCTA from '../components/FloatCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Technologies />
        <CaseStudies />
        <Testimonials />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <FloatCTA />
    </>
  );
}
