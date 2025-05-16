const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const SUPABASE_URL = "https://xbognqbuqyodrixppyyyo.supabase.co/rest/v1/player_stats";
    const API_KEY = "YOUR_SUPABASE_ANON_KEY"; // Replace with your real anon key

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
