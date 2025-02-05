const express = require("express");
const { translateText } = require("../../helpers/deeplHelper");
const router = express.Router();

router.post("/translate", async (req, res) => {
  console.log('Route /api/translate angefragt');
  const { text, targetLang } = req.body;

  try {
    const translatedText = await translateText(text, targetLang);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;