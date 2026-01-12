const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // node-fetch@2 bilan require ishlaydi
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, comment, rating } = req.body;

  const message = `
📩 Yangi fikr keldi!

👤 Ism: ${name}
📧 Email: ${email}
⭐ Baho: ${rating}
💬 Izoh:
${comment}
  `;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message
        })
      }
    );

    if (tgRes.ok) {
      res.status(200).json({ success: true });
    } else {
      console.log("Telegram xatolik:", await tgRes.text());
      res.status(500).json({ success: false });
    }
  } catch (err) {
    console.log("Telegram xatolik:", err);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend ishlayapti: http://localhost:3000");
});



