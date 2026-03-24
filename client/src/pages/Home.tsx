import { Link } from 'wouter';
import { CheckCircle, Users, Zap, Award, Heart, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/hero-nettoyage-KYpkg2S33GsNHH5C7YeAJL.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Votre maison, votre bureau.<br />
              <span className="text-accent">Impeccablement entretenus.</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mb-8 leading-relaxed">
              Services de nettoyage premium pour particuliers et professionnels. Qualité garantie, équipes fiables, intervention discrète.
            </p>

            {/* Trust Banner */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <div className="flex items-center gap-3">
                <Zap size={20} className="text-accent" />
                <span className="text-white font-semibold">Réactivité garantie</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-accent" />
                <span className="text-white font-semibold">Devis rapide</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-accent" />
                <span className="text-white font-semibold">Personnel fiable</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-accent" />
                <span className="text-white font-semibold">Approche humaine</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/particuliers">
                <button className="btn-accent text-center py-4 px-8 text-lg font-semibold">
                  Découvrir l'offre Particuliers
                </button>
              </Link>
              <Link href="/professionnels">
                <button className="btn-premium-outline text-center py-4 px-8 text-lg font-semibold text-white border-white hover:bg-white hover:text-primary">
                  Découvrir l'offre Professionnels
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Nos Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deux pôles d'expertise pour répondre à tous vos besoins de nettoyage et d'entretien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Particuliers Card */}
            <div className="card-service">
              <div className="flex items-start gap-4 mb-4">
                <div className="icon-geometric">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Pour les Particuliers</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nettoyage à domicile, aide ménagère régulière, grand ménage ponctuel. Services adaptés aux seniors, personnes en situation de handicap et familles.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle size={18} className="text-accent" />
                  Nettoyage régulier ou ponctuel
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle size={18} className="text-accent" />
                  Accompagnement personnalisé
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle size={18} className="text-accent" />
                  Équipes discrètes et fiables
                </li>
              </ul>
              <Link href="/particuliers">
                <button className="btn-premium-outline">
                  En savoir plus
                </button>
              </Link>
            </div>

            {/* Professionnels Card */}
            <div className="card-service">
              <div className="flex items-start gap-4 mb-4">
                <div className="icon-geometric">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Pour les Professionnels</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nettoyage de bureaux, commerces, cabinets. Prestations régulières ou ponctuelles avec exigence de qualité, réactivité et discrétion.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle size={18} className="text-accent" />
                  Fiabilité et continuité
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle size={18} className="text-accent" />
                  Devis sur mesure
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle size={18} className="text-accent" />
                  Horaires flexibles
                </li>
              </ul>
              <Link href="/professionnels">
                <button className="btn-premium-outline">
                  En savoir plus
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Pourquoi nous choisir ?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos valeurs fondamentales : respect, bienveillance, ponctualité, discrétion et qualité constante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Confiance & Sécurité',
                description: 'Personnel sélectionné et fiable. Interventions respectueuses de votre intimité et de vos biens.'
              },
              {
                icon: Heart,
                title: 'Approche Humaine',
                description: 'Écoute attentive de vos besoins. Services adaptés à votre situation et votre rythme.'
              },
              {
                icon: Award,
                title: 'Qualité Garantie',
                description: 'Standards élevés d\'exécution. Suivi régulier et ajustements selon vos attentes.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-smooth">
                <div className="icon-geometric mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un processus simple et transparent pour accéder à nos services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '1', title: 'Contactez-nous', description: 'Appelez ou remplissez notre formulaire' },
              { number: '2', title: 'Devis gratuit', description: 'Évaluation rapide de vos besoins' },
              { number: '3', title: 'Planification', description: 'Mise en place du planning' },
              { number: '4', title: 'Intervention', description: 'Service professionnel et soigné' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Demandez votre devis gratuit dès maintenant. Nos équipes vous répondront dans les 24 heures.
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
