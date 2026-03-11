import React, { useState, useCallback } from "react";
import TimelineStep from "./TimelineStep";
import ProgressBar from "./ProgressBar";
import AIChatBot from "./AIChatBot";
import "./FarmerRoadmap.css";

const roadmapByRegion = {
  default: [
    {
      en: "Analyze soil and weather conditions",
      hi: "मृदा और मौसम की स्थिति का विश्लेषण करें",
      icon: "🌍",
      color: "green",
    },
    {
      en: "Choose the best crop variety for the season",
      hi: "ऋतु के अनुसार सर्वोत्तम फसल चुनें",
      icon: "🌾",
      color: "yellow",
    },
    {
      en: "Prepare land with sustainable practices",
      hi: "स्थायी तरीके से भूमि तैयार करें",
      icon: "🛠",
      color: "orange",
    },
    {
      en: "Plan irrigation and water management",
      hi: "सिंचाई और जल प्रबंधन की योजना बनाएं",
      icon: "💧",
      color: "blue",
    },
    {
      en: "Schedule fertilization and pest control",
      hi: "उर्वरक और कीट नियंत्रण का समय निर्धारित करें",
      icon: "🌿",
      color: "green-dark",
    },
    {
      en: "Harvest and store crops efficiently",
      hi: "फसल काटें और सुरक्षित संग्रह करें",
      icon: "🚜",
      color: "red",
    },
    {
      en: "Explore market channels for selling",
      hi: "बिक्री के लिए बाजार चैनल खोजें",
      icon: "💰",
      color: "purple",
    },
    {
      en: "Monitor crop growth and health",
      hi: "फसल की वृद्धि और स्वास्थ्य की निगरानी करें",
      icon: "🥬",
      color: "teal",
    },
    {
      en: "Implement organic or eco-friendly practices",
      hi: "जैविक या पर्यावरण-अनुकूल प्रथाएँ लागू करें",
      icon: "🌱",
      color: "lime",
    },
    {
      en: "Maintain farm equipment",
      hi: "कृषि उपकरणों का रखरखाव करें",
      icon: "⚙",
      color: "gray",
    },
    {
      en: "Record farming activities and data",
      hi: "कृषि गतिविधियों और डेटा को रिकॉर्ड करें",
      icon: "📊",
      color: "indigo",
    },
    {
      en: "Engage in community farming or training programs",
      hi: "सामुदायिक खेती या प्रशिक्षण कार्यक्रमों में भाग लें",
      icon: "🤝",
      color: "pink",
    },
  ],

  north: [
    {
      en: "Check frost and cold-weather risks",
      hi: "पाला और ठंड के जोखिम की जाँच करें",
      icon: "❄️",
      color: "blue",
    },
    {
      en: "Prefer wheat, mustard, or pulses in winter",
      hi: "सर्दियों में गेहूं, सरसों या दालें चुनें",
      icon: "🌾",
      color: "yellow",
    },
    {
      en: "Ensure timely irrigation in rabi season",
      hi: "रबी सीजन में समय पर सिंचाई सुनिश्चित करें",
      icon: "💧",
      color: "teal",
    },
    ...[
      {
        en: "Prepare land with sustainable practices",
        hi: "स्थायी तरीके से भूमि तैयार करें",
        icon: "🛠",
        color: "orange",
      },
      {
        en: "Schedule fertilization and pest control",
        hi: "उर्वरक और कीट नियंत्रण का समय निर्धारित करें",
        icon: "🌿",
        color: "green-dark",
      },
      {
        en: "Harvest and store crops efficiently",
        hi: "फसल काटें और सुरक्षित संग्रह करें",
        icon: "🚜",
        color: "red",
      },
      {
        en: "Explore market channels for selling",
        hi: "बिक्री के लिए बाजार चैनल खोजें",
        icon: "💰",
        color: "purple",
      },
      {
        en: "Monitor crop growth and health",
        hi: "फसल की वृद्धि और स्वास्थ्य की निगरानी करें",
        icon: "🥬",
        color: "teal",
      },
      {
        en: "Implement organic or eco-friendly practices",
        hi: "जैविक या पर्यावरण-अनुकूल प्रथाएँ लागू करें",
        icon: "🌱",
        color: "lime",
      },
      {
        en: "Maintain farm equipment",
        hi: "कृषि उपकरणों का रखरखाव करें",
        icon: "⚙",
        color: "gray",
      },
      {
        en: "Record farming activities and data",
        hi: "कृषि गतिविधियों और डेटा को रिकॉर्ड करें",
        icon: "📊",
        color: "indigo",
      },
      {
        en: "Engage in community farming or training programs",
        hi: "सामुदायिक खेती या प्रशिक्षण कार्यक्रमों में भाग लें",
        icon: "🤝",
        color: "pink",
      },
    ],
  ],

  south: [
    {
      en: "Monitor monsoon rainfall patterns",
      hi: "मानसून वर्षा पैटर्न की निगरानी करें",
      icon: "🌧",
      color: "teal",
    },
    {
      en: "Prefer rice, sugarcane, or coconut crops",
      hi: "धान, गन्ना या नारियल की फसलें चुनें",
      icon: "🥥",
      color: "green",
    },
    {
      en: "Adopt drip irrigation for water efficiency",
      hi: "जल दक्षता के लिए ड्रिप सिंचाई अपनाएँ",
      icon: "💧",
      color: "blue",
    },
    ...[
      {
        en: "Prepare land with sustainable practices",
        hi: "स्थायी तरीके से भूमि तैयार करें",
        icon: "🛠",
        color: "orange",
      },
      {
        en: "Schedule fertilization and pest control",
        hi: "उर्वरक और कीट नियंत्रण का समय निर्धारित करें",
        icon: "🌿",
        color: "green-dark",
      },
      {
        en: "Harvest and store crops efficiently",
        hi: "फसल काटें और सुरक्षित संग्रह करें",
        icon: "🚜",
        color: "red",
      },
      {
        en: "Explore market channels for selling",
        hi: "बिक्री के लिए बाजार चैनल खोजें",
        icon: "💰",
        color: "purple",
      },
      {
        en: "Monitor crop growth and health",
        hi: "फसल की वृद्धि और स्वास्थ्य की निगरानी करें",
        icon: "🥬",
        color: "teal",
      },
      {
        en: "Implement organic or eco-friendly practices",
        hi: "जैविक या पर्यावरण-अनुकूल प्रथाएँ लागू करें",
        icon: "🌱",
        color: "lime",
      },
      {
        en: "Maintain farm equipment",
        hi: "कृषि उपकरणों का रखरखाव करें",
        icon: "⚙",
        color: "gray",
      },
      {
        en: "Record farming activities and data",
        hi: "कृषि गतिविधियों और डेटा को रिकॉर्ड करें",
        icon: "📊",
        color: "indigo",
      },
      {
        en: "Engage in community farming or training programs",
        hi: "सामुदायिक खेती या प्रशिक्षण कार्यक्रमों में भाग लें",
        icon: "🤝",
        color: "pink",
      },
    ],
  ],

  east: [
    {
      en: "Focus on tea, jute, and rice farming",
      hi: "चाय, जूट और धान की खेती पर ध्यान दें",
      icon: "🍵",
      color: "green",
    },
    {
      en: "Check for flood and waterlogging risks",
      hi: "बाढ़ और जलभराव के जोखिम की जाँच करें",
      icon: "🌊",
      color: "blue",
    },
    {
      en: "Improve soil with organic compost",
      hi: "जैविक खाद से मिट्टी सुधारें",
      icon: "🌱",
      color: "lime",
    },
    ...[
      {
        en: "Prepare land with sustainable practices",
        hi: "स्थायी तरीके से भूमि तैयार करें",
        icon: "🛠",
        color: "orange",
      },
      {
        en: "Schedule fertilization and pest control",
        hi: "उर्वरक और कीट नियंत्रण का समय निर्धारित करें",
        icon: "🌿",
        color: "green-dark",
      },
      {
        en: "Harvest and store crops efficiently",
        hi: "फसल काटें और सुरक्षित संग्रह करें",
        icon: "🚜",
        color: "red",
      },
      {
        en: "Explore market channels for selling",
        hi: "बिक्री के लिए बाजार चैनल खोजें",
        icon: "💰",
        color: "purple",
      },
      {
        en: "Monitor crop growth and health",
        hi: "फसल की वृद्धि और स्वास्थ्य की निगरानी करें",
        icon: "🥬",
        color: "teal",
      },
      {
        en: "Maintain farm equipment",
        hi: "कृषि उपकरणों का रखरखाव करें",
        icon: "⚙",
        color: "gray",
      },
      {
        en: "Record farming activities and data",
        hi: "कृषि गतिविधियों और डेटा को रिकॉर्ड करें",
        icon: "📊",
        color: "indigo",
      },
      {
        en: "Engage in community farming or training programs",
        hi: "सामुदायिक खेती या प्रशिक्षण कार्यक्रमों में भाग लें",
        icon: "🤝",
        color: "pink",
      },
    ],
  ],

  west: [
    {
      en: "Plan farming with limited rainfall in mind",
      hi: "कम वर्षा को ध्यान में रखकर खेती की योजना बनाएं",
      icon: "☀️",
      color: "orange",
    },
    {
      en: "Prefer millets, bajra, and pulses",
      hi: "बाजरा, ज्वार और दालें चुनें",
      icon: "🌾",
      color: "yellow",
    },
    {
      en: "Adopt water conservation techniques",
      hi: "जल संरक्षण तकनीक अपनाएँ",
      icon: "💧",
      color: "blue",
    },
    ...[
      {
        en: "Prepare land with sustainable practices",
        hi: "स्थायी तरीके से भूमि तैयार करें",
        icon: "🛠",
        color: "orange",
      },
      {
        en: "Schedule fertilization and pest control",
        hi: "उर्वरक और कीट नियंत्रण का समय निर्धारित करें",
        icon: "🌿",
        color: "green-dark",
      },
      {
        en: "Harvest and store crops efficiently",
        hi: "फसल काटें और सुरक्षित संग्रह करें",
        icon: "🚜",
        color: "red",
      },
      {
        en: "Explore market channels for selling",
        hi: "बिक्री के लिए बाजार चैनल खोजें",
        icon: "💰",
        color: "purple",
      },
      {
        en: "Monitor crop growth and health",
        hi: "फसल की वृद्धि और स्वास्थ्य की निगरानी करें",
        icon: "🥬",
        color: "teal",
      },
      {
        en: "Implement organic or eco-friendly practices",
        hi: "जैविक या पर्यावरण-अनुकूल प्रथाएँ लागू करें",
        icon: "🌱",
        color: "lime",
      },
      {
        en: "Maintain farm equipment",
        hi: "कृषि उपकरणों का रखरखाव करें",
        icon: "⚙",
        color: "gray",
      },
      {
        en: "Record farming activities and data",
        hi: "कृषि गतिविधियों और डेटा को रिकॉर्ड करें",
        icon: "📊",
        color: "indigo",
      },
      {
        en: "Engage in community farming or training programs",
        hi: "सामुदायिक खेती या प्रशिक्षण कार्यक्रमों में भाग लें",
        icon: "🤝",
        color: "pink",
      },
    ],
  ],
};

