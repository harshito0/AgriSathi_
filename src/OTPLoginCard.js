import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const OTPLoginCard = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [location, setLocation] = useState(
    localStorage.getItem("location") || ""
  );

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      onLogin({ name, location, phone });
    }
  }, []);

  const sendOtp = async () => {
    if (!phone.match(/^\d{10}$/)) return alert("Enter valid 10-digit number");
    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(2);
        alert("OTP sent! Check your phone.");
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Server error: " + err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(3);
        alert("OTP verified!");
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Server error: " + err.message);
    }
  };

  const completeProfile = () => {
    if (!name || !location) return alert("Enter name & location");
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("phone", phone);
    localStorage.setItem("name", name);
    localStorage.setItem("location", location);
    onLogin({ name, location, phone });
  };

  return (
    <motion.div
      className="otp-card"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h2>Welcome to AgriSathi 🌾</h2>

      {step === 1 && (
        <div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOtp}>Verify OTP</button>
          <button onClick={() => setStep(1)}>Change Number</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <button onClick={completeProfile}>Continue</button>
        </div>
      )}
    </motion.div>
  );
};

export default OTPLoginCard;
