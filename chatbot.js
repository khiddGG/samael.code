document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("chatToggle");
  const windowEl = document.getElementById("chatWindow");
  const closeBtn = document.getElementById("chatClose");
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

  // OPEN CHAT
  toggle.addEventListener("click", () => {
    windowEl.classList.add("open");
    toggle.classList.add("hide");
  });

  // CLOSE CHAT (MINIMIZE)
  closeBtn.addEventListener("click", () => {
    windowEl.classList.remove("open");
    toggle.classList.remove("hide");
  });

  // SEND BUTTON
  sendBtn.addEventListener("click", sendMessage);

  // ENTER KEY
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    const reply = getBotReply(text);
    fakeTyping(reply);
  }

  // CHATBOT LOGIC
  function getBotReply(text) {
    const lower = text.toLowerCase();

    if (lower.includes("magkano") || lower.includes("price")) {
      return "Depende po sa scope at features ng system. Usually, ang starting price ay around ₱13000 pataas.";
    }

    if (lower.includes("ilang araw") || lower.includes("weeks") || lower.includes("gaano katagal")) {
      return "Kaya po itong matapos within 3 weeks to 1 month, depende sa complexity ng system.";
    }

    if (lower.includes("rush")) {
      return "Yes po, pwede naman po rush. However, may additional fee po ito depende sa timeline.";
    }

    if (lower.includes("responsive") || lower.includes("mobile")) {
      return "Yes po, ang system ay fully responsive at pwedeng ma-access sa mobile at desktop devices.";
    }

    if (lower.includes("source code")) {
      return "Yes po, ibibigay po namin ang complete source code after project completion.";
    }

    if (lower.includes("payment") || lower.includes("downpayment")) {
      return "Pwede po downpayment muna, then remaining balance upon completion ng system.";
    }

    if (lower.includes("location") || lower.includes("saan")) {
      return "Bataraza, Palawan lang ako.";
    }

    if (
      lower.includes("meetup") ||
      lower.includes("meet up") ||
      lower.includes("kita") ||
      lower.includes("punta")
    ) {
      return "Opo pwede, i-chat nyo lang ako sa contacts ko sa baba.";
    }

    // ✅ FALLBACK WITH SUGGESTIONS
    return `
      Pwede mo akong tanungin ng mga ito 👇

      <button class="suggest-btn" onclick="quickAsk('Magkano magpagawa ng system?')">💰 Magkano?</button>
      <button class="suggest-btn" onclick="quickAsk('Gaano katagal matapos?')">⏱ Timeline</button>
      <button class="suggest-btn" onclick="quickAsk('Pwede ba rush?')">⚡ Rush</button>
      <button class="suggest-btn" onclick="quickAsk('Responsive ba ito?')">📱 Responsive</button>
      <button class="suggest-btn" onclick="quickAsk('Paano ang payment?')">💳 Payment</button>
      <button class="suggest-btn" onclick="quickAsk('Pwede ba meetup?')">📍 Meetup</button>
    `;
  }

  // ADD MESSAGE
  function addMessage(role, text) {
    const div = document.createElement("div");
    div.className = `message ${role}`;
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // QUICK ASK (GLOBAL para gumana onclick sa buttons)
  window.quickAsk = function (text) {
    input.value = text;
    sendMessage();
  };

  // TYPING EFFECT
  function fakeTyping(text) {
    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerHTML = "•••";
    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage("bot", text);
    }, 700);
  }

});