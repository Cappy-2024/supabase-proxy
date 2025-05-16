const fetch = require("node-fetch");

const SUPABASE_URL = "https://xbognqbuqyodrixppyyyo.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhib2ducWJ1cXlvZHJpeHBweXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjEwMzUsImV4cCI6MjA2MjkzNzAzNX0.-ZtHokGFbtRylYf2827NNLDGbgU6dU5HL9i-1l7-8MY"; // <-- Replace with anon key
const TABLE_NAME = "player_stats"; // Change if needed

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const data = req.body;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: true,
        status: response.status,
        message: result
      });
    }

    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.toString() });
  }
};

