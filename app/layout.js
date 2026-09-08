import { Lora, Montserrat } from "next/font/google";
import "./globals.css";

// 1. Primary Heading Font (Authoritative, highly legible Political Serif)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

// 2. Secondary Body Font (Clean, structured Sans-Serif)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Karni Sena | Official Website",
  description: "Official portal of Karni Sena. Committed to social integrity, cultural heritage, and empowerment.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      {/* Set the base text to our deep charcoal and selection color to saffron directly via Tailwind classes */}
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground selection:bg-saffron selection:text-white">
        <main className="flex-grow flex flex-col w-full">
          {children}
        </main>
      </body>
    </html>
  );
}