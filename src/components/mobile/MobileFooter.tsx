import { Clock3, Phone } from "lucide-react";
import { contacts, site } from "@/data/kindergarten";
import { InstagramIcon } from "../shared/BrandIcons";
import { Cloud } from "../shared/FloatingShapes";
import { Logo } from "../shared/Logo";

export function MobileFooter() {
  return (
    <footer className="relative mt-8 overflow-x-clip bg-ink pb-24 text-white">
      <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-[23px] h-6 w-full text-ink">
        <path fill="currentColor" d="M0 30V16c60-16 120-18 180-8s140 12 220-4v26Z" />
      </svg>
      <Cloud aria-hidden="true" className="absolute -right-4 top-6 w-24 text-white/[0.05]" />

      <div className="relative mx-auto max-w-[560px] px-4 pt-10 sm:px-6">
        <Logo size={42} light />
        <p className="mt-4 text-[0.92rem] leading-relaxed text-white/75">{site.footerText}</p>

        <ul className="mt-6 space-y-2.5">
          <li>
            <a href={contacts.phoneHref} className="flex min-h-11 items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 text-[0.95rem] font-semibold">
              <Phone className="size-4 text-sky-deep" aria-hidden="true" />
              {contacts.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 text-[0.95rem] font-semibold">
              <InstagramIcon className="size-4 text-sky-deep" />
              {contacts.instagramHandle}
            </a>
          </li>
          <li className="flex min-h-11 items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 text-[0.95rem] font-semibold">
            <Clock3 className="size-4 text-sky-deep" aria-hidden="true" />
            {contacts.scheduleDays}, <span className="whitespace-nowrap">{contacts.scheduleHours}</span>
          </li>
        </ul>

        <div className="mt-7 border-t border-white/10 pt-5">
          <p className="text-[0.78rem] leading-relaxed text-white/55">{site.legalName}</p>
          <p className="mt-1 text-[0.78rem] text-white/55">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
