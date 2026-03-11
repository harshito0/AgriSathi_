import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import { FaComments, FaMoneyBillTrendUp, FaLeaf } from "react-icons/fa6";
import "./Header.css";

const Header = ({ language, setLanguage, isMenuOpen, setIsMenuOpen }) => {
  const translations = {
    en: {
      title: "🌾 AgriSathi",
      // welcome: "Welcome, Ramesh ji",
      nav: {
        weather: "Weather",
        prices: "Market Prices",
        schemes: "Govt Schemes",
        chat: "Help / Chat",
      },
    },
    hi: {
      title: "🌾 एग्रीसाथी",
      // welcome: "स्वागत है, रमेश जी",
      nav: {
        weather: "मौसम",
        prices: "बाजार भाव",
        schemes: "सरकारी योजनाएँ",
        chat: "सहायता / चैट",
      },
    },
    bho: {
      title: "🌾 एग्रीसाथी",
      // welcome: "स्वागत बा, रमेस जी",
      nav: {
        weather: "मौसम",
        prices: "बाजार भाव",
        schemes: "सरकारी योजना",
        chat: "गपशप",
      },
    },
    ml: {
      title: "🌾 അഗ്രിസാഥി",
      // welcome: "സ്വാഗതം, രമേഷ് ജി",
      nav: {
        weather: "കാലാവസ്ഥ",
        prices: "ബസാർ വില",
        schemes: "സർക്കാർ പദ്ധതികൾ",
        chat: "സഹായം / ചാറ്റ്",
      },
    },
  };

  const t = translations[language] || translations.en;

  // Scroll state for background
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Left: Logo + Welcome */}
      <div className="logo-section">
        <h1 className="logo">{t.title}</h1>
        <span className="welcome">{t.welcome}</span>
      </div>

      {/* Center: Navigation with Icons */}
      <nav className="nav-links">
        <a href="#weather">
          <WiDaySunny size={22} /> {t.nav.weather}
        </a>
        <a href="#prices">
          <FaMoneyBillTrendUp size={18} /> {t.nav.prices}
        </a>
        <a href="#schemes">
          <FaLeaf size={18} /> {t.nav.schemes}
        </a>
        <a href="#chat">
          <FaComments size={18} /> {t.nav.chat}
        </a>
      </nav>

      {/* Right: Language + Menu */}
      <div className="header-right">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="bho">भोजपुरी</option>
          <option value="ml">മലയാളം</option>
        </select>

        {/* Hamburger for mobile */}
        <button
          className="menu-toggle-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 3 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
