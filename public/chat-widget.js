// public/chat-widget.js

document.addEventListener("DOMContentLoaded", () => {
  // Clear entire body content
  document.body.innerHTML = '';

  // Create main container
  const chatContainer = document.createElement("div");
  chatContainer.id = "chat-widget-container";
  chatContainer.innerHTML = `
    <div class="chat-header">🤖 Chat with CieloBot</div>
    <div id="chat-messages" class="chat-messages"></div>
    <form id="chat-form" class="chat-input-area">
      <input type="text" id="chat-input" class="chat-input" placeholder="Type your message..." required />
      <button type="submit" class="chat-submit">Send</button>
    </form>
  `;
  document.body.appendChild(chatContainer);

  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  const appendMessage = (text, sender) => {
    const msg = document.createElement("div");
    msg.className = `chat-message ${sender}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const sendMessage = async (text) => {
    appendMessage(text, "user");
    chatInput.value = "";
    appendMessage("...", "bot");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      chatMessages.lastChild.textContent = data.reply || "(no response)";
    } catch (err) {
      chatMessages.lastChild.textContent = "Error talking to bot.";
    }
  };

  chatForm.onsubmit = (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;
    sendMessage(userInput);
  };

  // Initial bot welcome message
  appendMessage("Hi! I'm CieloBot 🌤️ — how can I help you today?", "bot");
});
