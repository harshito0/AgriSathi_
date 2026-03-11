import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./FarmerRoadmap.css";

const TimelineStep = ({
  step,
  language,
  index,
  speak,
  showArrow,
  onComplete,
}) => {
  const controls = useAnimation();
  const [completed, setCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, x: 0, transition: { delay: index * 0.2 } });
  }, [controls, index]);

  const handleComplete = () => {
    setCompleted(true);
    setShowFeedback(true);
    onComplete(step.en);
  };

  return (
    <>
      <motion.div
        className={`timeline-step ${completed ? "completed" : ""}`}
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
      >
        <div className="timeline-dot">{step.icon}</div>
        <div className="timeline-card">
          <p>{step[language] || step.en}</p>
          <div className="timeline-actions">
            <button onClick={() => speak(step[language] || step.en)}>
              🔊 Listen
            </button>
            {!completed && (
              <button onClick={handleComplete} className="complete-btn">
                ✅ Complete
              </button>
            )}
          </div>
        </div>
        {showArrow && <div className="timeline-arrow"></div>}
      </motion.div>
      {showFeedback && (
        <div className="feedback-popup">
          <p>Give feedback for: {step[language] || step.en}</p>
          <textarea placeholder="Type your feedback..." />
          <button onClick={() => setShowFeedback(false)}>Submit</button>
        </div>
      )}
    </>
  );
};

export default TimelineStep;
