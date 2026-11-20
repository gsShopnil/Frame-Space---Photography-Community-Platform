let currentPotdIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("photoOfTheDayContainer");
  if (!container) return;

  const curated = getCuratedPhotos();
  if (curated.length === 0) return;

  currentPotdIndex = new Date().getDate() % curated.length;
  renderPhotoOfTheDay(curated[currentPotdIndex], container);

  const cycleBtn = document.getElementById("cyclePotdBtn");
  if (cycleBtn) {
    cycleBtn.addEventListener("click", () => {
      currentPotdIndex = (currentPotdIndex + 1) % curated.length;
      renderPhotoOfTheDay(curated[currentPotdIndex], container);
    });
  }
});

function getCuratedPhotos() {
  const withStory = samplePhotos.filter((photo) => Boolean(photo.story));
  return withStory.length > 0 ? withStory : samplePhotos;
}

function renderPhotoOfTheDay(photo, container) {
  const photographer = getPhotographerById(photo.photographerId);
  const detailsUrl = `photo-details.html?id=${encodeURIComponent(photo.id)}`;
  const profileUrl = `profile.html?id=${encodeURIComponent(photographer.id)}`;
  const todayLabel = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  container.innerHTML = "";

  const showcase = document.createElement("article");
  showcase.className = "potd-showcase";

  const mediaLink = document.createElement("a");
  mediaLink.href = detailsUrl;
  mediaLink.className = "potd-media";

  const img = document.createElement("img");
  img.src = photo.image;
  img.alt = `${photo.title} by ${photographer.name}`;
  mediaLink.appendChild(img);

  const content = document.createElement("div");
  content.className = "potd-content";

  const topRow = document.createElement("div");
  topRow.className = "potd-top-row";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = `Photo of the Day • ${photo.category}`;

  const dateSpan = document.createElement("span");
  dateSpan.className = "potd-date";
  dateSpan.textContent = todayLabel;

  topRow.appendChild(badge);
  topRow.appendChild(dateSpan);

  const titleEl = document.createElement("h3");
  titleEl.className = "potd-title";
  const titleLink = document.createElement("a");
  titleLink.href = detailsUrl;
  titleLink.textContent = photo.title;
  titleEl.appendChild(titleLink);

  const metaEl = document.createElement("p");
  metaEl.className = "potd-meta";
  metaEl.textContent = photo.camera ? `${photo.location} • ${photo.camera}` : photo.location;

  const storyBox = document.createElement("div");
  storyBox.className = "potd-story-box";

  const storyHeading = document.createElement("h4");
  storyHeading.className = "potd-story-heading";
  storyHeading.textContent = "The Story Behind the Frame";

  const storyText = document.createElement("p");
  storyText.className = "potd-story-text";
  storyText.textContent = photo.story || photo.caption;

  storyBox.appendChild(storyHeading);
  storyBox.appendChild(storyText);

  const photographerCard = document.createElement("div");
  photographerCard.className = "potd-photographer";

  const photographerInfo = document.createElement("div");
  photographerInfo.className = "potd-photographer-info";

  const avatar = document.createElement("img");
  avatar.src = photographer.avatar;
  avatar.alt = photographer.name;
  avatar.className = "potd-photographer-avatar";

  const textWrap = document.createElement("div");
  const nameEl = document.createElement("p");
  nameEl.className = "potd-photographer-name";
  nameEl.textContent = photographer.name;

  const subMetaEl = document.createElement("p");
  subMetaEl.className = "potd-photographer-meta";
  subMetaEl.textContent = `${photographer.username} • ${photographer.location}`;

  textWrap.appendChild(nameEl);
  textWrap.appendChild(subMetaEl);
  photographerInfo.appendChild(avatar);
  photographerInfo.appendChild(textWrap);

  const profileBtn = document.createElement("a");
  profileBtn.href = profileUrl;
  profileBtn.className = "action-btn";
  profileBtn.textContent = "Portfolio";

  photographerCard.appendChild(photographerInfo);
  photographerCard.appendChild(profileBtn);

  const actionsRow = document.createElement("div");
  actionsRow.className = "potd-actions";

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

  const fullStoryLink = document.createElement("a");
  fullStoryLink.href = detailsUrl;
  fullStoryLink.className = "btn btn-outline";
  fullStoryLink.textContent = "Read Comments & Details";

  actionsRow.appendChild(likeBtn);
  actionsRow.appendChild(saveBtn);
  actionsRow.appendChild(fullStoryLink);

  content.appendChild(topRow);
  content.appendChild(titleEl);
  content.appendChild(metaEl);
  content.appendChild(storyBox);
  content.appendChild(photographerCard);
  content.appendChild(actionsRow);

  showcase.appendChild(mediaLink);
  showcase.appendChild(content);

  container.appendChild(showcase);
}