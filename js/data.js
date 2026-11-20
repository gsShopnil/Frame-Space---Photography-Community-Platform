const samplePhotographers = [
  {
    id: "gsshopnil",
    name: "Galib Shahriar Shopnil",
    username: "@gsshopnil",
    location: "Dhaka, Bangladesh",
    bio: "Visual Storyteller",
    interests: ["Street", "Documentary", "Natural Light"],
    avatar: "assets/images/avatars/spotlight-photographer.jpg"
  },
  {
    id: "Tanzirhaw",
    name: "Tanzir Hawlader",
    username: "@Tanzirhaw",
    location: "Dhaka, Bangladesh",
    bio: "Street and urban storyteller drawn to monsoon reflections, shadows, and night markets.",
    interests: ["Street", "Night Photography", "35mm"],
    avatar: "assets/images/avatars/spotlight-photographer.jpg"
  },
  {
    id: "tariq-hasan",
    name: "Tariq Hasan",
    username: "@tariqportraits",
    location: "Chattogram, Bangladesh",
    bio: "Portrait photographer exploring human expression through soft window light and minimalism.",
    interests: ["Portrait", "Monochrome", "Editorial"],
    avatar: "assets/images/avatars/spotlight-photographer.jpg"
  },
  {
    id: "samira-chowdhury",
    name: "Samira Chowdhury",
    username: "@samiraarch",
    location: "Rajshahi, Bangladesh",
    bio: "Architectural observer focused on geometry, brutalist concrete, and quiet public spaces.",
    interests: ["Architecture", "Minimalism", "Geometry"],
    avatar: "assets/images/avatars/spotlight-photographer.jpg"
  }
];

const samplePhotos = [
  {
    id: "photo-1",
    title: "Dawn on the Buriganga",
    caption: "Wooden boats waiting quietly in winter river fog just before sunrise.",
    story: "I arrived at the riverbank around 5:40 AM while the mist was still thick above the water. Waiting nearly forty minutes in silence allowed the boatmen to settle into their rhythm before the first warm sunlight broke through the haze.",
    camera: "50mm f/2.8 • 1/250s • ISO 400",
    category: "Landscape",
    location: "Dhaka, Bangladesh",
    image: "assets/images/photos/upload-1.jpg",
    photographerId: "gsshopnil",
    likes: 34,
    isLiked: false,
    isSaved: false,
    createdAt: "2026-11-18",
    comments: [
      { author: "Tanzir Hawlader", text: "The morning mist on the water feels so peaceful.", createdAt: "2026-11-18" },
      { author: "Tariq Hasan", text: "Love the tonal separation in the background boats.", createdAt: "2026-11-19" }
    ]
  },
  {
    id: "photo-2",
    title: "Window Light Study",
    caption: "Natural afternoon light cutting across a quiet studio corner.",
    story: "Without any studio strobes or reflectors, a single north-facing wooden window created soft contrast across the frame. I metered for the highlights so the surrounding shadows stayed deep and contemplative.",
    camera: "85mm f/1.8 • 1/320s • ISO 200",
    category: "Portrait",
    location: "Chattogram, Bangladesh",
    image: "assets/images/photos/upload-2.jpg",
    photographerId: "tariq-hasan",
    likes: 28,
    isLiked: false,
    isSaved: false,
    createdAt: "2026-11-17",
    comments: [
      { author: "Galib Shahriar Shopnil", text: "Soft directional light never fails. Great framing.", createdAt: "2026-11-18" }
    ]
  },
  {
    id: "photo-3",
    title: "Concrete Geometry",
    caption: "Sharp afternoon shadows tracing lines across raw modernist concrete.",
    story: "Between 3:30 PM and 4:00 PM, the sun cuts across this courtyard at a forty-five-degree angle. I framed strictly along the diagonal shadow line to turn static concrete into a quiet study of rhythm and light.",
    camera: "28mm f/5.6 • 1/500s • ISO 100",
    category: "Architecture",
    location: "Rajshahi, Bangladesh",
    image: "assets/images/photos/upload-3.jpg",
    photographerId: "samira-chowdhury",
    likes: 19,
    isLiked: false,
    isSaved: false,
    createdAt: "2026-11-15",
    comments: []
  },
  {
    id: "photo-4",
    title: "Monsoon Reflections",
    caption: "Rain-slicked pavement mirroring warm evening streetlamps after a sudden downpour.",
    story: "Shot just minutes after a heavy evening downpour in Old Dhaka, when the empty pavement turned into a dark mirror for warm sodium streetlights and passing rickshaws. Getting low near the puddle brought the reflections alive.",
    camera: "35mm f/2.0 • 1/125s • ISO 800",
    category: "Street",
    location: "Old Dhaka, Bangladesh",
    image: "assets/images/photos/featured-street.jpg",
    photographerId: "Tanzirhaw",
    likes: 52,
    isLiked: false,
    isSaved: false,
    createdAt: "2026-11-14",
    comments: [
      { author: "Samira Chowdhury", text: "The warm reflections against dark asphalt look cinematic.", createdAt: "2026-11-15" }
    ]
  },
  {
    id: "photo-5",
    title: "Dusk on Old Streets",
    caption: "A brief pause in evening traffic as mist settles between old brick storefronts.",
    story: "Blue hour lasts barely fifteen minutes in the city. Standing near a tea stall with a fixed 35mm lens, I waited for the street lights to warm up just as commuters began heading home.",
    camera: "35mm f/2.0 • 1/100s • ISO 640",
    category: "Street",
    location: "Dhaka, Bangladesh",
    image: "assets/images/photos/hero-frame.jpg",
    photographerId: "Tanzirhaw",
    likes: 41,
    isLiked: false,
    isSaved: false,
    createdAt: "2026-11-12",
    comments: []
  },
  {
    id: "photo-6",
    title: "Tea Valley Morning",
    caption: "Soft golden mist drifting above hillside tea leaves at first light.",
    story: "Walking the narrow ridge paths in Sreemangal at dawn rewards patience. As the sun cleared the eastern hills, layers of golden mist lingered in the lower valleys for just a few minutes before vanishing.",
    camera: "50mm f/4.0 • 1/200s • ISO 200",
    category: "Nature",
    location: "Sreemangal, Bangladesh",
    image: "assets/images/photos/upload-4.jpg",
    photographerId: "gsshopnil",
    likes: 47,
    isLiked: false,
    isSaved: false,
    createdAt: "2026-11-10",
    comments: [
      { author: "Tariq Hasan", text: "Golden hour in Sreemangal always hits different.", createdAt: "2026-11-11" }
    ]
  }
];

function getPhotographerById(photographerId) {
  return (
    samplePhotographers.find((person) => person.id === photographerId) || {
      id: "unknown",
      name: "Community Photographer",
      username: "@framespace",
      location: "Unknown Location",
      bio: "",
      avatar: "assets/images/avatars/spotlight-photographer.jpg"
    }
  );
}

function getPhotoById(photoId) {
  return samplePhotos.find((photo) => photo.id === photoId) || samplePhotos[0];
}