import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const VisionSection = () => {
  return (
    <section id="vision" className="py-24 relative">
      <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-glow)" }} />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
            <span className="gradient-text">My Vision</span>
          </h2>
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              "The future of technology must be ethical, transparent, and inclusive. My goal is to build digital systems that empower people, promote trust, and create global opportunities through AI and blockchain."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
