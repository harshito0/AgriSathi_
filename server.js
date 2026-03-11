// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple /api/chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, crop, region } = req.body;

    // Here you can integrate any AI API later
    // For now, it just echoes back
    const reply = `You asked: "${message}" for crop "${crop}" in region "${region}".`;

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error processing your request." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
