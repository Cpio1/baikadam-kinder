import { ExternalLink, FileText } from "lucide-react";
import { sectionText } from "@/data/kindergarten";
import { Flower, Sparkle } from "../shared/FloatingShapes";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function DesktopDocuments() {
  const t = sectionText.documents;
  return (
    <section id="documents" data-section="documents" aria-labelledby="documents-title-d" className="relative overflow-x-clip py-20 xl:py-24">
      <div className="mx-auto max-w-[1200px] px-6 xl:px-8">
        <Reveal>
          <div className="relative mx-auto flex max-w-[880px] items-center gap-10 overflow-hidden rounded-[3rem_1.25rem_3rem_3rem] bg-white p-10 shadow-soft xl:p-12">
            <Flower aria-hidden="true" className="absolute -right-6 -top-6 w-28 text-sky" />
            <span className="relative flex size-28 shrink-0 items-center justify-center shape-blob bg-sky text-blue">
              <FileText className="size-12" aria-hidden="true" />
              <Sparkle aria-hidden="true" className="absolute -right-1 top-2 size-4 text-brown-soft animate-twinkle" />
            </span>
            <div className="relative flex-1">
              <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.text} id="documents-title-d" />
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 font-bold text-white shadow-[0_8px_18px_-8px_rgb(56_110_152/0.7)] transition hover:-translate-y-0.5 hover:bg-blue-dark"
              >
                {t.button}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
