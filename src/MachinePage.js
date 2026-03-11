import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti"; // npm install react-confetti
import "./Machine.css";

// Machines Data
const MACHINES = [
  {
    name: "Tractor",
    img: "https://tse2.mm.bing.net/th/id/OIP.QA-XBtf4fgAXIMLNIsrCFgHaFW?pid=Api&P=0&h=220",
    fuel: "Diesel",
    costPerHour: 200,
    capacity: "Plough width 2.5m",
    weight: "1500kg",
    rent: 2000,
    buy: 150000,
    roiDays: 75,
    rating: 4.5,
  },
  {
    name: "Plough",
    img: "https://images.unsplash.com/photo-1610051478941-12c55d6e02ed?auto=format&fit=crop&w=400&q=80",
    fuel: "Diesel",
    costPerHour: 100,
    capacity: "Width 1.5m",
    weight: "800kg",
    rent: 500,
    buy: 35000,
    roiDays: 70,
    rating: 4.2,
  },
];

// Tutorials - Step-by-step
const TUTORIALS = {
  Tractor: [
    "Start engine.",
    "Adjust seat and mirrors.",
    "Operate levers safely.",
    "Check fuel levels.",
  ],
  Plough: [
    "Attach to tractor.",
    "Adjust depth.",
    "Plough slowly.",
    "Inspect soil after ploughing.",
  ],
};

// Providers Data
const PROVIDERS = {
  Tractor: [
    {
      name: "Raj Farm Rentals",
      lat: 25.3176,
      lng: 82.9739,
      availableDates: ["2025-09-25", "2025-09-26"],
    },
    {
      name: "Varanasi Agro",
      lat: 25.32,
      lng: 82.98,
      availableDates: ["2025-09-27"],
    },
  ],
  Plough: [
    {
      name: "Banaras Machines",
      lat: 25.315,
      lng: 82.97,
      availableDates: ["2025-09-25", "2025-09-28"],
    },
  ],
};

// LocalStorage helpers
const getHistory = () => {
  const saved = localStorage.getItem("machine_history_v2");
  return saved ? JSON.parse(saved) : [];
};
const saveHistory = (entry) => {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem("machine_history_v2", JSON.stringify(history));
};

