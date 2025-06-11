// public/chat-widget.js

document.addEventListener("DOMContentLoaded", () => {
  const chatButton = document.createElement("button");
  chatButton.innerText = "💬 Chat";
  chatButton.id = "chat-toggle-button";
  document.body.appendChild(chatButton);

  const chatContainer = document.createElement("div");
  chatContainer.id = "chat-widget";
  chatContainer.innerHTML = `
    <div id="chat-header">Chatbot <span id="close-chat">✖</span></div>
    <div id="chat-messages"></div>
    <form id="chat-form">
      <input type="text" id="chat-input" placeholder="Say something..." required />
      <button type="submit">Send</button>
    </form>
  `;
  document.body.appendChild(chatContainer);

  const toggleButton = document.getElementById("chat-toggle-button");
  const closeButton = chatContainer.querySelector("#close-chat");
  const chatForm = chatContainer.querySelector("#chat-form");
  const chatInput = chatContainer.querySelector("#chat-input");
  const chatMessages = chatContainer.querySelector("#chat-messages");

  toggleButton.onclick = () => {
    chatContainer.style.display = "block";
    toggleButton.style.display = "none";
  };

  closeButton.onclick = () => {
    chatContainer.style.display = "none";
    toggleButton.style.display = "block";
  };

  const appendMessage = (text, sender) => {
    const msg = document.createElement("div");
    msg.className = `chat-message ${sender}`;
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  chatForm.onsubmit = async (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;
    appendMessage(userInput, "user");
    chatInput.value = "";

    appendMessage("...", "bot");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      chatMessages.lastChild.innerText = data.reply || "(no response)";
    } catch (err) {
      chatMessages.lastChild.innerText = "Error talking to bot.";
    }
  };
});
