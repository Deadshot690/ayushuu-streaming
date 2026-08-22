/**
 * CENTRAL CONTENT CONFIGURATION
 * -----------------------------
 * Everything editable lives here: names, titles, descriptions, media paths,
 * birthday message, credits. UI components never hardcode content.
 *
 * Media lives in: public/media/images, public/media/videos, public/media/music
 * To use a real video, drop it in public/media/videos and set `video: "/media/videos/foo.mp4"`.
 */

export const brand = {
  name: "AYUSHUU",
  sub: "ORIGINALS",
  tagline: "AN ORIGINAL STORY",
  universe: "Ayesha Cinematic Universe",
  personName: "Ayesha",
  nickname: "Ayushuu",
  year: 2026,
};

export const music = {
  /** Optional. Drop an mp3 at public/media/music/theme.mp3 to enable ambient score. */
  theme: "/media/music/theme.mp3",
};

export const img = {
  hero: "/media/images/hero.jpg",
  profile: "/media/images/profile.jpg",
  birthday: "/media/images/birthday.jpg",
  p1: "/media/images/p1.jpg",
  p2: "/media/images/p2.jpg",
  p3: "/media/images/p3.jpg",
  p4: "/media/images/p4.jpg",
  p5: "/media/images/p5.jpg",
  p6: "/media/images/p6.jpg",
  p7: "/media/images/p7.jpg",
  p8: "/media/images/p8.jpg",
};

export type MediaType = "movie" | "episode" | "memory";

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  image: string;
  backdrop: string;
  /** Optional real video file. When absent the cinematic reel player is used. */
  video?: string;
  /** Extra stills used by the reel player. */
  reel?: string[];
  description: string;
  /** Playback length in seconds. */
  duration: number;
  durationLabel: string;
  year: number;
  genre: string;
  rating: string;
  categories: string[];
  season?: number;
  episode?: number;
  related?: string[];
}

export const hero = {
  label: "AYUSHUU ORIGINAL",
  kicker: "A BIRTHDAY SPECIAL",
  title: "THE STORY OF AYUSHUU",
  meta: "2026 • 1 Season • HD",
  description:
    "A collection of moments, memories, laughter, chaos and everything that makes Ayushuu impossible to forget.",
  image: img.hero,
  /** Optional: "/media/videos/hero.mp4" */
  video: undefined as string | undefined,
  playId: "s01e01",
};

