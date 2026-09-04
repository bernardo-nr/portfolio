import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import type { Project } from "@/lib/projects";

type ProjectTileProps = {
  project: Project;
  grow?: boolean;
  priority?: boolean;
};

export function ProjectTile({
  project,
  grow = false,
  priority = false,
}: ProjectTileProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`flex flex-col gap-3 ${grow ? "flex-1" : ""}`}
    >
      <MediaFrame
        src={project.cover}
        alt={project.title}
        hoverSrc={project.hoverCover}
        videoSrc={project.previewVideo}
        priority={priority}
        objectFit="cover"
        className={
          grow ? "aspect-[612/722] w-full" : "aspect-[612/326] w-full"
        }
      />
      <p className="text-[16px] leading-[1.4] text-black">{project.title}</p>
    </Link>
  );
}
