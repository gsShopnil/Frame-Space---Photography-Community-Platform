# FrameSpace

**A Community Beyond the Frame.**

FrameSpace is a photography community platform designed to connect photographers, showcase creative visual stories, and encourage photography enthusiasts to share their work. Built with a calm, dark gallery aesthetic inspired by editorial photography publications.

## Features

- **Home Feed & Photo of the Day:** Dynamic community photograph grid paired with a curated daily showcase highlighting the story behind the frame.
- **Explore & Search:** Real-time search by photograph title or photographer, dynamic category filters, sorting (`Newest`, `Oldest`, `Most Liked`), and empty-state handling.
- **Photographer Profiles:** Dynamic profile pages via URL query parameters (`profile.html?id=...`) with biography, interest tags, computed portfolio statistics, and gallery filtering.
- **Photo Details & Community Interactions:** Dedicated photograph inspection view with Like/Unlike, Save to Favourites, Saved Collection view, and interactive comment submission.
- **Photograph Upload:** Local image selection with `FileReader` live preview, file-type/size validation, and instant publishing.
- **Browser Persistence:** Powered by `localStorage` (`js/storage.js`) so uploaded photographs, likes, saved collections, and comments persist across refreshes.
- **Responsive Design:** Adapted across desktop, tablet, and mobile screens with keyboard-accessible navigation.

## Tech Stack (Current Phase)

- **HTML5** (Semantic markup across 6 pages)
- **CSS3** (Custom properties, Grid, Flexbox, responsive media queries)
- **Vanilla JavaScript** (DOM manipulation, `FileReader`, `URLSearchParams`, `localStorage`)

## Project Structure

```text
framespace/
├── index.html
├── explore.html
├── profile.html
├── photo-details.html
├── upload.html
├── about.html
├── assets/
│   └── images/
│       ├── avatars/
│       ├── photos/
│       └── screenshots/
├── css/
│   ├── style.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── data.js
│   ├── storage.js
│   ├── feed.js
│   ├── explore.js
│   ├── profile.js
│   ├── photo-details.js
│   ├── photo-of-the-day.js
│   └── upload.js
├── README.md
