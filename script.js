"use strict";

/* ---------- Elements ---------- */
const btn = document.querySelector("#btn");
const label = document.querySelector("#content");
const userText = document.querySelector("#userText");
const lunaText = document.querySelector("#lunaText");
const linkArea = document.querySelector("#linkArea");
const textInput = document.querySelector("#textInput");
const sendBtn = document.querySelector("#sendBtn");

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- Speech output ---------- */
let voices = [];
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}
if ("speechSynthesis" in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

function chooseVoice() {
    const en = voices.filter((v) => v.lang.toLowerCase().startsWith(opts.lang.slice(0, 2)));
    const female = /female|zira|samantha|heera|neerja|aria|jenny/i;
    return (
        en.find((v) => v.localService && female.test(v.name)) ||
        en.find((v) => female.test(v.name)) ||
        en.find((v) => v.localService) ||
        en[0] ||
        null
    );
}

// Chrome silently cuts off long utterances, so only speak the first couple of sentences.
function shorten(text, max = 280) {
    const clean = String(text).replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    const cut = clean.slice(0, max);
    const last = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
    return last > 80 ? cut.slice(0, last + 1) : cut.replace(/\s+\S*$/, "") + "…";
}


/* ---------- UI helpers ---------- */
function show(text) {
    lunaText.textContent = text;
}
function respond(text) {
    show(text);
    speak(text);
}
function clearLinks() {
    linkArea.innerHTML = "";
}
function addLink(url, text) {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = text;
    linkArea.appendChild(a);
}
// Browsers may block pop-ups opened from a voice callback, so fall back to a clickable link.
function openLink(url, text = "Open link") {
    const w = window.open(url, "_blank");
    if (w) {
        try { w.opener = null; } catch (e) { /* ignore */ }
    } else {
        addLink(url, text + " (pop-up blocked, tap here)");
    }
}
const google = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

async function fetchJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
}

/* ---------- Greeting ---------- */
function greetingText() {
    const h = new Date().getHours();
    if (h >= 4 && h < 12) return pick(["Good morning pineapple, have a wonderful day!", "Rise and shine! Ready to rock?", "Morning! Coffee time maybe?", "Rise and shine, champ!"]);
    if (h >= 12 && h < 16) return pick(["Very good afternoon!", "Hope your afternoon is going well.", "Good afternoon, need some motivation?"]);
    if (h >= 16 && h < 20) return pick(["Good evening!", "Evening vibes activated.", "Hope your evening is peaceful.", "Do you need some adrak wali kadak chai?"]);
    return pick(["Good night, sweet dreams pineapple.", "Time to rest and recharge.", "Good night! Don't let the bedbugs bite."]);
}

// Browsers block speech until the person interacts with the page, so show the greeting
// immediately and speak it on the first tap/click anywhere (except the mic button).

/* ---------- Speech input ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let listening = false;
let forceLocal = false; // switch the mic to on-device recognition if the cloud one can't connect
window.addEventListener("online", () => { forceLocal = false; });

function setListening(on) {
    listening = on;
    document.body.classList.toggle("listening", on);
    label.textContent = on ? "Listening… tap to stop" : "Click here to talk to me";
}

if (SR) {
    recognition = new SR();
    recognition.lang = "en-IN";        // change to "en-US", "en-GB" or "hi-IN" if you prefer
    recognition.continuous = false;
    recognition.interimResults = true; // live text while you speak
    recognition.maxAlternatives = 1;

    let lastText = "";
    let failed = false;

    recognition.onstart = () => {
        lastText = "";
        failed = false;
        clearLinks();
        userText.textContent = "";
        setListening(true);
    };

    recognition.onresult = (event) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) text += event.results[i][0].transcript;
        lastText = text.trim();
        userText.textContent = "“" + lastText + "”";
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "aborted") return;
        failed = true;
        if (event.error === "network" && !forceLocal) { // internet looks down: retry once with on-device recognition
            forceLocal = true;
            setTimeout(() => { try { recognition.processLocally = true; recognition.start(); } catch (e) { /* ignore */ } }, 300);
            return;
        }
        const msgs = {
            "no-speech": "I didn't hear anything. Tap the mic and try again.",
            "audio-capture": "I can't find a microphone. Please connect one.",
            "not-allowed": "Microphone access is blocked. Allow it in the browser's address bar, and open this page through http://localhost or https (not by double-clicking the file).",
            "service-not-allowed": "Microphone access is blocked. Allow it in the browser's address bar, and open this page through http://localhost or https.",
            "network": "Speech recognition needs an internet connection."
        };
        show(msgs[event.error] || "Something went wrong (" + event.error + "). Tap the mic to try again.");
    };

    recognition.onend = () => {
        setListening(false);
        if (failed) return;
        if (lastText) handle(lastText);
        else show("I didn't catch that. Tap the mic and try again.");
    };
}

