import { LenisProvider } from './lib/lenis';
import { ThemeProvider } from './lib/theme';
import { UIProvider } from './lib/ui';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Work from './sections/Work';
import Projects from './sections/Projects';
import Stack from './sections/Stack';
import Contact from './sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <UIProvider>
          <Nav />
          <main>
            <Hero />
            <Intro />
            <Work />
            {/* <Projects /> */}
            <Stack />
            <Contact />
          </main>
        </UIProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}
