
import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// ArpNext website interactions
document.addEventListener("DOMContentLoaded", () => {

  // 1. Hamburger menu animation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.classList.toggle("is-active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 2. Dark mode
  const themeButton = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("arpnext-theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);

  function updateThemeButton() {
    if (!themeButton) return;

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    themeButton.textContent = isDark ? "☀️" : "🌙";
  }

  updateThemeButton();

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme");

      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("arpnext-theme", newTheme);

      updateThemeButton();
    });
  }

  // 3. Footer year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 4. Demo forms
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const message = form.querySelector(".form-message");

      if (message) {
        message.textContent =
          "This is a frontend preview. Firebase authentication will be connected in Phase 2.";

        message.classList.add("is-visible");
      }
    });
  });

  // 5. Logout
  const logout = document.querySelector("#logoutButton");

  if (logout) {
    logout.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "login.html";
      } catch (error) {
        console.error("Logout error:", error);
        alert("Logout failed. Please try again.");
      }
    });
  }

});

// 6. Firebase login state
onAuthStateChanged(auth, (user) => {
  const login = document.querySelector("#loginLink");
  const signup = document.querySelector("#signupLink");
  const dashboard = document.querySelector("#dashboardLink");
  const logout = document.querySelector("#logoutButton");

  if (user) {
    if (login) login.style.display = "none";
    if (signup) signup.style.display = "none";
    if (dashboard) dashboard.style.display = "inline-block";
    if (logout) logout.style.display = "inline-block";
  } else {
    if (login) login.style.display = "inline-block";
    if (signup) signup.style.display = "inline-block";
    if (dashboard) dashboard.style.display = "none";
    if (logout) logout.style.display = "none";
  }
});
