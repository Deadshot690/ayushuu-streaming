# Anne Originals — Cinematic Streaming Experience

A modern, Netflix-inspired cinematic streaming web application created as an original story experience for **Anne**.

![Anne Originals](/media/images/Anee%20(1).jpeg)

---

## 🌟 Features & Highlights

- **Who's Watching Profile Selector**: Netflix-style profile selection screen with custom character avatars (`Anne` & `The Main Character`).
- **Cinematic Intro Sequence**: Smooth animated intro sequence leading into the main streaming dashboard.
- **Hero Highlight Banner**: Widescreen hero section with instant playback, detailed metadata, and video preview.
- **Distinct Content Categories**: Non-overlapping rows for *Popular on Anne*, *Because You Love These Memories*, *Our Favorite Moments*, *The Main Character Collection*, *Comedy & Chaos*, and *Birthday Specials*.
- **Integrated Video Player**:
  - High-definition `.mp4` video playback support.
  - Controls for Play/Pause, Seek (+/- 10s), Fullscreen, and Volume.
  - Auto-persists watch progress across sessions.
  - Sound enabled by default upon playback.
- **Ambient Looping Background Music**:
  - Plays *"Ishq Wala"* (`/media/music/theme.weba`) in a continuous background loop across the platform.
  - Automatically pauses ambient music during video playback and resumes afterwards.
  - Global mute/unmute control in the navigation bar.
- **Memories Gallery**: Interactive photo roll with full-screen lightbox modal and slideshow navigation.
- **Birthday Special & Interactive Credits**:
  - Interactive birthday message experience with floating animations.
  - Complete scrolling credits sequence.

---

## 📁 Repository Structure

```text
├── Hello/                   # Source media assets (13 photos, 4 videos)
├── Audio/                   # Source audio files ("Ishq wala.weba")
├── public/
│   ├── favicon.svg          # Custom Anne Originals branding favicon
│   ├── favicon.ico
│   └── media/
│       ├── images/          # Content stills & poster images
│       ├── videos/          # HD video files (Anee 1-4.mp4)
│       └── music/           # Ambient background audio (theme.weba)
├── src/
│   ├── components/
│   │   ├── AmbientAudio.tsx # Background music manager with auto-pause
│   │   ├── AppShell.tsx     # Global layout shell
│   │   ├── BirthdayExperience.tsx # Birthday letter modal
│   │   ├── ContentRow.tsx   # Horizontal scrollable content rows
│   │   ├── CreditsSequence.tsx  # End credits roll
│   │   ├── DetailModal.tsx  # Content detail overlay
│   │   ├── EpisodeCard.tsx  # Episode card component
│   │   ├── Hero.tsx         # Featured hero banner
│   │   ├── IntroSequence.tsx# Opening brand intro
│   │   ├── MediaCard.tsx    # Media card thumbnail
│   │   ├── MemoriesGallery.tsx # Photo gallery lightbox
│   │   ├── Navbar.tsx       # Navigation bar with audio controls
│   │   ├── ProfileSelector.tsx # "Who's Watching" profile selector
│   │   └── VideoPlayer.tsx  # Fullscreen video player
│   ├── content/
│   │   └── content.ts       # Central content, titles, and media configuration
│   ├── lib/
│   │   └── experience.tsx   # Global state management
│   └── routes/              # TanStack Router pages (Home, Movies, Series, Memories, My List)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `bun`

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Deadshot690/ayushuu-streaming.git
   cd ayushuu-streaming
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start local development server**:
   ```sh
   npm run dev
   ```

4. **Build for production**:
   ```sh
   npm run build
   ```

---

## 🛠️ Configuration & Customization

All text, titles, descriptions, and media paths are managed centrally in [`src/content/content.ts`](file:///c:/Users/juned/OneDrive/Documents/GitHub/ayushuu-streaming/src/content/content.ts):

- **Brand & Names**: Update `brand.name`, `brand.tagline`, or `brand.personName`.
- **Media Items**: Add or reorder episodes, movies, and gallery memories in `episodes`, `movies`, and `memories`.
- **Background Music**: Replace `public/media/music/theme.weba` to update the ambient background song.
