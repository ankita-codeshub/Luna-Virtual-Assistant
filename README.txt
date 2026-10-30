LUNA - quick start
1. Install Node.js (nodejs.org). Optional offline brain: install Ollama, then run:  ollama pull llama3.2:3b
2. Open a terminal in this folder and run:  npm install
3. Start Luna:
   Windows PowerShell:  $env:PROVIDER="gemini"; $env:API_KEY="your_key"; node server.js
   Mac/Linux:           PROVIDER=gemini API_KEY=your_key node server.js
   Offline only:        node server.js
4. Open http://localhost:3000 in Chrome or Edge, allow the microphone, press Ctrl+Shift+R once.
Free keys: Gemini aistudio.google.com/apikey | Groq console.groq.com | OpenRouter openrouter.ai
