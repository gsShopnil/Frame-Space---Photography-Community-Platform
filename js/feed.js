document.addEventListener("DOMContentLoaded", () => {
  const feedGrid = document.getElementById("photoFeedGrid");
  if (!feedGrid) return;

  renderPhotoFeed(samplePhotos, feedGrid);
});

/**
 * Renders an array of photo objects into the target grid container.
 */
function renderPhotoFeed(photos, container) {
  container.innerHTML = "";

  if (!photos || photos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No photographs have been shared yet.";
    container.appendChild(emptyMessage);
    return;
  }

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const card = createPhotoCard(photo);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Builds a single <article class="photo-card"> DOM element for a photo.
 */
function createPhotoCard(photo) {
  const photographer = getPhotographerById(photo.photographerId);

  const article = document.createElement("article");
  article.className = "photo-card";

  // 1. Media Container
  const mediaDiv = document.createElement("div");
  mediaDiv.className = "photo-card-media";

  const img = document.createElement("img");
  img.src = photo.image;
  img.alt = `${photo.title} by ${photographer.name}`;
  img.loading = "lazy";
  mediaDiv.appendChild(img);

  // 2. Card Body
  const bodyDiv = document.createElement("div");
  bodyDiv.className = "photo-card-body";

  // Top Row: Category Badge + Likes
  const topDiv = document.createElement("div");
  topDiv.className = "photo-card-top";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = photo.category;

  const likesSpan = document.createElement("span");
  likesSpan.className = "photo-card-likes";
  likesSpan.textContent = `${photo.likes} Likes`;

  topDiv.appendChild(badge);
  topDiv.appendChild(likesSpan);

  // Title
  const titleEl = document.createElement("h3");
  titleEl.className = "photo-card-title";
  titleEl.textContent = photo.title;

  // Caption
  const captionEl = document.createElement("p");
  captionEl.className = "photo-card-caption";
  captionEl.textContent = photo.caption;

  // Footer: Photographer Name & Location
  const footerDiv = document.createElement("div");
  footerDiv.className = "photo-card-footer";

  const authorSpan = document.createElement("span");
  authorSpan.className = "photo-card-author";
  authorSpan.textContent = `by ${photographer.name}`;

  const locationSpan = document.createElement("span");
  locationSpan.textContent = photo.location;

  footerDiv.appendChild(authorSpan);
  footerDiv.appendChild(locationSpan);

  // Assemble Body & Card
  bodyDiv.appendChild(topDiv);
  bodyDiv.appendChild(titleEl);
  bodyDiv.appendChild(captionEl);
  bodyDiv.appendChild(footerDiv);

  article.appendChild(mediaDiv);
  article.appendChild(bodyDiv);

  return article;
}