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
      appendMessage(`Nice to meet you, ${userName}! How can I help you today?`, "bot");
      return;
    }

    let response = `Thanks for your message, ${userName}. I'm here to help you with Ygrene.`;

    if (userInput.toLowerCase().includes("what is ygrene")) {
      response = "Ygrene provides financing for energy-efficient and storm-resilient home improvements. Would you like to know what projects are eligible?";
    } else if (userInput.toLowerCase().includes("how do i apply")) {
      response = "You can apply online through the Ygrene portal. I can help guide you through it step by step.";
    }

    appendMessage(response, "bot");
  };
});
