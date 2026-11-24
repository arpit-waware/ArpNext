# ArpNext Phase 2 — Firebase setup

This phase connects student sign-up, login, logout and a protected student dashboard to Firebase Authentication and Cloud Firestore. It builds on the Phase 1 HTML/CSS/Vanilla JavaScript website.

## 1. Create a Firebase project
1. Open https://console.firebase.google.com/ and create a project for ArpNext.
2. In Project settings, add a **Web app** and copy its Firebase configuration.
3. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
4. In **Build → Firestore Database**, create a database. Choose the region carefully because it cannot easily be changed later.
5. Open Firestore **Rules**, paste the contents of `firestore.rules`, and publish.

## 2. Add your web app configuration
1. Open `src/js/`.
2. Make a copy of the root file `firebase-config.example.js` and name the copy `firebase-config.js` inside `src/js/`.
3. Replace the `YOUR_...` values with the values shown in Firebase Console → Project settings → Your apps.
4. Do not share `firebase-config.js` publicly in screenshots or messages. The Firebase web config is intended for browser apps, but access must be secured with Authentication, Firestore Rules and (later) App Check. Never put service-account JSON, private keys or Razorpay secrets in it.

## 3. Run the website
Do not open the HTML files by double-clicking them. Use VS Code with the **Live Server** extension and open `index.html` through Live Server. Firebase modules are loaded from Google's CDN, so an internet connection is required.

## 4. Test registration
1. Open `signup.html` through Live Server.
2. Register with a test email address and a password of at least 6 characters.
3. Firebase Authentication → Users should show the new account.
4. Firestore → Data should show a `users` collection and a document whose ID is the user's Firebase UID.
5. You should be redirected to `student/dashboard.html`.
6. Log out, then test logging in again through `login.html`.

## 5. Where the data goes
- Firebase Authentication stores the login identity and password credential securely.
- Firestore `users/{uid}` stores the profile: UID, full name, email, role, account status and creation timestamp.
- Passwords are never written to Firestore.
- The browser creates only a `student` profile. Never let a public registration form choose an admin role. Admin roles must be provisioned by a trusted backend in a later phase.

## Troubleshooting
- **Firebase is not configured yet:** create `src/js/firebase-config.js` and replace every placeholder.
- **auth/operation-not-allowed:** enable Email/Password in Firebase Authentication.
- **permission-denied:** publish the included Firestore rules and confirm the Firestore database exists.
- **auth/unauthorized-domain:** add your Live Server hostname (usually `127.0.0.1` or `localhost`) under Authentication → Settings → Authorized domains if it is not already listed.
- **Module/CORS error:** serve the project using Live Server or another local web server; do not use `file://`.

## Current Phase 2 scope and limitations
Included: Firebase initialization, email/password registration and login, profile creation, auth session detection, student-only dashboard redirect, logout and starter Firestore rules.

Not included yet: password reset, email verification flow, admin authentication/roles, instructor accounts, contact form storage, course data from Firestore, course enrolment, payments, Cloud Functions or production deployment. Those will be built in later phases.


## 6. Branding, announcement bar and notices

The public pages now support live branding content from the Firestore document
`siteContent/public`. The document is public-read only; browser clients cannot
write it. This is intentional so visitors cannot change your website content.

Create the document manually in Firebase Console → Firestore Database → Data:

```json
{
  "brandName": "ArpNext",
  "logoUrl": "",
  "announcement": {
    "active": true,
    "text": "New courses are now available! Explore ArpNext."
  },
  "notices": [
    {
      "active": true,
      "title": "Welcome to ArpNext",
      "message": "Explore courses and start learning today."
    }
  ]
}
```

For the logo, upload your image to Firebase Storage in a later step and paste its
download URL into `logoUrl`. Until then, the website uses
`assets/arpnext-logo.svg`. You can replace that SVG file with your own logo
(keep the same filename) for a local preview.

The announcement and notices are displayed automatically on pages that load
`site-content.js`. The future Admin Dashboard will provide secure forms to
upload the logo and edit these fields without opening Firebase Console. Do not
enable public Firestore writes for `siteContent`.
