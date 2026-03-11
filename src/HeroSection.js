import React from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = ({ heroImage, t, handlePhotoUpload }) => {
  return (
    <section className="hero-section">
      <div className="hero-gradient"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="hero-title">{t.heroTitle}</h2>
        <motion.p
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {t.heroText}
        </motion.p>
        <div className="photo-upload">
          <label className="upload-label">
            {t.uploadLabel}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </motion.div>

      <img src={heroImage} alt={t.heroTitle} className="hero-image" />
    </section>
  );
};

// Default props to prevent undefined errors
HeroSection.defaultProps = {
  heroImage:
    "https://ideogram.ai/assets/image/lossless/response/CkyT0Lc2RKqJ_fv-Hd3Ptw",
  t: {
    heroTitle: "Your Farming Companion",
    heroText:
      "AI-powered advice, weather alerts, subsidies & more – all in your language.",
    uploadLabel: "📷 Upload Your Farm Image",
  },
  handlePhotoUpload: () => {},
};

export default React.memo(HeroSection);
