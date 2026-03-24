import { Link } from 'wouter';
import { Heart, Shield, Users, CheckCircle } from 'lucide-react';

export default function Seniors() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/seniors-care-ToF6omxCKAVbH9jdct9xsE.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Aide à domicile<br />
              <span className="text-accent">Pour les personnes âgées</span>
            </h1>
            <p className="text-white/90 text-xl mb-8">
              Services d'entretien ménager respectueux et bienveillants. Nous aidons à maintenir un environnement propre et sain pour plus de confort et de bien-être.
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
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-8">Accompagnement adapté aux seniors</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nous comprenons que le maintien d'une maison propre et bien entretenue devient plus difficile avec l'âge. Nos services d'aide ménagère sont spécialement conçus pour les personnes âgées, avec une approche respectueuse, patiente et attentive.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nos équipes interviennent régulièrement pour assurer un environnement sain et confortable, tout en respectant votre rythme et vos habitudes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Nettoyage régulier',
                description: 'Entretien hebdomadaire ou bihebdomadaire adapté à vos besoins et votre mobilité.',
                icon: Heart
              },
              {
                title: 'Environnement sain',
                description: 'Maintien d\'une hygiène optimale pour votre santé et votre bien-être quotidien.',
                icon: Shield
              },
              {
                title: 'Relation de confiance',
                description: 'Mêmes intervenants pour créer une relation stable et rassurante.',
                icon: Users
              },
              {
                title: 'Approche respectueuse',
                description: 'Intervention discrète et respectueuse de votre intimité et de vos habitudes.',
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

      {/* Benefits */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Les bénéfices de nos services</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Confort et bien-être</h3>
                <p className="text-muted-foreground">
                  Un logement propre et bien entretenu contribue à votre bien-être physique et mental.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Santé préservée</h3>
                <p className="text-muted-foreground">
                  Un environnement hygiénique réduit les risques d'infection et de maladie.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Autonomie préservée</h3>
                <p className="text-muted-foreground">
                  Nous vous aidons à rester chez vous plus longtemps en toute sérénité.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <CheckCircle size={32} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Sérénité pour la famille</h3>
                <p className="text-muted-foreground">
                  Vos proches savent que vous êtes bien entouré et que votre domicile est entretenu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Reassurance */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-8">Pour les familles</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Si vous êtes préoccupé par l'entretien du domicile de vos parents ou proches, nous pouvons vous aider. Nos services garantissent un environnement propre et sain, tout en respectant leur indépendance et leur dignité.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Contactez-nous pour discuter de la meilleure solution adaptée à votre situation.
            </p>
            <Link href="/contact">
              <button className="btn-accent inline-block">
                Nous contacter
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Envie de vivre plus confortablement ?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Demandez un devis gratuit. Nous étudierons votre situation et vous proposerons la meilleure solution.
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
