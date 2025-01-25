const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // عرض رسالة المستخدم في واجهة الشات
  addMessageToChat("user", message);

  // إرسال الرسالة إلى الذكاء الاصطناعي والحصول على الرد
  getAIResponse(message).then(response => {
    addMessageToChat("bot", response);
  });

  userInput.value = ""; // مسح حقل الإدخال
}

function addMessageToChat(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // التمرير إلى آخر الرسائل
}

async function getAIResponse(message) {
  // استبدل YOUR_API_KEY بمفتاح OpenAI الخاص بك
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
    return "حدث خطأ في الاتصال بالذكاء الاصطناعي.";
  }
}

