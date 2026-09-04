"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MediaFrameProps = {
  src: string;
  alt: string;
  hoverSrc?: string;
  videoSrc?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
};

export function MediaFrame({
  src,
  alt,
  hoverSrc,
  videoSrc,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  objectFit = "cover",
}: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(Boolean(videoSrc));
  const [playing, setPlaying] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  const cacheBust = (path: string) => `${path}?v=2`;

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverCapable(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function playPreview() {
    const video = videoRef.current;
    if (!video || !hasVideo) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => setPlaying(true))
        .catch(() => {
          setHasVideo(false);
        });
    }
  }

  function stopPreview() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  }

  return (
    <div
      className={`group relative overflow-hidden bg-[var(--color-tile)] ${className}`}
      onMouseEnter={() => hoverCapable && playPreview()}
      onMouseLeave={() => hoverCapable && stopPreview()}
    >
      {hoverSrc ? (
        <Image
          src={cacheBust(hoverSrc)}
          alt=""
          fill
          sizes={sizes}
          quality={90}
          unoptimized
          className={fitClass}
        />
      ) : null}
      <Image
        src={cacheBust(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        unoptimized
        className={`${fitClass} ${
          playing || hoverSrc ? "group-hover:opacity-0" : ""
        } ${playing ? "opacity-0" : "opacity-100"}`}
      />
      {hasVideo && videoSrc ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 size-full object-cover ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          onError={() => setHasVideo(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
