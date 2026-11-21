
const grid = document.getElementById("project-grid");
const emptyMessage = document.getElementById("empty-message");
const filters = document.querySelectorAll(".filter");

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function renderProjects(category = "all") {
  const visible = projects.filter(project =>
    category === "all" || project.category === category
  );

  grid.innerHTML = "";
  emptyMessage.hidden = visible.length !== 0;

  visible.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";

    const thumb = project.image
      ? `<img src="${safe(project.image)}" alt="${safe(project.title)}" loading="lazy">`
      : `<div class="thumb-placeholder">PROJECT PREVIEW</div>`;

    const media = project.video
      ? `<div class="project-thumb">
          <iframe
            src="${safe(project.video)}"
            title="${safe(project.title)}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
          <span class="project-tag">${safe(project.label)}</span>
        </div>`
      : `<div class="project-thumb">
          ${thumb}
          <span class="project-tag">${safe(project.label)}</span>
        </div>`;

    card.innerHTML = `
      ${media}
      <div class="project-info">
        <h3>${safe(project.title)}</h3>
        <p>${safe(project.description)}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects();
