import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css";

export default function Footer({ t }) {
  return (
    <footer>
      <div className="footer-grid max-w-7xl mx-auto px-6 py-12">
        {/* About Section */}
        <div>
          <h2>🌱 AgriSathi</h2>
          <p>
            {t.footerAbout ||
              "Empowering farmers with AI-driven insights, local advisories, market updates, and weather info."}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>{t.quickLinks || "Quick Links"}</h3>
          <ul className="space-y-2">
            <li>
              <a href="/">{t.navHome || "Home"}</a>
            </li>
            <li>
              <a href="/dashboard">{t.navDashboard || "Dashboard"}</a>
            </li>
            <li>
              <a href="/advisory">{t.navAdvisory || "Advisory"}</a>
            </li>
            <li>
              <a href="/contact">{t.navContact || "Contact"}</a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3>{t.resources || "Resources"}</h3>
          <ul className="space-y-2">
            <li>
              <a href="/market-prices">📊 Crop Market Prices</a>
            </li>
            <li>
              <a href="/weather-today">🌤 Weather Updates</a>
            </li>
            <li>
              <a href="/guides">📄 Crop Management Guides</a>
            </li>
            <li>
              <a href="/videos">🎥 Advisory Videos</a>
            </li>
          </ul>
        </div>

        {/* Contact & Helpline */}
        <div>
          <h3>{t.contact || "Contact & Helpline"}</h3>
          <p>📍 {t.contactAddress || "ABES Engineering College, Ghaziabad"}</p>
          <p>📧 {t.contactEmail || "support@agrisathi.com"}</p>
          <p>📞 {t.contactPhone || "+91 9792303434"}</p>
          <p>🆘 Farmer Helpline: +91 1800-123-456</p>
          <div className="social-icons mt-2">
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}

      {/* Bottom Bar */}
      <div className="bottom-bar">
        © {new Date().getFullYear()} AgriSathi.{" "}
        {t.rights || "All rights reserved."}
      </div>
    </footer>
  );
}
