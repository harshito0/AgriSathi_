import React, { useState, useRef, useEffect } from "react";
import "./Notifications.css";

const LATEST_NEWS = [
  {
    title:
      "Cabinet approves Modification/addition of the features/ provisions in the ongoing Central Sector Scheme of PMFBY and RWBCIS for its implementation",
    summary: {
      en: "Cabinet approves Modification/addition of the features/ provisions in the ongoing Central Sector Scheme of PMFBY and RWBCIS for its implementation.",
      hi: "मंत्रिमंडल ने PMFBY और RWBCIS की चल रही केंद्रीय क्षेत्र योजना में कार्यान्वयन के लिए सुविधाओं/प्रावधानों के संशोधन/अतिरिक्त को मंजूरी दी।",
    },
    date: "06-01-2025",
    link: "https://example.com/download-423KB.pdf",
  },
  {
    title:
      "खरीफ विपणन मौसम (KMS) 2025-26 के लिए खरीफ फसलों हेतु न्यूनतम समर्थन मूल्य (MSP) की बढ़ोतरी की गई",
    summary: {
      en: "Minimum Support Price (MSP) for Kharif crops has been increased for the Kharif Marketing Season (KMS) 2025-26.",
      hi: "खरीफ विपणन मौसम (KMS) 2025-26 के लिए खरीफ फसलों हेतु न्यूनतम समर्थन मूल्य (MSP) की बढ़ोतरी की गई।",
    },
    date: "05-01-2025",
    link: "https://example.com/msp-increase.pdf",
  },
  {
    title:
      "2025-26 में चयनित फसलों के लिए प्रौद्योगिकियों का उपयोग करके ग्राम पंचायत (GP) स्तर पर फसल उपज अनुमान के लिए विधि की अभिव्यक्ति हेतु निमंत्रण",
    summary: {
      en: "Invitation to express methodology for crop yield estimation at Gram Panchayat (GP) level using technologies for selected crops in 2025-26.",
      hi: "2025-26 में चयनित फसलों के लिए प्रौद्योगिकियों का उपयोग करके ग्राम पंचायत (GP) स्तर पर फसल उपज अनुमान के लिए विधि की अभिव्यक्ति हेतु निमंत्रण।",
    },
    date: "04-01-2025",
    link: "https://example.com/methodology-invite.pdf",
  },
  {
    title:
      "राष्ट्रीय किसान कल्याण कार्यक्रम सोसाइटी (NFWPIS) में प्रतिनियुक्ति (STC) के आधार पर तेरह (13) पदों को भरना।",
    summary: {
      en: "Filling of thirteen (13) posts on deputation (STC) basis in the National Farmers' Welfare Programme Society (NFWPIS).",
      hi: "राष्ट्रीय किसान कल्याण कार्यक्रम सोसाइटी (NFWPIS) में प्रतिनियुक्ति (STC) के आधार पर तेरह (13) पदों को भरना।",
    },
    date: "03-01-2025",
    link: "https://example.com/nfwis-posts.pdf",
  },
  {
    title: "मंत्रिमंडल ने प्रधानमंत्री फसल बीमा योजना को मंजूरी दी।",
    summary: {
      en: "Cabinet approves Pradhan Mantri Fasal Bima Yojana.",
      hi: "मंत्रिमंडल ने प्रधानमंत्री फसल बीमा योजना को मंजूरी दी।",
    },
    date: "02-01-2025",
    link: "https://example.com/pmfby-approval.pdf",
  },
];

const translations = {
  en: {
    whatsNew: "What's New",
    seeMore: "See more",
    agricultureNews: "Agriculture News",
    publishDate: "Publish Date:",
    download: "Download",
    noNotifications: "No notifications available.",
    listen: "Listen",
  },
  hi: {
    whatsNew: "नया क्या है",
    seeMore: "और देखें",
    agricultureNews: "कृषि समाचार",
    publishDate: "प्रकाशन तिथि:",
    download: "डाउनलोड करें",
    noNotifications: "कोई सूचना उपलब्ध नहीं है।",
    listen: "सुनें",
  },
  bho: {
    whatsNew: "का नया बा",
    seeMore: "अउरी देखी",
    agricultureNews: "कृषि समाचार",
    publishDate: "प्रकाशित:",
    download: "डाउनलोड करीं",
    noNotifications: "कोई सूचना नइखे।",
    listen: "सुनल जाव",
  },
  ml: {
    whatsNew: "പുതിയത് എന്ത്",
    seeMore: "കൂടുതൽ കാണുക",
    agricultureNews: "കൃഷി വാർത്ത",
    publishDate: "പ്രസിദ്ധീകരിച്ചത്:",
    download: "ഡൗൺലോഡ് ചെയ്യുക",
    noNotifications: "ഏതെങ്കിലും അറിയിപ്പ് ലഭ്യമല്ല.",
    listen: "കേൾക്കൂ",
  },
};

