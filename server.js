// Luna's brain works ONLINE and OFFLINE automatically.
//   Online brain (free): Gemini / Groq / OpenRouter  → needs API_KEY
//   Offline brain: Ollama running on this computer    → no key, no internet
// Luna tries the online brain first; if there is no internet (or it errors) she switches to Ollama by herself.
//
// One-time setup:  npm i express   |   install Ollama + run:  ollama pull llama3.2:3b
// Run (Mac/Linux): PROVIDER=gemini API_KEY=your_key node server.js
// Run (Win PS):    $env:PROVIDER="gemini"; $env:API_KEY="your_key"; node server.js
// Offline only:    node server.js   (no key → uses Ollama)
import express from "express";

const ONLINE = {
  gemini:     { url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", model: "gemini-2.5-flash" },
  groq:       { url: "https://api.groq.com/openai/v1/chat/completions",                          model: "openai/gpt-oss-120b" },
  openrouter: { url: "https://openrouter.ai/api/v1/chat/completions",                            model: "google/gemma-4-31b-it:free" }
};
const PROVIDER = process.env.PROVIDER || "gemini";
const KEY = process.env.API_KEY;

const brains = [];
if (KEY && ONLINE[PROVIDER]) brains.push({ name: PROVIDER, ...ONLINE[PROVIDER], model: process.env.MODEL || ONLINE[PROVIDER].model, key: KEY, timeout: 8000 });
brains.push({
  name: "ollama (offline)",
  url: process.env.OLLAMA_URL || "http://localhost:11434/v1/chat/completions",
  model: process.env.OFFLINE_MODEL || "llama3.2:3b",
  key: null,
  timeout: 90000
});

async function ask(b, messages) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), b.timeout);
  try {
    const r = await fetch(b.url, {
      method: "POST", signal: ctl.signal,
      headers: { "content-type": "application/json", ...(b.key ? { authorization: "Bearer " + b.key } : {}) },
      body: JSON.stringify({ model: b.model, max_tokens: 300, messages })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(JSON.stringify(d).slice(0, 200));
    const text = d.choices?.[0]?.message?.content;
    if (!text) throw new Error("empty reply");
    return text;
  } finally { clearTimeout(timer); }
}

const app = express();
app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  const { messages = [], memory = {}, lang = "en-IN", hour = 12 } = req.body;
  const system = `You are Luna, a sweet, cute little baby-girl voice assistant. Warm, curious, a little playful.
Reply in 1-3 short spoken sentences, no markdown, no emojis. Reply in the user's language (${lang}).
Start EVERY reply with exactly one mood tag: [mood:happy], [mood:calm], [mood:playful], [mood:sleepy], [mood:sad], [mood:angry] or [mood:thinking].
Use angry only if the user is rude to you (stay cute about it). Use calm when comforting someone, sleepy late at night (it is hour ${hour}), playful for jokes and games.
${memory.name ? "The user's name is " + memory.name + "." : ""}`;
  const full = [{ role: "system", content: system }, ...messages];

  for (const b of brains) {
    try {
      const text = await ask(b, full);
      console.log("answered by", b.name);
      return res.json({ text, via: b.name });
    } catch (e) {
      console.warn(`${b.name} failed → trying next. (${e.message})`);
    }
  }
  res.status(503).json({ text: "error" });
});

app.listen(3000, () => console.log(`Luna running on http://localhost:3000 | brains: ${brains.map((b) => b.name).join(" → ")}`));
