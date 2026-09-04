import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { isLinkedProject, type Project } from "@/lib/projects";

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
  const className = `flex flex-col gap-3 ${grow ? "flex-1" : ""}`;
  const content = (
    <>
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
    </>
  );

  if (isLinkedProject(project.slug)) {
    return (
      <Link href={`/work/${project.slug}`} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
