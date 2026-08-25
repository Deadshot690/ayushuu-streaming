/**
 * CENTRAL CONTENT CONFIGURATION
 * -----------------------------
 * Everything editable lives here: names, titles, descriptions, media paths,
 * birthday message, credits. UI components never hardcode content.
 *
 * Media lives in: public/media/images, public/media/videos, public/media/music
 */

export const brand = {
  name: "Anne",
  sub: "ORIGINALS",
  tagline: "AN ORIGINAL STORY",
  universe: "Anne Cinematic Universe",
  personName: "Anne",
  nickname: "Anne",
  year: 2026,
};

export const music = {
  theme: "/media/music/theme.weba",
};

export const img = {
  p1: "/media/images/Anee (1).jpeg",
  p2: "/media/images/Anee (2).jpeg",
  p3: "/media/images/Anee (3).jpeg",
  p4: "/media/images/Anee (4).jpeg",
  p5: "/media/images/Anee (5).jpeg",
  p6: "/media/images/Anee (6).jpeg",
  p7: "/media/images/Anee (7).jpeg",
  p8: "/media/images/Anee (8).jpeg",
  p9: "/media/images/Anee (9).jpeg",
  p10: "/media/images/Anee (10).jpeg",
  p11: "/media/images/Anee (11).jpeg",
  p12: "/media/images/Anee (12).jpeg",
  p13: "/media/images/Anee (13).jpeg",
  hero: "/media/images/Anee (1).jpeg",
  profile: "/media/images/Anee (1).jpeg",
  birthday: "/media/images/Anee (9).jpeg",
};

export const videos = {
  v1: "/media/videos/Anee (1).mp4",
  v2: "/media/videos/Anee (2).mp4",
  v3: "/media/videos/Anee (3).mp4",
  v4: "/media/videos/Anee (4).mp4",
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
  label: "Anne ORIGINAL",
  kicker: "A BIRTHDAY SPECIAL",
  title: "THE STORY OF Anne",
  meta: "2026 • 1 Season • HD",
  description:
    "A collection of moments, memories, laughter, chaos and everything that makes Anne impossible to forget.",
  image: img.p1,
  video: videos.v1,
  playId: "s01e01",
};

export const movies: MediaItem[] = [
  {
    id: "m-good-days",
    type: "movie",
    title: "THE GOOD DAYS",
    image: img.p5,
    backdrop: img.p5,
    reel: [img.p5],
    description:
      "Warm light, loud laughter, and the kind of evening you only recognise as perfect much, much later.",
    duration: 101,
    durationLabel: "1h 41m",
    year: 2024,
    genre: "Feel Good",
    rating: "U",
    categories: ["favorites"],
    related: ["m-unplanned", "m-forever-young"],
  },
  {
    id: "m-unplanned",
    type: "movie",
    title: "UNPLANNED ADVENTURES",
    image: img.p6,
    backdrop: img.p6,
    reel: [img.p6],
    description:
      "The best nights never had an itinerary. A road, a playlist, and absolutely no idea where it ends.",
    duration: 78,
    durationLabel: "1h 18m",
    year: 2025,
    genre: "Adventure",
    rating: "U",
    categories: ["chaos"],
    related: ["m-good-days", "m-forever-young"],
  },
  {
    id: "m-forever-young",
    type: "movie",
    title: "FOREVER YOUNG",
    image: img.p7,
    backdrop: img.p7,
    reel: [img.p7],
    description:
      "Sparklers, terrible singing, and a promise that some things are never going to grow up.",
    duration: 88,
    durationLabel: "1h 28m",
    year: 2026,
    genre: "Celebration",
    rating: "U",
    categories: ["birthday"],
    related: ["m-memories", "m-good-days"],
  },
  {
    id: "m-memories",
    type: "movie",
    title: "THE MEMORIES",
    image: img.p8,
    backdrop: img.p8,
    reel: [img.p8],
    description:
      "An anthology of small, unremarkable moments that turned out to be the whole point.",
    duration: 120,
    durationLabel: "2h 00m",
    year: 2026,
    genre: "Anthology",
    rating: "U",
    categories: ["romantic"],
    related: ["m-good-days", "m-unplanned"],
  },
];

