// public/chat-widget.js

document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chat-widget");

  chatContainer.innerHTML = `
    <div id="chat-header">Chatbot</div>
    <div id="chat-messages"></div>
    <form id="chat-form">
      <input type="text" id="chat-input" placeholder="Say something..." required />
      <button type="submit">Send</button>
    </form>
  `;

  const chatForm = chatContainer.querySelector("#chat-form");
  const chatInput = chatContainer.querySelector("#chat-input");
  const chatMessages = chatContainer.querySelector("#chat-messages");

  let userName = null;

  const appendMessage = (text, sender) => {
    const msg = document.createElement("div");
    msg.className = `chat-message ${sender}`;
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Show welcome message when chatbot loads
  appendMessage(
    "Hello! and welcome to V.Y.P.-Chatbot lounge! I use generative AI to help you better understand Ygrene and Ygrene's product.\n\nYou are our Very Ygrene Person, what is your name?",
    "bot"
  );

  chatForm.onsubmit = async (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;
    appendMessage(userInput, "user");
    chatInput.value = "";

    appendMessage("...", "bot");

    // Handle name capture on first input
    if (!userName) {
      userName = userInput;
      chatMessages.lastChild.innerText = `Nice to meet you, ${userName}! How can I assist you today?`;
      return;
    }

    // Send message to backend chatbot API
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      chatMessages.lastChild.innerText = data.reply
        ? data.reply.replaceAll("{{name}}", userName)
        : "(no response)";
    } catch (err) {
      chatMessages.lastChild.innerText = "Error talking to bot.";
    }
  };
});

