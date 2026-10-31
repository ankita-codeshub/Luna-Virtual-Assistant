<div align="center">

<img src="luna%20logo.png" alt="Luna Logo" width="140" />

# 🌙 Luna – Virtual Voice Assistant 🎙️

### *Meet Luna – your friendly virtual voice assistant!*

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Web%20Speech%20API-8A2BE2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Web Speech API" />
</p>

<p>
  <a href="https://github.com/ankita-codeshub/Simple-Voice-Virtual-Assistant/stargazers"><img src="https://img.shields.io/github/stars/ankita-codeshub/Simple-Voice-Virtual-Assistant?style=for-the-badge&color=gold" alt="Stars" /></a>
  <a href="https://github.com/ankita-codeshub/Simple-Voice-Virtual-Assistant/network/members"><img src="https://img.shields.io/github/forks/ankita-codeshub/Simple-Voice-Virtual-Assistant?style=for-the-badge&color=blue" alt="Forks" /></a>
  <a href="https://github.com/ankita-codeshub/Simple-Voice-Virtual-Assistant/issues"><img src="https://img.shields.io/github/issues/ankita-codeshub/Simple-Voice-Virtual-Assistant?style=for-the-badge&color=red" alt="Issues" /></a>
  <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/PRs-Welcome-ff69b4?style=for-the-badge" alt="PRs Welcome" />
</p>

**🎙️ Listen &nbsp;•&nbsp; 🔊 Speak &nbsp;•&nbsp; 🌐 Browse &nbsp;•&nbsp; ☁️ Weather &nbsp;•&nbsp; 📰 News &nbsp;•&nbsp; 🧮 Calculate &nbsp;•&nbsp; 🎭 Express**

</div>

---

## 📑 Contents

