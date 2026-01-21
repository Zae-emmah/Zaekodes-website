document.addEventListener("DOMContentLoaded", () => {
  const headingText = "WELCOME TO ZAEKODES";
  const subheadingText =
    "Crafting digital experiences with precision and purpose.";

  const headingElement = document.getElementById("welcome-heading");
  const subheadingElement = document.getElementById("welcome-subheading");
  const cursor = document.getElementById("cursor");

  let headingIndex = 0;
  let subheadingIndex = 0;

  function typeHeading() {
    if (headingIndex < headingText.length) {
      headingElement.textContent += headingText.charAt(headingIndex);
      headingIndex++;
      setTimeout(typeHeading, 80);
    } else {
      setTimeout(typeSubheading, 400);
    }
  }

  function typeSubheading() {
    if (subheadingIndex < subheadingText.length) {
      subheadingElement.textContent += subheadingText.charAt(subheadingIndex);
      subheadingIndex++;
      setTimeout(typeSubheading, 40);
    } else {
      cursor.style.display = "none";
    }
  }

  typeHeading();
});

  const scrollBtn = document.getElementById("scroll-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  document.getElementById("callUsBtn").addEventListener("click", function () {
  window.location.href = "tel:+263777338613";
});

/*********************************
 SERVICE CARD SCROLL ANIMATION
**********************************/

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".reveal");

  cards.forEach(card => card.classList.add("animate"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add("show"));
  }
});





