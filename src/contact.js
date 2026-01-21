/*********************************
  EMAILJS INITIALISATION
**********************************/
(function () {
  emailjs.init("7m6PT7D2OUQlXNcOZ");
})();

/*********************************
  CONTACT PAGE FORM HANDLER
**********************************/
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-page-form");
  const successMsg = document.getElementById("contact-success");

  // Safety check so this JS does NOT break other pages
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const templateParams = {
      name: document.getElementById("cp-name").value.trim(),
      phone: document.getElementById("cp-phone").value.trim(),
      email: document.getElementById("cp-email").value.trim(),
      message: document.getElementById("cp-message").value.trim(),

      // Optional but VERY useful
      source: "Contact Page"
    };

    emailjs
      .send(
        "service_zjtqfxi",
        "template_p50dunp",
        templateParams
      )
      .then(() => {
        contactForm.reset();
        contactForm.style.display = "none";
        successMsg.style.display = "block";
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Something went wrong. Please try again later.");
      });
  });
});
