import Navbar from "@/components/Navbar";
import UpcomingCampaigns from "@/components/UpcomingCampaigns";

export default function Home() {
  return (
    // <main> provides better semantic HTML for accessibility and SEO
    <main className="flex flex-col w-full min-h-screen">
      <UpcomingCampaigns />
    </main>
  );
}