import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Menocare from './pages/Menocare';
import SimbaRoaming from './pages/SimbaRoaming';
import SimbaDesignSystem from './pages/SimbaDesignSystem';
import PersonalProject from './pages/PersonalProject';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<Home />} />
        <Route path="/about"          element={<About />} />
        <Route path="/menocare"       element={<Menocare />} />
        <Route path="/roaming"        element={<SimbaRoaming />} />
        <Route path="/design-system"  element={<SimbaDesignSystem />} />
        <Route path="/currently"      element={<PersonalProject />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollToTop />
<Nav />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
