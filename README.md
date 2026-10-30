###**🌙 Luna – Virtual Voice Assistant**

Luna is a smart and interactive Virtual Voice Assistant built using HTML, CSS, and JavaScript.

It can listen to voice commands, respond through speech, open websites, provide weather updates, fetch the latest news, perform calculations, and more.

Luna also features dynamic facial expressions using GIF animations, making the interaction more engaging and user-friendly. 🎭

🚀 Features

- 🎙️ Voice Recognition – Interact with Luna using natural voice commands.
- 🔊 Speech Response – Luna responds using text-to-speech technology.
- 🌐 Website Navigation – Open popular websites such as Google, YouTube, Instagram, Facebook, and WhatsApp.
- ⏰ Time & Date – Get the current time and date through voice commands.
- ☁️ Live Weather Updates – Check weather information for different cities.
- 📰 Latest News – Get the latest news updates for a selected city.
- 🧮 Calculator – Perform mathematical calculations using voice commands.
- 🤖 Dynamic Expressions – Luna displays different emotions using animated GIFs.
- 🎨 Interactive UI – A user-friendly interface with animations and visual feedback.

🛠️ Tech Stack

Technology| Purpose
HTML5| Structure of the application
CSS3| Styling, layout, and animations
JavaScript| Core functionality and command processing
Web Speech API| Speech recognition and text-to-speech
Weather API| Weather information
News API| Latest news updates

📂 Project Structure

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

Note: This structure represents the project files. Some optional files may vary depending on your local setup.

🎭 Dynamic Facial Expressions

Luna uses animated GIFs to express different moods and reactions.

You can customize the expressions by replacing or adding GIF files inside the "faces" folder.

Example in JavaScript

// Change Luna's expression dynamically
setBotMood("happy");
setBotMood("sad");
setBotMood("thinking");

The expression changes according to the mood selected by the application.

🎤 Supported Voice Commands

Voice Command| Action
Hi Luna / Hello| Luna greets the user
What time is it?| Announces the current time
What's today's date?| Announces the current date
Open YouTube| Opens YouTube
Open Google| Opens Google
Open WhatsApp| Opens WhatsApp Web
Open Instagram| Opens Instagram
Weather in [city]| Provides weather information
News in [city]| Provides news updates
Calculate 12 plus 5| Calculates and announces the result

💻 How to Run Locally

Follow these steps to run Luna on your computer.

1. Clone the repository

git clone https://github.com/ankita-codeshub/Simple-Voice-Virtual-Assistant.git

2. Navigate to the project folder

cd Simple-Voice-Virtual-Assistant

3. Install dependencies (if required)

npm install

4. Run the application

If the project uses a Node.js server, use the start command configured in "package.json".

Alternatively, open "index.html" using the VS Code Live Server extension if your setup supports direct browser execution.

5. Start interacting with Luna!

Allow microphone access when prompted and try the supported voice commands.

🌟 Future Improvements

- Add offline voice recognition.
- Develop a mobile application.
- Integrate AI-powered conversational responses.
- Add customizable voice packs.
- Improve multilingual voice interaction.
- Introduce more facial expressions and animations.

👩‍💻 Contributing

Contributions are welcome!

If you want to improve Luna or add new features:

1. Fork this repository.
2. Create a new branch:

git checkout -b feature-name

3. Make your changes.
4. Commit your changes:

git commit -m "Add new feature"

5. Push your branch:

git push origin feature-name

6. Open a Pull Request.

🙏 Acknowledgements

- "Web Speech API" (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- "Google Fonts" (https://fonts.google.com/)
- Weather and news API providers.

📄 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project according to the terms of the license.

---

Made with ❤️ by Ankita

🌙 Meet Luna – Your friendly virtual voice assistant!
