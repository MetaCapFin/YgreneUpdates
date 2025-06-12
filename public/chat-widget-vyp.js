<script>
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
  let awaitingHelpConfirmation = false;

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

    if (awaitingHelpConfirmation) {
      const lowerInput = userInput.toLowerCase();
      if (["yes", "sure", "okay", "please", "yeah", "yep"].some(word => lowerInput.includes(word))) {
        appendMessage(
          `Here’s how you can get in touch:\n\nYgreneVIP Support:\n📞 Phone: XXX XXX XXXX\n📧 Email: support@ygrene.vip\n\nRM: C.A.\n📧 Email: c.a.@ygrene.vip\n📞 Phone: XXX XXX XXXX`,
          "bot"
        );
        appendMessage(`You can also schedule a one-on-one via the QR code below:`, "bot");

        const qrImage = document.createElement("img");
        qrImage.src = "https://your-calendly-qr-link.png"; // Replace with real QR code image URL
        qrImage.alt = "Schedule with RM";
        qrImage.style.width = "120px";
        qrImage.style.margin = "10px 0";
        chatMessages.appendChild(qrImage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        awaitingHelpConfirmation = false;
      } else {
        appendMessage(`No problem! I'm still here if you want to try again later.`, "bot");
        awaitingHelpConfirmation = false;
      }
      return;
    }

    const lowerInput = userInput.toLowerCase();
    let response = null;

    if (lowerInput.includes("what is ygrene") || lowerInput.includes("who is ygrene")) {
      response = "Ygrene provides PACE financing for energy-efficient and storm-resilient home improvements. Would you like to know what types of projects are eligible?";
    } else if (lowerInput.includes("how do i apply") || lowerInput.includes("apply")) {
      response = `You can apply through Ygrene’s website. Would you like me to guide you through the process, ${userName}?`;
    } else if (
      lowerInput.includes("eligible") ||
      lowerInput.includes("projects") ||
      lowerInput.includes("improvements")
    ) {
      response = "Eligible projects typically include solar panels, roofing, HVAC, impact windows, and more. Would you like the full list?";
    }

    if (response) {
      appendMessage(response, "bot");
    } else {
      appendMessage(
        `I'm not sure I can answer that right now, ${userName}. Would you like me to help you connect with a Support Agent or your Relationship Manager?`,
        "bot"
      );
      awaitingHelpConfirmation = true;
    }
  };
});
</script>



