import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CategoryAdvisoryPage.css";

// Translations
const translations = {
  en: {
    chatPlaceholder: "Type a message...",
    chatReply: "Thanks! How can I help?",
    backBtn: "← Back",
    trendingTitle: "📈 Trending Crop Production",
    comparisonTitle: "Crop Comparison",
    closeComparison: "✖",
    selectBtn: "Select",
    selectedBtn: "✔ Selected",
    modalClose: "Close",
    details: "Details",
    yield: "Yield",
    price: "Market Price",
    inputs: "Inputs Required",
    season: "Sowing/Harvest",
    pests: "Pests/Diseases",
  },
  hi: {
    chatPlaceholder: "संदेश टाइप करें...",
    chatReply: "धन्यवाद! मैं कैसे मदद कर सकता हूँ?",
    backBtn: "← वापस",
    trendingTitle: "📈 लोकप्रिय फसल उत्पादन",
    comparisonTitle: "फसल तुलना",
    closeComparison: "✖",
    selectBtn: "चयन करें",
    selectedBtn: "✔ चयनित",
    modalClose: "बंद करें",
    details: "विवरण",
    yield: "उत्पादन",
    price: "बाजार मूल्य",
    inputs: "आवश्यक इनपुट",
    season: "बुवाई/कटाई",
    pests: "कीट/रोग",
  },
  bh: {
    chatPlaceholder: "संदेश टाइप करीं...",
    chatReply: "धन्यवाद! हम कैसे मदद करीं?",
    backBtn: "← वापस",
    trendingTitle: "📈 लोकप्रिय फसल उत्पादन",
    comparisonTitle: "फसल तुलना",
    closeComparison: "✖",
    selectBtn: "चुनें",
    selectedBtn: "✔ चुना गया",
    modalClose: "बंद करीं",
    details: "विवरण",
    yield: "उत्पादन",
    price: "बाजार मूल्य",
    inputs: "आवश्यक इनपुट",
    season: "बुवाई/कटाई",
    pests: "कीट/रोग",
  },
  ml: {
    chatPlaceholder: "സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    chatReply: "നന്ദി! എങ്ങനെ സഹായിക്കാം?",
    backBtn: "← മടങ്ങുക",
    trendingTitle: "📈 ട്രെൻഡിങ് വിളയെടുപ്പ്",
    comparisonTitle: "വിളയുടെ താരതമ്യം",
    closeComparison: "✖",
    selectBtn: "തിരഞ്ഞെടുക്കുക",
    selectedBtn: "✔ തിരഞ്ഞെടെടുത്തത്",
    modalClose: "മൂട്ടുക",
    details: "വിവരം",
    yield: "ഉത്പാദനം",
    price: "മാർക്കറ്റ് വില",
    inputs: "ആവശ്യമായ ഇൻപുട്ടുകൾ",
    season: "വിത്ത് നട്ടൽ/ഫലമെടുക്കൽ",
    pests: "കീടങ്ങൾ/രോഗങ്ങൾ",
  },
};

// --- Detect language from text ---
function detectLanguageFromText(text) {
  if (/[\u0900-\u097F]/.test(text)) return "hi"; // Hindi/Bhojpuri
  if (/[\u0D00-\u0D7F]/.test(text)) return "ml"; // Malayalam
  return "en"; // Default English
}

