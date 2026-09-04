import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/media-frame";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main>
      <header className="sticky top-0 z-20 bg-white py-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[24px] font-bold leading-none text-[var(--color-project)]">
            {project.slug === "pixelbook" ? "Pixelbook" : project.title}
          </h1>
          <Link
            href="/work"
            className="text-[24px] leading-none text-[var(--color-text-muted)] transition-colors hover:text-black"
          >
            back to work
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-10 pt-4">
      {project.year || project.team ? (
        <div className="flex flex-col gap-[11px] text-[16px] leading-[1.4] text-[var(--color-project)]">
          {project.year ? <p>{project.year}</p> : null}
          {project.team ? <p>{project.team}</p> : null}
        </div>
      ) : null}

      {project.awards ? (
        <div className="flex items-start gap-10">
          {project.awards.map((award) => (
            <div
              key={award.src}
              className="relative overflow-hidden"
              style={{ width: award.width, height: award.height }}
            >
              <Image
                src={award.src}
                alt={award.alt}
                fill
                sizes={`${award.width}px`}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      ) : null}

      {project.role || project.brief || project.constraints ? (
        <div className="py-4 text-[16px] leading-[1.4] text-[#979797]">
          {project.role ? (
            <p>
              <span className="text-black">Role</span> {project.role}
            </p>
          ) : null}
          {project.brief ? (
            <p>
              <span className="text-black">Brief</span> {project.brief}
            </p>
          ) : null}
          {project.constraints ? (
            <p>
              <span className="text-black">Constrains</span> {project.constraints}
            </p>
          ) : null}
        </div>
      ) : null}

      {project.media ? (
        <div className="flex flex-col gap-10">
          {project.media.map((block, index) => {
            if (block.type === "full") {
              return (
                <MediaFrame
                  key={`${block.src}-${index}`}
                  src={block.src}
                  alt={block.alt}
                  videoSrc={block.videoSrc}
                  sizes="(max-width: 1280px) 100vw, 1232px"
                  className="aspect-[1232/924] w-full"
                  objectFit={index === 2 ? "contain" : "cover"}
                />
              );
            }

            if (block.type === "pair") {
              return (
                <div
                  key={`${block.src}-${index}`}
                  className="grid grid-cols-1 items-center gap-4 py-4 md:grid-cols-2"
                >
                  {block.text ? (
                    <p className="text-center text-[16px] leading-[1.4] text-black">
                      {block.text}
                    </p>
                  ) : null}
                  <MediaFrame
                    src={block.src}
                    alt={block.alt}
                    videoSrc={block.videoSrc}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-[608/455] w-full"
                  />
                </div>
              );
            }

            return (
              <div
                key={`sketches-${index}`}
                className="grid grid-cols-1 gap-4 md:grid-cols-[406fr_750fr]"
              >
                <div className="relative aspect-[406/541] overflow-hidden">
                  <Image
                    src={block.left.src}
                    alt={block.left.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 406px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[750/541] overflow-hidden">
                  <Image
                    src={block.right.src}
                    alt={block.right.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 750px"
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <MediaFrame
          src={project.cover}
          alt={project.title}
          videoSrc={project.previewVideo}
          sizes="(max-width: 1280px) 100vw, 1232px"
          className="aspect-[612/722] w-full md:aspect-[1232/722]"
        />
      )}
      </div>
    </main>
  );
}
