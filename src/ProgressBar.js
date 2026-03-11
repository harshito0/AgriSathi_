import React from "react";
import "./FarmerRoadmap.css";

const ProgressBar = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      <span className="progress-label">{percentage}% Completed</span>
    </div>
  );
};

export default ProgressBar;
