import { ExternalLink, FileText } from "lucide-react";
import { sectionText } from "@/data/kindergarten";
import { Flower } from "../shared/FloatingShapes";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function MobileDocuments() {
  const t = sectionText.documents;
  return (
    <section id="m-documents" data-section="documents" aria-labelledby="documents-title-m" className="relative overflow-x-clip py-14">
      <div className="mx-auto max-w-[560px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} id="documents-title-m" />
        </Reveal>
        <Reveal className="relative mt-6 overflow-hidden rounded-[2.5rem_1rem_2.5rem_2.5rem] bg-white p-5 shadow-soft">
          <Flower aria-hidden="true" className="absolute -right-3 -top-3 w-14 text-sky" />
          <div className="relative flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center shape-blob bg-sky text-blue">
              <FileText className="size-6" aria-hidden="true" />
            </span>
            <p className="min-w-0 text-[0.95rem] leading-snug text-ink-soft">{t.text}</p>
          </div>
          <a
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-blue px-5 py-3 font-bold text-white shadow-[0_8px_18px_-8px_rgb(56_110_152/0.7)] transition active:scale-[0.98]"
          >
            {t.button}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
