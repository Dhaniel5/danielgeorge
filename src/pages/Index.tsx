import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import VisionSection from "@/components/VisionSection";
import BuildingSection from "@/components/BuildingSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <VisionSection />
      <BuildingSection />
      <ContactSection />
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground font-heading">
          © 2026 Daniel George Agbo. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
