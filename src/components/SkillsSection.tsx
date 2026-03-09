import { motion } from "framer-motion";
import { Brain, Link, Search, Code, Users, Globe } from "lucide-react";

const skills = [
  { name: "AI Automation", icon: Brain },
  { name: "Web3 & Blockchain", icon: Link },
  { name: "Crypto Research", icon: Search },
  { name: "React Development", icon: Code },
  { name: "Community Building", icon: Users },
  { name: "Decentralized Technologies", icon: Globe },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full blur-[120px] bg-primary/5" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                <skill.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-medium text-sm text-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
