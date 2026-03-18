import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, FileText, TrendingUp, Users, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Brain,
    title: "AI-Powered IEP Generation",
    description: "Automatically generate detailed, personalized Individualized Education Plans based on each student's unique needs and goals.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor student progress with intelligent dashboards and data-driven insights that help educators make better decisions.",
  },
  {
    icon: FileText,
    title: "Insightful Reports",
    description: "Produce clear, organized reports that support better learning outcomes and streamline communication with stakeholders.",
  },
  {
    icon: Users,
    title: "Collaborative Platform",
    description: "Enhance collaboration between teachers, caregivers, and institutions by centralizing accessible, organized information.",
  },
  {
    icon: Shield,
    title: "Built on Real Experience",
    description: "Grounded in years of hands-on work in special education, ensuring the platform is practical, relevant, and educator-first.",
  },
  {
    icon: Zap,
    title: "Efficiency at Scale",
    description: "Drastically reduce the time spent on administrative planning so educators can focus on what matters — teaching.",
  },
];

const benefits = [
  { label: "Time Saved", value: "Hours", sub: "per IEP generated" },
  { label: "Learner Focus", value: "100%", sub: "personalized plans" },
  { label: "Collaboration", value: "Unified", sub: "team access" },
];

const Edvanta = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full blur-[140px] bg-primary/10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-secondary/10" />

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-heading text-secondary mb-6">
              <Brain className="w-4 h-4" />
              EdTech Platform
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Edvanta</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Transforming how educational planning is created — AI-powered Individualized Education Plans for every learner with additional needs.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full glass-card text-sm font-heading text-primary border border-primary/20">
                AI Planning
              </span>
              <span className="px-4 py-2 rounded-full glass-card text-sm font-heading text-secondary border border-secondary/20">
                Special Education
              </span>
              <span className="px-4 py-2 rounded-full glass-card text-sm font-heading text-accent border border-accent/20">
                IEP Automation
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="font-heading text-2xl font-bold gradient-text mb-1">{b.value}</div>
                <div className="text-xs text-muted-foreground">{b.sub}</div>
                <div className="text-sm font-heading text-foreground mt-1">{b.label}</div>
              </motion.div>
            ))}
          </div>
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
                <span className="gradient-text">What is Edvanta?</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Edvanta is an intelligent platform designed to transform how educational planning and support systems are created, particularly for individuals with additional learning needs. It leverages artificial intelligence to streamline the development of Individualized Education Plans (IEPs), making the process more efficient, personalized, and data-driven.
                </p>
                <p>
                  The platform addresses a critical challenge in education: the time-consuming and often complex nature of creating structured learning plans tailored to each student's needs. By using AI, Edvanta can assist educators in generating detailed IEPs, tracking progress, and producing insightful reports that support better learning outcomes.
                </p>
                <p>
                  Edvanta is built on years of real-world experience in education, particularly in working with students who require specialized support. This foundation ensures that the platform is not only technologically advanced but also practical and relevant to educators.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { label: "Who it's for", value: "Educators, SENCOs, caregivers, and institutions supporting learners with additional needs." },
                { label: "Core Technology", value: "Artificial Intelligence powering automated IEP generation, progress tracking, and report creation." },
                { label: "Real Foundation", value: "Built on 4+ years of direct experience working with individuals with additional needs." },
                { label: "Ultimate Goal", value: "A more inclusive and effective education system where every learner receives the support they need." },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="text-xs font-heading text-primary uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-sm text-foreground leading-relaxed">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-secondary/5" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Core Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Designed with educators in mind — every feature exists to save time and improve student outcomes.
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
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(var(--secondary) / 0.15)" }}>
                  <feature.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-10 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, hsl(var(--secondary) / 0.07), hsl(var(--primary) / 0.05))" }} />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">The Vision</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Edvanta aims to enhance collaboration between teachers, caregivers, and institutions by providing clear, organized, and accessible information. Its ultimate goal is to create a more inclusive and effective education system where every learner receives the support they need to succeed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground font-heading">
          © 2026 Edvanta · Intelligent Education Planning
        </p>
      </footer>
    </div>
  );
};

export default Edvanta;
