// Luna's brain works ONLINE and OFFLINE automatically.
//   Online brain (free): Gemini / Groq / OpenRouter  → needs API_KEY
//   Offline brain: Ollama running on this computer    → no key, no internet
// Luna tries the online brain first; if there is no internet (or it errors) she switches to Ollama by herself.
//
// One-time setup:  npm i express   |   install Ollama + run:  ollama pull llama3.2:3b
// Run (Mac/Linux): PROVIDER=gemini API_KEY=your_key node server.js
// Run (Win PS):    $env:PROVIDER="gemini"; $env:API_KEY="your_key"; node server.js
// Offline only:    node server.js   (no key → uses Ollama)
//
// EASIEST WAY: create a file named  .env  next to this file with two lines:
//     PROVIDER=gemini
//     API_KEY=paste_your_key_here
// then just run:  node server.js   (or: npm start)
import express from "express";
import { readFileSync, existsSync } from "node:fs";
import dns from "node:dns/promises";
import net from "node:net";
import { Readable } from "node:stream";

// Tiny .env reader (no extra package needed). Real environment variables still win.
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (m && !line.trim().startsWith("#") && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

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


// Can this website be shown inside Luna's split screen? (checks X-Frame-Options / CSP frame-ancestors)
app.get("/api/frameable", async (req, res) => {
  try {
    const u = new URL(String(req.query.url || ""));
    if (!/^https?:$/.test(u.protocol) || /^(localhost$|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.)/.test(u.hostname)) throw new Error("bad url");
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 4000);
    const r = await fetch(u, { redirect: "follow", signal: ctl.signal, headers: { "user-agent": "Mozilla/5.0 (Luna)" } });
    clearTimeout(t);
    try { await r.body?.cancel(); } catch {}
    const xfo = (r.headers.get("x-frame-options") || "").toLowerCase();
    const csp = (r.headers.get("content-security-policy") || "").toLowerCase();
    const fa = /frame-ancestors([^;]*)/.exec(csp);
    let ok = true;
    if (xfo.includes("deny") || xfo.includes("sameorigin")) ok = false;
    if (fa && !/(^|\s)\*(\s|$)/.test(fa[1])) ok = false;
    res.json({ ok });
  } catch { res.json({ ok: null }); }
});

// ---------- Luna's built-in browser: "compatibility mode" proxy ----------
// Big sites (Google, YouTube...) forbid being shown inside another page. This route fetches the page on the server,
// drops the blocking headers and sends it back so it can open inside Luna's browser pane. It only fetches public websites.
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
function privateIP(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  const x = ip.toLowerCase();
  return x === "::1" || x === "::" || /^f[cd]/.test(x) || x.startsWith("fe80") || /^::ffff:(127|10|0|169\.254|192\.168)\./.test(x);
}
async function safeUrl(s) {
  const u = new URL(s);
  if (!/^https?:$/.test(u.protocol)) throw new Error("only http and https");
  const host = u.hostname.replace(/^\[|\]$/g, "");
  const addrs = net.isIP(host) ? [{ address: host }] : await dns.lookup(host, { all: true });
  if (!addrs.length || addrs.some((a) => privateIP(a.address))) throw new Error("that address is not allowed");
  return u;
}
// Runs inside the proxied page: clicks and form searches are handed to Luna so they open in the same pane.
const NAV_SCRIPT = `<script>(function(){
function abs(u){try{return new URL(u,document.baseURI).href}catch(e){return null}}
function go(u){parent.postMessage({luna:"nav",url:u},"*")}
document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a)return;
var h=a.getAttribute("href");if(!h||h.charAt(0)==="#"||/^(javascript|mailto|tel|blob|data):/i.test(h))return;
var u=abs(h);if(!u)return;e.preventDefault();e.stopPropagation();go(u)},true);
document.addEventListener("submit",function(e){var f=e.target;if(!f||String(f.method||"get").toLowerCase()!=="get")return;
var u=abs(f.getAttribute("action")||"");if(!u)return;var q=new URLSearchParams();
new FormData(f).forEach(function(v,k){if(typeof v==="string")q.append(k,v)});
var x=new URL(u);x.search=q.toString();e.preventDefault();e.stopPropagation();go(x.href)},true);
})()</script>`;

app.get("/api/proxy", async (req, res) => {
  try {
    let u = await safeUrl(String(req.query.url || ""));
    let r;
    for (let i = 0; i < 6; i++) {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 15000);
      r = await fetch(u, { redirect: "manual", signal: ctl.signal, headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "accept-language": "en-IN,en;q=0.9" } });
      clearTimeout(t);
      const loc = r.headers.get("location");
      if (r.status >= 300 && r.status < 400 && loc) {
        u = await safeUrl(new URL(loc, u).href);
        try { await r.body?.cancel(); } catch {}
        continue;
      }
      break;
    }
    const type = r.headers.get("content-type") || "application/octet-stream";
    res.status(r.status);
    res.set("cache-control", "no-store");
    if (/text\/html|application\/xhtml/i.test(type)) {
      const buf = Buffer.from(await r.arrayBuffer());
      const cs = /charset=([\w-]+)/i.exec(type)?.[1] || /<meta[^>]+charset=["']?([\w-]+)/i.exec(buf.subarray(0, 2048).toString("latin1"))?.[1] || "utf-8";
      let html;
      try { html = new TextDecoder(cs).decode(buf); } catch { html = buf.toString("utf8"); }
      html = html.replace(/<meta[^>]+http-equiv=["']?content-security-policy["']?[^>]*>/gi, "");
      const inject = `<base href="${u.href.replace(/"/g, "&quot;")}">` + NAV_SCRIPT;
      html = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + inject) : inject + html;
      res.set("content-type", "text/html; charset=utf-8").send(html);
    } else {
      res.set("content-type", type);
      if (r.body) Readable.fromWeb(r.body).pipe(res); else res.end();
    }
  } catch (e) {
    res.status(502).set("content-type", "text/html; charset=utf-8")
      .send(`<body style="font-family:sans-serif;padding:2em;background:#1a0b2e;color:#fff"><h3>Luna couldn't load this page</h3><p>${String(e.message).replace(/[<>&]/g, "")}</p>`);
  }
});


app.listen(3000, () => console.log(`Luna running on http://localhost:3000 | brains: ${brains.map((b) => b.name).join(" → ")}`));