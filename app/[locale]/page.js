import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    // <main> provides better semantic HTML for accessibility and SEO
    <main className="flex flex-col w-full min-h-screen">
      <LandingPage />
    </main>
  );
}