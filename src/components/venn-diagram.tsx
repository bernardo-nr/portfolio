import Image from "next/image";

export function VennDiagram() {
  return (
    <div className="flex justify-center bg-white py-2">
      <Image
        src="/images/venn.png"
        alt="I’m here at the overlap of Designer, Product Manager, and Vibe Coder"
        width={1200}
        height={640}
        unoptimized
        className="h-auto w-full max-w-[450px] -translate-x-[80px]"
      />
    </div>
  );
}
