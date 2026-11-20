document.addEventListener("DOMContentLoaded", () => {
  const detailsContainer = document.getElementById("photoDetailsSection");
  if (!detailsContainer) return;

  const params = new URLSearchParams(window.location.search);
  const photoId = params.get("id");
  const photo = getPhotoById(photoId);

  renderPhotoDetails(photo);
  renderComments(photo);
  bindDetailInteractions(photo);
});

function renderPhotoDetails(photo) {
  const photographer = getPhotographerById(photo.photographerId);
  document.title = `${photo.title} — FrameSpace`;

  const imgEl = document.getElementById("detailImage");
  const categoryEl = document.getElementById("detailCategory");
  const titleEl = document.getElementById("detailTitle");
  const captionEl = document.getElementById("detailCaption");
  const authorLinkEl = document.getElementById("detailAuthorLink");
  const locationEl = document.getElementById("detailLocation");
  const dateEl = document.getElementById("detailDate");
  const likeBtn = document.getElementById("detailLikeBtn");
  const saveBtn = document.getElementById("detailSaveBtn");

  if (imgEl) {
    imgEl.src = photo.image;
    imgEl.alt = `${photo.title} by ${photographer.name}`;
  }
  if (categoryEl) categoryEl.textContent = photo.category;
  if (titleEl) titleEl.textContent = photo.title;
  if (captionEl) captionEl.textContent = photo.caption;

  if (authorLinkEl) {
    authorLinkEl.textContent = `${photographer.name} (${photographer.username})`;
    authorLinkEl.href = `profile.html?id=${encodeURIComponent(photographer.id)}`;
  }

  if (locationEl) locationEl.textContent = photo.location;
  if (dateEl) dateEl.textContent = photo.createdAt;

  if (likeBtn) updateLikeButtonUI(likeBtn, photo);
  if (saveBtn) updateSaveButtonUI(saveBtn, photo);
}

function renderComments(photo) {
  const commentsList = document.getElementById("commentsList");
  const commentHeading = document.getElementById("commentsHeading");
  if (!commentsList) return;

  const comments = photo.comments || [];

  if (commentHeading) {
    commentHeading.textContent = `Community Comments (${comments.length})`;
  }

  commentsList.innerHTML = "";

  if (comments.length === 0) {
    const emptyText = document.createElement("p");
    emptyText.textContent = "No comments yet. Share the first critique or appreciation!";
    commentsList.appendChild(emptyText);
    return;
  }

  comments.forEach((comment) => {
    const item = document.createElement("div");
    item.className = "comment-item";

    const header = document.createElement("div");
    header.className = "comment-header";

    const author = document.createElement("span");
    author.className = "comment-author";
    author.textContent = comment.author;

    const date = document.createElement("span");
    date.className = "comment-date";
    date.textContent = comment.createdAt;

    const body = document.createElement("p");
    body.textContent = comment.text;

    header.appendChild(author);
    header.appendChild(date);
    item.appendChild(header);
    item.appendChild(body);
    commentsList.appendChild(item);
  });
}

function bindDetailInteractions(photo) {
  const likeBtn = document.getElementById("detailLikeBtn");
  const saveBtn = document.getElementById("detailSaveBtn");
  const commentForm = document.getElementById("commentForm");

  if (likeBtn) {
    likeBtn.addEventListener("click", () => {
      photo.isLiked = !photo.isLiked;
      photo.likes += photo.isLiked ? 1 : -1;
      updateLikeButtonUI(likeBtn, photo);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      photo.isSaved = !photo.isSaved;
      updateSaveButtonUI(saveBtn, photo);
    });
  }

  if (commentForm) {
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const authorInput = document.getElementById("commentAuthor");
      const textInput = document.getElementById("commentText");
      const errorEl = document.getElementById("commentError");

      const author = authorInput.value.trim();
      const text = textInput.value.trim();

      if (!author || !text) {
        errorEl.textContent = "Please enter both your name and a comment.";
        errorEl.hidden = false;
        return;
      }

      errorEl.hidden = true;

      if (!photo.comments) {
        photo.comments = [];
      }

      photo.comments.unshift({
        author,
        text,
        createdAt: new Date().toISOString().split("T")[0]
      });

      authorInput.value = "";
      textInput.value = "";
      renderComments(photo);
    });
  }
}