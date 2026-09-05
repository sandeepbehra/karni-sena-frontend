import {
  Playfair_Display,
  Inter,
  Noto_Sans_Devanagari,
} from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const hindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  display: "swap",
});

export const metadata = {
  title: "Karni Sena | Official Website",
  description:
    "Official portal of Karni Sena. Committed to social integrity, cultural heritage, and empowerment.",
};

export default function RootLayout({ children }) {
  return (
    <html
      className={`
        ${playfair.variable}
        ${inter.variable}
        ${hindi.variable}
        h-full
        antialiased
        scroll-smooth
      `}
      suppressHydrationWarning
    >
      <body className="font-sans min-h-full flex flex-col bg-white text-[#333333] selection:bg-[#fa9e19] selection:text-white">
        {children}
      </body>
    </html>
  );
}