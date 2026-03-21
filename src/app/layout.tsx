import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { FlowProvider } from "@/context/FlowContext";
import { TransactionProvider } from "@/context/TransactionContext";
import { KYCProvider } from "@/context/KYCContext";
import { LuxuryWatermark } from "@/components/LuxuryWatermark";
// import { PrestigeToggle } from "@/components/PrestigeToggle";
import { FeedbackWidget } from "@/components/FeedbackWidget";

// Premium serif font for headlines — variable for flexible weight control
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Clean sans-serif for body text
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Ultra-luxury display font for hero moments
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

// Devanagari font for logo र (ra) character
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#020202',
};

export const metadata: Metadata = {
  title: "Prophit | Premium Real Estate Participation",
  description: "Your exclusive portal to premium real estate opportunities in India. Secured, seamless, and institutional-grade.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Prophit',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${notoDevanagari.variable}`}>
      <body className="antialiased font-sans">
        {/* Warm Ambient Gold Aurora — Enhanced: 6 orbs, slower movement */}
        <div className="aurora-ambient" aria-hidden="true" />

        {/* Architectural Diamond Grid Background */}
        <div className="grid-background" aria-hidden="true" />

        {/* Subtle Noise Texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Floating Gold Particles — Enhanced: 8 particles with dust motes */}
        <div className="luxury-particles" aria-hidden="true">
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle luxury-particle-dust" />
          <span className="luxury-particle luxury-particle-dust" />
        </div>

        {/* Luxury Building Watermark */}
        <LuxuryWatermark />

        {/* Flow Context Provider */}
        <FlowProvider>
          <TransactionProvider>
            <KYCProvider>
              <main className="relative z-10 min-h-screen">
                {children}
              </main>
            </KYCProvider>
          </TransactionProvider>
        </FlowProvider>

        <FeedbackWidget />
      </body>
    </html>
  );
}
