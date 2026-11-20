const STORAGE_KEYS = {
  UPLOADS: "framespace_uploaded_photos",
  INTERACTIONS: "framespace_interactions"
};

initStorage();

function initStorage() {
  const uploadedPhotos = getUploadedPhotos();
  if (uploadedPhotos.length > 0) {
    samplePhotos.unshift(...uploadedPhotos);
  }

  const interactions = getInteractionsMap();
  samplePhotos.forEach((photo) => {
    const saved = interactions[photo.id];
    if (!saved) return;

    if (typeof saved.likes === "number") photo.likes = saved.likes;
    if (typeof saved.isLiked === "boolean") photo.isLiked = saved.isLiked;
    if (typeof saved.isSaved === "boolean") photo.isSaved = saved.isSaved;
    if (Array.isArray(saved.comments)) photo.comments = saved.comments;
  });
}

function getUploadedPhotos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.UPLOADS);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveUploadedPhoto(photo) {
  try {
    const existing = getUploadedPhotos();
    existing.unshift(photo);
    localStorage.setItem(STORAGE_KEYS.UPLOADS, JSON.stringify(existing));
    return true;
  } catch (error) {
    return false;
  }
}

function getInteractionsMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INTERACTIONS);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function savePhotoInteraction(photo) {
  try {
    const interactions = getInteractionsMap();
    interactions[photo.id] = {
      likes: photo.likes,
      isLiked: Boolean(photo.isLiked),
      isSaved: Boolean(photo.isSaved),
      comments: Array.isArray(photo.comments) ? photo.comments : []
    };
    localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(interactions));
    return true;
  } catch (error) {
    return false;
  }
}