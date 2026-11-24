import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const title = document.getElementById("welcomeTitle");
const email = document.getElementById("studentEmail");
const note = document.getElementById("dashboardMessage");
onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "../login.html"; return; }
  title.textContent = `Welcome, ${user.displayName || "Student"}!`;
  email.textContent = user.email || "";
  try {
    const profile = await getDoc(doc(db, "users", user.uid));
    if (profile.exists()) title.textContent = `Welcome, ${profile.data().fullName || user.displayName || "Student"}!`;
    else note.textContent = "Your login works, but your profile document was not found. Contact the platform administrator.";
  } catch (error) {
    console.error(error);
    note.textContent = "Could not load your profile. Check your Firestore rules.";
  }
});
document.getElementById("logoutButton").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../login.html";
});
