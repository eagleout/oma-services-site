import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Quels types de nettoyage proposez-vous ?',
      answer: 'Nous proposons un large éventail de services : nettoyage à domicile régulier, grand ménage ponctuel, aide ménagère pour seniors et personnes en situation de handicap, nettoyage de bureaux et locaux professionnels, prestations régulières ou ponctuelles.'
    },
    {
      question: 'Intervenez-vous chez les personnes âgées ?',
      answer: 'Oui, nous avons une expertise particulière dans l\'accompagnement des personnes âgées. Nos équipes sont formées, patientes et bienveillantes. Nous proposons des services adaptés à leurs besoins spécifiques.'
    },
    {
      question: 'Proposez-vous des prestations adaptées au handicap ?',
      answer: 'Oui, nous proposons des services spécialement adaptés aux personnes en situation de handicap. Nos équipes sont sensibilisées et formées à différentes situations. Nous respectons votre autonomie et votre dignité.'
    },
    {
      question: 'Faites-vous des interventions régulières ?',
      answer: 'Oui, nous proposons des contrats réguliers : hebdomadaires, bihebdomadaires ou mensuels. Nous assurons une continuité de service avec les mêmes intervenants pour créer une relation de confiance.'
    },
    {
      question: 'Intervenez-vous dans les bureaux et locaux professionnels ?',
      answer: 'Oui, nous avons une expertise B2B complète. Nous nettoyons bureaux, commerces, cabinets médicaux, pharmacies et autres espaces professionnels. Nos services sont fiables, discrets et de haute qualité.'
    },
    {
      question: 'Comment obtenir un devis ?',
      answer: 'Vous pouvez demander un devis en ligne via notre formulaire de contact, par téléphone au +33 1 23 45 67 89, ou par email à contact@nettoyagepremium.fr. Nos équipes vous répondront rapidement avec une proposition adaptée.'
    },
    {
      question: 'Dans quelles zones intervenez-vous ?',
      answer: 'Nous intervenons à Paris et en région Île-de-France. Pour les demandes spécifiques en dehors de cette zone, n\'hésitez pas à nous contacter pour discuter des possibilités.'
    },
    {
      question: 'Les prestations sont-elles personnalisées ?',
      answer: 'Absolument. Nous écoutons vos besoins spécifiques et proposons des services sur mesure. Chaque situation est unique et nous nous adaptons à votre contexte.'
    },
    {
      question: 'Peut-on mettre en place une fréquence hebdomadaire ?',
      answer: 'Oui, nous proposons des interventions hebdomadaires. Vous pouvez également choisir une fréquence bihebdomadaire, mensuelle ou ponctuelle selon vos besoins.'
    },
    {
      question: 'Vos intervenants sont-ils assurés ?',
      answer: 'Oui, tous nos intervenants sont formés, vérifiés et assurés. Nous garantissons votre tranquillité d\'esprit et la sécurité de votre domicile ou locaux.'
    },
    {
      question: 'Quel est le délai de réponse pour un devis ?',
      answer: 'Nous nous engageons à répondre à votre demande dans les 24 heures. Pour les demandes urgentes, contactez-nous directement par téléphone.'
    },
    {
      question: 'Pouvez-vous intervenir en dehors des heures de bureau ?',
      answer: 'Oui, nous proposons une flexibilité d\'horaires. Pour les professionnels, nous pouvons intervenir en fin d\'après-midi ou en soirée. Contactez-nous pour discuter de vos besoins spécifiques.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="section-spacious bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Questions fréquentes</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Trouvez les réponses à vos questions sur nos services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-spacious bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden transition-smooth"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-secondary transition-smooth"
                >
                  <h3 className="text-lg font-semibold text-primary text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`text-accent flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 bg-secondary border-t border-border animate-fade-in-up">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious section-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Vous avez d'autres questions ?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            N'hésitez pas à nous contacter. Nos équipes sont là pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33123456789" className="btn-primary">
              Nous appeler
            </a>
            <a href="mailto:contact@nettoyagepremium.fr" className="btn-premium-outline">
              Nous envoyer un email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