export default function MachinePage({ onBack }) {
  const [step, setStep] = useState("choice"); // choice, rent, buy
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingDates, setBookingDates] = useState({ from: "", to: "" });
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Booking Confirm
  const handleBookingConfirm = (provider) => {
    alert(
      `Booking confirmed for ${selectedMachine} from ${provider.name} on ${bookingDates.from} to ${bookingDates.to}`
    );
    saveHistory({
      machine: selectedMachine,
      type: "Rent",
      from: bookingDates.from,
      to: bookingDates.to,
      provider: provider.name,
      date: new Date().toISOString(),
    });
    setShowBooking(false);
    setBookingDates({ from: "", to: "" });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Buy Handler
  const handleBuy = (m) => {
    saveHistory({
      machine: m.name,
      type: "Buy",
      provider: "N/A",
      cost: m.buy,
      date: new Date().toISOString(),
    });
    alert(`Purchased ${m.name} successfully!`);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // AI Recommendation
  const generateRecommendation = () => {
    if (!selectedMachine) return;
    setRecommendation(
      `AI Tip: Renting ${selectedMachine} for 2 days is optimal for your field.`
    );
  };
  const speakRecommendation = () => {
    if (!window.speechSynthesis)
      return alert("Speech synthesis not supported!");
    const utter = new SpeechSynthesisUtterance(recommendation);
    utter.lang = "hi-IN";
    window.speechSynthesis.speak(utter);
  };

  // Render Choice
  const renderChoice = () => (
    <div className="choice-grid">
      <motion.div
        className="choice-card"
        whileHover={{ scale: 1.05 }}
        onClick={() => setStep("rent")}
      >
        <h2>🚜 Rent</h2>
      </motion.div>
      <motion.div
        className="choice-card"
        whileHover={{ scale: 1.05 }}
        onClick={() => setStep("buy")}
      >
        <h2>🛒 Buy</h2>
      </motion.div>
    </div>
  );

  // Render Machines
  const renderMachines = () => (
    <div className="machine-grid">
      {MACHINES.map((m) => (
        <motion.div
          key={m.name}
          className={`machine-card ${
            selectedMachine === m.name ? "selected" : ""
          }`}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedMachine(m.name)}
        >
          <img src={m.img} alt={m.name} />
          <h3>{m.name}</h3>
          <p>
            Fuel: {m.fuel}{" "}
            <span className="tooltip" title="Type of fuel required">
              ℹ️
            </span>
          </p>
          <p>Cost/Hour: ₹{m.costPerHour}</p>
          <p>
            Capacity: {m.capacity}{" "}
            <span className="tooltip" title="Operational capacity of machine">
              ℹ️
            </span>
          </p>
          <p>Weight: {m.weight}</p>
          <p>Rating: ⭐ {m.rating}</p>
          <p>
            ROI Days: {m.roiDays}{" "}
            <span className="tooltip" title="Return on Investment Days">
              ℹ️
            </span>
          </p>

          {step === "rent" && (
            <>
              <button
                className="action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBooking(true);
                }}
              >
                Book Now
              </button>
              <button
                className="action-btn tutorial-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTutorial(true);
                  setTutorialStep(0);
                }}
              >
                Tutorial
              </button>
              <button
                className="action-btn tutorial-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMap(true);
                }}
              >
                Nearby Providers
              </button>
            </>
          )}
          {step === "buy" && (
            <button className="action-btn" onClick={() => handleBuy(m)}>
              Buy Now
            </button>
          )}
          {selectedMachine === m.name && (
            <p className="selected-msg">✅ Selected</p>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="machine-page">
      {showConfetti && <Confetti />}
      <header>
        <h2>Machinery Options</h2>
        <button
          className="back-btn"
          onClick={() => {
            if (step === "choice") onBack();
            else {
              setStep("choice");
              setSelectedMachine(null);
              setRecommendation("");
            }
          }}
        >
          &larr; Back
        </button>
      </header>

      {step === "choice" && renderChoice()}
      {(step === "rent" || step === "buy") && renderMachines()}

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedMachine && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Book {selectedMachine}</h3>
              <label>
                From:{" "}
                <input
                  type="date"
                  value={bookingDates.from}
                  onChange={(e) =>
                    setBookingDates({ ...bookingDates, from: e.target.value })
                  }
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="date"
                  value={bookingDates.to}
                  onChange={(e) =>
                    setBookingDates({ ...bookingDates, to: e.target.value })
                  }
                />
              </label>
              <h4>Select Provider:</h4>
              {PROVIDERS[selectedMachine].map((p) => (
                <div key={p.name}>
                  <p>
                    {p.name} - Available: {p.availableDates.join(", ")}
                  </p>
                  <button onClick={() => handleBookingConfirm(p)}>
                    Book from this Provider
                  </button>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && selectedMachine && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{selectedMachine} Tutorial</h3>
              <p>{TUTORIALS[selectedMachine][tutorialStep]}</p>
              <div className="tutorial-nav">
                <button
                  disabled={tutorialStep === 0}
                  onClick={() => setTutorialStep(tutorialStep - 1)}
                >
                  ⬅ Prev
                </button>
                <button
                  disabled={
                    tutorialStep === TUTORIALS[selectedMachine].length - 1
                  }
                  onClick={() => setTutorialStep(tutorialStep + 1)}
                >
                  Next ➡
                </button>
              </div>
              <button onClick={() => setShowTutorial(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && selectedMachine && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMap(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{selectedMachine} Nearby Providers</h3>
              {PROVIDERS[selectedMachine].map((p) => (
                <div key={p.name} className="provider-card">
                  <h4>{p.name}</h4>
                  <p>Available Dates: {p.availableDates.join(", ")}</p>
                  <iframe
                    title={p.name}
                    src={`https://maps.google.com/maps?q=${p.lat},${p.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="200"
                    style={{ borderRadius: "10px" }}
                  ></iframe>
                </div>
              ))}
              <button onClick={() => setShowMap(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Recommendation */}
      <div className="ai-recommendation">
        <button onClick={generateRecommendation}>
          Generate AI Recommendation
        </button>
        {recommendation && (
          <motion.div
            className="recommendation-card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{recommendation}</p>
            <button onClick={speakRecommendation}>
              🔊 Speak in Local Language
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
