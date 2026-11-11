import { Clock3, Phone } from "lucide-react";
import { contacts, navItems, site } from "@/data/kindergarten";
import { InstagramIcon } from "../shared/BrandIcons";
import { Cloud, Star } from "../shared/FloatingShapes";
import { Logo } from "../shared/Logo";
import { FooterNavLink } from "../shared/FooterNavLink";

export function DesktopFooter() {
  return (
    <footer className="relative mt-10 overflow-x-clip bg-ink text-white">
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-[45px] h-[46px] w-full text-ink">
        <path fill="currentColor" d="M0 70V40c180-30 360-40 540-24s360 40 540 30 270-34 360-30v54Z" />
      </svg>
      <Cloud aria-hidden="true" className="absolute right-[8%] top-10 w-28 text-white/[0.05]" />
      <Star aria-hidden="true" className="absolute left-[30%] top-16 w-4 text-sand/40" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[1.3fr_0.8fr_1fr] gap-12 px-6 pb-8 pt-14 xl:px-8">
        <div>
          <Logo size={46} light />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/75">{site.footerText}</p>
        </div>

        <nav aria-label="Төменгі мәзір">
          <p className="font-display text-[1rem] font-extrabold text-sand">Бөлімдер</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {navItems.map((item) => (
              <li key={item.key}>
                <FooterNavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-[1rem] font-extrabold text-sand">Байланыс</p>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            <li>
              <a href={contacts.phoneHref} className="inline-flex items-center gap-2.5 text-white/90 transition-colors hover:text-white">
                <Phone className="size-4 text-sky-deep" aria-hidden="true" />
                {contacts.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-white/90 transition-colors hover:text-white">
                <InstagramIcon className="size-4 text-sky-deep" />
                {contacts.instagramHandle}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-white/90">
              <Clock3 className="size-4 text-sky-deep" aria-hidden="true" />
              {contacts.scheduleDays}, <span className="whitespace-nowrap">{contacts.scheduleHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] border-t border-white/10 px-6 py-6 xl:px-8">
        <p className="text-[0.82rem] leading-relaxed text-white/55">{site.legalName}</p>
        <p className="mt-1 text-[0.82rem] text-white/55">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
