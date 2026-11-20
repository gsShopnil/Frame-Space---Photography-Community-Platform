document.addEventListener("DOMContentLoaded", () => {
  const feedGrid = document.getElementById("photoFeedGrid");
  if (feedGrid) {
    renderPhotoFeed(samplePhotos, feedGrid);
  }

  const savedGrid = document.getElementById("savedCollectionGrid");
  if (savedGrid) {
    renderSavedCollection();
  }
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

function renderSavedCollection() {
  const savedGrid = document.getElementById("savedCollectionGrid");
  const savedEmpty = document.getElementById("savedEmptyState");
  const savedCount = document.getElementById("savedCount");
  if (!savedGrid) return;

  const savedPhotos = samplePhotos.filter((photo) => photo.isSaved);

  if (savedCount) {
    savedCount.textContent = `${savedPhotos.length} Saved`;
  }

  if (savedPhotos.length === 0) {
    savedGrid.innerHTML = "";
    savedGrid.hidden = true;
    if (savedEmpty) savedEmpty.hidden = false;
    return;
  }

  savedGrid.hidden = false;
  if (savedEmpty) savedEmpty.hidden = true;
  renderPhotoFeed(savedPhotos, savedGrid);
}

function createPhotoCard(photo) {
  const photographer = getPhotographerById(photo.photographerId);
  const detailsUrl = `photo-details.html?id=${encodeURIComponent(photo.id)}`;

  const article = document.createElement("article");
  article.className = "photo-card";

  const mediaLink = document.createElement("a");
  mediaLink.href = detailsUrl;
  mediaLink.className = "photo-card-media";

  const img = document.createElement("img");
  img.src = photo.image;
  img.alt = `${photo.title} by ${photographer.name}`;
  img.loading = "lazy";
  mediaLink.appendChild(img);

  const bodyDiv = document.createElement("div");
  bodyDiv.className = "photo-card-body";

  const topDiv = document.createElement("div");
  topDiv.className = "photo-card-top";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = photo.category;

  const commentsCount = document.createElement("span");
  commentsCount.className = "photo-card-likes";
  const count = photo.comments ? photo.comments.length : 0;
  commentsCount.textContent = `${count} ${count === 1 ? "Comment" : "Comments"}`;

  topDiv.appendChild(badge);
  topDiv.appendChild(commentsCount);

  const titleEl = document.createElement("h3");
  titleEl.className = "photo-card-title";
  const titleLink = document.createElement("a");
  titleLink.href = detailsUrl;
  titleLink.textContent = photo.title;
  titleEl.appendChild(titleLink);

  const captionEl = document.createElement("p");
  captionEl.className = "photo-card-caption";
  captionEl.textContent = photo.caption;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "photo-card-actions";

  const likeBtn = document.createElement("button");
  likeBtn.type = "button";
  likeBtn.className = "action-btn";
  likeBtn.dataset.likeId = photo.id;
  updateLikeButtonUI(likeBtn, photo);

  likeBtn.addEventListener("click", () => {
    togglePhotoLike(photo);
  });

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "action-btn";
  saveBtn.dataset.saveId = photo.id;
  updateSaveButtonUI(saveBtn, photo);

  saveBtn.addEventListener("click", () => {
    togglePhotoSave(photo);
  });

  const detailsBtn = document.createElement("a");
  detailsBtn.href = detailsUrl;
  detailsBtn.className = "action-btn";
  detailsBtn.textContent = "Details";

  actionsDiv.appendChild(likeBtn);
  actionsDiv.appendChild(saveBtn);
  actionsDiv.appendChild(detailsBtn);

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
  bodyDiv.appendChild(actionsDiv);
  bodyDiv.appendChild(footerDiv);

  article.appendChild(mediaLink);
  article.appendChild(bodyDiv);

  return article;
}

function togglePhotoLike(photo) {
  photo.isLiked = !photo.isLiked;
  photo.likes += photo.isLiked ? 1 : -1;

  if (typeof savePhotoInteraction === "function") {
    savePhotoInteraction(photo);
  }

  document.querySelectorAll(`[data-like-id="${photo.id}"]`).forEach((btn) => {
    updateLikeButtonUI(btn, photo);
  });
}

function togglePhotoSave(photo) {
  photo.isSaved = !photo.isSaved;

  if (typeof savePhotoInteraction === "function") {
    savePhotoInteraction(photo);
  }

  document.querySelectorAll(`[data-save-id="${photo.id}"]`).forEach((btn) => {
    updateSaveButtonUI(btn, photo);
  });

  renderSavedCollection();
}

function updateLikeButtonUI(button, photo) {
  button.classList.toggle("is-liked", Boolean(photo.isLiked));
  button.textContent = `${photo.isLiked ? "Liked" : "Like"} (${photo.likes})`;
}

function updateSaveButtonUI(button, photo) {
  button.classList.toggle("is-saved", Boolean(photo.isSaved));
  button.textContent = photo.isSaved ? "Saved" : "Save";
}

