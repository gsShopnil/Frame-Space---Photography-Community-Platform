

const exploreState = {
  searchQuery: "",
  selectedCategory: "All",
  sortBy: "newest"
};

document.addEventListener("DOMContentLoaded", () => {
  const exploreGrid = document.getElementById("exploreGrid");
  if (!exploreGrid) return;

  renderCategoryFilters();
  bindExploreEvents();
  applyExploreFilters();
});

/**
 * Dynamically extracts unique categories from samplePhotos and builds filter buttons.
 */
function renderCategoryFilters() {
  const filterContainer = document.getElementById("categoryFilters");
  if (!filterContainer) return;

  const uniqueCategories = ["All", ...new Set(samplePhotos.map((photo) => photo.category))];
  filterContainer.innerHTML = "";

  uniqueCategories.forEach((category) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-pill";
    btn.textContent = category;
    btn.dataset.category = category;

    if (category === exploreState.selectedCategory) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      exploreState.selectedCategory = category;
      updateActiveFilterPill();
      applyExploreFilters();
    });

    filterContainer.appendChild(btn);
  });
}

/**
 * Highlights the currently selected category pill.
 */
function updateActiveFilterPill() {
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach((pill) => {
    const isActive = pill.dataset.category === exploreState.selectedCategory;
    pill.classList.toggle("active", isActive);
  });
}

/**
 * Attaches listeners to search input, sort dropdown, and reset button.
 */
function bindExploreEvents() {
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const resetBtn = document.getElementById("resetFiltersBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      exploreState.searchQuery = event.target.value.trim().toLowerCase();
      applyExploreFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      exploreState.sortBy = event.target.value;
      applyExploreFilters();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetExploreFilters);
  }
}

/**
 * Filters and sorts samplePhotos based on exploreState, then renders cards or empty state.
 */
function applyExploreFilters() {
  const exploreGrid = document.getElementById("exploreGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");

  // 1. Filter by category & search query
  const filtered = samplePhotos.filter((photo) => {
    const matchesCategory =
      exploreState.selectedCategory === "All" ||
      photo.category === exploreState.selectedCategory;

    const photographer = getPhotographerById(photo.photographerId);
    const query = exploreState.searchQuery;

    const matchesSearch =
      query === "" ||
      photo.title.toLowerCase().includes(query) ||
      photographer.name.toLowerCase().includes(query) ||
      photographer.username.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // 2. Sort filtered results
  filtered.sort((a, b) => {
    if (exploreState.sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (exploreState.sortBy === "likes") {
      return b.likes - a.likes;
    }
    // Default: "newest"
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // 3. Update result count text
  if (resultsCount) {
    const label = filtered.length === 1 ? "photograph" : "photographs";
    resultsCount.textContent = `Showing ${filtered.length} ${label}`;
  }

  // 4. Handle empty results vs populated grid
  if (filtered.length === 0) {
    exploreGrid.innerHTML = "";
    exploreGrid.hidden = true;
    if (emptyState) emptyState.hidden = false;
    return;
  }

  exploreGrid.hidden = false;
  if (emptyState) emptyState.hidden = true;

  // Reuse renderPhotoFeed() from js/feed.js!
  renderPhotoFeed(filtered, exploreGrid);
}

/**
 * Resets all search, category, and sort controls back to defaults.
 */
function resetExploreFilters() {
  exploreState.searchQuery = "";
  exploreState.selectedCategory = "All";
  exploreState.sortBy = "newest";

  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "newest";

  updateActiveFilterPill();
  applyExploreFilters();
}