const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const SUPABASE_URL = "https://xbognqbuqyodrixppyyyo.supabase.co/rest/v1/player_stats";
    const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhib2ducWJ1cXlvZHJpeHBweXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjEwMzUsImV4cCI6MjA2MjkzNzAzNX0.-ZtHokGFbtRylYf2827NNLDGbgU6dU5HL9i-1l7-8MY"; // Replace with your real anon key

    const supabaseRes = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify(req.body.data)
    });

    const supabaseData = await supabaseRes.json();

    res.status(supabaseRes.status).json(supabaseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy error" });
  }
};
