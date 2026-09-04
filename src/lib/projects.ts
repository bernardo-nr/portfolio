export type TileSize = "tall" | "short";

export type ProjectMedia =
  | { type: "full"; src: string; alt: string; videoSrc?: string }
  | { type: "pair"; text?: string; src: string; alt: string; videoSrc?: string }
  | { type: "sketches"; left: { src: string; alt: string }; right: { src: string; alt: string } };

export type Project = {
  slug: string;
  title: string;
  cover: string;
  hoverCover?: string;
  size: TileSize;
  year?: string;
  team?: string;
  role?: string;
  brief?: string;
  constraints?: string;
  awards?: { src: string; alt: string; width: number; height: number }[];
  previewVideo?: string;
  media?: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: "sprintmapper",
    title: "Sprintmapper.com",
    cover: "/images/work/sprintmapper.png",
    hoverCover: "/images/work/hover/sprintmapper.png",
    size: "short",
    previewVideo: "/videos/sprintmapper.mp4",
  },
  {
    slug: "light-noise",
    title: "Light noise app",
    cover: "/images/work/light-noise.png",
    hoverCover: "/images/work/hover/light-noise.png",
    size: "short",
    previewVideo: "/videos/light-noise.mp4",
  },
  {
    slug: "youtube-go",
    title: "Youtube Go",
    cover: "/images/work/youtube-go.png",
    hoverCover: "/images/work/hover/youtube-go.png",
    size: "tall",
    year: "2018",
    team: "YouTube",
    previewVideo: "/videos/youtube-go.mp4",
  },
  {
    slug: "gogo-games",
    title: "GoGo Games!",
    cover: "/images/work/gogo-games.png",
    hoverCover: "/images/work/hover/gogo-games.png",
    size: "tall",
    year: "2020",
    previewVideo: "/videos/gogo-games.mp4",
  },
  {
    slug: "lumo",
    title: "Lumo",
    cover: "/images/work/lumo.png",
    hoverCover: "/images/work/hover/lumo.png",
    size: "short",
  },
  {
    slug: "youtube",
    title: "YouTube",
    cover: "/images/work/youtube.png",
    hoverCover: "/images/work/hover/youtube.png",
    size: "short",
    year: "2018",
    team: "YouTube",
    previewVideo: "/videos/youtube.mp4",
  },
  {
    slug: "donut",
    title: "Donut",
    cover: "/images/work/donut.png",
    hoverCover: "/images/work/hover/donut.png",
    size: "short",
    year: "2022",
  },
  {
    slug: "kormo",
    title: "Kormo",
    cover: "/images/work/kormo.png",
    hoverCover: "/images/work/hover/kormo.png",
    size: "short",
    previewVideo: "/videos/kormo.mp4",
  },
  {
    slug: "bump",
    title: "Bump",
    cover: "/images/work/bump.png",
    hoverCover: "/images/work/hover/bump.png",
    size: "short",
    year: "2011",
    team: "Bump, acquired by Google",
  },
  {
    slug: "pixelbook",
    title: "Pixelbook laptop",
    cover: "/images/work/pixelbook.png",
    hoverCover: "/images/work/hover/pixelbook.png",
    size: "tall",
    year: "2015",
    team: "Made by Google team",
    role: "Lead Industrial Designer.",
    brief: "Design a 10mm. thick convertible Chromebook.",
    constraints:
      "Display size, thickness, convertible design, antena signal while closed.",
    awards: [
      {
        src: "/images/pixelbook/red-dot.png",
        alt: "Red Dot award",
        width: 47,
        height: 80,
      },
      {
        src: "/images/pixelbook/dandad.png",
        alt: "D&AD Awards",
        width: 171,
        height: 80,
      },
    ],
    previewVideo: "/videos/pixelbook.mp4",
    media: [
      {
        type: "full",
        src: "/images/pixelbook/modes.png",
        alt: "Pixelbook in laptop, tent, and tablet modes",
        videoSrc: "/videos/pixelbook-modes.mp4",
      },
      {
        type: "pair",
        text: "A 10mm convertible that still feels like a laptop when you type.",
        src: "/images/pixelbook/keyboard.png",
        alt: "Pixelbook keyboard and trackpad",
        videoSrc: "/videos/pixelbook-keyboard.mp4",
      },
      {
        type: "full",
        src: "/images/pixelbook/profile.png",
        alt: "Pixelbook side profile showing 10mm thickness",
      },
      {
        type: "sketches",
        left: {
          src: "/images/pixelbook/sketch-1.png",
          alt: "Form sketches for Pixelbook",
        },
        right: {
          src: "/images/pixelbook/sketch-2.png",
          alt: "Hinge and internal component sketches",
        },
      },
    ],
  },
  {
    slug: "nexus-packaging",
    title: "Nexus 6X & 6P packaging",
    cover: "/images/work/nexus.png",
    hoverCover: "/images/work/hover/nexus.png",
    size: "short",
    year: "2015",
    team: "Google Hardware team",
  },
  {
    slug: "gatheround",
    title: "Gatheround",
    cover: "/images/work/gatheround.png",
    hoverCover: "/images/work/hover/gatheround.png",
    size: "short",
  },
  {
    slug: "power-adapter",
    title: "Power adapter",
    cover: "/images/work/power-adapter.png",
    hoverCover: "/images/work/hover/power-adapter.png",
    size: "short",
  },
];

export type WorkRow =
  | { type: "tall"; tall: string; shorts: string[]; tallSide: "left" | "right" }
  | { type: "pairs"; left: [string, string]; right: string[] };

export const workRows: WorkRow[] = [
  {
    type: "tall",
    tallSide: "right",
    shorts: ["sprintmapper", "light-noise"],
    tall: "gogo-games",
  },
  {
    type: "tall",
    tallSide: "right",
    shorts: ["donut", "lumo"],
    tall: "youtube-go",
  },
  {
    type: "tall",
    tallSide: "left",
    shorts: ["kormo", "bump"],
    tall: "pixelbook",
  },
  {
    type: "pairs",
    left: ["gatheround", "power-adapter"],
    right: ["nexus-packaging"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsBySlug(slugs: string[]) {
  return slugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}
