import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] bg-primary/5" />
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-16 h-1 rounded-full mb-8" style={{ background: "var(--gradient-primary)" }} />

          <div className="glass-card rounded-2xl p-8 md:p-10 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Daniel George Agbo is a Nigerian Web3 builder and AI enthusiast. He is the founder of{" "}
              <span className="text-primary font-medium">Sphere Of Web3</span>, a platform focused on building decentralized applications that solve real-world problems.
            </p>
            <p>
              With over 20 years of experience as a Special Education Needs teacher, Daniel is passionate about inclusive technology and empowering underserved communities through emerging technologies like blockchain and artificial intelligence.
            </p>
            <p>
              His mission is to bridge the gap between innovation and real-world impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
