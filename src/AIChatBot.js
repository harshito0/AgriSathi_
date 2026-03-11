import React, { useState } from "react";
import "./FarmerRoadmap.css";

const AIChatBot = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Mock AI response (replace with API call)
    const aiReply = {
      sender: "ai",
      text:
        language === "hi"
          ? "यहाँ आपकी सहायता के लिए सुझाव है।"
          : language === "bho"
          ? "ई हउअन सलाह आप खातिर।"
          : language === "ml"
          ? "ഇതാണ് നിങ്ങളുടെ സഹായത്തിന് സുലഭമായ നിർദ്ദേശം."
          : "Here’s a suggestion for you.",
    };
    setTimeout(() => setMessages((prev) => [...prev, aiReply]), 1000);
    setInput("");
  };

  return (
    <div className={`ai-chatbot ${isOpen ? "open" : ""}`}>
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              placeholder={
                language === "hi"
                  ? "अपना प्रश्न पूछें..."
                  : language === "bho"
                  ? "अपना सवाल पूछीं..."
                  : language === "ml"
                  ? "നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക..."
                  : "Ask your question..."
              }
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➡️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
