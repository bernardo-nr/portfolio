"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

const links = [
  { href: "/", label: "TL;DR", key: "tldr" },
  { href: "/work", label: "Work", key: "work" },
] as const;

function isActive(pathname: string, key: string) {
  if (key === "tldr") return pathname === "/";
  if (key === "work") return pathname === "/work" || pathname.startsWith("/work/");
  return false;
}

function activeColor(key: string) {
  return key === "work" ? "#ff01cb" : "#0fa35c";
}

export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const [underline, setUnderline] = useState({ left: 0, width: 0, color: "" });

  const isProjectPage = pathname.startsWith("/work/") && pathname !== "/work";
  const activeKey = links.find((link) => isActive(pathname, link.key))?.key;

  useLayoutEffect(() => {
    function update() {
      if (isProjectPage) return;

      const nav = navRef.current;
      const item = activeKey ? itemRefs.current.get(activeKey) : undefined;
      if (!nav || !activeKey || !item) {
        setUnderline({ left: 0, width: 0, color: "" });
        return;
      }

      const navBox = nav.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      setUnderline({
        left: itemBox.left - navBox.left,
        width: itemBox.width,
        color: activeColor(activeKey),
      });
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeKey, isProjectPage, pathname]);

  if (isProjectPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-20 bg-white py-2">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Link href="/" className="text-[24px] font-bold leading-none text-black">
          {site.name}
        </Link>
        <div className="relative pb-2">
          <nav
            ref={navRef}
            aria-label="Primary"
            className="flex flex-wrap items-start gap-6 text-[24px] leading-none"
          >
            {links.map((link) => {
              const active = isActive(pathname, link.key);
              const className = active
                ? "text-[24px] leading-none transition-colors"
                : "text-[24px] leading-none text-[var(--color-text-muted)] transition-colors hover:text-black";
              const style = active ? { color: activeColor(link.key) } : undefined;

              const setRef = (node: HTMLElement | null) => {
                if (node) itemRefs.current.set(link.key, node);
                else itemRefs.current.delete(link.key);
              };

              return (
                <Link
                  key={link.key}
                  ref={setRef}
                  href={link.href}
                  className={className}
                  style={style}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 transition-[left,width,background-color] duration-300 ease-out"
            style={{
              left: underline.left,
              right: "auto",
              width: underline.width,
              height: 1,
              backgroundColor: underline.color || "transparent",
            }}
          />
        </div>
      </div>
    </header>
  );
}