export const series = {
  id: "the-story-of-Anne",
  title: "THE STORY OF Anne",
  description:
    "One season. Four video chapters. Every one of them about the girl who makes ordinary days look like scenes from a film.",
  backdrop: img.p1,
  seasons: [1],
};

const ep = (
  n: number,
  title: string,
  description: string,
  image: string,
  video: string | undefined,
  duration: number,
  durationLabel: string,
  categories: string[] = [],
): MediaItem => ({
  id: `s01e0${n}`,
  type: "episode",
  title,
  image,
  backdrop: image,
  ...(video ? { video } : {}),
  reel: [image],
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
  ep(1, "The Beginning", "Where the story quietly starts, featuring real video moments captured on camera.", img.p1, videos.v1, 62, "Full Video", [
    "popular",
  ]),
  ep(2, "Main Character Energy", "Some people just arrive. The room adjusts around them.", img.p2, videos.v2, 54, "Full Video", [
    "main-character",
  ]),
  ep(3, "The Chaos Begins", "Plans collapse. Laughter survives. Highly recommended.", img.p3, videos.v3, 48, "Full Video", [
    "chaos",
  ]),
  ep(4, "That One Memory", "Some moments weren't planned. They just became memories.", img.p4, videos.v4, 57, "Full Video", [
    "romantic",
  ]),
];

export const birthdaySpecial: MediaItem = {
  id: "birthday-special",
  type: "movie",
  title: "HAPPY BIRTHDAY, Anne",
  image: img.p9,
  backdrop: img.p9,
  reel: [img.p9],
  description: "A message that took a whole year to write and about four seconds to mean.",
  duration: 0,
  durationLabel: "Special",
  year: 2026,
  genre: "Birthday Special",
  rating: "For her only",
  categories: ["birthday"],
};

export const memories = [
  { id: "mem1", title: "A Random Day", date: "March 2024", caption: "Nothing was happening. It was perfect.", image: img.p10 },
  { id: "mem2", title: "The Laugh We Couldn't Stop", date: "June 2024", caption: "Neither of us remember why.", image: img.p11 },
  { id: "mem3", title: "One For The Camera Roll", date: "August 2024", caption: "Taken badly. Kept forever.", image: img.p12 },
  { id: "mem4", title: "Morning, Slowly", date: "February 2026", caption: "The quietest kind of happy.", image: img.p13 },
];

export const rows: { key: string; title: string }[] = [
  { key: "popular", title: "Popular on Anne" },
  { key: "romantic", title: "Because You Love These Memories" },
  { key: "favorites", title: "Our Favorite Moments" },
  { key: "main-character", title: "The Main Character Collection" },
  { key: "chaos", title: "Comedy & Chaos" },
  { key: "birthday", title: "Birthday Specials" },
];

/** BIRTHDAY EXPERIENCE — edit these freely. */
export const birthday = {
  lines: [
    "Some people enter your life...",
    "...and somehow make ordinary moments...",
    "...feel like scenes from a movie.",
    "Today isn't just another day.",
    "It's Anne's day.",
  ],
  title: "HAPPY BIRTHDAY, Anne",
  photo: img.p9,
  message: `Anne,

You have this ridiculous ability to turn normal days into something worth remembering. A boring evening becomes a story. A random photo becomes a favourite. A bad joke becomes a permanent inside joke.

This little streaming service exists because one page felt too small for everything you are — the chaos, the kindness, the laugh that arrives before the punchline, the way you show up for people without being asked.

Thank you for every episode so far. I hope this year is loud, soft, unplanned and completely yours.

Happy birthday, Anne.`,
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

export const allItems: MediaItem[] = [...episodes, ...movies, birthdaySpecial];

export const byId = (id: string) => allItems.find((i) => i.id === id);

export const byCategory = (key: string) => allItems.filter((i) => i.categories.includes(key));


