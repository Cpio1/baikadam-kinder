import type { Metadata, Viewport } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { photos } from "@/data/kindergarten";
import { withBasePath } from "@/lib/basePath";
import "./globals.css";

// Оба шрифта содержат казахские буквы (Ә, Ғ, Қ, Ң, Ө, Ұ, Ү, Һ, І) в наборе cyrillic-ext.
const heading = Nunito({
  variable: "--font-heading",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const body = Nunito_Sans({
  variable: "--font-body",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  display: "swap",
});

const title = "«Байкадам» балабақшасы | Алматы қаласы";
const description =
  "«Байкадам» балабақшасы — Алматы қаласындағы 1,5–6 жас аралығындағы балаларға арналған балабақша. Қазақ тілінде тәрбие, 3 топ, күніне 4 мезгіл тамақтану және қосымша үйірмелер.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

// metadataBase — только origin: Next.js склеивает его pathname с относительными URL,
// а пути ниже уже содержат basePath (photos.* — через withBasePath), так префикс не удваивается.
const siteOrigin = new URL(siteUrl).origin;
const homeUrl = withBasePath("/");

const ogImage = photos.main
  ? [{ url: photos.main.src, width: photos.main.width, height: photos.main.height, alt: "«Байкадам» балабақшасы" }]
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title,
  description,
  applicationName: "«Байкадам» балабақшасы",
  keywords: ["Байкадам", "балабақша", "Алматы", "балабақша Алматы", "қазақ тілінде тәрбие", "детский сад Алматы"],
  alternates: { canonical: homeUrl },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "kk_KZ",
    siteName: "«Байкадам» балабақшасы",
    url: homeUrl,
    images: ogImage,
  },
  twitter: { card: ogImage ? "summary_large_image" : "summary", title, description },
  icons: photos.logo ? { icon: photos.logo.src, apple: photos.logo.src } : undefined,
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#f8fbfd",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable} antialiased`}>
      <body className="bg-bg font-sans text-ink">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