export const movies: MediaItem[] = [
  {
    id: "m-beginning",
    type: "movie",
    title: "THE BEGINNING",
    image: img.p8,
    backdrop: img.p8,
    reel: [img.p8, img.p3, img.p5],
    description:
      "Before the inside jokes and the 2 a.m. voice notes, there was just an ordinary day that quietly decided to matter forever.",
    duration: 96,
    durationLabel: "1h 36m",
    year: 2023,
    genre: "Romance • Drama",
    rating: "U/A 13+",
    categories: ["popular", "romantic", "recent"],
    related: ["m-that-one-day", "m-main-character"],
  },
  {
    id: "m-that-one-day",
    type: "movie",
    title: "THAT ONE DAY",
    image: img.p3,
    backdrop: img.p3,
    reel: [img.p3, img.p2, img.p6],
    description:
      "Two coffees, zero plans, and a conversation that refused to end. Nothing happened. Everything happened.",
    duration: 84,
    durationLabel: "1h 24m",
    year: 2024,
    genre: "Slice of Life",
    rating: "U",
    categories: ["popular", "favorites", "romantic"],
    related: ["m-beginning", "m-good-days"],
  },
  {
    id: "m-main-character",
    type: "movie",
    title: "THE MAIN CHARACTER",
    image: img.p1,
    backdrop: img.p1,
    reel: [img.p1, img.p6, img.p5],
    description:
      "She walks into a room and the lighting department quietly panics. A study in effortless presence.",
    duration: 112,
    durationLabel: "1h 52m",
    year: 2025,
    genre: "Drama",
    rating: "U/A 16+",
    categories: ["popular", "main-character", "recent"],
    related: ["m-unplanned", "m-chaos"],
  },
  {
    id: "m-unplanned",
    type: "movie",
    title: "UNPLANNED",
    image: img.p6,
    backdrop: img.p6,
    reel: [img.p6, img.p2],
    description:
      "The best nights never had an itinerary. A road, a playlist, and absolutely no idea where it ends.",
    duration: 78,
    durationLabel: "1h 18m",
    year: 2025,
    genre: "Adventure",
    rating: "U",
    categories: ["favorites", "chaos", "recent"],
    related: ["m-chaos", "m-that-one-day"],
  },
  {
    id: "m-good-days",
    type: "movie",
    title: "THE GOOD DAYS",
    image: img.p5,
    backdrop: img.p5,
    reel: [img.p5, img.p7, img.p3],
    description:
      "Warm light, loud laughter, and the kind of evening you only recognise as perfect much, much later.",
    duration: 101,
    durationLabel: "1h 41m",
    year: 2024,
    genre: "Feel Good",
    rating: "U",
    categories: ["favorites", "romantic", "main-character"],
    related: ["m-forever-young", "m-memories"],
  },
  {
    id: "m-forever-young",
    type: "movie",
    title: "FOREVER YOUNG",
    image: img.p7,
    backdrop: img.p7,
    reel: [img.p7, img.p4],
    description:
      "Sparklers, terrible singing, and a promise that some things are never going to grow up.",
    duration: 88,
    durationLabel: "1h 28m",
    year: 2026,
    genre: "Celebration",
    rating: "U",
    categories: ["birthday", "recent", "favorites"],
    related: ["m-memories", "m-good-days"],
  },
  {
    id: "m-chaos",
    type: "movie",
    title: "A LITTLE CHAOS",
    image: img.p2,
    backdrop: img.p2,
    reel: [img.p2, img.p6, img.p1],
    description:
      "A comedy in which absolutely nothing goes to plan and somehow that becomes the best part.",
    duration: 73,
    durationLabel: "1h 13m",
    year: 2025,
    genre: "Comedy",
    rating: "U/A 13+",
    categories: ["chaos", "popular"],
    related: ["m-unplanned", "m-main-character"],
  },
  {
    id: "m-memories",
    type: "movie",
    title: "THE MEMORIES",
    image: img.p4,
    backdrop: img.p4,
    reel: [img.p4, img.p5, img.p8],
    description:
      "An anthology of small, unremarkable moments that turned out to be the whole point.",
    duration: 120,
    durationLabel: "2h 00m",
    year: 2026,
    genre: "Anthology",
    rating: "U",
    categories: ["romantic", "birthday", "favorites"],
    related: ["m-good-days", "m-beginning"],
  },
];

export const series = {
  id: "the-story-of-ayushuu",
  title: "THE STORY OF AYUSHUU",
  description:
    "One season. Eight chapters. Every one of them about the girl who makes ordinary days look like scenes from a film.",
  backdrop: img.hero,
  seasons: [1],
};

const ep = (
  n: number,
  title: string,
  description: string,
  image: string,
  duration: number,
  durationLabel: string,
  categories: string[] = [],
): MediaItem => ({
  id: `s01e0${n}`,
  type: "episode",
  title,
  image,
  backdrop: image,
  reel: [image, img.hero],
  description,
  duration,
  durationLabel,
  year: 2026,
  genre: "Original Series",
  rating: "U/A 13+",
  season: 1,
  episode: n,
  categories: ["series", ...categories],
});

export const episodes: MediaItem[] = [
  ep(1, "The Beginning", "Where the story quietly starts, without anyone noticing it has.", img.p8, 62, "62m", [
    "popular",
    "recent",
  ]),
  ep(2, "Main Character Energy", "Some people just arrive. The room adjusts around them.", img.p1, 54, "54m", [
    "main-character",
  ]),
  ep(3, "The Chaos Begins", "Plans collapse. Laughter survives. Highly recommended.", img.p2, 48, "48m", ["chaos"]),
  ep(4, "That One Memory", "Some moments weren't planned. They just became memories.", img.p3, 57, "57m", [
    "favorites",
  ]),
  ep(5, "The Best Days", "Warm light, long evenings, nowhere else to be.", img.p5, 61, "61m", ["favorites"]),
  ep(6, "Unplanned Adventures", "The road, the playlist, and no destination.", img.p6, 52, "52m", ["chaos"]),
  ep(7, "The People Who Matter", "A short list. A very short list. And she's at the top of it.", img.p7, 59, "59m", [
    "romantic",
  ]),
  ep(8, "To Be Continued", "The season ends. The story really doesn't.", img.p4, 66, "66m", ["birthday", "recent"]),
];

