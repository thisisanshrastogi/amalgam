import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import SupportedBanks from './pages/SupportedBanks';
import FAQ from './pages/FAQ';
import FAQPage from './pages/test';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-bg text-brand font-sans antialiased selection:bg-highlight selection:text-accent flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/supported-banks" element={<SupportedBanks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/test" element={<FAQPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
