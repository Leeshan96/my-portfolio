import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import './css/cursor.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<Home />} />
        <Route path="/about"          element={<About />} />
        <Route path="/case-study-1"   element={<Home />} />
        <Route path="/case-study-2"   element={<Home />} />
        <Route path="/case-study-3"   element={<Home />} />
        <Route path="/personal-project" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Nav />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
