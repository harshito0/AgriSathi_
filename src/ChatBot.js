import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatBot({
  language,
  setLanguage,
  rate,
  setRate,
  messages,
  appendMessage,
  sendMessage,
}) {
  const chatBoxRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  // Speech synthesis
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    const langMap = { hi: "hi-IN", bho: "hi-IN", ml: "ml-IN", en: "en-US" };
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langMap[language] || "en-US";
    utter.rate = parseFloat(rate);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // Voice input
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
      sendMessage(event.results[0][0].transcript);
    };
  };

  const t = {
    en: {
      chatTitle: "💬 Ask AgriSathi",
      selectCrop: "Select Your Crop",
      selectRegion: "Select Your Region",
      chooseRegion: "Choose region...",
      language: "Language",
      speechRate: "Speech Rate",
      inputPlaceholder: "Ask your question...",
      sendButton: "Send",
    },
    hi: {
      chatTitle: "💬 एग्रीसाथी से पूछें",
      selectCrop: "अपनी फसल चुनें",
      selectRegion: "अपना क्षेत्र चुनें",
      chooseRegion: "क्षेत्र चुनें...",
      language: "भाषा",
      speechRate: "वाणी की गति",
      inputPlaceholder: "अपना प्रश्न पूछें...",
      sendButton: "भेजें",
    },
    bho: {
      chatTitle: "💬 एग्रीसाथी से पूछीं",
      selectCrop: "फसल चुनल जाव",
      selectRegion: "इलाका चुनल जाव",
      chooseRegion: "इलाका चुनल जाव...",
      language: "भाषा",
      speechRate: "बोली के गति",
      inputPlaceholder: "अपना सवाल पूछीं...",
      sendButton: "भेजीं",
    },
    ml: {
      chatTitle: "💬 അഗ്രിസാഥിയോട് ചോദിക്കുക",
      selectCrop: "നിങ്ങളുടെ വിള തിരഞ്ഞെടുക്കുക",
      selectRegion: "നിങ്ങളുടെ പ്രദേശം തിരഞ്ഞെടുക്കുക",
      chooseRegion: "പ്രദേശം തിരഞ്ഞെടുക്കുക...",
      language: "ഭാഷ",
      speechRate: "വാചക നിരക്ക്",
      inputPlaceholder: "നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക...",
      sendButton: "പ്രൊഴാനിരച്ചത്",
    },
  }[language || "en"];

  return (
    <section id="chat" className="chat-section">
      <h3 className="chat-title">{t.chatTitle}</h3>

      <div className="flex justify-center items-center gap-4 flex-wrap mb-4">
        <div>
          <label className="font-semibold mr-2">{t.language}:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {/* <option value="en">English</option> */}
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
          placeholder={t.inputPlaceholder}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          onChange={(e) => {}}
        />
        <button className="send-button" onClick={() => sendMessage()}>
          {t.sendButton}
        </button>
        <button className="voice-button" onClick={startVoice}>
          🎤
        </button>
      </div>
    </section>
  );
}
