import AboutUs from "@/components/AboutUs";
import Navbar from "@/components/Navbar";
import YouthLeadershipSpotlight from "@/components/YouthLeadershipSpotlight";
export default function Home() {
  return (
    // <main> provides better semantic HTML for accessibility and SEO
    <main className="flex flex-col w-full min-h-screen"> 
      <AboutUs />
      <YouthLeadershipSpotlight />
    </main>
  );
}