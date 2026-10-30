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

## 🧭 Navigation

<div align="center">

| | | | |
|:---:|:---:|:---:|:---:|
| [📖 About](#-about) | [🚀 Features](#-features) | [🎬 Preview](#-preview) | [🛠️ Tech Stack](#️-tech-stack) |
| [🔄 Workflow](#-workflow) | [📂 Structure](#-project-structure) | [🎭 Expressions](#-dynamic-facial-expressions) | [🎤 Commands](#-supported-voice-commands) |
| [💻 Setup](#-how-to-run-locally) | [🌟 Roadmap](#-future-improvements) | [👩‍💻 Contributing](#-contributing) | [🙏 Credits](#-acknowledgements) |

</div>

---

## 📖 About

> **Luna** is a smart and interactive **Virtual Voice Assistant** built using **HTML, CSS and JavaScript**.

Luna listens to your voice commands, responds through speech, opens websites, provides weather updates, fetches the latest news, performs calculations and more.

She also features **dynamic facial expressions** using GIF animations, making every interaction more engaging and user-friendly. 🎭

---

## 🚀 Features

| Icon | Feature | Description |
|:---:|---|---|
| 🎙️ | **Voice Recognition** | Interact with Luna using natural voice commands |
| 🔊 | **Speech Response** | Luna replies using text-to-speech technology |
| 🌐 | **Website Navigation** | Open Google, YouTube, Instagram, Facebook and WhatsApp |
| ⏰ | **Time & Date** | Get the current time and date by voice |
| ☁️ | **Live Weather Updates** | Check weather information for different cities |
| 📰 | **Latest News** | Get the latest news updates for a selected city |
| 🧮 | **Calculator** | Perform mathematical calculations with voice commands |
| 🤖 | **Dynamic Expressions** | Luna shows different emotions using animated GIFs |
| 🎨 | **Interactive UI** | User-friendly interface with animations and visual feedback |

---


## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Structure of the application |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Styling, layout, and animations |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Core functionality and command processing |
| ![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-8A2BE2?style=flat-square) | Speech recognition and text-to-speech |
| ![Weather API](https://img.shields.io/badge/Weather%20API-00A8E8?style=flat-square) | Weather information |
| ![News API](https://img.shields.io/badge/News%20API-FF5722?style=flat-square) | Latest news updates |

---

## 🔄 Workflow

```mermaid
flowchart LR
    A([🎙️ User speaks]) --> B[Web Speech API<br/>Speech Recognition]
    B --> C{JavaScript<br/>Command Processing}
    C -->|Greeting| D[👋 Greet the user]
    C -->|Time / Date| E[⏰ Announce time or date]
    C -->|Open site| F[🌐 Open website]
    C -->|Weather| G[☁️ Weather API]
    C -->|News| H[📰 News API]
    C -->|Calculate| I[🧮 Compute result]
    D --> J[🔊 Text-to-Speech response]
    E --> J
    F --> J
    G --> J
    H --> J
    I --> J
    J --> K[🎭 Update facial expression GIF]
```

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

| 😠 | 🚶 | 🤩 | 😊 | 🤔 | 😢 | 😴 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `angry` | `coming` | `excited` | `happy` | `interesting` | `sad` | `sleeping` |

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
| `What time is it?` | Announces the current time |
| `What's today's date?` | Announces the current date |
| `Open YouTube` | Opens YouTube |
| `Open Google` | Opens Google |
| `Open WhatsApp` | Opens WhatsApp Web |
| `Open Instagram` | Opens Instagram |
| `Weather in [city]` | Provides weather information |
| `News in [city]` | Provides news updates |
| `Calculate 12 plus 5` | Calculates and announces the result |

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

### 3️⃣ Install dependencies *(if required)*

```bash
npm install
```

### 4️⃣ Run the application

If the project uses a Node.js server, use the start command configured in `package.json`:

```bash
# [PLACEHOLDER: replace with the start command from your package.json]
```

Alternatively, open `index.html` using the **VS Code Live Server** extension if your setup supports direct browser execution.

### 5️⃣ Start interacting with Luna! 🌙

Allow **microphone access** when prompted and try the supported voice commands.

<details>
<summary><b>🔑 API configuration (Weather & News)</b></summary>

<br />

Luna uses a Weather API and a News API. Add your own keys where the project expects them:

- Weather API provider: `[PLACEHOLDER: provider name]`
- News API provider: `[PLACEHOLDER: provider name]`
- Where to add your keys: `[PLACEHOLDER: file / variable name]`

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
- ☁️ Weather and news API providers

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
