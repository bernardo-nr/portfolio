import Image from "next/image";
import { heroVideo } from "@/lib/content";

export function HeroVideo() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative aspect-[1248/832] w-full bg-[var(--color-tile)]">
        <Image
          src={heroVideo.poster}
          alt="Street mural of Doña Carmen"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1248px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
