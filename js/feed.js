document.addEventListener("DOMContentLoaded", () => {
  const feedGrid = document.getElementById("photoFeedGrid");
  if (!feedGrid) return;

  renderPhotoFeed(samplePhotos, feedGrid);
});

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

function createPhotoCard(photo) {
  const photographer = getPhotographerById(photo.photographerId);

  const article = document.createElement("article");
  article.className = "photo-card";

  const mediaDiv = document.createElement("div");
  mediaDiv.className = "photo-card-media";

  const img = document.createElement("img");
  img.src = photo.image;
  img.alt = `${photo.title} by ${photographer.name}`;
  img.loading = "lazy";
  mediaDiv.appendChild(img);

  const bodyDiv = document.createElement("div");
  bodyDiv.className = "photo-card-body";

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

  const titleEl = document.createElement("h3");
  titleEl.className = "photo-card-title";
  titleEl.textContent = photo.title;

  const captionEl = document.createElement("p");
  captionEl.className = "photo-card-caption";
  captionEl.textContent = photo.caption;

  const footerDiv = document.createElement("div");
  footerDiv.className = "photo-card-footer";

  const authorLink = document.createElement("a");
  authorLink.className = "photo-card-author-link";
  authorLink.href = `profile.html?id=${encodeURIComponent(photographer.id)}`;
  authorLink.textContent = `by ${photographer.name}`;

  const locationSpan = document.createElement("span");
  locationSpan.textContent = photo.location;

  footerDiv.appendChild(authorLink);
  footerDiv.appendChild(locationSpan);

  bodyDiv.appendChild(topDiv);
  bodyDiv.appendChild(titleEl);
  bodyDiv.appendChild(captionEl);
  bodyDiv.appendChild(footerDiv);

  article.appendChild(mediaDiv);
  article.appendChild(bodyDiv);

  return article;
}