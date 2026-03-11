import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";
import Dashboard from "./Dashboard";
import CategoryAdvisoryPage from "./CategoryAdvisoryPage";
import NotificationsPage from "./NotificationsPage";
import MachinePage from "./MachinePage";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FarmerRoadmap from "./FarmerRoadmap";
import AgriLocker from "./AgriLocker";
import Footer from "./Footer";

/* ======================= CONSTANTS ======================= */
const heroImage =
  "https://ideogram.ai/assets/progressive-image/balanced/response/X5UhQrEhQQWTDHBCEor7_Q";

const GOVT_SCHEMES_URL =
  "https://www.india.gov.in/topics/rural-development/agriculture-allied-sectors";

const CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane"];
const REGIONS = [
  "North India",
  "South India",
  "Maharashtra",
  "Bihar",
  "Punjab",
];

const LATEST_NEWS = [
  {
    title:
      "Cabinet approves Modification/addition of the features/ provisions in the ongoing Central Sector Scheme of PMFBY and RWBCIS for its implementation",
    date: "06-01-2025",
    summary: {
      en: "The Cabinet has given its nod to introduce changes and new features to the existing PM Fasal Bima Yojana (PMFBY) and Restructured Weather Based Crop Insurance Scheme (RWBCIS) to improve their implementation and reach for farmers.",
      hi: "कैबिनेट ने पीएम फसल बीमा योजना (पीएमएफबीवाई) और मौसम आधारित फसल बीमा योजना (आरडब्ल्यूबीसीआईएस) की सुविधाओं में बदलाव/जोड़ को मंजूरी दी है ताकि किसानों के लिए उनका कार्यान्वयन और पहुंच बेहतर हो सके।",
      bho: "कैबिनेट, पीएम फसल बीमा योजना (पीएमएफबीवाई) आ मौसम आधारित फसल बीमा योजना (आरडब्ल्यूबीसीआईएस) के विशेषता में सुधार के मंजूरी दे दिहलस, जवन से किसान लोग के अउरी फायदा होखे।",
      ml: "പ്രധാനമന്ത്രി ഫസൽ ബീമാ യോജന (PMFBY), കാലാവസ്ഥാധിഷ്ഠിത വിള ഇൻഷുറൻസ് സ്കീം (RWBCIS) എന്നിവയുടെ നടപ്പാക്കൽ മെച്ചപ്പെടുത്തുന്നതിനായി ചില മാറ്റങ്ങൾക്കും പുതിയ സവിശേഷതകൾക്കും കേന്ദ്ര മന്ത്രിസഭ അംഗീകാരം നൽകി.",
    },
    link: "/download/pmfby_modifications.pdf",
  },
  {
    title: "कैबिनेट ने प्रधानमंत्री अन्न-भाग्य योजना को मंजूरी दी",
    date: "18-09-2025",
    summary: {
      en: "The Cabinet has approved the new Pradhan Mantri Ann-Bhagya Yojana, focusing on food security and distribution of essential grains to beneficiaries.",
      hi: "कैबिनेट ने नई प्रधानमंत्री अन्न-भाग्य योजना को मंजूरी दे दी है, जिसका मुख्य ध्यान खाद्य सुरक्षा और लाभार्थियों को आवश्यक अनाज के वितरण पर है।",
      bho: "कैबिनेट प्रधानमंत्री अन्न-भाग्य योजना के मंजूरी दे दिहलस, जवन खाद्य सुरक्षा आ अनाज वितरण पर केंद्रित बा।",
      ml: "ഭക്ഷ്യസുരക്ഷയ്ക്കും ഗുണഭോക്താക്കൾക്ക് അവശ്യ ധാന്യങ്ങൾ വിതരണം ചെയ്യുന്നതിനും ഊന്നൽ നൽകുന്ന പ്രധാനമന്ത്രി അന്ന-ഭാഗ്യ യോജനയ്ക്ക് മന്ത്രിസഭ അംഗീകാരം നൽകി.",
    },
    link: "/details/ann_bhagya_scheme.html",
  },
  {
    title:
      "2025-26 में चयनित फसलों के लिए प्रौद्योगिकी का उपयोग करके ग्राम पंचायत स्तर पर फसल उपज अनुमान के लिए रुचि की अभिव्यक्ति हेतु निमंत्रण",
    date: "15-09-2025",
    summary: {
      en: "An Expression of Interest (EOI) has been issued for estimating crop yield at the Gram Panchayat level for selected crops in 2025-26 using advanced technology.",
      hi: "2025-26 में चयनित फसलों के लिए उन्नत प्रौद्योगिकी का उपयोग करके ग्राम पंचायत स्तर पर फसल उपज अनुमान लगाने हेतु रुचि की अभिव्यक्ति (ईओआई) जारी की गई है।",
      bho: "2025-26 खातिर कुछ फसल के ग्राम पंचायत स्तर पर उपज अनुमान लगावे खातिर उन्नत तकनीक के उपयोग करे खातिर रुचि के अभिव्यक्ति (ईओआई) जारी भइल बा।",
      ml: "2025-26 വർഷത്തിലേക്ക് തിരഞ്ഞെടുക്കപ്പെട്ട വിളകളുടെ ഗ്രാമപഞ്ചായത്ത് തലത്തിലുള്ള വിളവ് കണക്കാക്കാൻ സാങ്കേതികവിദ്യ ഉപയോഗിക്കുന്നതിന് താൽപ്പര്യപത്രം (EOI) പുറത്തിറക്കി.",
    },
    link: "/eoi/crop_yield_2025.pdf",
  },
  {
    title:
      "राष्ट्रीय किसान कल्याण कार्यक्रम कार्यान्वयन सोसायटी (NFWPIS) में प्रतिनियुक्ति (STC) के आधार पर तेरह (13) पदों को भरना",
    date: "10-09-2025",
    summary: {
      en: "Thirteen (13) posts are being filled in the National Farmers Welfare Programme Implementation Society (NFWPIS) on a Short Term Contract (STC) basis.",
      hi: "राष्ट्रीय किसान कल्याण कार्यक्रम कार्यान्वयन सोसायटी (NFWPIS) में प्रतिनियुक्ति (एसटीसी) के आधार पर तेरह (13) पदों को भरा जा रहा है।",
      bho: "राष्ट्रीय किसान कल्याण कार्यक्रम कार्यान्वयन सोसायटी (NFWPIS) में तेरह (13) पद पर प्रतिनियुक्ति (एसटीसी) के आधार पर भर्ती हो रहल बा।",
      ml: "ദേശീയ കർഷക ക്ഷേമ പദ്ധതി നിർവ്വഹണ സൊസൈറ്റിയിൽ (NFWPIS) ഷോർട്ട് ടേം കോൺട്രാക്ട് (STC) അടിസ്ഥാനത്തിൽ പതിമൂന്ന് (13) തസ്തികകളിലേക്ക് നിയമനം നടത്തുന്നു.",
    },
    link: "/recruitment/nfwis_posts.pdf",
  },
];

