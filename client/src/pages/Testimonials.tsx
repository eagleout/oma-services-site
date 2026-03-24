import { Link } from 'wouter';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Particulier',
      rating: 5,
      text: 'Service impeccable ! Les équipes sont discrètes, professionnelles et très attentives. Ma maison n\'a jamais été aussi propre. Je recommande vivement !'
    },
    {
      name: 'Jean-Pierre Martin',
      role: 'Directeur de bureau',
      rating: 5,
      text: 'Partenaire fiable depuis 2 ans. Continuité garantie, qualité constante, équipes respectueuses. Nos clients remarquent la propreté de nos locaux.'
    },
    {
      name: 'Sophie Leclerc',
      role: 'Personne âgée',
      rating: 5,
      text: 'Très rassurante ! Les intervenants sont bienveillants et patients. Je me sens en confiance. Cela m\'aide beaucoup au quotidien.'
    },
    {
      name: 'Directeur Commercial',
      role: 'Petite entreprise',
      rating: 5,
      text: 'Excellent rapport qualité-prix. Flexibilité remarquable. Ils s\'adaptent à nos besoins changeants. Très professionnel.'
    },
    {
      name: 'Claire Rousseau',
      role: 'Particulier',
      rating: 5,
      text: 'Équipes formées et attentives. Elles respectent mon domicile comme si c\'était le leur. Service régulier de très bonne qualité.'
    },
    {
      name: 'Cabinet Médical',
      role: 'Professionnel',
      rating: 5,
      text: 'Hygiène impeccable. Interventions discrètes en dehors des heures de consultation. Nos patients remarquent la propreté.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Avis de nos clients</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Découvrez ce que nos clients pensent de nos services.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-service">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h3 className="font-bold text-primary">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-accent mb-2">500+</div>
              <p className="text-lg text-muted-foreground">Clients satisfaits</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">4.9/5</div>
              <p className="text-lg text-muted-foreground">Note moyenne</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">10+</div>
              <p className="text-lg text-muted-foreground">Années d'expérience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez nos clients satisfaits</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez comment nos services peuvent transformer votre quotidien.
          </p>
          <Link href="/contact">
            <button className="btn-accent inline-block">
              Demander un devis
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
