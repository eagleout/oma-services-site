import { Link } from 'wouter';
import { CheckCircle, Zap, Award, Clock } from 'lucide-react';

export default function Professionnels() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/professionnels-office-CCXAyfqtZyxx4ZAiRrLaby.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nettoyage professionnel<br />
              <span className="text-accent">Pour vos locaux</span>
            </h1>
            <p className="text-white/90 text-xl mb-8">
              Bureaux, commerces, cabinets. Services de nettoyage fiables, discrets et de qualité. Prestations régulières ou ponctuelles selon vos besoins.
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
          <h2 className="text-4xl font-bold text-primary mb-16 text-center">Services Professionnels</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: 'Nettoyage de bureaux',
                description: 'Entretien régulier de vos espaces de travail. Bureaux, couloirs, salles de réunion.',
                icon: Award
              },
              {
                title: 'Nettoyage commercial',
                description: 'Magasins, boutiques, espaces de vente. Hygiène irréprochable pour votre image.',
                icon: Zap
              },
              {
                title: 'Prestations régulières',
                description: 'Contrats hebdomadaires, bihebdomadaires ou mensuels. Continuité garantie.',
                icon: Clock
              },
              {
                title: 'Prestations ponctuelles',
                description: 'Nettoyage approfondi, fin de chantier, événements. Flexibilité totale.',
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

      {/* Benefits */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">Pourquoi nous choisir ?</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Fiabilité opérationnelle
                </h3>
                <p className="text-muted-foreground">
                  Équipes stables et formées. Continuité de service garantie. Respect des horaires et des engagements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Image de marque préservée
                </h3>
                <p className="text-muted-foreground">
                  Locaux impeccables. Environnement professionnel et hygiénique. Confiance de vos clients et collaborateurs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Discrétion des équipes
                </h3>
                <p className="text-muted-foreground">
                  Interventions discrètes et respectueuses. Personnel professionnel et courtois.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Flexibilité et adaptation
                </h3>
                <p className="text-muted-foreground">
                  Horaires adaptés à votre activité. Prestations sur mesure. Ajustements réguliers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CheckCircle size={24} className="text-accent" />
                  Qualité constante
                </h3>
                <p className="text-muted-foreground">
                  Standards élevés d'exécution. Suivi régulier. Contrôle qualité rigoureux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Spaces */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Espaces que nous nettoyons</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Bureaux & Espaces de travail',
                items: ['Bureaux individuels', 'Espaces collaboratifs', 'Salles de réunion', 'Cuisines d\'entreprise']
              },
              {
                title: 'Commerces & Retail',
                items: ['Magasins', 'Boutiques', 'Galeries commerciales', 'Espaces de vente']
              },
              {
                title: 'Secteur médical & Services',
                items: ['Cabinets médicaux', 'Cliniques', 'Pharmacies', 'Cabinets dentaires']
              }
            ].map((category, index) => (
              <div key={index} className="bg-secondary p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <CheckCircle size={18} className="text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Notre processus</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent">
              <h3 className="text-xl font-bold text-primary mb-2">1. Audit initial</h3>
              <p className="text-muted-foreground">
                Visite de vos locaux. Évaluation de vos besoins. Discussion des attentes et contraintes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent">
              <h3 className="text-xl font-bold text-primary mb-2">2. Proposition sur mesure</h3>
              <p className="text-muted-foreground">
                Devis détaillé. Planning adapté. Équipe dédiée identifiée.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent">
              <h3 className="text-xl font-bold text-primary mb-2">3. Mise en place</h3>
              <p className="text-muted-foreground">
                Démarrage du service. Formation des équipes à vos spécificités. Premiers contrôles qualité.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent">
              <h3 className="text-xl font-bold text-primary mb-2">4. Suivi & Optimisation</h3>
              <p className="text-muted-foreground">
                Suivi régulier. Ajustements si nécessaire. Relation de partenariat long terme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Parlons de votre projet</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Demandez un devis gratuit et sans engagement. Nos équipes étudieront votre situation et vous proposeront la meilleure solution.
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