const FarmerRoadmap = ({ language = "en", onBack }) => {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [region, setRegion] = useState("default");

  const speak = useCallback(
    (text) => {
      if (!("speechSynthesis" in window)) return;
      const langMap = { en: "en-US", hi: "hi-IN", bho: "hi-IN", ml: "ml-IN" };
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = langMap[language] || "en-US";
      utter.rate = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    },
    [language]
  );

  const handleGenerate = () => {
    if (!goal.trim()) return;
    setRoadmap(roadmapByRegion[region] || roadmapByRegion.default);
    setCompletedSteps([]);
  };

  const handleStepComplete = (stepName) => {
    setCompletedSteps((prev) => [...prev, stepName]);
  };

  return (
    <div className="farmer-roadmap-container">
      <button onClick={onBack} className="back-btn">
        ← Back
      </button>

      <h2 className="roadmap-title">
        🌱{" "}
        {language === "hi"
          ? "किसान रोडमैप"
          : language === "bho"
          ? "किसान रोडमैप"
          : language === "ml"
          ? "കർഷക റോഡ്മാപ്പ്"
          : "Farmer Roadmap"}
      </h2>

      {/* Goal + Region Selector */}
      <div className="goal-input-container">
        <input
          type="text"
          placeholder={
            language === "hi"
              ? "अपना खेती का लक्ष्य दर्ज करें..."
              : language === "bho"
              ? "अपना खेती के लक्ष्य डालू..."
              : language === "ml"
              ? "നിങ്ങളുടെ കൃഷി ലക്ഷ്യം നൽകുക..."
              : "Enter your farming goal..."
          }
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="goal-input"
        />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="region-selector"
        >
          <option value="default">🌍 General</option>
          <option value="north">❄️ North India</option>
          <option value="south">🌧 South India</option>
          <option value="east">🍵 East India</option>
          <option value="west">☀️ West India</option>
        </select>

        <button onClick={handleGenerate} className="generate-btn">
          Generate
        </button>
      </div>

      {roadmap.length > 0 && (
        <>
          <ProgressBar
            completed={completedSteps.length}
            total={roadmap.length}
          />
          <div className="timeline-container">
            {roadmap.map((step, i) => (
              <TimelineStep
                key={i}
                step={step}
                language={language}
                index={i}
                speak={speak}
                showArrow={i < roadmap.length - 1}
                onComplete={handleStepComplete}
              />
            ))}
          </div>
        </>
      )}

      <AIChatBot language={language} />
    </div>
  );
};

export default FarmerRoadmap;
