import { Link } from 'wouter';
import { Heart, Shield, Users, CheckCircle } from 'lucide-react';

export default function Handicap() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/handicap-accessibility-JN73EwVqrUFR6U9oAfG3WM.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Services adaptés<br />
              <span className="text-accent">Pour les personnes en situation de handicap</span>
            </h1>
            <p className="text-white/90 text-xl mb-8">
              Aide ménagère flexible et respectueuse, adaptée à votre situation. Nous valorisons votre autonomie et votre dignité.
            </p>
            <Link href="/contact">
              <button className="btn-accent inline-block">
                Demander un devis
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-8">Accompagnement respectueux et adapté</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nous comprenons que chaque situation est unique. Nos services d'aide ménagère sont conçus pour s'adapter à vos besoins spécifiques, en respectant votre autonomie et votre dignité.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Qu'il s'agisse de mobilité réduite, de déficience visuelle, de troubles cognitifs ou d'autres situations, nos équipes sont formées et patientes pour vous offrir un soutien adapté.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Adaptation aux besoins',
                description: 'Services personnalisés selon votre situation spécifique et vos capacités.',
                icon: Heart
              },
              {
                title: 'Respect de l\'autonomie',
                description: 'Nous soutenons sans infantiliser. Vous restez acteur de votre vie.',
                icon: Shield
              },
              {
                title: 'Équipes formées',
                description: 'Personnel sensibilisé et formé aux différentes situations de handicap.',
                icon: Users
              },
              {
                title: 'Environnement sain',
                description: 'Maintien d\'une hygiène optimale pour votre santé et votre bien-être.',
                icon: CheckCircle
              }
            ].map((item, index) => (
              <div key={index} className="card-service">
                <div className="flex items-start gap-4 mb-4">
                  <div className="icon-geometric">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Notre approche</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Évaluation personnalisée</h3>
                <p className="text-muted-foreground">
                  Nous prenons le temps de comprendre votre situation et vos besoins avant de proposer une solution.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Flexibilité maximale</h3>
                <p className="text-muted-foreground">
                  Horaires adaptés, fréquence flexible, ajustements réguliers selon vos besoins évolutifs.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Bienveillance constante</h3>
                <p className="text-muted-foreground">
                  Nos équipes interviennent avec respect, patience et bienveillance, en valorisant votre autonomie.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Continuité de service</h3>
                <p className="text-muted-foreground">
                  Mêmes intervenants pour créer une relation stable et rassurante au fil du temps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Examples */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Exemples de services adaptés</h2>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="border-l-4 border-accent pl-6 py-4">
              <h3 className="text-xl font-bold text-primary mb-2">Mobilité réduite</h3>
              <p className="text-muted-foreground">
                Nettoyage des espaces accessibles, adaptation du rythme et des tâches selon votre capacité.
              </p>
            </div>
            <div className="border-l-4 border-accent pl-6 py-4">
              <h3 className="text-xl font-bold text-primary mb-2">Déficience visuelle</h3>
              <p className="text-muted-foreground">
                Organisation claire des espaces, communication verbale, respect de vos repères.
              </p>
            </div>
            <div className="border-l-4 border-accent pl-6 py-4">
              <h3 className="text-xl font-bold text-primary mb-2">Troubles cognitifs</h3>
              <p className="text-muted-foreground">
                Patience, clarté, routine stable, communication simple et bienveillante.
              </p>
            </div>
            <div className="border-l-4 border-accent pl-6 py-4">
              <h3 className="text-xl font-bold text-primary mb-2">Autres situations</h3>
              <p className="text-muted-foreground">
                Nous nous adaptons à votre situation spécifique. Contactez-nous pour en discuter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Parlons de vos besoins</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un entretien gratuit. Nous écouterons votre situation et vous proposerons une solution adaptée.
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
