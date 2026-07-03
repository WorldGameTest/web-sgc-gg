import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Games } from "@/components/Games";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { FollowUs } from "@/components/FollowUs";
import { Footer } from "@/components/Footer";
import { Divider } from "@/components/Divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Games />
        <Divider />
        <Team />
        <Divider />
        <Contact />
        <Divider />
        <FollowUs />
      </main>
      <Footer />
    </>
  );
}
