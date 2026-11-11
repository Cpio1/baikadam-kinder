import { DesktopAboutGroups } from "@/components/desktop/DesktopAboutGroups";
import { DesktopActivities } from "@/components/desktop/DesktopActivities";
import { DesktopContacts } from "@/components/desktop/DesktopContacts";
import { DesktopFooter } from "@/components/desktop/DesktopFooter";
import { DesktopGallery } from "@/components/desktop/DesktopGallery";
import { DesktopHeader } from "@/components/desktop/DesktopHeader";
import { DesktopHero } from "@/components/desktop/DesktopHero";
import { DesktopNutrition } from "@/components/desktop/DesktopNutrition";
import { MobileAboutGroups } from "@/components/mobile/MobileAboutGroups";
import { MobileActivities } from "@/components/mobile/MobileActivities";
import { MobileContacts } from "@/components/mobile/MobileContacts";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { MobileGallery } from "@/components/mobile/MobileGallery";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileHero } from "@/components/mobile/MobileHero";
import { MobileNutrition } from "@/components/mobile/MobileNutrition";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { contacts, site } from "@/data/kindergarten";

/**
 * Две отдельно спроектированные композиции: desktop (≥1024px) и mobile (<1024px).
 * Обе используют общие данные из src/data; ненужная скрыта через CSS (display: none),
 * поэтому её lazy-изображения не загружаются.
 */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: site.name,
    alternateName: site.legalName,
    telephone: "+77077232237",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Сельхозработника көшесі, 71А",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    openingHours: "Mo-Fr 08:00-18:00",
    sameAs: [contacts.instagram, contacts.twoGis],
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-blue px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Негізгі мазмұнға өту
      </a>

      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      <main id="main">
        <div className="hidden lg:block">
          <DesktopHero />
          <DesktopAboutGroups />
          <DesktopActivities />
          <DesktopNutrition />
          <DesktopGallery />
          <DesktopContacts />
        </div>
        <div className="lg:hidden">
          <MobileHero />
          <MobileAboutGroups />
          <MobileActivities />
          <MobileNutrition />
          <MobileGallery />
          <MobileContacts />
        </div>
      </main>

      <div className="hidden lg:block">
        <DesktopFooter />
      </div>
      <div className="lg:hidden">
        <MobileFooter />
      </div>

      <WhatsAppButton />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
