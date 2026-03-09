import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const initiatives = [
  {
    name: "REKOD.AI",
    description: "AI-powered voice recording and transcription system.",
  },
  {
    name: "EthosLayer",
    description: "Ethical analysis platform for crypto and Web3 projects.",
  },
  {
    name: "Sphere Of Web3",
    description: "A company focused on building decentralized applications that address real-world issues.",
  },
];

const BuildingSection = () => {
  return (
    <section id="building" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">What I'm Building</span>
          </h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <div className="space-y-4">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--gradient-primary)" }}>
                <Rocket className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingSection;
