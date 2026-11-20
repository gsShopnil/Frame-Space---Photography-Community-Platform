document.addEventListener("DOMContentLoaded", () => {
  const profileSection = document.getElementById("profileContent");
  if (!profileSection) return;

  const activePhotographer = getSelectedPhotographer();
  renderPhotographerSwitcher(activePhotographer.id);
  renderProfileDetails(activePhotographer);
  renderProfileStatsAndGallery(activePhotographer);
});

function getSelectedPhotographer() {
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");

  return (
    samplePhotographers.find((person) => person.id === requestedId) ||
    samplePhotographers[0]
  );
}

function renderPhotographerSwitcher(activeId) {
  const switcher = document.getElementById("photographerSwitcher");
  if (!switcher) return;

  switcher.innerHTML = "";

  const label = document.createElement("span");
  label.className = "profile-switcher-label";
  label.textContent = "Photographers:";
  switcher.appendChild(label);

  samplePhotographers.forEach((person) => {
    const link = document.createElement("a");
    link.href = `profile.html?id=${encodeURIComponent(person.id)}`;
    link.className = "filter-pill";
    link.textContent = person.name;

    if (person.id === activeId) {
      link.classList.add("active");
    }

    switcher.appendChild(link);
  });
}

function renderProfileDetails(photographer) {
  document.title = `${photographer.name} — FrameSpace`;

  const avatarEl = document.getElementById("profileAvatar");
  const nameEl = document.getElementById("profileName");
  const usernameEl = document.getElementById("profileUsername");
  const locationEl = document.getElementById("profileLocation");
  const bioEl = document.getElementById("profileBio");
  const interestsEl = document.getElementById("profileInterests");
  const galleryHeadingEl = document.getElementById("galleryHeading");

  if (avatarEl) {
    avatarEl.src = photographer.avatar;
    avatarEl.alt = `Portrait of ${photographer.name}`;
  }
  if (nameEl) nameEl.textContent = photographer.name;
  if (usernameEl) usernameEl.textContent = photographer.username;
  if (locationEl) locationEl.textContent = photographer.location;
  if (bioEl) bioEl.textContent = photographer.bio;
  if (galleryHeadingEl) {
    galleryHeadingEl.textContent = `Portfolio by ${photographer.name}`;
  }

  if (interestsEl) {
    interestsEl.innerHTML = "";
    photographer.interests.forEach((interest) => {
      const tag = document.createElement("span");
      tag.className = "badge";
      tag.textContent = interest;
      interestsEl.appendChild(tag);
    });
  }
}

function renderProfileStatsAndGallery(photographer) {
  const photographerPhotos = samplePhotos.filter(
    (photo) => photo.photographerId === photographer.id
  );

  const totalPhotos = photographerPhotos.length;
  const totalLikes = photographerPhotos.reduce((sum, photo) => sum + photo.likes, 0);
  const uniqueCategories = new Set(photographerPhotos.map((photo) => photo.category)).size;

  const statPhotosEl = document.getElementById("statPhotos");
  const statLikesEl = document.getElementById("statLikes");
  const statCategoriesEl = document.getElementById("statCategories");
  const galleryGrid = document.getElementById("profileGalleryGrid");

  if (statPhotosEl) statPhotosEl.textContent = totalPhotos;
  if (statLikesEl) statLikesEl.textContent = totalLikes;
  if (statCategoriesEl) statCategoriesEl.textContent = uniqueCategories;

  if (galleryGrid) {
    renderPhotoFeed(photographerPhotos, galleryGrid);
  }
}