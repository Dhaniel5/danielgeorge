import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import danielPhoto from "@/assets/daniel-photo.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] animate-pulse-glow" style={{ background: "var(--gradient-glow)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-secondary/10" />
        <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full blur-[100px] bg-primary/10" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Web3 Builder · AI Innovator · Founder
          </motion.p>

          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="gradient-text">Daniel George</span>
            <br />
            <span className="text-foreground">Agbo</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-4 font-heading font-light">
            Web3 Builder | AI Innovator | Founder of{" "}
            <span className="text-primary">Sphere Of Web3</span>
          </p>

          <p className="text-muted-foreground max-w-lg mb-8 leading-relaxed">
            I build technology that solves real-world problems using AI, blockchain, and decentralized systems.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-heading font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              View My Projects
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-heading font-medium glass-card text-foreground hover:border-primary/40 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full glow-purple opacity-60" />
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden gradient-border">
              <img
                src={danielPhoto}
                alt="Daniel George Agbo"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
