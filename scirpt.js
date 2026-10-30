let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let botFace = document.querySelector("#botFace");


let moods = {
    happy: "faces/happy.png",
    sad: "faces/sad.png",
    neutral: "faces/neutral.png",
    thinking: "faces/thinking.png",
    surprised: "faces/surprised.png"
};

function setBotMood(mood) {
    botFace.src = moods[mood] || moods.neutral;
}

function randomReply(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function speak(text) {
    console.log("Speaking:", text);
    if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported");
        return;
    }
    window.speechSynthesis.cancel(); 
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Change to "en-US" if Hindi voice not available
    window.speechSynthesis.speak(text_speak);
}


function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let greetings = [
        "Hey! Ready to go?",
        "Hello! I’m here for you.",
        "Namaste! Let’s start the day.",
        "What’s up? I’m listening.",
        "Your personal assistant at your service."
    ];
    let randomGreet = greetings[Math.floor(Math.random() * greetings.length)];

    if (hours >= 4 && hours < 12) {
        speak(randomReply([
            "Good morning pineapple, have a wonderful day!",
            "Rise and shine! Ready to rock?",
            "Morning! Coffee time maybe?",
            "Rise and shine, champ!"
        ]));
    } else if (hours >= 12 && hours < 16) {
        speak(randomReply([
            "Very Good Afternoon",
            "Hope your afternoon is going well",
            "Good afternoon, need some motivation?"
        ]));
    } else if (hours >= 16 && hours < 20) {
        speak(randomReply([
            "Good Evening",
            "Evening vibes activated",
            "Hope your evening is peaceful",
            "Do you need some adrak wali kadak chai?"
        ]));
    } else {
        speak(randomReply([
            "Good Night, sweet dreams pineapple",
            "Time to rest and recharge",
            "Good night! Don’t let the bedbugs bite",
        ]));
    }
}

window.addEventListener("load", () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    console.log("Recognized:", transcript);
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    let helloReplies = [
        "Hello,what can I do for you?",
        "Hi there! Need any help?",
        "Hi there, ready to explore?",
        "Hey, I’m here!",
        "Hello friend, how’s it going?",
        "Yes, I’m listening!"
    ];

    if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
        let reply = randomReply(helloReplies);
        speak(reply);
    }

    else if (message.includes("who are you")) {
        let replies = [
            "I am your cute personal virtual assistant.",
            "I’m your smart little assistant",
            "You can call me your smart helper.",
            "I am here to make your life easier."
        ];
        speak(randomReply(replies));
    }

    else if (message.includes("open youtube")) {
        speak(randomReply([
            "Opening YouTube, enjoy watching!",
            "Here you go, YouTube is ready.",
            "Launching YouTube for you.",
            "Getting YouTube right now.",
            "Opening YouTube, sit back and relax."
        ]));
        window.open("https://www.youtube.com", "_blank");
    }

    else if (message.includes("open google")) {
        speak(randomReply([
            "Opening Google, what do you want to search?",
            "Here’s Google for you.",
            "Google is ready, ask me anything.",
            "Opening the power of the internet.",
            "Google is here, let’s search."
        ]));
        window.open("https://www.google.com", "_blank");
    }

    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(randomReply([
            "The time is " + time,
            "Right now it’s " + time,
            "It’s exactly " + time,
            "Checking my clock… it’s " + time,
            "Your time now is " + time,
            "Basically It's time to shine pineapple but technically it is " + time
        ]));
    }

    else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak(randomReply([
            "Today's date is " + date,
            "It is " + date + " today",
            "The calendar says " + date,
            "Today’s date: " + date,
            "We are on " + date
        ]));
    }

    else if (message.includes("open calculator")) {
        speak(randomReply([
            "Opening calculator for you.",
            "Here’s a calculator, go ahead.",
            "Math mode on, calculator ready.",
            "Launching scientific calculator.",
            "Calculator opened."
        ]));
        window.open("https://www.desmos.com/scientific", "_blank");
    }

    else if (message.includes("calculate")) {
        try {
            let expression = message.replace("calculate", "").trim();
            let result = eval(expression);
            speak(randomReply([
                "The answer is " + result,
                "It comes out to " + result,
                "Mathematically, that equals " + result,
                "Solved! The result is " + result,
                "Your calculation gives " + result
            ]));
        } catch {
            speak("I couldn’t calculate that, opening calculator for you.");
            window.open("https://www.desmos.com/scientific", "_blank");
        }
    }

    else if (message.includes("open whatsapp")) {
        speak(randomReply([
            "Opening WhatsApp for you.",
            "WhatsApp is ready, go chat to your favourite human.",
            "Here’s WhatsApp, message away.",
            "Opening WhatsApp now.",
            "WhatsApp opened."
        ]));
        window.open("https://web.whatsapp.com", "_blank");
    }

    else if (message.includes("open instagram")) {
        speak(randomReply([
            "Opening Instagram for you.",
            "Instagram is here, enjoy scrolling.",
            "Here’s Instagram, have fun.",
            "Opening Instagram now.",
            "Insta time! Opening Instagram."
        ]));
        window.open("https://www.instagram.com", "_blank");
    }

    else if (message.includes("open facebook")) {
        
        speak(randomReply([
            "Here is the live weather in " + city,
            "Checking the sky in " + city,
            "Here’s the weather update for " + city,
            "Getting weather info for " + city,
            "Looking up the weather in " + city
        ]));
        window.open("https://www.facebook.com", "_blank");
    }

    else if (message.includes("weather in")) {
        let city = message.replace("weather in", "").trim();
        speak(randomReply([
            "Here is the live weather in " + city,
            "Checking the sky in " + city,
            "Here’s the weather update for " + city,
            "Getting weather info for " + city,
            "Looking up the weather in " + city
        ]));
        window.open(`https://www.google.com/search?q=weather+${encodeURIComponent(city)}`, "_blank");
    }

    else if (message.includes("news in")) {
        let city = message.replace("news in", "").trim();
        speak(randomReply([
            "Here are the latest headlines from " + city,
            "Checking news in " + city,
            "Getting today’s news from " + city,
            "News headlines for " + city,
            "Looking up the latest from " + city
        ]));
        window.open(`https://www.google.com/search?q=${encodeURIComponent(city)}+news`, "_blank");
    }

    else if (message.includes("motivate") || message.includes("motivation")) {
        
        speak(randomReply([
            "Here are the latest headlines from " + city,
            "Checking news in " + city,
            "Getting today’s news from " + city,
            "News headlines for " + city,
            "Looking up the latest from " + city
        ]));
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        speak(randomQuote);
    }

    else {
        let query = message.replace("luna", "").trim();
        let finalText = "This is what I found on the internet regarding " + query;
        speak(randomReply([
            "This is what I found on the internet regarding " + query,
            "Here’s what I discovered about " + query,
            "Searching Google for " + query,
            "I looked it up, here are the results for " + query,
            "This is what I got for " + query
        ]));
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }

}
