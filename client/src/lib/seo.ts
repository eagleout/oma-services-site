export const seoMetadata = {
  home: {
    title: 'Nettoyage Premium - Services à Domicile et Professionnels',
    description: 'Services de nettoyage haut de gamme pour particuliers et professionnels. Aide ménagère, seniors, handicap, bureaux. Devis gratuit.',
    keywords: 'nettoyage à domicile, aide ménagère, nettoyage seniors, nettoyage handicap, nettoyage bureaux'
  },
  particuliers: {
    title: 'Nettoyage à Domicile - Services d\'Aide Ménagère Premium',
    description: 'Nettoyage régulier ou ponctuel à domicile. Services d\'aide ménagère flexibles et rassurantes. Équipes fiables et discrètes.',
    keywords: 'nettoyage à domicile, aide ménagère, entretien maison, ménage régulier'
  },
  seniors: {
    title: 'Aide à Domicile pour Personnes Âgées - Services Rassurants',
    description: 'Services d\'aide ménagère spécialisés pour les personnes âgées. Approche bienveillante et respectueuse. Environnement propre et sain.',
    keywords: 'aide ménagère seniors, aide à domicile personnes âgées, nettoyage seniors, services seniors'
  },
  handicap: {
    title: 'Services Adaptés pour Personnes en Situation de Handicap',
    description: 'Aide ménagère flexible et adaptée aux besoins spécifiques. Respect de l\'autonomie et de la dignité. Services inclusifs.',
    keywords: 'aide handicap, services handicap, aide ménagère handicap, nettoyage adapté handicap'
  },
  professionnels: {
    title: 'Nettoyage Professionnel - Bureaux et Locaux Commerciaux',
    description: 'Nettoyage de bureaux, commerces, cabinets. Services fiables, discrets et de qualité. Prestations régulières ou ponctuelles.',
    keywords: 'nettoyage bureaux, nettoyage commercial, nettoyage professionnel, entretien locaux'
  },
  about: {
    title: 'À Propos - Nettoyage Premium',
    description: 'Découvrez notre mission, nos valeurs et notre engagement envers la qualité et la bienveillance.',
    keywords: 'à propos, mission, valeurs, équipe'
  },
  testimonials: {
    title: 'Avis Clients - Nettoyage Premium',
    description: 'Découvrez les avis et témoignages de nos clients satisfaits. 4.9/5 de note moyenne.',
    keywords: 'avis clients, témoignages, avis nettoyage'
  },
  contact: {
    title: 'Contact & Devis - Nettoyage Premium',
    description: 'Contactez-nous pour un devis gratuit. Formulaire de contact, téléphone, email. Réponse sous 24h.',
    keywords: 'contact, devis, formulaire contact'
  },
  faq: {
    title: 'FAQ - Questions Fréquentes - Nettoyage Premium',
    description: 'Trouvez les réponses à vos questions sur nos services de nettoyage.',
    keywords: 'FAQ, questions fréquentes, aide'
  }
};

export function setPageMeta(title: string, description: string) {
  document.title = title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
}
