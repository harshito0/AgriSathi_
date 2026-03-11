import React, { useEffect } from "react";
import "./AlertsBar.css";

export default function AlertsBar({ language, rate }) {
  // Example alerts (replace later with live API)
}
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import "./Dashboard.css";

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
      <div className="forecast-item">Tue: {weather.forecast[0]}°</div>
      <div className="forecast-item">Wed: {weather.forecast[1]}°</div>
      <div className="forecast-item">Thu: {weather.forecast[2]}°</div>
    </div>
  </div>
);

const AlertsCard = ({ alerts }) => (
  <div className="card small-card">
    <h3 className="card-title">🔔 Alerts</h3>
    <ul className="alerts-list">
      {alerts.length ? (
        alerts.map((a, i) => (
          <li key={i} className={alert-item ${a.type}}>
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

const SchemeHistory = ({ items }) => (
  <ul className="timeline">
    {items.map((it, idx) => (
      <li key={idx} className="timeline-item">
        <div className="timeline-year">{it.year}</div>
        <div className="timeline-content">
          <h4>{it.scheme}</h4>
          <p className="timeline-status">{it.status}</p>
          <div className="timeline-date">{it.date}</div>
        </div>
      </li>
    ))}
  </ul>
);

const AiAssistantModal = ({ open, onClose, onAsk }) => {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (!open) {
      setQ("");
      setAnswer(null);
      setLoading(false);
    }
  }, [open]);

  const ask = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setAnswer(
        Sample AI reply for: "${q}". Suggestion: reduce fertilizer by 15% and consider crop rotation with legumes.
      );
      setLoading(false);
      if (onAsk) onAsk(q);
    }, 900);
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
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
          >
            <div className="ai-header">
              <h3>Ask AgriSathi 🤖</h3>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>

            <textarea
              className="ai-textarea"
              placeholder="Ask about crops, costs, weather, pests..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="ai-actions">
              <button className="btn-secondary" onClick={() => setQ("")}>
                Clear
              </button>
              <button className="btn-primary" onClick={ask} disabled={loading}>
                {loading ? "Thinking..." : "Ask"}
              </button>
            </div>

            {answer && (
              <div className="ai-answer">
                <strong>AgriSathi:</strong>
                <p>{answer}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Dashboard = ({ onBack }) => {
  // Core states
  const [landArea, setLandArea] = useState("");
  const [waterSource, setWaterSource] = useState("canal");
  const [soilType, setSoilType] = useState("alluvial");
  const [season, setSeason] = useState("Kharif");
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [showResult, setShowResult] = useState(false);

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
  const [aiOpen, setAiOpen] = useState(false);

  // Dummy weather + alerts + schemes
  const weather = {
    temp: 29,
    condition: "Partly Cloudy",
    rain: 20,
    wind: 8,
    forecast: [30, 28, 27],
  };
  const alerts = [
    {
      title: "Irrigation Needed",
      message: "Last irrigated 10 days ago — consider watering tomorrow.",
      type: "warning",
    },
    {
      title: "Pest Alert",
      message: "Fall armyworm reported nearby — inspect maize fields.",
      type: "danger",
    },
    {
      title: "Weather Advice",
      message:
        weather.rain > 50
          ? "Heavy rain expected, skip irrigation tomorrow."
          : "Normal conditions, irrigate as usual.",
      type: "info",
    },
  ];

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

  // derived
  const expenseData = [
    { name: "Seeds", value: Number(expenses.seeds) || 0 },
    { name: "Fertilizer", value: Number(expenses.fertilizer) || 0 },
    { name: "Labor", value: Number(expenses.labor) || 0 },
  ];
  const COLORS = ["#16a34a", "#f59e0b", "#3b82f6"];
  const totalExpenses = expenseData.reduce((s, e) => s + e.value, 0);

  // profit forecast
  const totalIncome = 25000; // placeholder, can integrate with AI later
  const totalProfit = totalIncome - totalExpenses;

  // Crop calculation
  const calculateCrops = () => {
    const area = parseFloat(landArea);
    if (!area || area <= 0) {
      alert("Please enter a valid land area (> 0).");
      return;
    }
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

  const handleAiAsk = (q) => {
    console.log("User asked AI:", q);
  };

  useEffect(() => {
    const saved = localStorage.getItem("agri_dashboard_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.expenses) setExpenses(parsed.expenses);
        if (parsed.landArea) setLandArea(parsed.landArea);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "agri_dashboard_v1",
      JSON.stringify({ expenses, landArea })
    );
  }, [expenses, landArea]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-center">
        {/* Header */}
        <div className="top-row">
          <button className="back-btn" onClick={onBack}>
            ⬅ Back
          </button>
          <div className="top-title">
            <h1>AgriSathi — Farmer Dashboard</h1>
            <p className="subtitle">
              Quick insights & recommendations for your farm
            </p>
          </div>
          <div className="header-right">
            <button className="btn-secondary" onClick={() => setAiOpen(true)}>
              Ask AgriSathi 🤖
            </button>
          </div>
        </div>

        {/* Quick-info row */}
        <div className="grid-3">
          <div className="card profile-card">
            <div className="profile-header">
              <img
                className="avatar"
                src="https://i.ibb.co/6r5Vn1D/farmer-avatar.png"
                alt="farmer"
              />
              <div>
                <div className="name">Rajesh Kumar</div>
                <div className="meta">Varanasi, UP • ID: F12345</div>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat">
                <div className="stat-value">12.5</div>
                <div className="stat-label">Total acres</div>
              </div>
              <div className="stat">
                <div className="stat-value">3</div>
                <div className="stat-label">Active crops</div>
              </div>
              <div className="stat">
                <div className="stat-value">78%</div>
                <div className="stat-label">Land cultivated</div>
              </div>
            </div>
          </div>

          <WeatherCard weather={weather} />
          <AlertsCard alerts={alerts} />
        </div>

        {/* Mid section: crop planner + finance */}
        <div className="grid-2">
          <motion.div
            className="card"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3 className="card-title">🌱 Crop Planner & AI Suggestions</h3>

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
                  <p>
                    No matches found. Try different inputs or ask AgriSathi.
                  </p>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            className="card"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3 className="card-title">💰 Expenses & Finance</h3>

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
                      isAnimationActive
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

        {/* Bottom section */}
        <div className="grid-2">
          <div className="card">
            <h3 className="card-title">🏛 Government Schemes</h3>
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
                {showHistory ? "Hide History" : "View History"}
              </button>
              <button
                className="btn-secondary"
                onClick={() => alert("Download CSV")}
              >
                Download CSV
              </button>
            </div>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="history-box"
                >
                  <SchemeHistory items={schemeHistory} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="card">
            <h3 className="card-title">📈 Season Insights</h3>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="report-actions">
              <button
                className="btn-primary"
                onClick={() => alert("Download PDF (placeholder)")}
              >
                Download Report (PDF)
              </button>
              <button
                className="btn-secondary"
                onClick={() => alert("Share Link (placeholder)")}
              >
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Local Market Insights */}
        <div className="grid-1">
          <div className="card">
            <h3 className="card-title">🏪 Local Market Prices</h3>
            <ul>
              <li>Wheat: ₹2200/ton</li>
              <li>Rice: ₹1800/ton</li>
              <li>Maize: ₹1500/ton</li>
              <li>Vegetables: ₹50–₹100/kg</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Floating AI button */}
      <button className="floating-ai" onClick={() => setAiOpen(true)}>
        Ask AgriSathi 🤖
      </button>

      <AiAssistantModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onAsk={handleAiAsk}
      />
    </div>
  );
};

export default Dashboard;