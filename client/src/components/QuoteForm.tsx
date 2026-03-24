import { useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';

interface QuoteFormProps {
  onBack: () => void;
  onSubmit: (data: QuoteData) => void;
}

export interface QuoteData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

const SERVICE_TYPES = [
  { value: 'particuliers', label: 'Nettoyage à domicile' },
  { value: 'seniors', label: 'Aide aux seniors' },
  { value: 'handicap', label: 'Services handicap' },
  { value: 'professionnels', label: 'Nettoyage professionnel' },
  { value: 'blanchisserie', label: 'Blanchisserie (lavage & repassage)' },
];

export default function QuoteForm({ onBack, onSubmit }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteData>({
    name: '',
    email: '',
    phone: '',
    serviceType: 'particuliers',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nom requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Téléphone requis';
    } else if (!/^[0-9\s\-\+\.()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Téléphone invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Store in localStorage for persistence
    const existingQuotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
    const newQuote = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    existingQuotes.push(newQuote);
    localStorage.setItem('quoteRequests', JSON.stringify(existingQuotes));

    onSubmit(formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: 'particuliers',
        message: '',
      });
      setIsSubmitted(false);
      onBack();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <CheckCircle size={48} className="text-accent mb-4" />
        <h3 className="font-bold text-lg text-foreground mb-2">Devis reçu ! ✓</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Merci ! Nous vous recontacterons dans les 24 heures.
        </p>
        <p className="text-xs text-muted-foreground">
          Redirection en cours...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <button
          onClick={onBack}
          className="p-1 hover:bg-secondary rounded transition-colors"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-bold text-foreground">Demander un devis</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Votre nom *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jean Dupont"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
              errors.name ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jean@example.com"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
              errors.email ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Téléphone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="06 12 34 56 78"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
              errors.phone ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Type de service
          </label>
          <select
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          >
            {SERVICE_TYPES.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Message (optionnel)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Décrivez vos besoins..."
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium text-sm"
        >
          Envoyer ma demande
        </button>

        <p className="text-xs text-muted-foreground text-center">
          Nous vous recontacterons rapidement
        </p>
      </form>
    </div>
  );
}