// Crop Data
const cropsData = [
  {
    name: { en: "🥑 Avocado", hi: "🥑 एवोकाडो", ml: "🥑 അവോകാഡോ" },
    details: {
      en: "Uses: Culinary, Nutritional\nSoil: Well-drained, Fertile\nClimate: Tropical",
      hi: "उपयोग: पाक, पोषण\nमिट्टी: अच्छी जल निकासी, उर्वर\nजलवायु: उष्णकटिबंधीय",
      ml: "ഉപയോഗങ്ങൾ: പാചകം, പോഷകത്വം\nമണ്ണ്: നന്നായി നീക്കം ചെയ്യുന്ന, ഉർവര\nകാലാവസ്ഥ: ഉഷ്ണമേഖല",
    },
    yield: { en: "10–15 tons/acre", hi: "10–15 टन/एकड़", ml: "10–15 ടൺ/എക്കർ" },
    price: { en: "₹150–₹200/kg", hi: "₹150–₹200/किलो", ml: "₹150–₹200/കിലോ" },
    inputs: {
      en: "Water: Moderate\nFertilizer: Organic compost",
      hi: "पानी: मध्यम\nउर्वरक: जैविक खाद",
      ml: "വെള്ളം: മിതമായ\nഉരവരകം: ജൈവ കമ്പോസ്റ്റ്",
    },
    season: {
      en: "Planting: June–July | Harvest: 12–18 months",
      hi: "बुआई: जून–जुलाई | कटाई: 12–18 महीने",
      ml: "നട്ടൽ: ജൂൺ–ജൂലൈ | ഫലമെടുക്കൽ: 12–18 മാസം",
    },
    pests: {
      en: "Root rot, Fruit flies",
      hi: "मूल सड़न, फल मक्खियाँ",
      ml: "മൂല സड़ന, ഫല മക്കികൾ",
    },
  },
  {
    name: { en: "🐉 Dragon Fruit", hi: "🐉 ड्रैगन फ्रूट", ml: "🐉 ഡ്രാഗൺ ഫലം" },
    details: {
      en: "Uses: Fruit consumption, Juice\nSoil: Sandy, Well-drained\nClimate: Arid/Semi-arid",
      hi: "उपयोग: फल, जूस\nमिट्टी: बालू वाली, अच्छी जल निकासी\nजलवायु: शुष्क/अर्ध-शुष्क",
      ml: "ഉപയോഗങ്ങൾ: പഴം, ജ്യൂസ്\nമണ്ണ്: മണൽ, നന്നായി നീക്കം ചെയ്യുന്ന\nകാലാവസ്ഥ: വരളുന്ന/അർദ്ധ വരളുന്ന",
    },
    yield: { en: "15–20 tons/acre", hi: "15–20 टन/एकड़", ml: "15–20 ടൺ/എക്കർ" },
    price: { en: "₹100–₹150/kg", hi: "₹100–₹150/किलो", ml: "₹100–₹150/കിലോ" },
    inputs: {
      en: "Water: Low-Moderate\nFertilizer: Balanced NPK",
      hi: "पानी: कम-मध्यम\nउर्वरक: संतुलित NPK",
      ml: "വെള്ളം: കുറവ്-മിതമായ\nഉരവരകം: ബാലൻസ് NPK",
    },
    season: {
      en: "Planting: March–April | Harvest: 6–8 months",
      hi: "बुआई: मार्च–अप्रैल | कटाई: 6–8 महीने",
      ml: "നട്ടൽ: മാർച്ച്–ഏപ്രിൽ | ഫലമെടുക്കൽ: 6–8 മാസം",
    },
    pests: {
      en: "Aphids, Mealybugs",
      hi: "एफिड्स, मीलीबग्स",
      ml: "ആഫിഡുകൾ, മീലിയ്ബഗ്സ്",
    },
  },
  {
    name: { en: "🌿 Stevia", hi: "🌿 स्टीविया", ml: "🌿 സ്റ്റീവിയ" },
    details: {
      en: "Uses: Natural sweetener\nSoil: Loamy, Fertile\nClimate: Tropical/Subtropical",
      hi: "उपयोग: प्राकृतिक स्वीटनर\nमिट्टी: दोमट, उर्वर\nजलवायु: उष्णकटिबंधीय/उपोष्णकटिबंधीय",
      ml: "ഉപയോഗങ്ങൾ: പ്രകൃതി മധുരം\nമണ്ണ്: ലോമി, ഉർവര\nകാലാവസ്ഥ: ഉഷ്ണമേഖല/ഉപ-ഉഷ്ണമേഖല",
    },
    yield: { en: "5–8 tons/acre", hi: "5–8 टन/एकड़", ml: "5–8 ടൺ/എക്കർ" },
    price: { en: "₹300–₹400/kg", hi: "₹300–₹400/किलो", ml: "₹300–₹400/കിലോ" },
    inputs: {
      en: "Water: Moderate\nFertilizer: Organic compost",
      hi: "पानी: मध्यम\nउर्वरक: जैविक खाद",
      ml: "വെള്ളം: മിതമായ\nഉരവരകം: ജൈവ കമ്പോസ്റ്റ്",
    },
    season: {
      en: "Planting: Feb–March | Harvest: 6–7 months",
      hi: "बुआई: फरवरी–मार्च | कटाई: 6–7 महीने",
      ml: "നട്ടൽ: ഫെബ്രുവരി–മാർച്ച് | ഫലമെടുക്കൽ: 6–7 മാസം",
    },
    pests: {
      en: "Whiteflies, Leaf miners",
      hi: "व्हाइटफ्लाइज, लीफ माइनर्स",
      ml: "വെളുത്ത പറമ്പുകൾ, ഇല ഖനകർ",
    },
  },
  {
    name: { en: "🍄 Mushrooms", hi: "🍄 मशरूम", ml: "🍄 മുഷ്‌റൂം" },
    details: {
      en: "Uses: Culinary, Nutritional\nSoil: Compost/Organic Matter\nClimate: Cool & Humid",
      hi: "उपयोग: पाक, पोषण\nमिट्टी: कंपोस्ट/जैविक पदार्थ\nजलवायु: ठंडी और आर्द्र",
      ml: "ഉപയോഗങ്ങൾ: പാചകം, പോഷകത്വം\nമണ്ണ്: കമ്പോസ്റ്റ്/ജൈവ പദാർത്ഥം\nകാലാവസ്ഥ: തണുപ്പ്, ഈർപ്പം",
    },
    yield: { en: "20–25 tons/acre", hi: "20–25 टन/एकड़", ml: "20–25 ടൺ/എക്കർ" },
    price: { en: "₹200–₹300/kg", hi: "₹200–₹300/किलो", ml: "₹200–₹300/കിലോ" },
    inputs: {
      en: "Water: High\nFertilizer: Organic manure",
      hi: "पानी: अधिक\nउर्वरक: जैविक खाद",
      ml: "വെള്ളം: കൂടുതലായി\nഉരവരകം: ജൈവ കൃഷിചാഴ്",
    },
    season: {
      en: "Planting: Year-round | Harvest: 1–2 months",
      hi: "बुआई: साल भर | कटाई: 1–2 महीने",
      ml: "നട്ടൽ: വർഷം മുഴുവൻ | ഫലമെടുക്കൽ: 1–2 മാസം",
    },
    pests: { en: "Fungal diseases", hi: "फंगल रोग", ml: "ഫംഗൽ രോഗങ്ങൾ" },
  },
  {
    name: { en: "🌱 Cardamom", hi: "🌱 इलायची", ml: "🌱 ഏലക്കായ്" },
    details: {
      en: "Uses: Spice, Flavoring\nSoil: Well-drained, Rich\nClimate: Tropical",
      hi: "उपयोग: मसाला, स्वाद\nमिट्टी: अच्छी जल निकासी, उर्वर\nजलवायु: उष्णकटिबंधीय",
      ml: "ഉപയോഗങ്ങൾ: മസാല, രുചി\nമണ്ണ്: നന്നായി നീക്കം ചെയ്യുന്ന, സമൃദ്ധം\nകാലാവസ്ഥ: ഉഷ്ണമേഖല",
    },
    yield: { en: "1–1.5 tons/acre", hi: "1–1.5 टन/एकड़", ml: "1–1.5 ടൺ/എക്കർ" },
    price: {
      en: "₹1200–₹1500/kg",
      hi: "₹1200–₹1500/किलो",
      ml: "₹1200–₹1500/കിലോ",
    },
    inputs: {
      en: "Water: High\nFertilizer: Organic manure",
      hi: "पानी: अधिक\nउर्वरक: जैविक खाद",
      ml: "വെള്ളം: കൂടുതലായി\nഉരവരകം: ജൈവ കൃഷിചാഴ്",
    },
    season: {
      en: "Planting: April–May | Harvest: 2–3 years",
      hi: "बुआई: अप्रैल–मई | कटाई: 2–3 साल",
      ml: "നട്ടൽ: ഏപ്രിൽ–മേയ് | ഫലമെടുക്കൽ: 2–3 വർഷം",
    },
    pests: {
      en: "Shoot borers, Leaf blight",
      hi: "शूट बोरर, पत्ता ब्लाइट",
      ml: "ഷൂട്ട് ബോറർ, ഇല ബ്ലൈറ്റ്",
    },
  },
  {
    name: { en: "🌾 Njavara Rice", hi: "🌾 न्जावारा चावल", ml: "🌾 ഞാവര അരി" },
    details: {
      en: "Uses: Medicinal, Culinary\nSoil: Clayey, Fertile\nClimate: Tropical",
      hi: "उपयोग: औषधीय, पाक\nमिट्टी: चिकनी, उर्वर\nजलवायु: उष्णकटिबंधीय",
      ml: "ഉപയോഗങ്ങൾ: ഔഷധ, പാചകം\nമണ്ണ്: മണ്ണും, സമൃദ്ധം\nകാലാവസ്ഥ: ഉഷ്ണമേഖല",
    },
    yield: { en: "4–5 tons/acre", hi: "4–5 टन/एकड़", ml: "4–5 ടൺ/എക്കർ" },
    price: { en: "₹60–₹80/kg", hi: "₹60–₹80/किलो", ml: "₹60–₹80/കിലോ" },
    inputs: {
      en: "Water: High\nFertilizer: Organic manure",
      hi: "पानी: अधिक\nउर्वरक: जैविक खाद",
      ml: "വെള്ളം: കൂടുതലായി\nഉരവരകം: ജൈവ കൃഷിചാഴ്",
    },
    season: {
      en: "Planting: June | Harvest: Nov–Dec",
      hi: "बुआई: जून | कटाई: नव–दिसंबर",
      ml: "നട്ടൽ: ജൂൺ | ഫലമെടുക്കൽ: നവം–ഡിസം",
    },
    pests: {
      en: "Stem borer, Leaf folder",
      hi: "स्टेम बोरर, लीफ फोल्डर",
      ml: "സ്റ്റം ബോറർ, ഇല ഫോൾഡർ",
    },
  },
  {
    name: { en: "🥥 Coconut", hi: "🥥 नारियल", ml: "🥥 തേങ്ങ" },
    details: {
      en: "Uses: Culinary, Oil, Coir\nSoil: Sandy Loam\nClimate: Tropical",
      hi: "उपयोग: पाक, तेल, नारियल रस्सी\nमिट्टी: बलुई दोमट\nजलवायु: उष्णकटिबंधीय",
      ml: "ഉപയോഗങ്ങൾ: പാചകം, എണ്ണ, കോയർ\nമണ്ണ്: മണൽ ലോമി\nകാലാവസ്ഥ: ഉഷ്ണമേഖല",
    },
    yield: { en: "8–10 tons/acre", hi: "8–10 टन/एकड़", ml: "8–10 ടൺ/എക്കർ" },
    price: { en: "₹50–₹70/kg", hi: "₹50–₹70/किलो", ml: "₹50–₹70/കിലോ" },
    inputs: {
      en: "Water: Moderate\nFertilizer: Organic manure",
      hi: "पानी: मध्यम\nउर्वरक: जैविक खाद",
      ml: "വെള്ളം: മിതമായ\nഉരവരകം: ജൈവ കൃഷിചാഴ്",
    },
    season: {
      en: "Planting: March–April | Harvest: 3–5 years",
      hi: "बुआई: मार्च–अप्रैल | कटाई: 3–5 साल",
      ml: "നട്ടൽ: മാർച്ച്–ഏപ്രിൽ | ഫലമെടുക്കൽ: 3–5 വർഷം",
    },
    pests: {
      en: "Red palm weevil, Rhinoceros beetle",
      hi: "रेड पाम विव, राइनोसीरस बीटल",
      ml: "റെഡ് പാലം വീവ്, റൈനോസിറസ് കീടം",
    },
  },
];

