import { HeroVideo } from "@/components/hero-video";
import { VennDiagram } from "@/components/venn-diagram";
import { history, site, skills } from "@/lib/content";

export default function TldrPage() {
  return (
    <main className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col gap-4">
        <HeroVideo />
        <p className="text-[16px] leading-[1.4] text-black">
          {site.bio}
        </p>
      </div>

      <VennDiagram />

      <section className="flex flex-col gap-6 py-4">
        <h2 className="text-[24px] font-medium leading-none text-[var(--color-heading-do)]">
          what I do
        </h2>
        <ul className="flex flex-col gap-2 text-[16px] leading-[1.4] text-black">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6 py-4">
        <h2 className="text-[24px] font-medium leading-none text-[var(--color-heading-been)]">
          where I’ve been
        </h2>
        <ul className="flex flex-col gap-2 text-[16px] leading-[1.4] text-black">
          {history.map((item) => (
            <li key={`${item.year}-${item.text}`}>
              <span>{item.year}</span>
              {` ${item.text}`}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
