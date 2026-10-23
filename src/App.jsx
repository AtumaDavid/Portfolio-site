import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { LenisProvider } from './context/lenis';
import { ThemeProvider } from './context/theme';
import { UIProvider } from './context/ui';
import { IntroProvider } from './context/intro';
import Intro from './components/layout/Intro';
import Nav from './components/layout/Nav';
import { ScrollProgress } from './components/ui/Motion';
import Hero from './sections/Hero';
import Facts from './sections/Facts';
import Work from './sections/Work';
import Services from './sections/Services';
import Process from './sections/Process';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <LenisProvider>
          <IntroProvider>
            <UIProvider>
              <ScrollProgress />
              <Nav />
              <main>
                <Hero />
                <Facts />
                <Work />
                <Services />
              <Process />
                <About />
                <Testimonials />
                <Contact />
              </main>
              <Intro />
            </UIProvider>
          </IntroProvider>
        </LenisProvider>
      </MotionConfig>
      {/* Vercel Web Analytics: page views + visitors (only reports on Vercel deployments) */}
      <Analytics />
    </ThemeProvider>
  );
}
