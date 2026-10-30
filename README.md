# Simple-Voice-Virtual-Assistant
# 🌙 Luna - Virtual Voice Assistant  

Luna is a **smart virtual voice assistant** built with **HTML, CSS, and JavaScript**.  
It can **listen**, **speak**, and **perform various tasks** like opening websites, checking the weather, telling the current time/date, and more — just like Google Assistant.  
Luna also supports **dynamic expression GIFs**, making the assistant more interactive and fun to use. 🎭


## 🚀 Features
- 🎙 **Voice Recognition** – Talk to Luna using natural speech.
- 🔊 **Speech Reply** – Luna talks back using a realistic voice.
- 🌐 **Open Websites** – YouTube, Google, Instagram, Facebook, WhatsApp, etc.
- ⏱ **Time & Date** – Get the current time and date.
- ☁ **Live Weather** – Check the latest weather for any city.
- 📰 **Latest News** – Get live news updates for any city.
- 🧮 **Calculator Support** – Perform calculations using voice commands.
- 🤖 **Dynamic Expressions** – Luna displays emotions using **GIFs** like happy, sad, thinking, etc.


## 📂 Project Structure
Virtual-Assistant-Luna/
│
├── index.html # Main HTML file
├── style.css # Styling
├── script.js # Core bot logic
│
├── logo.jpg # Luna's logo
├── mic.svg # Microphone icon
├── voice.gif # Default speaking animation
│
└── faces/ # Folder for Luna's mood GIFs
├── happy.gif
├── sad.gif
├── thinking.gif
├── surprised.gif
└── neutral.gif

## 🖼️ Adding Expression GIFs
Luna can express different **emotions** dynamically.  
You can customize or replace these GIFs inside the `faces` folder.

| **Mood**        | **Filename**        |
|------------------|---------------------|
| Happy 😊          | `happy.gif`         |
| Sad 😢            | `sad.gif`           |
| Thinking 🤔       | `thinking.gif`      |
| Surprised 😲      | `surprised.gif`     |
| Neutral 😐 (default) | `neutral.gif`    |

**Example in Code:**
```javascript
// Change Luna's mood dynamically
setBotMood("happy");     // Displays happy.gif
setBotMood("thinking");  // Displays thinking.gif
setBotMood("sad");       // Displays sad.gif

🎤 Supported Voice Commands
Here are some commands you can try:

Command	Action Performed
Hi Luna / Hello---------- Luna greets you back.
What time is it?---------	Tells the current time.
What's today's date?----- Reads out today's date.
Open YouTube-------------	Opens YouTube in a new tab.
Open Google	--------------Opens Google search engine.
Open WhatsApp-------------Opens WhatsApp Web.
Open Instagram-----------	Opens Instagram.
Weather in [city name]---	Shows live weather for that city.
News in [city name]------	Shows latest news for that city.
Calculate 12 plus 5	------Calculates and speaks the result.

💻 How to Run Locally:
Follow these steps to set up Luna on your machine:

Clone the repository
git clone https://github.com/your-username/Luna-Virtual-Assistant.git
Open the project folder
cd Luna-Virtual-Assistant
Run the assistant
Simply open index.html in any modern browser (Chrome recommended).

🛠 Tech Stack:

HTML5 – Structure of the app.
CSS3 – Styling with custom fonts and animations.
JavaScript – Core logic for speech recognition and dynamic responses.
Web Speech API – For speech-to-text and text-to-speech functionality.

🌟 Future Improvements

Add offline voice recognition support.
Build a mobile app version of Luna.
Integrate AI-based responses using GPT APIs.
Add custom voice packs for a more natural tone.

👩‍💻 Contributing

Contributions are always welcome!
If you have ideas to improve Luna:
Fork the repo.
Create a new branch: git checkout -b feature-idea.
Commit your changes: git commit -m 'Added a cool feature'.
Push and open a Pull Request.

✨ Acknowledgements

Web Speech API
Fonts used from Google Fonts

🧾 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute this project with proper credit.


