import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const homeLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" },
];

const projectPages = [
  { label: "SphereLearn", to: "/spherelearn" },
  { label: "Edvanta", to: "/edvanta" },
];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/blog");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-card border-b border-border/50" : ""}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading font-bold text-lg gradient-text">
          DGA
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!isBlog && homeLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            className={`text-sm font-heading transition-colors ${isBlog ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Blog
          </Link>
          {user && (
            <>
              <Link
                to="/blog/admin"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
              >
                Admin
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card border-t border-border/50 px-6 py-4 space-y-3">
          {!isBlog && homeLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className={`block text-sm font-heading transition-colors ${isBlog ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Blog
          </Link>
          {user && (
            <>
              <Link
                to="/blog/admin"
                onClick={() => setOpen(false)}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
              >
                Admin
              </Link>
              <button
                onClick={() => { signOut(); setOpen(false); }}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-heading w-full text-left"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
