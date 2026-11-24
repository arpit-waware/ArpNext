// Shared Firebase connection. Uses the Firebase modular Web SDK.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const hasPlaceholder = Object.values(firebaseConfig).some((value) => String(value).startsWith("YOUR_"));
if (hasPlaceholder) {
  throw new Error("Firebase is not configured yet. Copy firebase-config.example.js to src/js/firebase-config.js and add your Firebase web app values.");
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

