import { Link } from 'wouter';
import { Heart, Target, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">À propos de nous</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Depuis plusieurs années, nous accompagnons particuliers et professionnels avec des services de nettoyage haut de gamme, fiables et bienveillants.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Notre mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Offrir des services de nettoyage premium qui transforment les espaces en environnements propres, sains et accueillants.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nous croyons que la qualité de notre environnement impacte directement notre bien-être et notre productivité. C'est pourquoi nous nous engageons à fournir des services exceptionnels, avec respect et bienveillance.
              </p>
            </div>
            <div className="bg-secondary p-8 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Heart size={32} className="text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">Bienveillance</h3>
                    <p className="text-muted-foreground text-sm">Chaque intervention est menée avec respect et attention.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Target size={32} className="text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary mb-2">Excellence</h3>
                    <p className="text-muted-foreground text-sm">Standards élevés de qualité dans chaque détail.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Nos valeurs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Respect',
                description: 'Respect de votre domicile, de votre vie privée, de votre situation.'
              },
              {
                icon: Heart,
                title: 'Bienveillance',
                description: 'Approche humaine et attentive dans chaque interaction.'
              },
              {
                icon: Award,
                title: 'Qualité',
                description: 'Standards élevés d\'exécution et suivi régulier.'
              },
              {
                icon: Target,
                title: 'Fiabilité',
                description: 'Ponctualité, continuité et engagement envers nos clients.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="icon-geometric mx-auto mb-4">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Notre équipe</h2>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nos équipes sont composées de professionnels formés, vérifiés et assurés. Nous sélectionnons nos intervenants avec soin pour garantir votre confiance et votre satisfaction.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chaque membre de notre équipe s'engage à respecter nos valeurs et à fournir un service de qualité exceptionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à nous faire confiance ?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins. Nous serons heureux de vous aider.
          </p>
          <Link href="/contact">
            <button className="btn-accent inline-block">
              Nous contacter
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
