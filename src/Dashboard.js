import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import "./Dashboard.css";

// ---------------- OTP + Profile Login Card ----------------
const OTPLoginCard = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const sendOtp = () => {
    if (!phone.match(/^\d{10}$/)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otpCode);
    setStep(2);
    alert(`Your OTP is: ${otpCode}`);
  };

  const verifyOtp = () => {
    if (otp === String(generatedOtp)) {
      // Check if user data exists
      const savedData = localStorage.getItem(`user_${phone}`);
      if (savedData) {
        onLogin(JSON.parse(savedData));
      } else {
        setStep(3); // Ask profile info if new user
      }
    } else {
      alert("Invalid OTP");
    }
  };

  const completeProfile = () => {
    if (!name.trim() || !location.trim()) {
      alert("Please enter your name and location");
      return;
    }

    const userInfo = { name, location, phone };

    // Initialize full dashboard data
    const fullData = {
      userInfo,
      expenses: { seeds: 1200, fertilizer: 800, labor: 1500 },
      machineHistory: [],
      recommendedCrops: [],
    };

    localStorage.setItem(`user_${phone}`, JSON.stringify(fullData));
    onLogin(fullData);
  };

  return (
    <motion.div
      className="otp-card"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h2 className="otp-title">Welcome to AgriSathi 🌾</h2>

      {step === 1 && (
        <div className="otp-step">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="btn-primary" onClick={sendOtp}>
            Send OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="otp-step">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn-primary" onClick={verifyOtp}>
            Verify OTP
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              setStep(1);
              setOtp("");
              setGeneratedOtp(null);
            }}
          >
            Change Number
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="otp-step">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn-primary" onClick={completeProfile}>
            Continue
          </button>
        </div>
      )}
    </motion.div>
  );
};

// ---------------- Weather Card ----------------
const WeatherCard = ({ weather }) => (
  <div className="card small-card">
    <h3 className="card-title">🌦 Weather</h3>
    <div className="weather-grid">
      <div>
        <div className="weather-temp">{weather.temp}°C</div>
        <div className="weather-desc">{weather.condition}</div>
      </div>
      <div className="weather-meta">
        <div>Rain: {weather.rain}%</div>
        <div>Wind: {weather.wind} km/h</div>
      </div>
    </div>
    <div className="forecast">
      {weather.forecast.map((f, i) => (
        <div key={i} className="forecast-item">
          {["Tue", "Wed", "Thu"][i]}: {f}°
        </div>
      ))}
    </div>
  </div>
);

// ---------------- Alerts Card ----------------
const AlertsCard = ({ alerts }) => (
  <div className="card small-card">
    <h3 className="card-title">🔔 Alerts</h3>
    <ul className="alerts-list">
      {alerts.length ? (
        alerts.map((a, i) => (
          <li key={i} className={`alert-item ${a.type}`}>
            <strong>{a.title}</strong>
            <div className="alert-meta">{a.message}</div>
          </li>
        ))
      ) : (
        <li className="alert-item neutral">No alerts</li>
      )}
    </ul>
  </div>
);

// ---------------- Scheme History ----------------
const SchemeHistory = ({ items }) => (
  <ul className="history-list">
    {items.map((h, i) => (
      <li key={i}>
        {h.scheme} — {h.status} ({h.date})
      </li>
    ))}
  </ul>
);

