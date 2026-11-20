let selectedImageDataUrl = "";

document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  if (!uploadForm) return;

  populatePhotographerSelect();
  bindFilePreview();
  bindUploadSubmit(uploadForm);
  renderUploadedPhotos();
});

function populatePhotographerSelect() {
  const select = document.getElementById("photoPhotographer");
  if (!select) return;

  samplePhotographers.forEach((person) => {
    const option = document.createElement("option");
    option.value = person.id;
    option.textContent = `${person.name} (${person.username})`;
    select.appendChild(option);
  });
}

function bindFilePreview() {
  const fileInput = document.getElementById("photoFile");
  const previewImage = document.getElementById("previewImage");
  const previewPlaceholder = document.getElementById("previewPlaceholder");
  const errorEl = document.getElementById("uploadError");

  if (!fileInput) return;

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (!file) {
      resetImagePreview();
      return;
    }

    if (!file.type.startsWith("image/")) {
      showUploadError("Please select a valid image file (JPG, PNG, or WEBP).");
      fileInput.value = "";
      resetImagePreview();
      return;
    }

    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      showUploadError("Image size must be 2 MB or smaller.");
      fileInput.value = "";
      resetImagePreview();
      return;
    }

    if (errorEl) errorEl.hidden = true;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      selectedImageDataUrl = loadEvent.target.result;
      previewImage.src = selectedImageDataUrl;
      previewImage.hidden = false;
      previewPlaceholder.hidden = true;
    };
    reader.readAsDataURL(file);
  });
}

function bindUploadSubmit(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const photographerId = document.getElementById("photoPhotographer").value;
    const title = document.getElementById("photoTitle").value.trim();
    const category = document.getElementById("photoCategory").value;
    const location = document.getElementById("photoLocation").value.trim();
    const caption = document.getElementById("photoCaption").value.trim();

    const errorEl = document.getElementById("uploadError");
    const successEl = document.getElementById("uploadSuccess");

    if (successEl) successEl.hidden = true;

    if (!selectedImageDataUrl) {
      showUploadError("Please choose a photograph from your computer.");
      return;
    }
    if (title.length < 3) {
      showUploadError("Please enter a photo title (at least 3 characters).");
      return;
    }
    if (!category) {
      showUploadError("Please select a photography category.");
      return;
    }
    if (!location) {
      showUploadError("Please enter where the photograph was taken.");
      return;
    }
    if (caption.length < 10) {
      showUploadError("Please write a short caption or story (at least 10 characters).");
      return;
    }

    if (errorEl) errorEl.hidden = true;

    const newPhoto = {
      id: `photo-${Date.now()}`,
      title,
      caption,
      category,
      location,
      image: selectedImageDataUrl,
      photographerId,
      likes: 0,
      isLiked: false,
      isSaved: false,
      createdAt: new Date().toISOString().split("T")[0],
      comments: []
    };

    if (typeof saveUploadedPhoto === "function") {
      const saved = saveUploadedPhoto(newPhoto);
      if (!saved) {
        showUploadError("Browser storage is full. Please try a smaller image.");
        return;
      }
    }

    samplePhotos.unshift(newPhoto);
    renderUploadedPhotos();
    form.reset();
    resetImagePreview();

    if (successEl) {
      successEl.textContent = `"${title}" has been saved and published to FrameSpace!`;
      successEl.hidden = false;
    }
  });
}

function renderUploadedPhotos() {
  const section = document.getElementById("uploadedSessionSection");
  const grid = document.getElementById("uploadedSessionGrid");
  if (!section || !grid) return;

  const uploaded = typeof getUploadedPhotos === "function" ? getUploadedPhotos() : [];
  if (uploaded.length === 0) {
    section.hidden = true;
    return;
  }

  const hydratedUploaded = uploaded.map((item) => getPhotoById(item.id));
  section.hidden = false;
  renderPhotoFeed(hydratedUploaded, grid);
}

function resetImagePreview() {
  selectedImageDataUrl = "";
  const previewImage = document.getElementById("previewImage");
  const previewPlaceholder = document.getElementById("previewPlaceholder");

  if (previewImage) {
    previewImage.src = "";
    previewImage.hidden = true;
  }
  if (previewPlaceholder) {
    previewPlaceholder.hidden = false;
  }
}

function showUploadError(message) {
  const errorEl = document.getElementById("uploadError");
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.hidden = false;
}