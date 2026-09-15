export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Method Not Allowed"
    });
  }

  try {
    const data = req.method === "POST" ? req.body : req.query;

    const botHash = data.botHash;
    const bot = data.bot;
    const webhook_url = data.webhook_url;
    const bot_token = data.bot_token;

    if (!botHash || !bot || !webhook_url || !bot_token) {
      return res.status(400).json({
        status: "error",
        message: "Missing registration data"
      });
    }

    // Basic validation
    if (String(botHash).length < 20) {
      return res.status(400).json({
        status: "error",
        message: "Invalid bot hash"
      });
    }

    // IMPORTANT:
    // Do not expose the bot token to the frontend.
    // This endpoint only receives it from your TBC backend.

    return res.status(200).json({
      status: "success",
      message: "Bot registered successfully",
      botHash: botHash
    });

  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
}
