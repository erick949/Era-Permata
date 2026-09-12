import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Portfolio from './components/Portfolio/Portfolio'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Services from './components/Services/Services'
import SocialMedia from './components/SocialMedia/SocialMedia'
import Contact from './components/Contact/Contact'
import Footer from './components/common/Footer'
import useLiquidGlassRecapture from './hooks/useLiquidGlassRecapture'

function App() {
  // Keeps every liquid-glass surface's background snapshot in sync with
  // layout changes (resize / orientation change). Mounted once at the root.
  useLiquidGlassRecapture()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Projects />
        <Experience />
        <Services />
        <SocialMedia />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
