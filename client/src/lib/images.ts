export const images = {
  hero: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/hero-nettoyage-KYpkg2S33GsNHH5C7YeAJL.webp',
    alt: 'Femme professionnelle nettoyant une étagère en bois dans un salon lumineux',
    width: 1536,
    height: 1024
  },
  particuliers: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/particuliers-home-YrnrqYmzKJweirJqnF7jTU.webp',
    alt: 'Équipe de nettoyage professionnelle travaillant dans un salon familial accueillant',
    width: 1536,
    height: 1024
  },
  seniors: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/seniors-care-ToF6omxCKAVbH9jdct9xsE.webp',
    alt: 'Aide ménagère bienveillante assistant une personne âgée dans son domicile',
    width: 1536,
    height: 1024
  },
  handicap: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/handicap-accessibility-JN73EwVqrUFR6U9oAfG3WM.webp',
    alt: 'Aide ménagère respectueuse accompagnant une personne en situation de handicap',
    width: 1536,
    height: 1024
  },
  professionnels: {
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663438383013/KCvXs6cFgcXvYDkGmRzZpR/professionnels-office-CCXAyfqtZyxx4ZAiRrLaby.webp',
    alt: 'Équipe de nettoyage professionnel dans un bureau moderne avec vue panoramique',
    width: 1536,
    height: 1024
  }
};

export function getImageSrcSet(imageKey: keyof typeof images): string {
  const image = images[imageKey];
  return `${image.url} 1536w`;
}
