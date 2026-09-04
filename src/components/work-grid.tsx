import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { ProjectTile } from "@/components/project-tile";
import {
  getProjectsBySlug,
  workRows,
  type WorkRow,
} from "@/lib/projects";

export function WorkGrid() {
  return (
    <div className="flex flex-col gap-8">
      {workRows.map((row, index) => (
        <WorkRowLayout key={rowKey(row)} row={row} priority={index === 0} />
      ))}
    </div>
  );
}

function WorkRowLayout({
  row,
  priority,
}: {
  row: WorkRow;
  priority: boolean;
}) {
  if (row.type === "pairs") {
    return (
      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 lg:grid-cols-2">
        <Column slugs={row.left} priority={priority} />
        <Column slugs={row.right} />
      </div>
    );
  }

  const shorts = (
    <MatchingShorts
      slugs={row.shorts}
      priority={priority && row.tallSide === "right"}
    />
  );
  const tall = (
    <Column slugs={[row.tall]} priority={priority && row.tallSide === "left"} />
  );

  return (
    <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 lg:grid-cols-2">
      {row.tallSide === "left" ? (
        <>
          {tall}
          {shorts}
        </>
      ) : (
        <>
          {shorts}
          {tall}
        </>
      )}
    </div>
  );
}

function Column({
  slugs,
  priority = false,
}: {
  slugs: string[];
  priority?: boolean;
}) {
  const projects = getProjectsBySlug(slugs);

  return (
    <div className="flex flex-col gap-8">
      {projects.map((project, index) => (
        <ProjectTile
          key={project.slug}
          project={project}
          grow={project.size === "tall"}
          priority={priority && index === 0}
        />
      ))}
    </div>
  );
}

function MatchingShorts({
  slugs,
  priority = false,
}: {
  slugs: string[];
  priority?: boolean;
}) {
  const projects = getProjectsBySlug(slugs);
  const [top, bottom] = projects;

  if (!top || !bottom) {
    return <Column slugs={slugs} priority={priority} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex aspect-[612/722] w-full flex-col">
        <Link
          href={`/work/${top.slug}`}
          className="flex shrink-0 flex-col gap-3"
        >
          <MediaFrame
            src={top.cover}
            alt={top.title}
            hoverSrc={top.hoverCover}
            videoSrc={top.previewVideo}
            priority={priority}
            objectFit="cover"
            className="aspect-[612/326] w-full"
          />
          <p className="text-[16px] leading-[1.4] text-black">{top.title}</p>
        </Link>
        <div className="min-h-0 flex-1" aria-hidden />
        <Link
          href={`/work/${bottom.slug}`}
          aria-label={bottom.title}
          className="shrink-0"
        >
          <MediaFrame
            src={bottom.cover}
            alt={bottom.title}
            hoverSrc={bottom.hoverCover}
            videoSrc={bottom.previewVideo}
            objectFit="cover"
            className="aspect-[612/326] w-full"
          />
        </Link>
      </div>
      <Link
        href={`/work/${bottom.slug}`}
        className="text-[16px] leading-[1.4] text-black"
      >
        {bottom.title}
      </Link>
    </div>
  );
}

function rowKey(row: WorkRow) {
  if (row.type === "pairs") {
    return [...row.left, ...row.right].join("-");
  }
  return [row.tall, ...row.shorts].join("-");
}
