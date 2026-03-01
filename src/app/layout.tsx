import type { Metadata } from "next";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { GoogleMapsProvider } from "@/components/shared/GoogleMapsProvider";
import { PageSplash } from "@/components/shared/PageSplash";
import "./globals.css";
import "./layout.css";

export const metadata: Metadata = {
  title: {
    default: "Injury Assistance Network - Your Personal Injury Concierge",
    template: "%s | Injury Assistance Network",
  },
  description:
    "The Only Network You need when You have been injured in an Accident. Connect with trusted medical providers, attorneys, and service providers.",
  keywords: [
    "personal injury",
    "injury assistance",
    "medical providers",
    "personal injury attorney",
    "chiropractor",
    "accident",
    "Orlando",
    "Florida",
  ],
  openGraph: {
    title: "Injury Assistance Network",
    description: "Your Personal Injury Concierge",
    url: "https://www.injuryassistancenetwork.com",
    siteName: "Injury Assistance Network",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PageSplash />
        <GoogleMapsProvider>
          <div className="public-layout">
            <Header />
            <main className="public-main">{children}</main>
            <ScrollToTop />
            <Footer />
          </div>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