export const birthdaySpecial: MediaItem = {
  id: "birthday-special",
  type: "movie",
  title: "HAPPY BIRTHDAY, AYUSHUU",
  image: img.birthday,
  backdrop: img.birthday,
  description: "A message that took a whole year to write and about four seconds to mean.",
  duration: 0,
  durationLabel: "Special",
  year: 2026,
  genre: "Birthday Special",
  rating: "For her only",
  categories: ["birthday"],
};

export const memories = [
  { id: "mem1", title: "A Random Day", date: "March 2024", caption: "Nothing was happening. It was perfect.", image: img.p3 },
  { id: "mem2", title: "The Laugh We Couldn't Stop", date: "June 2024", caption: "Neither of us remember why.", image: img.p2 },
  { id: "mem3", title: "One For The Camera Roll", date: "August 2024", caption: "Taken badly. Kept forever.", image: img.p1 },
  { id: "mem4", title: "The Day Everything Felt Right", date: "November 2024", caption: "Golden hour did most of the work.", image: img.hero },
  { id: "mem5", title: "Late Lights", date: "January 2025", caption: "We stayed longer than we should have.", image: img.p5 },
  { id: "mem6", title: "The Long Drive", date: "April 2025", caption: "The playlist was elite. Obviously.", image: img.p6 },
  { id: "mem7", title: "Sparks", date: "September 2025", caption: "Held light in our hands for a second.", image: img.p7 },
  { id: "mem8", title: "Morning, Slowly", date: "February 2026", caption: "The quietest kind of happy.", image: img.p8 },
];

export const rows: { key: string; title: string }[] = [
  { key: "popular", title: "Popular on Ayushuu" },
  { key: "romantic", title: "Because You Love These Memories" },
  { key: "favorites", title: "Our Favorite Moments" },
  { key: "main-character", title: "The Main Character Collection" },
  { key: "chaos", title: "Comedy & Chaos" },
  { key: "birthday", title: "Birthday Specials" },
  { key: "recent", title: "Recently Added" },
];

/** BIRTHDAY EXPERIENCE — edit these freely. */
export const birthday = {
  lines: [
    "Some people enter your life...",
    "...and somehow make ordinary moments...",
    "...feel like scenes from a movie.",
    "Today isn't just another day.",
    "It's Ayushuu's day.",
  ],
  title: "HAPPY BIRTHDAY, AYUSHUU",
  photo: img.profile,
  message: `Ayesha,

You have this ridiculous ability to turn normal days into something worth remembering. A boring evening becomes a story. A random photo becomes a favourite. A bad joke becomes a permanent inside joke.

This little streaming service exists because one page felt too small for everything you are — the chaos, the kindness, the laugh that arrives before the punchline, the way you show up for people without being asked.

Thank you for every episode so far. I hope this year is loud, soft, unplanned and completely yours.

Happy birthday, Ayushuu.`,
  signature: "— With everything, always.",
};

export const credits: { role: string; name: string }[] = [
  { role: "A STORY ABOUT", name: brand.nickname },
  { role: "Directed by", name: "Life" },
  { role: "Written by", name: "Memories" },
  { role: "Produced by", name: "Fate & Destiny" },
  { role: "Starring", name: brand.personName },
  { role: "Featuring", name: "The People Who Love Her" },
  { role: "Cinematography", name: "Our Camera Roll" },
  { role: "Edited by", name: "Time" },
  { role: "Soundtrack", name: "Our Favorite Songs" },
  { role: "Special Thanks To", name: "Every Little Moment" },
];

export const castCredits = [
  { role: "Starring", name: brand.personName },
  { role: "Directed by", name: "Life" },
  { role: "Produced by", name: "Fate" },
  { role: "Cinematography", name: "Our Camera Roll" },
  { role: "Written by", name: "Memories" },
];

export const allItems: MediaItem[] = [...movies, ...episodes, birthdaySpecial];

export const byId = (id: string) => allItems.find((i) => i.id === id);

export const byCategory = (key: string) => allItems.filter((i) => i.categories.includes(key));
