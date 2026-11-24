// Public branding, announcement bar and notices.
// Content is read from Firestore: siteContent/public.
// Until an admin editor is built, you can update the document in Firebase Console.
try {
  const [{ db }, { doc, getDoc }] = await Promise.all([
    import("./firebase.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")
  ]);

  const snapshot = await getDoc(doc(db, "siteContent", "public"));
  if (snapshot.exists()) {
    const content = snapshot.data();

    if (content.brandName) {
      document.querySelectorAll("[data-brand-name]").forEach((el) => {
        el.textContent = content.brandName;
      });
      document.title = document.title.replace("ArpNext", content.brandName);
    }

    if (content.logoUrl) {
      document.querySelectorAll("[data-brand-logo]").forEach((img) => {
        img.src = content.logoUrl;
      });
    }

    if (content.announcement?.active && content.announcement.text) {
      const bar = document.createElement("aside");
      bar.className = "site-announcement";
      bar.setAttribute("role", "status");
      bar.textContent = content.announcement.text;
      const header = document.querySelector(".site-header");
      if (header) header.insertAdjacentElement("afterend", bar);
    }

    const notices = Array.isArray(content.notices) ? content.notices : [];
    const activeNotices = notices.filter((notice) => notice.active && notice.title && notice.message);
    const main = document.querySelector("main");
    const hero = main?.querySelector(".hero-section, .page-hero");
    if (activeNotices.length && main) {
      const section = document.createElement("section");
      section.className = "site-notices container";
      section.setAttribute("aria-label", "Important notices");
      section.innerHTML = activeNotices.map((notice) => `
        <article class="site-notice">
          <span class="site-notice-label">NOTICE</span>
          <div><h2></h2><p></p></div>
        </article>`).join("");
      activeNotices.forEach((notice, index) => {
        section.children[index].querySelector("h2").textContent = notice.title;
        section.children[index].querySelector("p").textContent = notice.message;
      });
      if (hero) hero.insertAdjacentElement("afterend", section);
      else main.prepend(section);
    }
  }
} catch (error) {
  // Firebase may not be configured yet. The local logo and page content remain visible.
  console.info("ArpNext live site content is not connected yet.", error.message);
}
