import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("formMessage");
const button = document.getElementById("loginButton");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  button.textContent = "Logging in...";
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "student/dashboard.html";
  } catch (error) {
    const messages = {
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/user-not-found": "No account found. Create an account first.",
      "auth/wrong-password": "Email or password is incorrect.",
      "auth/too-many-requests": "Too many attempts. Wait a little and try again.",
      "auth/network-request-failed": "Network error. Check your internet connection."
    };
    message.textContent = messages[error.code] || error.message || "Unable to log in.";
    message.classList.add("is-visible");
    message.style.color = "#b42318";
    button.disabled = false;
    button.innerHTML = 'Log in <span>→</span>';
  }
});