const importantLinks = [
  { name: "Govt. Agriculture Portal", url: GOVT_SCHEMES_URL },
  { name: "Market Prices Info", url: "https://www.ncdex.com/" },
  { name: "Weather Updates", url: "https://www.imd.gov.in/" },
  { name: "Crop Advisory Reports", url: "https://farmer.gov.in/" },
];

/* ======================= TRANSLATIONS ======================= */
const translations = {
  en: {
    title: "🌾 AgriSathi",
    nav: { updates: "Updates", features: "Features", chat: "Chat" },
    heroTitle: "Your Farming Companion",
    heroText:
      "AI-powered advice, weather alerts, subsidies & more – all in your language.",
    uploadLabel: "📷 Upload Your Farm Image",
    chatTitle: "💬 Ask AgriSathi",
    selectCrop: "Select Your Crop",
    selectRegion: "Select Your Region",
    chooseRegion: "Choose region...",
    language: "Language",
    speechRate: "Speech Rate",
    inputPlaceholder: "Ask your question...",
    sendButton: "Send",
    newBadge: "NEW",
    publishDate: "Publish Date:",
    updatesTitle: "📢 Krishi Samachar (Agriculture News)",
    quickLinks: "Quick Links",
    featuresTitle: "Core Features",
    footer: "© 2025 AgriSathi | Empowering Farmers with AI",
    notification1: "Opportunity for farmers to get free seed minikit",
    notification2: "Time table and place for e-lottery",
    notification3: "Provisional seniority list of officers",
    menuTitle: "AgriSathi Menu",
    menuItems: {
      dashboard: "Dashboard",
      notification: "Notification",
      category: "Category Based Advisory",
      chatbot: "Chat Bot",
      weather: "Weather",
      govtschemes: "Govt. Schemes",
      machinery: "Machinery",
    },
  },
  hi: {
    title: "🌾 एग्रीसाथी",
    nav: { updates: "अपडेट्स", features: "विशेषताएँ", chat: "चैट" },
    heroTitle: "आपका खेती साथी",
    heroText:
      "एआई आधारित सलाह, मौसम चेतावनी, सब्सिडी और बहुत कुछ – अब आपकी भाषा में।",
    uploadLabel: "📷 अपनी खेती की फोटो अपलोड करें",
    chatTitle: "💬 एग्रीसाथी से पूछें",
    selectCrop: "अपनी फसल चुनें",
    selectRegion: "अपना क्षेत्र चुनें",
    chooseRegion: "क्षेत्र चुनें...",
    language: "भाषा",
    speechRate: "वाणी की गति",
    inputPlaceholder: "अपना प्रश्न पूछें...",
    sendButton: "भेजें",
    newBadge: "नया",
    publishDate: "प्रकाशन तिथि:",
    updatesTitle: "📢 कृषि समाचार",
    quickLinks: "त्वरित लिंक",
    featuresTitle: "मुख्य विशेषताएँ",
    footer: "© 2025 एग्रीसाथी | किसानों को एआई से सशक्त बनाना",
    notification1: "किसानों के लिए मुफ्त बीज मिनीकिट पाने का अवसर",
    notification2: "ई-लॉटर्री का समय सारिणी और स्थान",
    notification3: "अधिकारियों की प्रोविजनल सीनियरिटी सूची",
    menuTitle: "एग्रीसाथी मेनू",
    menuItems: {
      dashboard: "डैशबोर्ड",
      notification: "सूचना",
      category: "वर्ग आधारित सलाह",
      chatbot: "चैट बोट",
      weather: "मौसम",
      govtschemes: "सरकारी योजनाएँ",
      machinery: "मशीनरी",
    },
  },
  bho: {
    title: "🌾 एग्रीसाथी",
    nav: { updates: "अपडेट", features: "फीचर", chat: "गपशप" },
    heroTitle: "रउआ खेती के साथी",
    heroText: "एआई सलाह, मौसम अलर्ट, सब्सिडी आ बहुत कुछ – अब रउआ भाषा में।",
    uploadLabel: "📷 अपन खेत के फोटो अपलोड करीं",
    chatTitle: "💬 एग्रीसाथी से पूछीं",
    selectCrop: "फसल चुनल जाव",
    selectRegion: "इलाका चुनल जाव",
    chooseRegion: "इलाका चुनल जाव...",
    language: "भाषा",
    speechRate: "बोली के गति",
    inputPlaceholder: "अपना सवाल पूछीं...",
    sendButton: "भेजीं",
    newBadge: "नया",
    publishDate: "प्रकाशित दिनांक:",
    updatesTitle: "📢 खेती समाचार",
    quickLinks: "जरूरी लिंक",
    featuresTitle: "मुख्य फीचर",
    footer: "© 2025 एग्रीसाथी | किसान लोग के एआई से ताकतवर बनावत",
    notification1: "किसान खातिर मुफ्त बीज मिनीकिट के मौका",
    notification2: "ई-लॉटर्री के समय सारिणी आ जगह",
    notification3: "अधिकारियन के प्रोविजनल सीनियरिटी लिस्ट",
    menuTitle: "एग्रीसाथी मेनू",
    menuItems: {
      dashboard: "डैशबोर्ड",
      notification: "नोटिफिकेशन",
      category: "Category Based Advisory",
      chatbot: "चैट बोट",
      weather: "मौसम",
      govtschemes: "सरकारी योजनाएँ",
    },
  },
  ml: {
    title: "🌾 അഗ്രിസാഥി",
    nav: { updates: "അപ്ഡേറ്റുകൾ", features: "സവിശേഷതകൾ", chat: "ചാറ്റ്" },
    heroTitle: "നിങ്ങളുടെ കൃഷി കൂട്ടുകാരൻ",
    heroText:
      "എഐ ഉപദേശം, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, സബ്സിഡികൾ – എല്ലാം നിങ്ങളുടെ ഭാഷയിൽ.",
    uploadLabel: "📷 നിങ്ങളുടെ ഫാമിന്റെ ചിത്രം അപ്ലോഡ് ചെയ്യുക",
    chatTitle: "💬 അഗ്രിസാഥിയോട് ചോദിക്കുക",
    selectCrop: "നിങ്ങളുടെ വിള തിരഞ്ഞെടുക്കുക",
    selectRegion: "നിങ്ങളുടെ പ്രദേശം തിരഞ്ഞെടുക്കുക",
    chooseRegion: "പ്രദേശം തിരഞ്ഞെടുക്കുക...",
    language: "ഭാഷ",
    speechRate: "വാചക നിരക്ക്",
    inputPlaceholder: "നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക...",
    sendButton: "പ്രൊഴാനിരച്ചത്",
    newBadge: "പുതിയത്",
    publishDate: "പ്രസിദ്ധീകരിച്ച തീയതി:",
    updatesTitle: "📢 കൃഷി വാർത്തകൾ",
    quickLinks: "ക്വിക്ക് ലിങ്കുകൾ",
    featuresTitle: "പ്രധാന സവിശേഷതകൾ",
    footer: "© 2025 അഗ്‌രിസാഥി | കർഷകരെ എഐ വഴി ശക്തിപ്പെടുത്തുന്നു",
    notification1: "കർഷകർക്ക് സൗജന്യ വിത്ത് മിനികിറ്റ് ലഭിക്കാൻ അവസരം",
    notification2: "ഇ-ലാട്ടറി സമയം പട്ടികയും സ്ഥലം",
    notification3: "ഒഫീസർമാർക്കുള്ള താത്കാലിക മുൻതൂക്കം പട്ടിക",
    menuTitle: "അഗ്രിസാഥി മെനു",
    menuItems: {
      dashboard: "ഡാഷ്ബോർഡ്",
      notification: "അറിയിപ്പ്",
      category: "വിഭാഗം അടിസ്ഥാനമായ ഉപദേശം",
      chatbot: "ചാറ്റ് ബോട്ട്",
      weather: "കാലാവസ്ഥ",
      govtschemes: "സർക്കാർ പദ്ധതികൾ",
      machinery: "മെഷിനറി",
    },
  },
};
const t = {
  footerAbout: "Helping farmers with AI insights and local advisories.",
  quickLinks: "Quick Links",
  navHome: "Home",
  navDashboard: "Dashboard",
  navAdvisory: "Advisory",
  navContact: "Contact",
  contact: "Contact",
  contactAddress: "ABES Engineering College, Ghaziabad",
  contactEmail: "support@agrisathi.com",
  contactPhone: "+91 9876543210",
  followUs: "Follow Us",
  rights: "All rights reserved.",
};

