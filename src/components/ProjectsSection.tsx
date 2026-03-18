import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    name: "Sphere Of Web3",
    description: "A forward-thinking technology initiative building decentralized solutions that address real-world challenges through blockchain, AI, and community-driven innovation — bridging emerging tech with practical, ethical impact.",
    color: "from-secondary to-primary",
    href: null,
  },
  {
    name: "REKOD.AI",
    description: "An AI-powered voice-to-text platform for meetings, seminars, churches, and workshops. Converts speech into accurate real-time transcripts with a vision for blockchain-secured, tamper-proof documentation.",
    color: "from-primary to-secondary",
    href: null,
  },
  {
    name: "EthosLayer",
    description: "A transparency platform that analyzes and evaluates crypto tokens and Web3 projects based on governance, community integrity, and ethical standards — empowering users to make informed decisions.",
    color: "from-primary via-accent to-secondary",
    href: null,
  },
  {
    name: "SphereLearn",
    description: "An educational initiative making AI and Web3 accessible to everyone. Providing structured pathways, webinars, and interactive sessions with a strong commitment to inclusion and underserved communities.",
    color: "from-secondary via-accent to-primary",
    href: "/spherelearn",
  },
  {
    name: "Edvanta",
    description: "An intelligent platform using AI to transform educational planning for individuals with additional needs. Streamlines IEP creation, progress tracking, and reporting — built on real-world special education experience.",
    color: "from-accent to-secondary",
    href: "/edvanta",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-secondary/5" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center mb-4`}>
                  <span className="text-primary-foreground font-heading font-bold text-sm">
                    {project.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>
                {project.href ? (
                  <Link
                    to={project.href}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
                  >
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
