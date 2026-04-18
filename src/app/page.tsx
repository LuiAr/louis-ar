import MenuBar from "@/components/ui/MenuBar";
import DynamicHero from "@/components/sections/DynamicHero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <MenuBar />
      <div id="hero">
        <DynamicHero />
      </div>
      <div className="pt-16">
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
}