// CropCard Component
function CropCard({ crop, onSelect, comparisonHandler, isSelected, language }) {
  return (
    <motion.div
      className="category-card"
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.3)" }}
      onClick={() => onSelect(crop)}
    >
      {/* Trending Badge */}
      <div className="badge">Trending</div>

      {/* Crop Icon & Name */}
      <div className="category-icon">{crop.name[language].split(" ")[0]}</div>
      <div className="category-name">{crop.name[language]}</div>

      {/* Crop Short Details */}
      <div
        className="category-details"
        style={{ fontSize: "12px", marginBottom: "10px" }}
      >
        {crop.details[language].split("\n").map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      {/* Season & Price Badges */}
      <div className="badge badge-season">
        {crop.season[language].split("|")[0]}
      </div>
      <div className="badge badge-price">{crop.price[language]}</div>

      {/* Compare Button */}
      <button
        className={`compare-btn ${isSelected ? "selected" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          comparisonHandler(crop, !isSelected);
        }}
      >
        {isSelected
          ? translations[language].selectedBtn
          : translations[language].selectBtn}
      </button>
    </motion.div>
  );
}

// Main Component
export default function CategoryAdvisoryPage({ onBack }) {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [language, setLanguage] = useState("en");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparisonPanel, setShowComparisonPanel] = useState(true);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  const t = translations[language];

  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // --- Speech Recognition setup ---
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = navigator.language || "en-IN";
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setLanguage(detectLanguageFromText(transcript));
        setChatInput(transcript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceInput = () => {
    if (recognitionRef.current) recognitionRef.current.start();
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { type: "user", text: chatInput }]);

    // AI response from guidelines (simulate fetch)
    const aiResponse = cropsData.find((crop) =>
      crop.name.en.toLowerCase().includes(chatInput.toLowerCase())
    )
      ? "Here are the details for your requested crop."
      : t.chatReply;

    setChatMessages((prev) => [...prev, { type: "bot", text: aiResponse }]);
    setChatInput("");
  };

  const handleCardClick = (crop) => {
    setSelectedCrop(crop);
    setChatOpen(true);
  };

  const handleComparison = (crop, checked) => {
    if (checked) {
      if (selectedForComparison.length < 3)
        setSelectedForComparison([...selectedForComparison, crop]);
    } else {
      setSelectedForComparison(selectedForComparison.filter((c) => c !== crop));
    }
  };

  return (
    <div className="category-page">
      <div className="language-selector-corner">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bh">Bhojpuri</option>
          <option value="ml">Malayalam</option>
        </select>
      </div>

      <button onClick={onBack} className="back-btn">
        {t.backBtn}
      </button>
      <h2 className="category-title">{t.trendingTitle}</h2>

      <div className="category-grid">
        {cropsData.map((crop, i) => (
          <CropCard
            key={i}
            crop={crop}
            onSelect={handleCardClick}
            comparisonHandler={handleComparison}
            isSelected={selectedForComparison.includes(crop)}
            language={language}
          />
        ))}
      </div>

      {/* Comparison Panel */}
      {selectedForComparison.length > 1 && showComparisonPanel && (
        <div className="comparison-panel">
          <div className="comparison-header">
            <h3>{t.comparisonTitle}</h3>
            <button
              className="close-comparison"
              onClick={() => setShowComparisonPanel(false)}
            >
              {t.closeComparison}
            </button>
          </div>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  {selectedForComparison.map((crop, idx) => (
                    <th key={idx} className="crop-name">
                      {crop.name[language]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t.yield}</td>
                  {selectedForComparison.map((crop, idx) => (
                    <td key={idx}>{crop.yield[language]}</td>
                  ))}
                </tr>
                <tr>
                  <td>{t.price}</td>
                  {selectedForComparison.map((crop, idx) => (
                    <td key={idx}>{crop.price[language]}</td>
                  ))}
                </tr>
                <tr>
                  <td>{t.inputs}</td>
                  {selectedForComparison.map((crop, idx) => (
                    <td key={idx}>{crop.inputs[language]}</td>
                  ))}
                </tr>
                <tr>
                  <td>{t.season}</td>
                  {selectedForComparison.map((crop, idx) => (
                    <td key={idx}>{crop.season[language]}</td>
                  ))}
                </tr>
                <tr>
                  <td>{t.pests}</td>
                  {selectedForComparison.map((crop, idx) => (
                    <td key={idx}>{crop.pests[language]}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Crop Modal & Chat */}
      <AnimatePresence>
        {selectedCrop && (
          <motion.div
            className="modal-overlay"
            onClick={() => setSelectedCrop(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, y: -50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div
                className="modal-header"
                style={{ backgroundColor: "#4caf50" }}
              >
                <div className="modal-icon">
                  {selectedCrop.name[language].split(" ")[0]}
                </div>
                <div className="modal-title">{selectedCrop.name[language]}</div>
              </div>
              <div className="modal-text">
                <p>
                  <strong>{t.details}:</strong>
                  <br />
                  {selectedCrop.details[language]}
                </p>
                <p>
                  <strong>{t.yield}:</strong> {selectedCrop.yield[language]}
                </p>
                <p>
                  <strong>{t.price}:</strong> {selectedCrop.price[language]}
                </p>
                <p>
                  <strong>{t.inputs}:</strong>
                  <br />
                  {selectedCrop.inputs[language]}
                </p>
                <p>
                  <strong>{t.season}:</strong> {selectedCrop.season[language]}
                </p>
                <p>
                  <strong>{t.pests}:</strong> {selectedCrop.pests[language]}
                </p>
              </div>

              {/* Chatbot Section */}
              {chatOpen && (
                <div className="chatbot-widget-global">
                  <div className="chatbot-messages">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`chatbot-response ${msg.type}`}>
                        {msg.text}
                      </div>
                    ))}
                    <div ref={chatEndRef}></div>
                  </div>
                  <div className="chatbot-section">
                    <input
                      type="text"
                      placeholder={t.chatPlaceholder}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend}>Send</button>
                    <button onClick={handleVoiceInput} className="mic-btn">
                      {listening ? "🎙 Listening..." : "🎤 Speak"}
                    </button>
                  </div>
                </div>
              )}

              <button
                className="modal-close-btn"
                onClick={() => setSelectedCrop(null)}
              >
                {t.modalClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