const AgriSathiNotifications = () => {
  const [selectedNews, setSelectedNews] = useState(LATEST_NEWS[0]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("hi");
  const [aiSummary, setAiSummary] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef(null);
  const chatEndRef = useRef(null);

  const t = translations[language] || translations.en;

  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const speakText = async (text) => {
    if (audioRef.current) audioRef.current.pause();
    try {
      const payload = { text, language };
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const audio = new Audio(data.ttsUrl);
      audioRef.current = audio;
      audio.play();
      setAudioPlaying(true);
      audio.onended = () => setAudioPlaying(false);
    } catch (err) {
      console.error("TTS error:", err);
      setAudioPlaying(false);
    }
  };

  const handleNewsClick = async (news) => {
    setSelectedNews(news);
    setLoading(true);
    setAiSummary("");

    try {
      const prompt = `Summarize this news in ${language} for a farmer:\n${news.summary.en}`;
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language }),
      });
      const data = await response.json();
      const summary = data.summary || news.summary[language] || news.summary.en;

      setAiSummary(summary);
      setChatOpen(true);
      setChatMessages((prev) => [...prev, `AgriSathi: ${summary}`]);
      speakText(summary);
    } catch (err) {
      console.error("AI summary error:", err);
      setAiSummary(news.summary[language] || news.summary.en);
      setChatOpen(true);
      setChatMessages((prev) => [
        ...prev,
        `AgriSathi: ${news.summary[language] || news.summary.en}`,
      ]);
      speakText(news.summary[language] || news.summary.en);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!userInput.trim()) return;
    const question = userInput.trim();
    setChatMessages((prev) => [...prev, `You: ${question}`]);
    setUserInput("");

    try {
      const prompt = `Answer this question for a farmer in ${language}: ${question}`;
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language }),
      });
      const data = await response.json();
      const answer = data.summary || "Sorry, I cannot answer that right now.";
      setChatMessages((prev) => [...prev, `AgriSathi: ${answer}`]);
      speakText(answer);
    } catch (err) {
      console.error("Chatbot error:", err);
      setChatMessages((prev) => [...prev, "AgriSathi: Something went wrong."]);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
        setAudioPlaying(false);
      } else {
        audioRef.current.play();
        setAudioPlaying(true);
      }
    } else if (aiSummary) {
      speakText(aiSummary);
    }
  };

  const goBack = () => {
    window.location.href = "/"; // replace with landing page route
  };

  return (
    <div className="notifications-container">
      <div className="left-column">
        <div className="header">
          <h2 className="header-title">{t.whatsNew}</h2>
          <button className="see-more-button">{t.seeMore}</button>
        </div>
        <div className="news-list">
          {LATEST_NEWS.map((news, i) => (
            <div
              key={i}
              className={`news-card ${
                selectedNews?.title === news.title ? "news-card-selected" : ""
              }`}
              onClick={() => handleNewsClick(news)}
            >
              <p className="news-summary">
                {news.summary[language] || news.summary.en}{" "}
                <span className="news-icon">&#x1F331;</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="right-column">
        <div
          className="top-right-controls"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="back-button"
            onClick={goBack}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ← Back
          </button>
          <div className="language-selector">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="hi">Hindi</option>
              <option value="en">English</option>
              <option value="bho">Bhojpuri</option>
              <option value="ml">Malayalam</option>
            </select>
          </div>
        </div>

        <h2 className="header-title">{t.agricultureNews}</h2>
        {loading && <p className="loading-message">Loading...</p>}
        {!loading && selectedNews && (
          <div className="news-details-card">
            <div className="news-details-content">
              <h3 className="news-details-title">{selectedNews?.title}</h3>
              <p className="news-summary">
                {aiSummary || selectedNews.summary[language]}
              </p>

              <button
                className="speaker-button"
                onClick={toggleAudio}
                style={{
                  margin: "10px 0",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {audioPlaying ? "Stop 🔊" : `${t.listen} 🔊`}
              </button>

              <div className="news-details-item">
                <span className="download-link">{t.download} (423 KB)</span>
              </div>
              <div className="news-details-item">
                <span>
                  {t.publishDate} {selectedNews.date}
                </span>
              </div>

              <div
                className="chatbot-container"
                style={{ marginTop: "20px", width: "100%", height: "400px" }}
              >
                {chatOpen && (
                  <div
                    className="chatbot-body"
                    style={{
                      height: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      background: "#fefefe",
                    }}
                  >
                    <div
                      className="chatbot-messages"
                      style={{
                        flexGrow: 1,
                        overflowY: "auto",
                        marginBottom: "10px",
                      }}
                    >
                      {chatMessages.length === 0 && (
                        <div className="chatbot-response">
                          Ask me about the latest agriculture news!
                        </div>
                      )}
                      {chatMessages.map((msg, i) => (
                        <div key={i} className="chatbot-response">
                          {msg}
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div
                      className="chatbot-input-section"
                      style={{ display: "flex", gap: "5px" }}
                    >
                      <input
                        type="text"
                        className="chatbot-input"
                        placeholder="Type your question..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAsk();
                        }}
                        style={{
                          flexGrow: 1,
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                        }}
                      />
                      <button
                        className="chatbot-send"
                        onClick={handleAsk}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "5px",
                          backgroundColor: "#4caf50",
                          color: "white",
                          border: "none",
                        }}
                      >
                        Ask
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgriSathiNotifications;
