import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, Lightbulb, Globe, GraduationCap, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning Pathways",
    description: "Carefully designed courses that take learners from fundamentals to advanced topics in AI and Web3 technologies.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "A collaborative space where individuals can connect, share knowledge, and grow together in the digital age.",
  },
  {
    icon: Heart,
    title: "Inclusive by Design",
    description: "Built for learners with additional needs, educators, and underserved communities — no background required.",
  },
  {
    icon: Lightbulb,
    title: "Practical & Applied",
    description: "Real-world contexts and hands-on experiences that make complex concepts easy to understand and apply.",
  },
  {
    icon: Globe,
    title: "Web3 & AI Education",
    description: "Covering blockchain fundamentals, smart contracts, AI automation, decentralized governance, and Web3 ethics.",
  },
  {
    icon: GraduationCap,
    title: "Courses, Webinars & Sessions",
    description: "Interactive live sessions, webinars, and self-paced courses that fit every learner's schedule and pace.",
  },
];

const topics = [
  "AI Automation",
  "Blockchain Fundamentals",
  "Web3 Ethics",
  "Smart Contracts",
  "Decentralized Governance",
  "Digital Innovation",
  "Crypto Literacy",
  "DeFi Basics",
];

const SphereLearn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full blur-[140px] bg-secondary/10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-primary/10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-heading text-primary mb-6">
              <GraduationCap className="w-4 h-4" />
              Educational Initiative
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">SphereLearn</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Making emerging technologies like AI and Web3 accessible to everyone — regardless of background or experience level.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full glass-card text-sm font-heading text-primary border border-primary/20">
                AI Education
              </span>
              <span className="px-4 py-2 rounded-full glass-card text-sm font-heading text-secondary border border-secondary/20">
                Web3 Learning
              </span>
              <span className="px-4 py-2 rounded-full glass-card text-sm font-heading text-accent border border-accent/20">
                Inclusive Tech
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">What is SphereLearn?</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  SphereLearn is an educational initiative designed to make emerging technologies like artificial intelligence and Web3 accessible to everyone, regardless of their background or level of experience. It focuses on simplifying complex concepts and providing structured learning pathways that empower individuals to understand and apply modern technologies in real-world contexts.
                </p>
                <p>
                  The platform is particularly driven by a commitment to inclusion. It seeks to support learners who may not traditionally have access to quality tech education, including individuals with additional needs, educators, and underserved communities. By creating easy-to-understand content and practical learning experiences, SphereLearn helps bridge the knowledge gap in the digital age.
                </p>
                <p>
                  By combining education with empowerment, SphereLearn aims to equip individuals with the knowledge and confidence needed to participate in and contribute to the future of technology.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <h3 className="font-heading text-xl font-semibold mb-6 text-foreground">Topics Covered</h3>
              <div className="flex flex-wrap gap-3">
                {topics.map((topic, i) => (
                  <motion.span
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="px-4 py-2 rounded-full text-sm font-heading"
                    style={{ background: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.25)" }}
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground font-heading">
                  More topics being added as the platform grows.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-primary/5" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">What Makes SphereLearn Different</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              More than a learning platform — a community where individuals grow, collaborate, and explore new opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(var(--primary) / 0.15)" }}>
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-10 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.07), hsl(var(--secondary) / 0.05))" }} />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Our Mission</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                SphereLearn is envisioned as a community where individuals can grow, collaborate, and explore new opportunities. It will include courses, webinars, and interactive sessions covering topics such as AI automation, blockchain fundamentals, Web3 ethics, and digital innovation — equipping every learner to contribute to the future of technology.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground font-heading">
          © 2026 SphereLearn · Part of the Sphere Of Web3 Initiative
        </p>
      </footer>
    </div>
  );
};

export default SphereLearn;
