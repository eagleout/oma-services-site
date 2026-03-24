import { useState } from 'react';
import { ChevronLeft, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TrackedQuote {
  id: number;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  timestamp: string;
  status: 'received' | 'processing' | 'contacted' | 'completed';
  message?: string;
}

interface QuoteTrackerProps {
  onBack: () => void;
}

const STATUS_INFO = {
  received: {
    label: 'Demande reçue',
    description: 'Votre demande a bien été enregistrée',
    icon: CheckCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  processing: {
    label: 'En cours de traitement',
    description: 'Notre équipe analyse votre demande',
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  contacted: {
    label: 'Nous vous avons contacté',
    description: 'Notre équipe a pris contact avec vous',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  completed: {
    label: 'Devis envoyé',
    description: 'Votre devis personnalisé a été envoyé',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
};

export default function QuoteTracker({ onBack }: QuoteTrackerProps) {
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [foundQuote, setFoundQuote] = useState<TrackedQuote | null>(null);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    // Get quotes from localStorage
    const quotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');

    let quote = null;
    if (activeTab === 'email' && searchEmail) {
      quote = quotes.find((q: any) => q.email.toLowerCase() === searchEmail.toLowerCase());
    } else if (activeTab === 'phone' && searchPhone) {
      quote = quotes.find((q: any) => q.phone.replace(/\s/g, '') === searchPhone.replace(/\s/g, ''));
    }

    if (quote) {
      // Simulate different statuses based on time elapsed
      const submittedTime = new Date(quote.timestamp);
      const now = new Date();
      const hoursElapsed = (now.getTime() - submittedTime.getTime()) / (1000 * 60 * 60);

      let status: 'received' | 'processing' | 'contacted' | 'completed' = 'received';
      if (hoursElapsed > 24) {
        status = 'completed';
      } else if (hoursElapsed > 12) {
        status = 'contacted';
      } else if (hoursElapsed > 2) {
        status = 'processing';
      }

      setFoundQuote({
        ...quote,
        status,
      });
    } else {
      setFoundQuote(null);
    }
  };

  const getStatusStep = (status: string, step: 'received' | 'processing' | 'contacted' | 'completed') => {
    const steps = ['received', 'processing', 'contacted', 'completed'];
    const currentIndex = steps.indexOf(status as any);
    const stepIndex = steps.indexOf(step);
    return currentIndex >= stepIndex;
  };

  if (foundQuote) {
    const statusInfo = STATUS_INFO[foundQuote.status];
    const StatusIcon = statusInfo.icon;

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <button
            onClick={() => {
              setFoundQuote(null);
              setSearchEmail('');
              setSearchPhone('');
              setSearched(false);
            }}
            className="p-1 hover:bg-secondary rounded transition-colors"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="font-bold text-foreground">Suivi de votre demande</h3>
        </div>

        {/* Quote Details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Status Card */}
          <div className={`p-4 rounded-lg ${statusInfo.bgColor}`}>
            <div className="flex items-start gap-3">
              <StatusIcon size={24} className={statusInfo.color} />
              <div>
                <h4 className="font-bold text-foreground">{statusInfo.label}</h4>
                <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-sm">Progression</h4>
            <div className="space-y-2">
              {Object.entries(STATUS_INFO).map(([key, info]) => {
                const isCompleted = getStatusStep(foundQuote.status, key as any);
                const isCurrent = foundQuote.status === key;

                return (
                  <div key={key} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted
                          ? 'bg-accent text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? '✓' : '○'}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isCurrent ? 'text-accent' : 'text-muted-foreground'}`}>
                        {info.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote Info */}
          <div className="bg-secondary p-4 rounded-lg space-y-2">
            <h4 className="font-bold text-foreground text-sm">Informations</h4>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Nom :</span> {foundQuote.name}</p>
              <p><span className="font-medium">Email :</span> {foundQuote.email}</p>
              <p><span className="font-medium">Téléphone :</span> {foundQuote.phone}</p>
              <p><span className="font-medium">Service :</span> {foundQuote.serviceType}</p>
              <p><span className="font-medium">Soumis le :</span> {new Date(foundQuote.timestamp).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-900">
              💡 Si vous ne recevez pas de contact dans les 24 heures, appelez-nous au <strong>06 22 33 26 27</strong>
            </p>
          </div>
        </div>
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
        <h3 className="font-bold text-foreground">Suivi de demande</h3>
      </div>

      {/* Search Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <p className="text-sm text-muted-foreground">
          Entrez votre email ou téléphone pour suivre votre demande de devis en temps réel.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('email')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'email'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Par Email
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'phone'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Par Téléphone
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-3">
          {activeTab === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Votre email
              </label>
              <input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="jean@example.com"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Votre téléphone
              </label>
              <input
                type="tel"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="06 12 34 56 78"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium text-sm flex items-center justify-center gap-2"
          >
            <Search size={16} />
            Rechercher ma demande
          </button>
        </form>

        {/* No Results */}
        {searched && !foundQuote && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-900 text-sm">Aucune demande trouvée</h4>
                <p className="text-xs text-yellow-800 mt-1">
                  Vérifiez que vous avez entré le bon email ou téléphone. Si vous avez soumis une demande récemment, elle apparaîtra ici.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-2">
          <h4 className="font-bold text-blue-900 text-sm">États possibles :</h4>
          <ul className="text-xs text-blue-900 space-y-1">
            <li>✓ <strong>Reçue</strong> : Votre demande est enregistrée</li>
            <li>⏳ <strong>En traitement</strong> : Notre équipe l'analyse</li>
            <li>✓ <strong>Contactée</strong> : Nous vous avons appelé</li>
            <li>✓ <strong>Devis envoyé</strong> : Votre proposition est prête</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