1. [📖 About](#-about)
2. [🚀 Features](#-features)
3. [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
4. [📂 Project Structure](#-project-structure)
5. [🎭 Dynamic Facial Expressions](#-dynamic-facial-expressions)
6. [🎤 Supported Voice Commands](#-supported-voice-commands)
7. [💻 How to Run Locally](#-how-to-run-locally)
8. [🌟 Future Improvements](#-future-improvements)
9. [👩‍💻 Contributing](#%E2%80%8D-contributing)
10. [🙏 Acknowledgements](#-acknowledgements)
11. [📄 License](#-license)
12. [👤 Author](#-author)

---

## 📖 About

> **Luna** is a smart and interactive **Virtual Voice Assistant** built using **HTML, CSS and JavaScript**.

Luna listens to your voice commands, responds through speech, opens websites, looks up weather and news, performs calculations and more.

She also features **dynamic facial expressions** using GIF animations, making every interaction more engaging and user-friendly. 🎭

---

## 🚀 Features

| Icon | Feature | Description |
|:---:|---|---|
| 🎙️ | **Voice Recognition** | Interact with Luna using natural voice commands |
| 🔊 | **Speech Response** | Luna replies using text-to-speech technology |
| 🌐 | **Website Navigation** | Open Google, YouTube, Instagram, Facebook and WhatsApp |
| ⏰ | **Time & Date** | Get the current time and date by voice |
| ☁️ | **Weather Lookup** | Say a city and Luna opens its weather results on Google |
| 📰 | **Latest News** | Say a city and Luna opens its latest news results on Google |
| 🧮 | **Calculator** | Calculate by voice, or open an online scientific calculator |
| 🔎 | **Smart Search** | Anything Luna doesn't recognise is searched on Google |
| 🤖 | **Dynamic Expressions** | Luna shows different emotions using animated GIFs |
| 🧠 | **Optional AI Brain** | `server.js` can answer with Gemini, Groq or OpenRouter online, and Ollama offline |
| 🎨 | **Interactive UI** | User-friendly interface with animations and visual feedback |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Structure of the application |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Styling, layout, and animations |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Core functionality and command processing |
| ![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-8A2BE2?style=flat-square) | Speech recognition and text-to-speech |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | Local server (`server.js`) |
| ![AI Brain](https://img.shields.io/badge/Gemini%20%7C%20Groq%20%7C%20OpenRouter%20%7C%20Ollama-6C47FF?style=flat-square) | Optional AI chat backend (`/api/chat`) with online and offline modes |

---

## 📂 Project Structure

<details open>
<summary><b>Click to expand / collapse</b></summary>

```text
Simple-Voice-Virtual-Assistant/
│
├── index.html
├── style.css
├── script.js
├── server.js
├── sw.js
├── manifest.json
├── package.json
├── LICENSE
├── README.txt
│
├── logo.jpg
├── luna logo.png
├── mic.svg
├── mic1.svg
├── voice.gif
├── voice.svg
│
├── faces/
│   ├── angry.gif
│   ├── coming.gif
│   ├── excited.gif
│   ├── happy.gif
│   ├── interesting.gif
│   ├── sad.gif
│   └── sleeping.gif
│
└── README.md
```

> 📝 **Note:** This structure represents the project files. Some optional files may vary depending on your local setup.

</details>

---

## 🎭 Dynamic Facial Expressions

Luna uses **animated GIFs** to express different moods and reactions. You can customise the expressions by replacing or adding GIF files inside the `faces` folder.

**Example in JavaScript**

```javascript
// Change Luna's expression dynamically
setBotMood("happy");
setBotMood("sad");
```

> 💡 The expression changes according to the mood selected by the application.

---

## 🎤 Supported Voice Commands

| 🗣️ Voice Command | ⚡ Action |
|:---|:---|
| `Hi Luna` / `Hello` | Luna greets the user |
| `Who are you?` | Luna introduces herself |
| `What time is it?` | Announces the current time |
| `What's today's date?` | Announces the current date |
| `Open YouTube` | Opens YouTube |
| `Open Google` | Opens Google |
| `Open WhatsApp` | Opens WhatsApp Web |
| `Open Instagram` | Opens Instagram |
| `Open Facebook` | Opens Facebook |
| `Open Calculator` | Opens an online scientific calculator |
| `Calculate 12 + 5` | Calculates and announces the result |
| `Weather in [city]` | Opens Google weather results for the city |
| `News in [city]` | Opens Google news results for the city |
| *Anything else* | Searches Google for what you said |

---

## 💻 How to Run Locally

Follow these steps to run Luna on your computer.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ankita-codeshub/Simple-Voice-Virtual-Assistant.git
```

### 2️⃣ Navigate to the project folder

```bash
cd Simple-Voice-Virtual-Assistant
```

### 3️⃣ Install dependencies

Requires [Node.js](https://nodejs.org). This installs `express`.

```bash
npm install
```

### 4️⃣ Run the application

Luna's server (`server.js`) runs on port `3000`. Start it with an online AI provider:

**Windows PowerShell**

```powershell
$env:PROVIDER="gemini"; $env:API_KEY="your_key"; node server.js
```

**Mac / Linux**

```bash
PROVIDER=gemini API_KEY=your_key node server.js
```

**Offline only** *(no key, uses Ollama)*

```bash
node server.js
```

Then open **http://localhost:3000** in **Chrome or Edge**.

> 💡 Prefer not to use the server? You can also open `index.html` with the **VS Code Live Server** extension; the voice commands run in the browser.

### 5️⃣ Start interacting with Luna! 🌙

Allow **microphone access** when prompted and try the supported voice commands.

<details>
<summary><b>🧠 AI brain configuration (optional)</b></summary>

<br />

`server.js` tries an **online brain** first and automatically falls back to an **offline brain** ([Ollama](https://ollama.com)) if there is no internet or the request fails. Settings are passed as environment variables:

| Variable | Purpose | Default |
|:---|:---|:---|
| `PROVIDER` | Online provider: `gemini`, `groq` or `openrouter` | `gemini` |
| `API_KEY` | Your provider API key | *none (offline only)* |
| `MODEL` | Override the provider's model | provider default |
| `OLLAMA_URL` | Ollama endpoint | `http://localhost:11434/v1/chat/completions` |
| `OFFLINE_MODEL` | Offline Ollama model | `llama3.2:3b` |

**Offline setup:** install Ollama, then run:

```bash
ollama pull llama3.2:3b
```

**Free API keys:** [Gemini](https://aistudio.google.com/apikey) · [Groq](https://console.groq.com) · [OpenRouter](https://openrouter.ai)

> ℹ️ Weather and news need **no API key**; Luna opens the Google results for the city you ask about.

> ⚠️ Never commit your private API keys to a public repository.

</details>

---

## 🌟 Future Improvements

- [ ] Add offline voice recognition
- [ ] Develop a mobile application
- [ ] Integrate AI-powered conversational responses
- [ ] Add customisable voice packs
- [ ] Improve multilingual voice interaction
- [ ] Introduce more facial expressions and animations

---

## 👩‍💻 Contributing

Contributions are welcome! 🎉 If you want to improve Luna or add new features:

1. **Fork** this repository
2. **Create** a new branch

   ```bash
   git checkout -b feature-name
   ```

3. **Make** your changes
4. **Commit** your changes

   ```bash
   git commit -m "Add new feature"
   ```

5. **Push** your branch

   ```bash
   git push origin feature-name
   ```

6. **Open** a Pull Request

---

## 🙏 Acknowledgements

- 🎙️ [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- 🔤 [Google Fonts](https://fonts.google.com/)
- ☁️ Google Search (weather and news results)
- 🧠 [Ollama](https://ollama.com), [Gemini](https://aistudio.google.com), [Groq](https://console.groq.com) and [OpenRouter](https://openrouter.ai) for the optional AI brain

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project according to the terms of the license.

---

## 👤 Author

<div align="center">

**Ankita**

<a href="https://github.com/ankita-codeshub"><img src="https://img.shields.io/badge/GitHub-ankita--codeshub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://github.com/ankita-codeshub/Simple-Voice-Virtual-Assistant"><img src="https://img.shields.io/badge/Repository-Luna-blueviolet?style=for-the-badge&logo=github&logoColor=white" alt="Repository" /></a>

</div>

---

<div align="center">

### ⭐ If you like Luna, give this repository a star! ⭐

**Thank you for visiting! 💜**

Made with ❤️ by **Ankita**

🌙 *Meet Luna – Your friendly virtual voice assistant!*

</div>
