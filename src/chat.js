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
  ZAEKODES KNOWLEDGE (ADDED)
**********************************/
const zaekodesTopics = [
  // Brand
  "zaekodes",
  "zae kodes",

  // Digital Solutions
  "digital",
  "web",
  "website",
  "web design",
  "web development",
  "mobile app",
  "application",
  "seo",
  "system",
  "automation",
  "ai",

  // Development & Policy Support
  "research",
  "policy",
  "evaluation",
  "monitoring",
  "gender",
  "advocacy",
  "sustainable",

  // Strategic Communication
  "communication",
  "storytelling",
  "academic writing",
  "script",
  "campaign",

  // Business
  "services",
  "pricing",
  "price",
  "cost",
  "quotation",
  "quote",
  "support"
];

const zaekodesProcessTopics = [
  "process",
  "workflow",
  "how you work",
  "how do you work",
  "steps",
  "approach",
  "methodology"
];

function isZaeKodesRelated(message) {
  const text = message.toLowerCase();
  return zaekodesTopics.some(topic => text.includes(topic));
}

function isProcessQuestion(message) {
  const text = message.toLowerCase();
  return zaekodesProcessTopics.some(topic => text.includes(topic));
}


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
          "Thank you for reaching out to ZaeKodes. How can I assist you today regarding our services?"
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

  // ❌ BLOCK NON-ZAEKODES QUESTIONS (ADDED)
  if (!isZaeKodesRelated(text) && !isProcessQuestion(text)) {
    addBotMessage(
      "Oops, that’s not something I handle 😅. Let’s talk about ZaeKodes services instead!"
    );
    return;
  }

  // ✅ PROCESS RESPONSE (ADDED)
  if (isProcessQuestion(text)) {
    addBotMessage(
      "Our process at ZaeKodes follows six clear steps:\n\n" +
      "1. Consult & Understand – We listen to your needs and goals.\n" +
      "2. Research & Strategy – We develop an evidence-based approach.\n" +
      "3. Design & Planning – We design user-focused solutions.\n" +
      "4. Build & Execute – We implement using best practices.\n" +
      "5. Review & Refine – We test and improve based on feedback.\n" +
      "6. Support & Grow – We provide ongoing support for long-term success.\n\n" +
      "Would you like to start with a consultation or request a quotation?"
    );
    return;
  }

  // 💰 Pricing / quotation detection (UNCHANGED)
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
  )}&context=You are the official ZaeKodes AI assistant. You ONLY respond to questions about ZaeKodes services, processes, and support. Politely redirect unrelated questions.&key=9f643d37e7b4384t68a91494fb6ocd10`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.answer) {
        addBotMessage(data.answer);
      } else {
        addBotMessage("Could you please rephrase your question regarding our services?");
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
