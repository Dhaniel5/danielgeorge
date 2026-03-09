import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Founder",
    company: "Sphere Of Web3",
    description: "Building decentralized applications that solve real-world problems using blockchain and AI.",
  },
  {
    title: "Community Manager",
    company: null,
    description: "Managed and supported online communities, facilitated engagement, and helped grow Web3 ecosystems.",
  },
  {
    title: "Ambassador",
    company: "Kappa",
    description: "Represented the Kappa ecosystem by promoting its initiatives and engaging the community.",
  },
  {
    title: "Administrative Officer",
    company: null,
    description: "Provided administrative coordination, documentation, and operational support within an organizational environment.",
  },
  {
    title: "Special Education Needs Teacher",
    company: "4 Years",
    description: "Worked with individuals with additional needs, promoting inclusive education and empowerment.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] rounded-full blur-[120px] bg-primary/5" />
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Professional Experience</span>
          </h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="md:pl-16 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-3.5 top-5 w-3 h-3 rounded-full border-2 border-primary hidden md:block"
                  style={{ background: "var(--gradient-primary)" }}
                />

                <div className="glass-card rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-all duration-300">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Briefcase className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-base">
                      {exp.title}
                      {exp.company && (
                        <span className="text-primary"> — {exp.company}</span>
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
