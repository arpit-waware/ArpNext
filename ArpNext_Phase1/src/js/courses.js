// Client-side filtering for the Phase 1 topic preview.
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("course-filter");
  const category = document.getElementById("category-filter");
  const cards = [...document.querySelectorAll(".topic-card")];
  const empty = document.getElementById("empty-state");

  const params = new URLSearchParams(window.location.search);
  if (category && params.has("category")) category.value = params.get("category");

  function filterCards() {
    const query = (search?.value || "").trim().toLowerCase();
    const selected = category?.value || "all";
    let visible = 0;
    cards.forEach((card) => {
      const matchesText = (card.dataset.search || "").includes(query) ||
        card.textContent.toLowerCase().includes(query);
      const matchesCategory = selected === "all" || card.dataset.category === selected;
      const show = matchesText && matchesCategory;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  search?.addEventListener("input", filterCards);
  category?.addEventListener("change", filterCards);
  filterCards();
});
