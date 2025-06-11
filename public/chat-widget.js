document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chat-widget");

  chatContainer.innerHTML = `
    <div id="chat-header">Chatbot</div>
    <div id="chat-messages" class="chat-messages"></div>
    <form id="chat-form" class="chat-input-area">
      <input type="text" id="chat-input" class="chat-input" placeholder="Say something..." required />
      <button type="submit" class="chat-submit">Send</button>
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

  // Show welcome message
  appendMessage(
    "Hello! and welcome to V.Y.P.-Chatbot lounge! I use generative AI to help you better understand Ygrene and Ygrene's product.\n\nYou are our Very Ygrene Person — what is your name?",
    "bot"
  );

  chatForm.onsubmit = (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;

    appendMessage(userInput, "user");
    chatInput.value = "";

    if (!userName) {
      userName = userInput;
      appendMessage(`Nice to meet you, ${userName}! How can I assist you today?`, "bot");
    } else {
      // Simple canned responses for now
      let botReply = `Thanks for your message, ${userName}. I'm still learning!`;

      if (userInput.toLowerCase().includes("ygrene")) {
        botReply = `${userName}, Ygrene offers financing for energy efficiency and resiliency improvements. What would you like to know about?`;
      }

      appendMessage(botReply, "bot");
    }
  };
});