// ---------------- AI Assistant Modal ----------------
const AiAssistantModal = ({ open, onClose }) => {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setQ("");
      setAnswer(null);
      setLoading(false);
    }
  }, [open]);

  const ask = () => {
    if (!q.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setAnswer(
        `AI Suggestion for: "${q}" — Try crop rotation and optimize fertilizer usage.`
      );
      setLoading(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ai-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="ai-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="ai-header">
              <h3>Ask AgriSathi 🤖</h3>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>
            <textarea
              placeholder="Ask about crops, weather, pests..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="ai-actions">
              <button className="btn-secondary" onClick={() => setQ("")}>
                Clear
              </button>
              <button className="btn-primary" onClick={ask}>
                {loading ? "Thinking..." : "Ask"}
              </button>
            </div>
            {answer && (
              <div className="ai-answer">
                <p>{answer}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------------- Main Dashboard ----------------
const Dashboard = ({ onBack }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);

  const [expenses, setExpenses] = useState({
    seeds: 1200,
    fertilizer: 800,
    labor: 1500,
  });
  const [incomeTrend] = useState([
    { month: "Jan", income: 12000, expenses: 8000 },
    { month: "Feb", income: 15000, expenses: 9000 },
    { month: "Mar", income: 10000, expenses: 7000 },
    { month: "Apr", income: 18000, expenses: 11000 },
    { month: "May", income: 21000, expenses: 12000 },
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const [machineHistory, setMachineHistory] = useState([]);
  const [landArea, setLandArea] = useState("");
  const [waterSource, setWaterSource] = useState("canal");
  const [soilType, setSoilType] = useState("alluvial");
  const [season, setSeason] = useState("Kharif");
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // Load last logged-in user
  useEffect(() => {
    const lastUserPhone = localStorage.getItem("lastUser_v1");
    if (lastUserPhone) {
      const savedData = localStorage.getItem(`user_${lastUserPhone}`);
      if (savedData) {
        const data = JSON.parse(savedData);
        setUserInfo(data);
        setExpenses(data.expenses);
        setMachineHistory(data.machineHistory);
        setRecommendedCrops(data.recommendedCrops);
      }
    }
  }, []);

  // Persist dashboard changes for this user
  useEffect(() => {
    if (userInfo) {
      const phone = userInfo.userInfo.phone;
      const fullData = {
        ...userInfo,
        expenses,
        machineHistory,
        recommendedCrops,
      };
      localStorage.setItem(`user_${phone}`, JSON.stringify(fullData));
      localStorage.setItem("lastUser_v1", phone); // remember last login
    }
  }, [expenses, machineHistory, recommendedCrops, userInfo]);

  const totalExpenses =
    Number(expenses.seeds) +
    Number(expenses.fertilizer) +
    Number(expenses.labor);
  const totalIncome = 25000;
  const totalProfit = totalIncome - totalExpenses;

  const calculateCrops = () => {
    const area = parseFloat(landArea);
    if (!area || area <= 0) return alert("Enter valid land area > 0.");
    const cropsData = [
      {
        crop: "Wheat",
        seasons: ["Rabi"],
        irrigation: ["canal", "borewell", "rainfed"],
        soilTypes: ["alluvial", "black"],
        minLand: 1,
        notes: "High yield",
        nextCrop: "Legumes",
      },
      {
        crop: "Maize",
        seasons: ["Kharif"],
        irrigation: ["canal", "borewell"],
        soilTypes: ["alluvial", "red"],
        minLand: 2,
        notes: "Requires good irrigation",
        nextCrop: "Soybean",
      },
    ];
    const matches = cropsData.filter(
      (c) =>
        c.seasons.includes(season) &&
        c.irrigation.includes(waterSource) &&
        c.soilTypes.includes(soilType) &&
        area >= c.minLand
    );
    setRecommendedCrops(matches);
    setShowResult(true);
  };

  if (!userInfo) return <OTPLoginCard onLogin={setUserInfo} />;

  const expenseData = [
    { name: "Seeds", value: Number(expenses.seeds) || 0 },
    { name: "Fertilizer", value: Number(expenses.fertilizer) || 0 },
    { name: "Labor", value: Number(expenses.labor) || 0 },
  ];
  const COLORS = ["#16a34a", "#f59e0b", "#3b82f6"];
  const schemeHistory = [
    {
      year: "2025",
      scheme: "PM-Kisan Installment",
      status: "Credited ₹2,000",
      date: "05 Jan 2025",
    },
    {
      year: "2024",
      scheme: "Fertilizer Subsidy",
      status: "Credited ₹1,500",
      date: "20 Feb 2024",
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="top-row">
        <button className="back-btn" onClick={onBack}>
          ⬅ Back
        </button>
        <div>
          <h1>AgriSathi — Farmer Dashboard</h1>
          <p>
            Welcome {userInfo.userInfo.name} from {userInfo.userInfo.location}
          </p>
        </div>
        <button className="btn-secondary" onClick={() => setAiOpen(true)}>
          Ask AgriSathi 🤖
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            localStorage.removeItem("lastUser_v1");
            setUserInfo(null);
          }}
        >
          Logout
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid-3">
        <WeatherCard
          weather={{
            temp: 29,
            condition: "Partly Cloudy",
            rain: 20,
            wind: 8,
            forecast: [30, 28, 27],
          }}
        />
        <AlertsCard
          alerts={[
            {
              title: "Irrigation Needed",
              message: "Last irrigated 10 days ago",
              type: "warning",
            },
            {
              title: "Pest Alert",
              message: "Fall armyworm nearby",
              type: "danger",
            },
          ]}
        />
        <div className="card small-card">
          <h3>💰 Expenses</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
              >
                {expenseData.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crop Planner & Finance */}
      <div className="grid-2">
        <motion.div
          className="card"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3>🌱 Crop Planner & AI Suggestions</h3>
          <div className="form-grid">
            <div>
              <label>Land Area (acres)</label>
              <input
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label>Water Source</label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
              >
                <option value="canal">Canal / River</option>
                <option value="borewell">Borewell</option>
                <option value="rainfed">Rainfed</option>
              </select>
            </div>
            <div>
              <label>Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
              >
                <option value="alluvial">Alluvial</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="laterite">Laterite</option>
              </select>
            </div>
            <div>
              <label>Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
              </select>
            </div>
            <div className="actions-row">
              <button className="btn-primary" onClick={calculateCrops}>
                Get Suggestions
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowResult(false);
                  setRecommendedCrops([]);
                }}
              >
                Reset
              </button>
            </div>
          </div>
          {showResult && (
            <div className="ai-suggestions">
              <h4>Recommendations</h4>
              {recommendedCrops.length ? (
                <ul>
                  {recommendedCrops.map((c, i) => (
                    <li key={i}>
                      <strong>{c.crop}</strong> — {c.notes} | Next rotation:{" "}
                      {c.nextCrop}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No matches found. Try different inputs or ask AgriSathi.</p>
              )}
            </div>
          )}
        </motion.div>

        {/* Expenses & Finance Card */}
        <motion.div
          className="card"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3>💰 Expenses & Finance</h3>
          <div className="form-grid">
            <div>
              <label>Seeds</label>
              <input
                type="number"
                value={expenses.seeds}
                onChange={(e) =>
                  setExpenses({ ...expenses, seeds: e.target.value })
                }
              />
            </div>
            <div>
              <label>Fertilizer</label>
              <input
                type="number"
                value={expenses.fertilizer}
                onChange={(e) =>
                  setExpenses({ ...expenses, fertilizer: e.target.value })
                }
              />
            </div>
            <div>
              <label>Labor</label>
              <input
                type="number"
                value={expenses.labor}
                onChange={(e) =>
                  setExpenses({ ...expenses, labor: e.target.value })
                }
              />
            </div>
          </div>
          <div className="charts-row">
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    label
                  >
                    {expenseData.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#10b981"
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="total-expenses">
            <div>Total Expenses</div>
            <div className="total-value">₹{totalExpenses}</div>
          </div>
          <div className="total-expenses">
            <div>Total Profit</div>
            <div className="total-value">₹{totalProfit}</div>
          </div>
        </motion.div>
      </div>

      {/* Government Schemes & Trend */}
      <div className="grid-2">
        <div className="card">
          <h3>🏛 Government Schemes</h3>
          <p>
            PM-Kisan Status: <span className="tag success">Approved</span>
          </p>
          <p>
            Next payout: <strong>₹2,000 on 25/12/2025</strong>
          </p>
          <div className="scheme-actions">
            <button
              className="btn-primary"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>
          </div>
          {showHistory && <SchemeHistory items={schemeHistory} />}
        </div>
        <div className="card">
          <h3>📈 Income vs Expenses Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={incomeTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="income" stroke="#3b82f6" />
              <Line type="monotone" dataKey="expenses" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Modal */}
      <AiAssistantModal open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
};

export default Dashboard;
