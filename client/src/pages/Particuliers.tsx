import { Link } from 'wouter';
import { CheckCircle, Heart, Clock, Users } from 'lucide-react';

export default function Particuliers() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/particuliers-home-YrnrqYmzKJweirJqnF7jTU.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nettoyage à domicile<br />
              <span className="text-accent">Fiable et rassurant</span>
            </h1>
            <p className="text-white/90 text-xl mb-8">
              Services d'aide ménagère adaptés à votre rythme et vos besoins. Équipes discrètes, professionnelles et bienveillantes.
            </p>
            <Link href="/contact">
              <button className="btn-accent inline-block">
                Demander un devis
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-16 text-center">Nos Services pour Particuliers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: 'Nettoyage régulier',
                description: 'Entretien hebdomadaire, bihebdomadaire ou mensuel de votre domicile. Nous nous adaptons à votre fréquence préférée.',
                icon: Clock
              },
              {
                title: 'Grand ménage ponctuel',
                description: 'Nettoyage en profondeur pour préparer votre maison ou appartement. Idéal avant une visite ou après un événement.',
                icon: Heart
              },
              {
                title: 'Aide ménagère flexible',
                description: 'Services à la carte selon vos besoins : cuisine, salle de bain, chambres, espaces communs.',
                icon: Users
              },
              {
                title: 'Accompagnement personnalisé',
                description: 'Écoute attentive de vos besoins spécifiques. Ajustements réguliers pour votre satisfaction.',
                icon: CheckCircle
              }
            ].map((service, index) => (
              <div key={index} className="card-service">
                <div className="flex items-start gap-4 mb-4">
                  <div className="icon-geometric">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">Pourquoi nous faire confiance ?</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Respect de votre intimité
                </h3>
                <p className="text-muted-foreground">
                  Nos intervenants sont formés au respect de votre domicile et de votre vie privée. Discrétion garantie.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Personnel fiable et sélectionné
                </h3>
                <p className="text-muted-foreground">
                  Équipes vérifiées, formées et assurées. Continuité de service avec les mêmes intervenants.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Qualité d'exécution
                </h3>
                <p className="text-muted-foreground">
                  Standards élevés de propreté et d'organisation. Suivi régulier de votre satisfaction.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Flexibilité et adaptation
                </h3>
                <p className="text-muted-foreground">
                  Services adaptés à votre situation, votre budget et vos besoins spécifiques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à simplifier votre quotidien ?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit et sans engagement. Nos équipes vous répondront rapidement.
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
