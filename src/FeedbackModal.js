import React, { useState } from "react";
import "./FarmerRoadmap.css";

const FeedbackModal = ({ stepName, language, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const placeholderText =
    language === "hi"
      ? "अपनी प्रतिक्रिया दर्ज करें..."
      : language === "bho"
      ? "अपना फीडबैक डालू..."
      : language === "ml"
      ? "പ്രതികരിക്കൽ നൽകുക..."
      : "Enter your feedback...";

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{stepName}</h3>
        <textarea
          placeholder={placeholderText}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="submit-btn">
            {language === "hi"
              ? "सबमिट"
              : language === "bho"
              ? "सबमिट करीं"
              : language === "ml"
              ? "സമർപ്പിക്കുക"
              : "Submit"}
          </button>
          <button onClick={onClose} className="close-btn">
            {language === "hi"
              ? "बंद करें"
              : language === "bho"
              ? "बंद करीं"
              : language === "ml"
              ? "മൂട്"
              : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
