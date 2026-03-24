import { Link } from 'wouter';
import { CheckCircle, Shirt, Wind, Sparkles, Truck, Clock, Star } from 'lucide-react';

export default function Blanchisserie() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              Paris 12e & environs
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Blanchisserie<br />
              <span className="text-accent">Collecte & Livraison</span>
            </h1>
            <p className="text-white/90 text-xl mb-8">
              Lavage, séchage et repassage professionnel à domicile. Nous collectons vos vêtements et vous les livrons impeccables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="btn-accent inline-block">
                  Demander un devis gratuit
                </button>
              </Link>
              <a
                href="tel:0622332627"
                className="btn-premium-outline inline-block text-center border-2 border-white text-white hover:bg-white hover:text-primary px-6 py-3 rounded-lg font-medium transition-all"
              >
                06 22 33 26 27
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services principaux */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Nos Prestations Blanchisserie</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Des équipements professionnels et des produits de qualité pour prendre soin de vos vêtements et articles ménagers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Lavage professionnel',
                description: 'Lavage à la bonne température selon les étiquettes. Produits doux et efficaces, adaptés à chaque textile.',
                icon: Shirt,
              },
              {
                title: 'Séchage & finition',
                description: 'Séchage professionnel préservant la forme des vêtements. Finition soignée pour un résultat parfait.',
                icon: Wind,
              },
              {
                title: 'Repassage expert',
                description: 'Repassage professionnel de vos chemises, robes, pantalons et articles délicats. Rendu impeccable garanti.',
                icon: Sparkles,
              },
              {
                title: 'Pressing délicat',
                description: 'Traitement spécial pour soie, laine, cachemire et articles nécessitant des soins particuliers.',
                icon: Star,
              },
              {
                title: 'Collecte à domicile',
                description: 'Nous venons récupérer vos vêtements et articles ménagers directement chez vous, à l\'heure convenue.',
                icon: Truck,
              },
              {
                title: 'Livraison rapide',
                description: 'Retour de vos articles propres, repassés et emballés sous 48 à 72 heures selon vos disponibilités.',
                icon: Clock,
              },
            ].map((service, index) => (
              <div key={index} className="card-service">
                <div className="flex items-start gap-4 mb-4">
                  <div className="icon-geometric">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-16 text-center">Comment ça fonctionne ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Planification', desc: 'Appelez-nous ou remplissez le formulaire pour planifier une collecte.' },
              { step: '2', title: 'Collecte', desc: 'Nous venons récupérer vos articles à domicile à l\'heure convenue.' },
              { step: '3', title: 'Traitement', desc: 'Lavage, séchage et repassage dans nos installations professionnelles.' },
              { step: '4', title: 'Livraison', desc: 'Retour de vos articles propres et impeccables sous 48 à 72h.' },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-accent/30 z-0"></div>
                )}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-accent text-white text-2xl font-bold rounded-full mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles pris en charge */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">Articles pris en charge</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <CheckCircle size={22} className="text-accent" />
                  Vêtements
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {['Chemises & chemisiers', 'Pantalons & jupes', 'Robes & costumes', 'Pulls & vestes', 'Articles délicats (soie, cachemire)', 'Sous-vêtements & chaussettes'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <CheckCircle size={22} className="text-accent" />
                  Linge de maison
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {['Draps & housses de couette', 'Taies d\'oreiller', 'Serviettes de bain', 'Nappes & serviettes de table', 'Rideaux & voilages', 'Couvertures & plaids'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">Pourquoi choisir notre blanchisserie ?</h2>

            <div className="space-y-4">
              {[
                { title: 'Équipements professionnels', desc: 'Machines industrielles et produits de qualité professionnelle pour des résultats irréprochables.' },
                { title: 'Respect des textiles', desc: 'Traitement adapté à chaque tissu selon les instructions d\'entretien. Vos vêtements sont entre de bonnes mains.' },
                { title: 'Service à domicile', desc: 'Gain de temps précieux : collecte et livraison directement chez vous, sans déplacement.' },
                { title: 'Retour rapide', desc: 'Délai de traitement de 48 à 72 heures. Idéal pour les professionnels et les familles actives.' },
                { title: 'Tarification claire', desc: 'Devis personnalisé selon le volume et les prestations. Pas de mauvaises surprises.' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
                    <CheckCircle size={20} className="text-accent flex-shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground ml-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à confier votre linge ?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Demandez un devis gratuit et sans engagement. Collecte disponible à Paris 12e et dans les arrondissements voisins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-accent inline-block">
                Demander un devis gratuit
              </button>
            </Link>
            <a
              href="tel:0622332627"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-primary px-6 py-3 rounded-lg font-medium transition-all"
            >
              Appeler le 06 22 33 26 27
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
