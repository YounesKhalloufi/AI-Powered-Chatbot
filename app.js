const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessageToChat("user", message);

  getAIResponse(message).then(response => {
    addMessageToChat("bot", response);
  });

  userInput.value = "";
}

function addMessageToChat(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(message) {
  const apiKey = "YOUR_API_KEY";

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 100
      })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while connecting to AI.";
  }
}
