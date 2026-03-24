import { Link } from 'wouter';
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NP</span>
              </div>
              <span className="font-bold text-lg">OMA SERVICES</span>
            </div>
            <p className="text-white/80 text-sm">
              Services de nettoyage haut de gamme pour particuliers et professionnels.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/particuliers">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    Nettoyage à domicile
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/seniors">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    Aide aux seniors
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/handicap">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    Services adaptés handicap
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/professionnels">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    Nettoyage professionnel
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/a-propos">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    À propos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/avis-clients">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    Avis clients
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    FAQ
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-white/80 hover:text-white transition-smooth">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:0622332627" className="text-white/80 hover:text-white transition-smooth">
                  06 22 33 26 27
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:contact@oma-services.com" className="text-white/80 hover:text-white transition-smooth">
                  contact@oma-services.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-1" />
                <span className="text-white/80">
                  Paris, France<br />
                  Intervention régionale
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © 2024 Nettoyage Premium. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/60 hover:text-white transition-smooth">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
