import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <main className="pt-4">
      <WorkGrid />
    </main>
  );
}