/* ======================= MENU DRAWER COMPONENT ======================= */
const MenuDrawer = ({ isOpen, onClose, handleAction, language }) => {
  const t = translations[language] || translations.en;
  const menuItems = [
    { name: t.menuItems.dashboard, icon: "📊" },
    { name: t.menuItems.notification, icon: "🔔" },
    { name: t.menuItems.category, icon: "📚" },
    { name: t.menuItems.chatbot, icon: "🤖" },
    // { name: t.menuItems.weather, icon: "🌦" },
    // { name: t.menuItems.govtschemes, icon: "🏛" },
    { name: t.menuItems.machinery, icon: "🚜" },
    { name: "Farmer Roadmap", icon: "🗺️" },
    { name: "AgriLocker", icon: "📁" },
  ];

  const variants = { open: { x: 0 }, closed: { x: "100%" } };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-drawer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="menu-drawer"
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="menu-close-button" onClick={onClose}>
              &times;
            </button>
            <h3 className="menu-title">{t.menuTitle}</h3>
            <div className="menu-options">
              {menuItems.map((item) => (
                <motion.button
                  key={item.name}
                  className="menu-item-button"
                  onClick={() => handleAction(item.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.icon} {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ======================= APP COMPONENT ======================= */
export default function App() {
  const [messages, setMessages] = useState([
    { sender: "system", text: "Start by typing or using voice 🎤" },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [rate, setRate] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCategoryPage, setShowCategoryPage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMachines, setShowMachines] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showAgriLocker, setShowAgriLocker] = useState(false);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  const appendMessage = useCallback((sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  }, []);

  const speak = useCallback(
    (text) => {
      if (!("speechSynthesis" in window)) return;
      const langMap = { hi: "hi-IN", bho: "hi-IN", ml: "ml-IN", en: "en-US" };
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = langMap[language] || "en-US";
      utter.rate = parseFloat(rate);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    },
    [language, rate]
  );

  /* ======================= MENU ACTIONS ======================= */
  const openGovtSchemes = useCallback(() => {
    window.open(GOVT_SCHEMES_URL, "_blank");
    appendMessage("👨‍🌾 Farmer", "Govt. Schemes");
    setTimeout(() => {
      const speakText =
        language === "ml"
          ? "സർക്കാർ പദ്ധതികളുടെ പോർട്ടൽ ഇപ്പോൾ തുറക്കുന്നു."
          : language === "bho"
          ? "सरकारी योजना के पोर्टल अब खुल रहल बा।"
          : language === "hi"
          ? "सरकारी योजनाओं का पोर्टल अब खुल रहा है।"
          : "Opening government schemes portal now.";
      const responseText =
        language === "hi"
          ? "सरकारी योजनाओं के आधिकारिक पोर्टल में नए टैब में भेज दिया गया है।"
          : language === "bho"
          ? "सरकारी योजना के पोर्टल अब नया टैब में खुलल बा।"
          : language === "ml"
          ? "സർക്കാർ പദ്ധതികളുടെ പോർട്ടൽ ഒരു പുതിയ ടാബിൽ തുറക്കുകയാണ്."
          : "Redirecting you to the official government schemes portal in a new tab.";
      speak(speakText);
      appendMessage("🤖 AgriSathi", responseText);
    }, 500);
  }, [appendMessage, speak, language]);

  const openDashboard = useCallback(() => {
    setShowDashboard(true);
    appendMessage("👨‍🌾 Farmer", "Dashboard");
    setTimeout(() => {
      const speakText =
        language === "ml"
          ? "ഡാഷ്ബോർഡ് ഇപ്പോൾ തുറക്കുന്നു."
          : language === "bho"
          ? "डैशबोर्ड अब खुल रहल बा।"
          : language === "hi"
          ? "डैशबोर्ड अब खुल रहा है।"
          : "Opening dashboard now.";
      const responseText =
        language === "hi"
          ? "किसानों के लिए फसल नियोजन और सरकारी लाभों के साथ आपका निजी डैशबोर्ड लोड किया जा रहा है।"
          : language === "bho"
          ? "किसान खातिर पर्सनलाइज़्ड डैशबोर्ड लोड हो रहल बा।"
          : language === "ml"
          ? "കർഷകർക്ക് വേണ്ടിയുള്ള നിങ്ങളുടെ വ്യക്തിഗത ഡാഷ്ബോർഡ് ലോഡ് ചെയ്യുന്നു."
          : "Loading your personalized dashboard for crop planning and government benefits.";
      speak(speakText);
      appendMessage("🤖 AgriSathi", responseText);
    }, 500);
  }, [appendMessage, speak, language]);

  const openCategoryAdvisory = useCallback(() => {
    setShowCategoryPage(true);
    appendMessage("👨‍🌾 Farmer", "Category Based Advisory");
    setTimeout(() => {
      const speakText =
        language === "ml"
          ? "വിഭാഗങ്ങൾ അടിസ്ഥാനമാക്കിയുള്ള ഉപദേശം ഇപ്പോൾ തുറക്കുന്നു."
          : language === "bho"
          ? "Category Based Advisory अब खुल रहल बा।"
          : language === "hi"
          ? "वर्ग-आधारित सलाह अब खुल रही है।"
          : "Opening category based advisory.";
      speak(speakText);
      appendMessage("🤖 AgriSathi", "Opening category based advisory page.");
    }, 400);
  }, [appendMessage, speak, language]);

  /* ======================= SEND MESSAGE ======================= */
  const sendMessage = useCallback(
    (customMessage) => {
      const msg = customMessage || input;
      if (!msg || !msg.trim()) return;

      if (msg === "Govt. Schemes") {
        openGovtSchemes();
        setInput("");
        return;
      }
      if (msg === "Dashboard") {
        openDashboard();
        setInput("");
        return;
      }
      if (msg === "Category Based Advisory") {
        openCategoryAdvisory();
        setInput("");
        return;
      }

      const userMsg = msg === "Weather Alert" ? "Weather" : msg;
      const context = selectedRegion
        ? ` (Context: ${selectedCrop} in ${selectedRegion})`
        : ` (Context: ${selectedCrop})`;
      appendMessage("👨‍🌾 Farmer", msg);

      setTimeout(() => {
        const response =
          language === "hi"
            ? `🤖 AgriSathi: यह "${userMsg}" का जवाब है ${context}`
            : language === "bho"
            ? `🤖 AgriSathi: ई "${userMsg}" के जवाब बा ${context}`
            : language === "ml"
            ? `🤖 AgriSathi: "${userMsg}" എന്ന ചോദ്യത്തിനുള്ള മറുപടി ഇവയാണ് ${context}`
            : `🤖 AgriSathi: This is a sample response for "${userMsg}" ${context}`;
        appendMessage("🤖 AgriSathi", response);
        speak(response);
      }, 1000);
      setInput("");
    },
    [
      input,
      selectedCrop,
      selectedRegion,
      appendMessage,
      openGovtSchemes,
      openDashboard,
      openCategoryAdvisory,
      speak,
      language,
    ]
  );

  /* ======================= HANDLE MENU ACTION ======================= */
  const handleMenuAction = (actionName) => {
    setIsMenuOpen(false);
    if (actionName === translations[language].menuItems.govtschemes)
      openGovtSchemes();
    else if (actionName === translations[language].menuItems.dashboard)
      openDashboard();
    else if (actionName === translations[language].menuItems.category)
      openCategoryAdvisory();
    else if (actionName === translations[language].menuItems.notification)
      setShowNotifications(true);
    else if (actionName === translations[language].menuItems.machinery)
      setShowMachines(true);
    else if (actionName === "Farmer Roadmap") setShowRoadmap(true);
    else if (actionName === "AgriLocker") setShowAgriLocker(true);
    else if (actionName === translations[language].menuItems.chatbot)
      document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
    else sendMessage(actionName);
  };

  /* ======================= VOICE INPUT ======================= */
  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang =
      language === "hi" || language === "bho" ? "hi-IN" : "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
  };

  /* ======================= PHOTO UPLOAD ======================= */
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      appendMessage("👨‍🌾 Farmer", "Uploaded a photo for diagnosis 📷");
      setTimeout(() => {
        const response =
          language === "hi"
            ? "🤖 AgriSathi: यह फोटो पत्तियों में फंगस का संकेत देता है।"
            : language === "bho"
            ? "🤖 AgriSathi: ई फोटो में पात पर फंगस देखाई दे रहल बा।"
            : language === "ml"
            ? "🤖 AgriSathi: ഈ ചിത്രം ഇലകളിൽ ഫംഗസ് ബാധയെ സൂചിപ്പിക്കുന്നു."
            : "🤖 AgriSathi: The photo indicates possible fungal infection.";
        appendMessage("🤖 AgriSathi", response);
        speak(response);
      }, 1500);
    }
  };

  /* ======================= QUICK ACTIONS ======================= */
  const quickActions = [
    "Weather Alert",
    "Crop Advice",
    "Govt. Schemes",
    "Machinery Info",
    "Nutrition Tips",
  ];

  /* ======================= FEATURES DATA ======================= */
  const featuresData = [
    { icon: "🌱", title: "Crop Practices" },
    { icon: "🌦", title: "Weather Alerts" },
    { icon: "🏛", title: "Govt. Schemes", action: openGovtSchemes },
    { icon: "🥕", title: "Nutrition" },
    { icon: "🚜", title: "Machinery" },
    { icon: "🗣", title: "Multi-language" },
  ];

  const handleUtilityLinkClick = (link) => {
    appendMessage("👨‍🌾 Farmer", `Check this: ${link.name}`);
    setTimeout(() => {
      const response =
        language === "hi"
          ? `🤖 AgriSathi: यह लिंक "${link.name}" पर कृषि संबंधित महत्वपूर्ण जानकारी देता है।`
          : language === "bho"
          ? `🤖 AgriSathi: ई लिंक "${link.name}" प खेती से जुड़ल महत्वपूर्ण जानकारी बा।`
          : language === "ml"
          ? `🤖 AgriSathi: ഈ ലിങ്ക് "${link.name}" കാർഷിക വിവരങ്ങൾ നൽകുന്നു.`
          : `🤖 AgriSathi: This link "${link.name}" contains important agricultural information.`;
      appendMessage("🤖 AgriSathi", response);
      speak(response);
    }, 800);
  };

  const handleNewsClick = (newsItem) => {
    appendMessage("👨‍🌾 Farmer", `Tell me more about: ${newsItem.title}`);
    setTimeout(() => {
      const newsSummary = newsItem.summary[language] || newsItem.summary.en;
      appendMessage("🤖 AgriSathi", `🤖 AgriSathi: ${newsSummary}`);
      speak(newsSummary);
    }, 800);
  };

  /* ======================= ROUTING ======================= */
  if (showDashboard)
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  if (showCategoryPage)
    return <CategoryAdvisoryPage onBack={() => setShowCategoryPage(false)} />;
  if (showNotifications)
    return <NotificationsPage onBack={() => setShowNotifications(false)} />;
  if (showMachines)
    return <MachinePage onBack={() => setShowMachines(false)} />;
  if (showRoadmap)
    return (
      <FarmerRoadmap language={language} onBack={() => setShowRoadmap(false)} />
    );
  if (showAgriLocker)
    return <AgriLocker onBack={() => setShowAgriLocker(false)} />;

  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen flex flex-col">
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        handleAction={handleMenuAction}
        language={language}
      />
      <Header
        language={language}
        setLanguage={setLanguage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        t={translations[language]}
      />
      <HeroSection
  heroImage={heroImage}
  t={translations[language]}
  appendMessage={appendMessage}
/>
      <div className="notification-bar">
        <div className="notification-track">
          <a href="#about">
            <span className="new-badge">{t.newBadge}</span> {t.notification1}
          </a>
          <a href="#about">
            <span className="new-badge">{t.newBadge}</span> {t.notification2}
          </a>
          <a href="#about">
            <span className="new-badge">{t.newBadge}</span> {t.notification3}
          </a>
        </div>
      </div>

      <section id="chat" className="chat-section">
        <h3 className="chat-title">{t.chatTitle}</h3>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              {t.selectCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full border border-green-500 rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-green-400"
            >
              {CROPS.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              {t.selectRegion}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-green-400"
            >
              <option value="">{t.chooseRegion}</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="quick-actions">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              onClick={() => sendMessage(action)}
              className="quick-button"
              whileHover={{ scale: 1.1 }}
            >
              {action}
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 flex-wrap mb-4">
          <div>
            <label className="font-semibold mr-2">{t.language}:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bho">Bhojpuri</option>
              <option value="ml">Malayalam</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">{t.speechRate}:</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <span className="ml-2">{rate}x</span>
          </div>
        </div>

        <div ref={chatBoxRef} className="chat-box">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={
                msg.sender === "👨‍🌾 Farmer"
                  ? "message-farmer"
                  : msg.sender === "🤖 AgriSathi"
                  ? "message-ai"
                  : "message-system"
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span>
                <b>{msg.sender !== "system" ? msg.sender + ": " : ""}</b>{" "}
                {msg.text}
              </span>
              {msg.sender === "🤖 AgriSathi" && (
                <button onClick={() => speak(msg.text)} title="Replay">
                  🔊
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            value={input}
            placeholder={t.inputPlaceholder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-button" onClick={() => sendMessage()}>
            {t.sendButton}
          </button>
          <button className="voice-button" onClick={startVoice}>
            🎤
          </button>
        </div>
      </section>

      <section id="updates" className="updates-section">
        <h3 className="updates-title">{t.updatesTitle}</h3>
        <div className="news-list">
          {LATEST_NEWS.map((news, i) => (
            <motion.button
              key={i}
              className="news-item-card"
              whileHover={{ scale: 1.01, backgroundColor: "#e6ffe6" }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleNewsClick(news)}
            >
              <div className="news-content">
                <p className="news-title">{news.title}</p>
                <small className="news-date">
                  {t.publishDate} {news.date}
                </small>
              </div>
              <span className="news-icon">»</span>
            </motion.button>
          ))}
        </div>

        <h4 className="updates-subtitle">{t.quickLinks}</h4>
        <div className="updates-grid">
          {importantLinks.map((link, i) => (
            <motion.button
              key={i}
              className="update-link-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUtilityLinkClick(link)}
            >
              {link.name}
            </motion.button>
          ))}
        </div>
      </section>

      <section id="features" className="features-section">
        <h3 className="features-title">{t.featuresTitle}</h3>
        <div className="features-grid">
          {featuresData.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              onClick={feature.action || (() => sendMessage(feature.title))}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
}
