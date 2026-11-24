# ArpNext — Phase 2

Minimal learning marketplace frontend built with HTML, CSS and Vanilla JavaScript, now with Firebase student authentication.

## Quick start
1. Follow `PHASE2_SETUP.md` to create a Firebase project, enable Email/Password Authentication and Firestore, and add your config at `src/js/firebase-config.js`.
2. Publish the included `firestore.rules` in Firebase Console.
3. Open this folder in VS Code and run `index.html` with Live Server.
4. Test `signup.html`, `login.html` and `student/dashboard.html`.

## Main files
- `src/js/firebase.js` — shared Firebase initialization
- `src/js/signup.js` — student registration and profile creation
- `src/js/login.js` — student login
- `src/js/student-dashboard.js` — auth-state guard, profile read and logout
- `firestore.rules` — starter security rules for user profiles
- `PHASE2_SETUP.md` — detailed Firebase setup and testing guide

## Important
`src/js/firebase-config.js` is intentionally not included. Create it from `firebase-config.example.js` and add your own Firebase web app values. Never put service-account credentials or payment secrets in frontend files.


Branding support: replace `assets/arpnext-logo.svg` with your logo for a local preview. Live brand name, announcement and notices are read from Firestore `siteContent/public`; see `PHASE2_SETUP.md`.
