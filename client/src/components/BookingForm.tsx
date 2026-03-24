import { useState } from 'react';
import { ChevronLeft, Calendar, Clock, CheckCircle } from 'lucide-react';

interface BookingFormProps {
  onBack: () => void;
  onSubmit: (data: BookingData) => void;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: string;
  notes?: string;
}

const SERVICE_TYPES = [
  { value: 'particuliers', label: 'Nettoyage à domicile' },
  { value: 'seniors', label: 'Aide aux seniors' },
  { value: 'handicap', label: 'Services handicap' },
  { value: 'professionnels', label: 'Nettoyage professionnel' },
  { value: 'blanchisserie', label: 'Blanchisserie (collecte & livraison)' },
];

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

export default function BookingForm({ onBack, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: 'particuliers',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get today's date and minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  // Maximum date (90 days from now)
  const maxDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

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

    if (!formData.date) {
      newErrors.date = 'Date requise';
    }

    if (!formData.time) {
      newErrors.time = 'Heure requise';
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
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    onSubmit(formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        serviceType: 'particuliers',
        notes: '',
      });
      setIsSubmitted(false);
      onBack();
    }, 3000);
  };

  if (isSubmitted) {
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <CheckCircle size={48} className="text-accent mb-4" />
        <h3 className="font-bold text-lg text-foreground mb-2">Rendez-vous confirmé ! ✓</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Votre rendez-vous est prévu pour le <strong>{formattedDate} à {formData.time}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Nous vous enverrons un email de confirmation et un rappel 24h avant.
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
        <h3 className="font-bold text-foreground">Prendre rendez-vous</h3>
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

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1">
            <Calendar size={14} />
            Date souhaitée *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            min={minDate}
            max={maxDate}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
              errors.date ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
          <p className="text-xs text-muted-foreground mt-1">Jusqu'à 90 jours à l'avance</p>
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1">
            <Clock size={14} />
            Heure souhaitée *
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
              errors.time ? 'border-destructive' : 'border-border'
            }`}
          >
            <option value="">Sélectionner une heure</option>
            {TIME_SLOTS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Notes (optionnel)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Informations supplémentaires..."
            rows={2}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium text-sm"
        >
          Confirmer le rendez-vous
        </button>

        <p className="text-xs text-muted-foreground text-center">
          Nous vous enverrons un email de confirmation
        </p>
      </form>
    </div>
  );
}
