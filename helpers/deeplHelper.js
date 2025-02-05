require("dotenv").config();
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));


const translateText = async (text, targetLang = "EN") => {
  const apiKey = process.env.DEEPL_API_KEY;
  const url = process.env.DEEPL_API_ENDPOINT;

  if (!text) {
    throw new Error("Kein Text zum Übersetzen gesendet");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `DeepL-Auth-Key ${apiKey}`,
      },
      body: new URLSearchParams({
        text: text,
        target_lang: targetLang,
      }),
    });

    const data = await response.json();
    if (data.translations && data.translations.length > 0) {
      return data.translations[0].text;
    } else {
      throw new Error("Übersetzung fehlgeschlagen");
    }
  } catch (error) {
    console.error("DeepL API Fehler:", error);
    throw new Error("Fehler bei der Übersetzung");
  }
};

module.exports = { translateText };