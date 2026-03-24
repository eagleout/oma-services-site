import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 transition-smooth">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">OS</span>
            </div>
            <span className="hidden sm:inline font-bold text-primary text-lg">
              OMA SERVICES
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/particuliers">
            <a className="text-foreground hover:text-primary transition-smooth font-medium">
              Particuliers
            </a>
          </Link>
          <Link href="/professionnels">
            <a className="text-foreground hover:text-primary transition-smooth font-medium">
              Professionnels
            </a>
          </Link>
          <Link href="/blanchisserie">
            <a className="text-foreground hover:text-primary transition-smooth font-medium">
              Blanchisserie
            </a>
          </Link>
          <Link href="/a-propos">
            <a className="text-foreground hover:text-primary transition-smooth font-medium">
              À propos
            </a>
          </Link>
          <Link href="/avis-clients">
            <a className="text-foreground hover:text-primary transition-smooth font-medium">
              Avis clients
            </a>
          </Link>
          <Link href="/faq">
            <a className="text-foreground hover:text-primary transition-smooth font-medium">
              FAQ
            </a>
          </Link>
          <Link href="/contact">
            <a className="btn-accent text-sm">
              Demander un devis
            </a>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-smooth"
        >
          {isMenuOpen ? (
            <X size={24} className="text-primary" />
          ) : (
            <Menu size={24} className="text-primary" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/particuliers">
              <a className="text-foreground hover:text-primary transition-smooth font-medium py-2">
                Particuliers
              </a>
            </Link>
            <Link href="/professionnels">
              <a className="text-foreground hover:text-primary transition-smooth font-medium py-2">
                Professionnels
              </a>
            </Link>
            <Link href="/blanchisserie">
              <a className="text-foreground hover:text-primary transition-smooth font-medium py-2">
                Blanchisserie
              </a>
            </Link>
            <Link href="/a-propos">
              <a className="text-foreground hover:text-primary transition-smooth font-medium py-2">
                À propos
              </a>
            </Link>
            <Link href="/avis-clients">
              <a className="text-foreground hover:text-primary transition-smooth font-medium py-2">
                Avis clients
              </a>
            </Link>
            <Link href="/faq">
              <a className="text-foreground hover:text-primary transition-smooth font-medium py-2">
                FAQ
              </a>
            </Link>
            <Link href="/contact">
              <a className="btn-accent w-full text-center">
                Demander un devis
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