btn.addEventListener("click", () => {
    if (!recognition) {
        respond("Voice input isn't supported in this browser. Please use Chrome, Edge or Safari, or type a command below.");
        return;
    }
    if (listening) {
        recognition.stop();
        return;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    try {
        recognition.processLocally = !navigator.onLine || forceLocal; // use on-device recognition when offline
        recognition.start();
    } catch (err) {
        console.warn(err); // already started
    }
});

/* ---------- Typed input ---------- */
function submitText() {
    const value = textInput.value.trim();
    if (!value) return;
    textInput.value = "";
    clearLinks();
    userText.textContent = "“" + value + "”";
    handle(value);
}
sendBtn.addEventListener("click", submitText);
textInput.addEventListener("keydown", (e) => { if (e.key === "Enter") submitText(); });

/* ---------- Helpers for commands ---------- */
function parseDuration(s) {
    let sec = 0, found = false, m;
    const re = /(\d+(?:\.\d+)?)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/g;
    while ((m = re.exec(s))) {
        found = true;
        const n = parseFloat(m[1]);
        const u = m[2][0];
        sec += u === "h" ? n * 3600 : u === "m" ? n * 60 : n;
    }
    if (/\ban hour\b/.test(s)) { sec += 3600; found = true; }
    return found ? Math.round(sec) : 0;
}

function formatDuration(sec) {
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    const parts = [];
    if (h) parts.push(h + (h === 1 ? " hour" : " hours"));
    if (m) parts.push(m + (m === 1 ? " minute" : " minutes"));
    if (s) parts.push(s + (s === 1 ? " second" : " seconds"));
    return parts.join(" and ");
}

// Safe maths: only digits and operators are ever evaluated (no eval of arbitrary text).
function evalMath(msg) {
    let e = msg
        .replace(/^(calculate|calculator|compute|what is|what's|how much is|solve)\s+/, "")
        .replace(/multiplied by|times|into/g, "*")
        .replace(/divided by|over/g, "/")
        .replace(/to the power of|power/g, "**")
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .replace(/\bmod\b/g, "%")
        .replace(/(\d)\s*[x×]\s*(\d)/g, "$1*$2")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");
    if (!/\d/.test(e) || !/[-+*/%]/.test(e) || !/^[\d\s+\-*/%().]+$/.test(e)) return null;
    try {
        const r = Function('"use strict";return (' + e + ")")();
        return Number.isFinite(r) ? Math.round(r * 1e6) / 1e6 : null;
    } catch (err) {
        return null;
    }
}

const WEATHER_CODES = {
    0: "clear sky", 1: "mainly clear", 2: "partly cloudy", 3: "overcast",
    45: "foggy", 48: "foggy", 51: "light drizzle", 53: "drizzle", 55: "heavy drizzle",
    61: "light rain", 63: "rain", 65: "heavy rain", 71: "light snow", 73: "snow", 75: "heavy snow",
    80: "rain showers", 81: "rain showers", 82: "heavy rain showers",
    95: "a thunderstorm", 96: "a thunderstorm with hail", 99: "a thunderstorm with hail"
};

async function getWeather(city) {
    if (!navigator.onLine) return respond("I'm offline right now, so I can't look that up. I can still do time, timers, maths, jokes and reminders.");
    show("Checking the sky in " + city + "…");
    try {
        const geo = await fetchJSON(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        const place = geo.results && geo.results[0];
        if (!place) throw new Error("city not found");
        const w = await fetchJSON(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
            `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m`
        );
        const c = w.current;
        const desc = WEATHER_CODES[c.weather_code] || "mixed conditions";
        respond(
            `In ${place.name} it's ${Math.round(c.temperature_2m)} degrees Celsius with ${desc}. ` +
            `It feels like ${Math.round(c.apparent_temperature)}, humidity is ${c.relative_humidity_2m} percent, ` +
            `and wind is ${Math.round(c.wind_speed_10m)} kilometres per hour.`
        );
    } catch (err) {
        respond("I couldn't get the weather for " + city + ", so I'm opening Google for you.");
        openLink(google("weather " + city), "Weather on Google");
    }
}

async function wikiLookup(topic) {
    if (!navigator.onLine) return respond("I'm offline right now, so I can't look that up. I can still do time, timers, maths, jokes and reminders.");
    show("Looking up " + topic + "…");
    try {
        const s = await fetchJSON(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(topic)}&limit=1`);
        const page = s.pages && s.pages[0];
        if (!page) throw new Error("no page");
        const d = await fetchJSON(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page.key)}`);
        if (!d.extract) throw new Error("no extract");
        respond(d.extract);
        if (d.content_urls) addLink(d.content_urls.desktop.page, "Read more on Wikipedia");
    } catch (err) {
        respond("I couldn't find a summary for " + topic + ", so I'm searching Google.");
        openLink(google(topic), "Search Google");
    }
}

async function randomFact() {
    if (!navigator.onLine) return respond("I'm offline right now, so I can't look that up. I can still do time, timers, maths, jokes and reminders.");
    show("Finding a fact…");
    try {
        const d = await fetchJSON("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        respond("Here's an interesting fact: " + d.text);
    } catch (err) {
        respond("I couldn't fetch a fact right now.");
    }
}

function startTimer(seconds, doneMessage) {
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    setTimeout(() => {
        respond(doneMessage);
        document.title = "⏰ " + doneMessage;
        if ("Notification" in window && Notification.permission === "granted") new Notification("Luna", { body: doneMessage });
    }, seconds * 1000);
}

const SITES = {
    youtube: "https://www.youtube.com",
    google: "https://www.google.com",
    whatsapp: "https://web.whatsapp.com",
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    gmail: "https://mail.google.com",
    github: "https://github.com",
    spotify: "https://open.spotify.com",
    maps: "https://maps.google.com"
};

/* ---------- Commands ---------- */
const re = (regex) => (msg) => msg.match(regex);

const commands = [
    [re(/^(stop|be quiet|quiet|shut up|cancel)$/), () => {
        window.speechSynthesis.cancel();
        show("Okay, I'll be quiet.");
    }],

    [(m) => (m === "" ? [""] : m.match(/^(hi+|hello+|hey+|namaste|yo)\b/)), () => respond(pick([
        "Hello, what can I do for you?", "Hi there! Need any help?", "Hi there, ready to explore?",
        "Hey, I'm here!", "Hello friend, how's it going?", "Yes, I'm listening!"
    ]))],

    [re(/\bwho are you\b|\byour name\b/), () => respond(pick([
        "I am Luna, your cute personal virtual assistant.", "I'm Luna, your smart little assistant.",
        "You can call me your smart helper.", "I am here to make your life easier."
    ]))],

    [re(/\bopen (youtube|google|whatsapp|instagram|facebook|gmail|github|spotify|maps)\b/), (m) => {
        const name = m[1][0].toUpperCase() + m[1].slice(1);
        respond(pick([`Opening ${name} for you.`, `Here you go, ${name} is ready.`, `Launching ${name}.`, `${name}, coming right up.`]));
        openLink(SITES[m[1]], "Open " + name);
    }],

    [re(/\bopen (a |the )?calculator\b/), () => {
        respond(pick(["Opening calculator for you.", "Math mode on, calculator ready."]));
        openLink("https://www.desmos.com/scientific", "Open calculator");
    }],

    [re(/\b(what time|the time|current time|time is it|time now)\b|^time$/), () => {
        const t = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
        respond(pick([`The time is ${t}.`, `Right now it's ${t}.`, `It's exactly ${t}.`,
            `Basically it's time to shine pineapple, but technically it is ${t}.`]));
    }],

    [re(/\b(date|what day|today's day)\b/), () => {
        const d = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        respond(pick([`Today is ${d}.`, `The calendar says ${d}.`, `We are on ${d}.`]));
    }],

    [re(/set (?:a |an )?timer (?:for )?(.+)/), (m) => {
        const sec = parseDuration(m[1]);
        if (sec > 0) {
            respond(`Timer set for ${formatDuration(sec)}. I'll tell you when time is up. Keep this tab open.`);
            startTimer(sec, "Time is up! Your timer has finished.");
        } else {
            respond("I couldn't understand the time. Try saying: set a timer for 5 minutes.");
        }
    }],

    [re(/^remind me to (.+?)(?:\s+in\s+(.+))?$/), (m) => {
        const sec = m[2] ? parseDuration(m[2]) : 0;
        if (sec > 0) {
            respond(`Okay, I'll remind you to ${m[1]} in ${formatDuration(sec)}. Keep this tab open.`);
            startTimer(sec, `Reminder: ${m[1]}`);
        } else {
            const task = m[2] ? `${m[1]} in ${m[2]}` : m[1];
            const list = JSON.parse(localStorage.getItem("luna_reminders") || "[]");
            list.push(task);
            localStorage.setItem("luna_reminders", JSON.stringify(list));
            respond("Got it, I saved a reminder to " + task + ".");
        }
    }],

    [re(/\b(what are|read|show) my reminders\b/), () => {
        const list = JSON.parse(localStorage.getItem("luna_reminders") || "[]");
        if (!list.length) return respond("You don't have any reminders right now.");
        let text = `You have ${list.length} reminder${list.length > 1 ? "s" : ""}. `;
        list.forEach((r, i) => { text += `Number ${i + 1}: ${r}. `; });
        respond(text);
    }],

    [re(/\b(clear|delete) my reminders\b/), () => {
        localStorage.removeItem("luna_reminders");
        respond("I have cleared all your reminders.");
    }],

    [re(/weather (?:in|at|for|of) (.+)/), (m) => getWeather(m[1].trim())],
    [re(/\bweather\b/), () => respond("Which city? Try saying: weather in Delhi.")],

    [re(/news (?:in|about|for|from) (.+)/), (m) => {
        respond("Here are the latest headlines for " + m[1] + ".");
        openLink(google(m[1] + " news"), "News for " + m[1]);
    }],
    [re(/\bnews\b/), () => {
        respond("Opening the latest news.");
        openLink("https://news.google.com", "Google News");
    }],

    [re(/\b(motivate|motivation|inspire)\b/), () => respond("Here is some motivation: " + pick([
        "The only way to do great work is to love what you do.",
        "Believe you can and you're halfway there.",
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones.",
        "Dream it. Wish it. Do it.",
        "Success doesn't just find you. You have to go out and get it."
    ]))],

    [re(/\b(joke|funny)\b/), () => respond(pick([
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you call fake spaghetti? An impasta!",
        "Why did the bicycle fall over? Because it was two tired!"
    ]))],

    [re(/\b(flip|toss) a coin\b/), () => {
        const o = Math.random() < 0.5 ? "Heads" : "Tails";
        respond(pick([`I flipped a coin and it is ${o}.`, `It landed on ${o}.`, `The coin says ${o}.`]));
    }],

    [re(/\broll a (dice|die)\b/), () => {
        const r = Math.floor(Math.random() * 6) + 1;
        respond(pick([`I rolled the dice and got a ${r}.`, `You rolled a ${r}.`, `The dice shows ${r}.`]));
    }],

    [re(/\b(fact|something interesting)\b/), () => randomFact()],

    // Maths must come before the "what is ..." lookup so "what is 5 plus 3" gets calculated.
    [(msg) => { const v = evalMath(msg); return v === null ? null : [v]; }, (m) => respond(pick([
        `The answer is ${m[0]}.`, `It comes out to ${m[0]}.`, `That equals ${m[0]}.`
    ]))],

    [re(/^calculate\b/), () => {
        respond("I couldn't work that out, so I'm opening a calculator for you.");
        openLink("https://www.desmos.com/scientific", "Open calculator");
    }],

    [re(/^(?:what is|what's|who is|who's|who was|tell me about|define|explain)\s+(?:a |an |the )?(.+)/), (m) => wikiLookup(m[1].trim())]
];

function handle(raw) {
    clearLinks();
    log("You", raw);
    const msg = raw
        .toLowerCase()
        .replace(/[.,!?]+$/g, "")
        .replace(/^(hey |hi |ok |okay )?luna\b[, ]*/, "")
        .replace(/[, ]+luna$/, "")
        .trim();

    const dm = detectMood(msg);
    setMood(dm || baseline());
    for (const [test, run] of commands) {
        const m = test(msg);
        if (m) {
            run(m, msg);
            return;
        }
    }

    if (window.aiFallback && window.aiFallback(raw)) return; // AI brain (extras.js)
    askAI(msg); // AI brain (falls back to Google search if no server)
}

/* =====================  V2: automatic moods, baby-girl voice, orb, AI brain  ===================== */
const MOODS = {
    happy:    { emoji: "😊", color: [255, 150, 220] },
    calm:     { emoji: "🌙", color: [120, 200, 255] },
    playful:  { emoji: "🎈", color: [255, 200, 80] },
    sleepy:   { emoji: "😴", color: [150, 130, 255] },
    sad:      { emoji: "🥺", color: [120, 150, 200] },
    thinking: { emoji: "💭", color: [180, 160, 255] },
    angry:    { emoji: "😠", color: [255, 90, 90] }
};
// Luna always has the same cute, high-pitched little-girl voice.
const VOICE = { pitch: 1.9, rate: 1.05 };
let mood = "happy", history = [];
let memory = JSON.parse(localStorage.getItem("luna_mem") || "{}");
let opts = Object.assign({ lang: "en-IN" }, JSON.parse(localStorage.getItem("luna_opts") || "{}"));
const saveOpts = () => localStorage.setItem("luna_opts", JSON.stringify(opts));
const moodLabel = document.querySelector("#moodLabel");

// Tenor stickers for each mood (calm and sad fall back to the normal logo).
const FACE_FOR = { happy: "happy", sleepy: "sleepy", playful: "playful", thinking: "thinking", angry: "angry" };
let wakeFace = false;
const logoEl = document.querySelector("#logo");
function showFace() {
    const key = wakeFace ? "wake" : FACE_FOR[mood];
    let on = false;
    document.querySelectorAll(".face").forEach((f) => {
        const match = f.dataset.face === key && f.querySelector("iframe, img"); // only if Tenor actually loaded
        f.classList.toggle("on", !!match);
        if (match) on = true;
    });
    logoEl.style.opacity = on ? 0 : 1;
}
[1000, 2500, 5000].forEach((t) => setTimeout(showFace, t)); // Tenor loads a moment after the page

function setMood(m) {
    if (!MOODS[m]) return;
    mood = m;
    document.body.dataset.mood = m;
    moodLabel.textContent = MOODS[m].emoji + " " + m;
    showFace();
    document.documentElement.style.setProperty("--mood", `rgb(${MOODS[m].color.join(",")})`);
}
function baseline() {
    const h = new Date().getHours();
    return h >= 22 || h < 5 ? "sleepy" : "happy";
}
// Luna's mood follows your message, like a person would react. Neutral message = back to her normal mood.
function detectMood(t) {
    if (/\b(stupid|idiot|shut up|dumb|useless|i hate you|you suck)\b/.test(t)) return "angry";
    if (/\b(sad|lonely|cry|crying|upset|stress|stressed|anxious|bad day|hurt|depressed|worried|scared|sick|miss (you|him|her)|annoyed)\b/.test(t)) return "calm";
    if (/\b(sleep|sleepy|bed|good night|goodnight|lullaby|bedtime)\b/.test(t)) return "sleepy";
    if (/\b(joke|funny|play|game|dance|party|sing|lol|haha|silly)\b/.test(t)) return "playful";
    if (/\b(thanks|thank you|love you|great|awesome|happy|yay|good news|congrat|birthday|cute|sweet|you are the best)\b/.test(t)) return "happy";
    return null;
}
setMood(baseline());

function speak(text, onStart) {
    if (!("speechSynthesis" in window)) return;
    if (!voices.length) loadVoices();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(shorten(text));
    const v = chooseVoice();
    if (v) u.voice = v;
    u.lang = v ? v.lang : opts.lang;
    u.pitch = VOICE.pitch;
    u.rate = VOICE.rate;
    u.onstart = () => { document.body.classList.add("speaking"); if (onStart) onStart(); };
    u.onend = u.onerror = () => document.body.classList.remove("speaking");
    window.speechSynthesis.speak(u);
}

/* ---- History panel ---- */
const histEl = document.querySelector("#history");
function log(who, t) {
    const li = document.createElement("li");
    li.className = who === "You" ? "me" : "luna";
    li.textContent = t;
    histEl.appendChild(li);
    histEl.scrollTop = histEl.scrollHeight;
}
const _respond = respond;
respond = (t) => { _respond(t); log("Luna", t); };
document.querySelector("#histBtn").onclick = () => { histEl.hidden = !histEl.hidden; };

/* ---- AI brain ---- */
async function askAI(msg) {
    setMood("thinking");
    show("Thinking…");
    history.push({ role: "user", content: msg });
    history = history.slice(-12);
    try {
        const r = await fetch("/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ messages: history, memory, lang: opts.lang, hour: new Date().getHours() })
        });
        if (!r.ok) throw new Error("no server");
        let { text } = await r.json();
        const m = text.match(/^\[mood:(\w+)\]\s*/i);
        if (m) { setMood(m[1].toLowerCase()); text = text.slice(m[0].length); } else setMood("happy");
        history.push({ role: "assistant", content: text });
        respond(text);
    } catch (e) {
        if (!navigator.onLine && !/localhost|127\.0\.0\.1/.test(location.hostname)) { setMood("happy"); return respond("I'm offline, so I can only help with time, timers, maths, jokes and reminders."); }
        setMood("happy");
        respond(`Here's what I found for ${msg}.`);
        openLink(google(msg), "Search Google");
    }
}

/* ---- Extra commands: memory + mood control ---- */
commands.unshift(
    [re(/^(?:my name is|call me)\s+([a-z ]{2,20})$/), (m) => {
        memory.name = m[1].replace(/\b\w/g, (c) => c.toUpperCase());
        localStorage.setItem("luna_mem", JSON.stringify(memory));
        setMood("happy");
        respond(`Nice to meet you, ${memory.name}! I'll remember that.`);
    }],
    [re(/\bforget (me|everything)\b/), () => { memory = {}; history = []; localStorage.removeItem("luna_mem"); respond("Okay, I forgot everything about you."); }]
);

/* ---- Settings (language only) ---- */
const _setListening = setListening;
setListening = (on) => { _setListening(on); if (on) micLevel(); };
const optLang = document.querySelector("#optLang");
optLang.value = opts.lang;
if (recognition) recognition.lang = opts.lang;
optLang.onchange = () => { opts.lang = optLang.value; saveOpts(); if (recognition) recognition.lang = opts.lang; };

/* ---- Audio-reactive orb ---- */
const orb = document.querySelector("#orb"), ctx = orb.getContext("2d");
let analyser = null, freq = null, level = 0, tick = 0;
async function micLevel() {
    if (analyser) return;
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        analyser = ac.createAnalyser();
        analyser.fftSize = 64;
        ac.createMediaStreamSource(stream).connect(analyser);
        freq = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) { analyser = null; }
}
function drawOrb() {
    tick += 0.03;
    let target = 0.1 + 0.05 * Math.sin(tick);
    if (listening && analyser) { analyser.getByteFrequencyData(freq); target = freq.reduce((a, b) => a + b, 0) / freq.length / 110; }
    else if (listening) target = 0.3 + 0.2 * Math.abs(Math.sin(tick * 6));
    else if (document.body.classList.contains("speaking")) target = 0.3 + 0.3 * Math.abs(Math.sin(tick * 5) * Math.sin(tick * 2.3));
    else if (mood === "thinking") target = 0.2 + 0.1 * Math.sin(tick * 8);
    level += (target - level) * 0.15;
    const [r, g, b] = MOODS[mood].color, N = 72, R = 98;
    ctx.clearRect(0, 0, 300, 300);
    ctx.lineCap = "round"; ctx.lineWidth = 3;
    ctx.strokeStyle = `rgba(${r},${g},${b},${Math.min(0.9, 0.35 + level * 0.6)})`;
    for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2, wob = Math.sin(a * 5 + tick * 2) * 0.5 + 0.5, len = 6 + level * 70 * (0.3 + wob);
        ctx.beginPath();
        ctx.moveTo(150 + Math.cos(a) * R, 150 + Math.sin(a) * R);
        ctx.lineTo(150 + Math.cos(a) * (R + len), 150 + Math.sin(a) * (R + len));
        ctx.stroke();
    }
    requestAnimationFrame(drawOrb);
}
drawOrb();

/* ---- PWA ---- */
if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("sw.js").catch(() => {});

/* ---- Luna wakes up when the page opens and tells you something ---- */
const THOUGHTS = [
    "Did you know honey never spoils? Isn't that sweet?",
    "I hope you drink some water today, okay?",
    "You are doing better than you think.",
    "Tell me what you'd like to do today!",
    "Octopuses have three hearts. Three! Can you imagine?",
    "Take a deep breath with me. In, and out. There, better!"
];
let greeted = false;

async function wakeUp() {
    document.body.classList.add("waking");
    wakeFace = true;
    showFace();
    setTimeout(() => { wakeFace = false; showFace(); }, 3400);
    setTimeout(() => document.body.classList.remove("waking"), 2500);
    const hour = new Date().getHours();
    let text = null;
    try {   // ask the AI brain for a fresh greeting (falls back below if no server)
        const ctl = new AbortController();
        setTimeout(() => ctl.abort(), 4000);
        const r = await fetch("/api/chat", {
            method: "POST", signal: ctl.signal, headers: { "content-type": "application/json" },
            body: JSON.stringify({
                messages: [{ role: "user", content: "I just opened the app. Greet me warmly for this time of day and tell me one short sweet or interesting thing." }],
                memory, lang: opts.lang, hour
            })
        });
        if (r.ok) {
            text = (await r.json()).text || "";
            const m = text.match(/^\[mood:(\w+)\]\s*/i);
            if (m) { setMood(m[1].toLowerCase()); text = text.slice(m[0].length); }
            if (/trouble thinking/i.test(text) || text === "error") text = null;
        }
    } catch (e) { /* no server: use built-in greeting */ }
    if (!text) text = (memory.name ? `Hi ${memory.name}! ` : "") + greetingText() + " " + pick(THOUGHTS);

    show(text);
    log("Luna", text);
    const say = () => speak(text, () => { greeted = true; userText.textContent = ""; });
    say(); // speaks right away if the browser allows it
    // One quiet retry (voices may not have been loaded yet). Never asks you to tap anything;
    // if the browser still blocks sound, the greeting simply stays on screen as text.
    setTimeout(() => { if (!greeted && !window.speechSynthesis.speaking) say(); }, 1500);
}
setTimeout(wakeUp, 400);

/* ---- Offline helpers ---- */
// 1) Download the on-device speech-recognition language pack once (needs internet one time).
if (SR && SR.available && SR.install && navigator.onLine) {
    SR.available({ langs: [opts.lang], processLocally: true })
        .then((r) => { if (r === "unavailable") return SR.install({ langs: [opts.lang], processLocally: true }); })
        .catch(() => {});
}
// 2) Use local sticker files if you saved them as faces/happy.gif, faces/sleepy.gif ... (works with no internet).
document.querySelectorAll(".face").forEach((f) => {
    const im = new Image();
    im.alt = "";
    im.onload = () => { f.innerHTML = ""; f.appendChild(im); showFace(); };
    im.onerror = () => { if (!im.dataset.retry) { im.dataset.retry = "1"; im.src = f.dataset.face + ".gif"; } }; // also look next to index.html
    im.src = "faces/" + f.dataset.face + ".gif";
});