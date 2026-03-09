import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:contact@sphereofweb3.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-primary/5" />
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Let's Build the Future Together</span>
          </h2>
          <p className="text-muted-foreground">Have a project in mind? Let's connect.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5 font-heading">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5 font-heading">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5 font-heading">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-heading font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6 mt-10"
        >
          {[
            { name: "LinkedIn", href: "https://linkedin.com" },
            { name: "Twitter / X", href: "https://x.com" },
            { name: "Telegram", href: "https://t.me" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-heading"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
