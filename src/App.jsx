import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import AboutNew from './pages/AboutNew';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import SupportedBanks from './pages/SupportedBanks';
import FAQ from './pages/FAQ';
import FAQPage from './pages/test';
import HomeNew from './pages/HomeNew';

const criticalImages = [
  '/hero/lincon.png',
  '/hero/washington.png',
  '/hero/franklin.png',
  '/hero/andrew.png',
  '/hero/bank-dither.png'
];

function App() {
  return (
    <Preloader images={criticalImages}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-paper text-ink font-sans antialiased selection:bg-ink selection:text-white flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<HomeNew />} />
              <Route path="/about" element={<About />} />
              <Route path="/aboutnew" element={<AboutNew />} />
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
    </Preloader>
  );
}

export default App;
