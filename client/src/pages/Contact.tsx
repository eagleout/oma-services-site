import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'particulier',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: 'particulier',
      message: ''
    });
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Nous contacter</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Une question ? Besoin d'un devis ? Nous sommes là pour vous aider.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="icon-geometric mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Téléphone</h3>
              <a href="tel:+33123456789" className="text-accent font-semibold">
                +33 1 23 45 67 89
              </a>
              <p className="text-muted-foreground text-sm mt-2">Lun-Ven: 9h-18h</p>
            </div>

            <div className="text-center">
              <div className="icon-geometric mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Email</h3>
              <a href="mailto:contact@nettoyagepremium.fr" className="text-accent font-semibold">
                contact@nettoyagepremium.fr
              </a>
              <p className="text-muted-foreground text-sm mt-2">Réponse sous 24h</p>
            </div>

            <div className="text-center">
              <div className="icon-geometric mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Zone d'intervention</h3>
              <p className="text-accent font-semibold">Paris et région Île-de-France</p>
              <p className="text-muted-foreground text-sm mt-2">Interventions régionales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">Demander un devis</h2>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Type de service *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="particulier">Particulier</option>
                    <option value="senior">Aide aux seniors</option>
                    <option value="handicap">Services adaptés handicap</option>
                    <option value="professionnel">Professionnel</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-primary mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Décrivez vos besoins..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-accent w-full"
              >
                Envoyer ma demande
              </button>

              <p className="text-center text-muted-foreground text-sm mt-4">
                Nous vous répondrons dans les 24 heures.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Clock size={28} className="text-accent" />
              Horaires d'ouverture
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Lundi - Vendredi:</span>
                <span className="text-muted-foreground">9h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Samedi:</span>
                <span className="text-muted-foreground">10h00 - 14h00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Dimanche:</span>
                <span className="text-muted-foreground">Fermé</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
