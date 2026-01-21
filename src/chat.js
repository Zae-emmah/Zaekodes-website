/*********************************
  CHAT TOGGLE
**********************************/
const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const chatClose = document.getElementById("chat-close");

if (chatToggle && chatBox && chatClose) {
  chatToggle.addEventListener("click", () => {
    chatBox.style.display = "flex";
  });

  chatClose.addEventListener("click", () => {
    chatBox.style.display = "none";
  });
}


/*********************************
  EMAILJS INIT
**********************************/
if (typeof emailjs !== "undefined") {
  emailjs.init("7m6PT7D2OUQlXNcOZ");
}


/*********************************
  CHAT ELEMENTS
**********************************/
const form = document.getElementById("contact-form");
const messages = document.getElementById("messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

let userData = {};
let formSubmitted = false; // 🔒 LOCK AI UNTIL FORM IS SUBMITTED


/*********************************
  STEP 1: CONTACT FORM
**********************************/
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    userData = {
      name: document.getElementById("fullName")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      email: document.getElementById("email")?.value || ""
    };

    emailjs
      .send("service_zjtqfxi", "template_9svwc4c", userData)
      .then(() => {
        formSubmitted = true;

        form.style.display = "none";
        messages.style.display = "block";
        chatInput.style.display = "flex";

        addBotMessage(
          "Thank you for reaching out to ZaeKodes. How can I assist you today?"
        );
      })
      .catch(() => {
        addBotMessage(
          "Something went wrong while submitting your details. Please try again."
        );
      });
  });
}


/*********************************
  STEP 2: USER MESSAGE
**********************************/
if (sendBtn && userInput) {
  sendBtn.addEventListener("click", handleUserMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUserMessage();
    }
  });
}

function handleUserMessage() {
  if (!formSubmitted) {
    addBotMessage("Please provide your contact information before we begin.");
    return;
  }

  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  // Pricing / quotation detection
  if (/price|pricing|cost|quote|quotation|budget/i.test(text)) {
    addBotMessage(
      "Thank you. Your request has been sent to the admin. You will receive a response via the email you provided."
    );
    return;
  }

  fetchAIResponse(text);
}


/*********************************
  STEP 3: AI RESPONSE (SheCodes API)
**********************************/
function fetchAIResponse(prompt) {
  const url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=You are the official ZaeKodes AI assistant. Respond professionally, clearly, and concisely.&key=9f643d37e7b4384t68a91494fb6ocd10`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.answer) {
        addBotMessage(data.answer);
      } else {
        addBotMessage("I didn’t quite get that. Could you rephrase?");
      }
    })
    .catch(() => {
      addBotMessage(
        "I’m having trouble responding right now. Please try again shortly."
      );
    });
}


/*********************************
  UI HELPERS
**********************************/
function addUserMessage(text) {
  if (!messages) return;

  const msg = document.createElement("div");
  msg.className = "user-msg";
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function addBotMessage(text) {
  if (!messages) return;

  const msg = document.createElement("div");
  msg.className = "bot-msg";
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}
