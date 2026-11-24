import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const form = document.getElementById("signupForm");
const message = document.getElementById("formMessage");
const button = document.getElementById("signupButton");

function showMessage(text, isError = true) {
  message.textContent = text;
  message.classList.add("is-visible");
  message.style.color = isError ? "#b42318" : "#16803c";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  button.textContent = "Creating account...";
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: fullName });
    await setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid, fullName, email: credential.user.email,
      role: "student", accountStatus: "active", createdAt: serverTimestamp()
    });
    showMessage("Your account has been created. Taking you to your student area...", false);
    window.location.href = "student/dashboard.html";
  } catch (error) {
    console.error(error);
    const messages = {
      "auth/email-already-in-use": "An account with this email already exists. Try logging in.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Choose a stronger password with at least 6 characters.",
      "auth/network-request-failed": "Network error. Check your internet connection and try again.",
      "permission-denied": "Your account was created, but the profile could not be saved. Check the Firestore rules in the setup guide."
    };
    showMessage(messages[error.code] || error.message || "Could not create your account. Please try again.");
    button.disabled = false;
    button.innerHTML = 'Create account <span>→</span>';
  }
});
