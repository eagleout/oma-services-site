import { useState, useEffect } from 'react';
import { BarChart3, Calendar, FileText, LogOut, Trash2, Clock, AlertCircle, RefreshCw, Download, WashingMachine } from 'lucide-react';

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message?: string;
  timestamp: string;
  status?: 'received' | 'processing' | 'contacted' | 'completed';
}

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: string;
  notes?: string;
  timestamp: string;
}

const SERVICE_TYPES: Record<string, string> = {
  particuliers: 'Nettoyage à domicile',
  seniors: 'Aide aux seniors',
  handicap: 'Services handicap',
  professionnels: 'Nettoyage professionnel',
  blanchisserie: 'Blanchisserie',
};

const ADMIN_PASSWORD = 'OMA2024';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'bookings'>('quotes');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    const storedQuotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    const quotesWithStatus = storedQuotes.map((quote: Quote) => {
      if (quote.status) return quote;
      const submittedTime = new Date(quote.timestamp);
      const now = new Date();
      const hoursElapsed = (now.getTime() - submittedTime.getTime()) / (1000 * 60 * 60);
      let status: Quote['status'] = 'received';
      if (hoursElapsed > 24) status = 'completed';
      else if (hoursElapsed > 12) status = 'contacted';
      else if (hoursElapsed > 2) status = 'processing';
      return { ...quote, status };
    });

    setQuotes(quotesWithStatus);
    setBookings(storedBookings);
    setLastRefresh(new Date());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setQuotes([]);
    setBookings([]);
    setSelectedQuote(null);
    setSelectedBooking(null);
  };

  const deleteQuote = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      const updated = quotes.filter(q => q.id !== id);
      setQuotes(updated);
      localStorage.setItem('quoteRequests', JSON.stringify(updated));
      setSelectedQuote(null);
    }
  };

  const deleteBooking = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('bookings', JSON.stringify(updated));
      setSelectedBooking(null);
    }
  };

  const updateQuoteStatus = (id: number, newStatus: Quote['status']) => {
    const updated = quotes.map(q => q.id === id ? { ...q, status: newStatus } : q);
    setQuotes(updated);
    localStorage.setItem('quoteRequests', JSON.stringify(updated));
    // Fix: also update selectedQuote so the UI reflects the change immediately
    if (selectedQuote?.id === id) {
      setSelectedQuote(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const exportCSV = (type: 'quotes' | 'bookings') => {
    if (type === 'quotes') {
      const rows = [
        ['Nom', 'Email', 'Téléphone', 'Service', 'Statut', 'Message', 'Date'],
        ...quotes.map(q => [
          q.name, q.email, q.phone,
          SERVICE_TYPES[q.serviceType] || q.serviceType,
          getStatusLabel(q.status || 'received'),
          q.message || '',
          new Date(q.timestamp).toLocaleDateString('fr-FR'),
        ]),
      ];
      downloadCSV(rows, 'devis-oma-services.csv');
    } else {
      const rows = [
        ['Nom', 'Email', 'Téléphone', 'Service', 'Date RDV', 'Heure', 'Notes', 'Créé le'],
        ...bookings.map(b => [
          b.name, b.email, b.phone,
          SERVICE_TYPES[b.serviceType] || b.serviceType,
          new Date(b.date).toLocaleDateString('fr-FR'),
          b.time,
          b.notes || '',
          new Date(b.timestamp).toLocaleDateString('fr-FR'),
        ]),
      ];
      downloadCSV(rows, 'rdv-oma-services.csv');
    }
  };

  const downloadCSV = (rows: string[][], filename: string) => {
    const csv = rows.map(r => r.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const filteredBookings = bookings.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-200 text-green-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'received': return 'Reçue';
      case 'processing': return 'En traitement';
      case 'contacted': return 'Contactée';
      case 'completed': return 'Devis envoyé';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <BarChart3 size={32} className="text-accent" />
            <h1 className="text-2xl font-bold text-foreground">Admin OMA</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Se connecter
            </button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Accès réservé aux administrateurs OMA SERVICES
          </p>
        </div>
      </div>
    );
  }

  const pendingCount = quotes.filter(q => q.status === 'received' || q.status === 'processing').length;
  const blanchisserieCount = [...quotes, ...bookings].filter(item => item.serviceType === 'blanchisserie').length;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={28} />
            <h1 className="text-2xl font-bold">Tableau de Bord OMA</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/70">
              Mis à jour : {lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={loadData}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
              title="Rafraîchir"
            >
              <RefreshCw size={16} />
              Rafraîchir
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Demandes de devis</p>
                <p className="text-3xl font-bold text-foreground">{quotes.length}</p>
              </div>
              <FileText size={28} className="text-accent opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Rendez-vous</p>
                <p className="text-3xl font-bold text-foreground">{bookings.length}</p>
              </div>
              <Calendar size={28} className="text-accent opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">En attente</p>
                <p className="text-3xl font-bold text-accent">{pendingCount}</p>
              </div>
              <Clock size={28} className="text-accent opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Blanchisserie</p>
                <p className="text-3xl font-bold text-foreground">{blanchisserieCount}</p>
              </div>
              <WashingMachine size={28} className="text-accent opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'quotes' ? 'bg-accent text-white' : 'bg-white text-foreground hover:bg-secondary'
            }`}
          >
            <FileText size={16} />
            Devis ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'bookings' ? 'bg-accent text-white' : 'bg-white text-foreground hover:bg-secondary'
            }`}
          >
            <Calendar size={16} />
            Rendez-vous ({bookings.length})
          </button>
          <div className="ml-auto">
            <button
              onClick={() => exportCSV(activeTab)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-foreground hover:bg-secondary rounded-lg transition-colors text-sm font-medium shadow"
            >
              <Download size={16} />
              Exporter CSV
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-4 shadow mb-6 space-y-3">
          <input
            type="text"
            placeholder="Rechercher par nom, email ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {activeTab === 'quotes' && (
            <div className="flex flex-wrap gap-2">
              {(['all', 'received', 'processing', 'contacted', 'completed'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status ? 'bg-accent text-white' : 'bg-secondary text-foreground hover:bg-border'
                  }`}
                >
                  {status === 'all' ? 'Tous' : getStatusLabel(status)}
                  {status !== 'all' && (
                    <span className="ml-1 opacity-70">({quotes.filter(q => q.status === status).length})</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'quotes' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {filteredQuotes.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <AlertCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground">Aucune demande trouvée</p>
                </div>
              ) : (
                filteredQuotes.map(quote => (
                  <div
                    key={quote.id}
                    onClick={() => setSelectedQuote(quote)}
                    className={`bg-white rounded-lg p-4 shadow cursor-pointer transition-all hover:shadow-md ${
                      selectedQuote?.id === quote.id ? 'ring-2 ring-accent' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-foreground">{quote.name}</h3>
                        <p className="text-sm text-muted-foreground">{quote.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status || 'received')}`}>
                        {getStatusLabel(quote.status || 'received')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-muted-foreground">{SERVICE_TYPES[quote.serviceType] || quote.serviceType}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(quote.timestamp).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedQuote && (
              <div className="bg-white rounded-lg p-6 shadow h-fit sticky top-4">
                <h3 className="font-bold text-lg text-foreground mb-4">Détails de la demande</h3>
                <div className="space-y-4">
                  <DetailRow label="NOM" value={selectedQuote.name} />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">EMAIL</p>
                    <a href={`mailto:${selectedQuote.email}`} className="text-accent hover:underline text-sm">
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">TÉLÉPHONE</p>
                    <a href={`tel:${selectedQuote.phone}`} className="text-accent hover:underline text-sm">
                      {selectedQuote.phone}
                    </a>
                  </div>
                  <DetailRow label="SERVICE" value={SERVICE_TYPES[selectedQuote.serviceType] || selectedQuote.serviceType} />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">STATUT</p>
                    <select
                      value={selectedQuote.status || 'received'}
                      onChange={(e) => updateQuoteStatus(selectedQuote.id, e.target.value as Quote['status'])}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    >
                      <option value="received">Reçue</option>
                      <option value="processing">En traitement</option>
                      <option value="contacted">Contactée</option>
                      <option value="completed">Devis envoyé</option>
                    </select>
                  </div>
                  {selectedQuote.message && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">MESSAGE</p>
                      <p className="text-foreground text-sm bg-secondary p-3 rounded-lg">{selectedQuote.message}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">DATE DE SOUMISSION</p>
                    <p className="text-foreground text-sm">
                      {new Date(selectedQuote.timestamp).toLocaleDateString('fr-FR', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="flex-1 text-center px-3 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                    >
                      Contacter
                    </a>
                    <button
                      onClick={() => deleteQuote(selectedQuote.id)}
                      className="px-3 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <AlertCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground">Aucun rendez-vous trouvé</p>
                </div>
              ) : (
                filteredBookings.map(booking => (
                  <div
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className={`bg-white rounded-lg p-4 shadow cursor-pointer transition-all hover:shadow-md ${
                      selectedBooking?.id === booking.id ? 'ring-2 ring-accent' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-foreground">{booking.name}</h3>
                        <p className="text-sm text-muted-foreground">{booking.email}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Confirmé
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-muted-foreground">{SERVICE_TYPES[booking.serviceType] || booking.serviceType}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString('fr-FR')} à {booking.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedBooking && (
              <div className="bg-white rounded-lg p-6 shadow h-fit sticky top-4">
                <h3 className="font-bold text-lg text-foreground mb-4">Détails du rendez-vous</h3>
                <div className="space-y-4">
                  <DetailRow label="NOM" value={selectedBooking.name} />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">EMAIL</p>
                    <a href={`mailto:${selectedBooking.email}`} className="text-accent hover:underline text-sm">
                      {selectedBooking.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">TÉLÉPHONE</p>
                    <a href={`tel:${selectedBooking.phone}`} className="text-accent hover:underline text-sm">
                      {selectedBooking.phone}
                    </a>
                  </div>
                  <DetailRow label="SERVICE" value={SERVICE_TYPES[selectedBooking.serviceType] || selectedBooking.serviceType} />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">DATE ET HEURE</p>
                    <p className="text-foreground text-sm font-medium">
                      {new Date(selectedBooking.date).toLocaleDateString('fr-FR', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                      })} à {selectedBooking.time}
                    </p>
                  </div>
                  {selectedBooking.notes && (
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">NOTES</p>
                      <p className="text-foreground text-sm bg-secondary p-3 rounded-lg">{selectedBooking.notes}</p>
                    </div>
                  )}
                  <DetailRow
                    label="CRÉÉ LE"
                    value={new Date(selectedBooking.timestamp).toLocaleDateString('fr-FR', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  />
                  <div className="flex gap-2 pt-2">
                    <a
                      href={`mailto:${selectedBooking.email}`}
                      className="flex-1 text-center px-3 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                    >
                      Contacter
                    </a>
                    <button
                      onClick={() => deleteBooking(selectedBooking.id)}
                      className="px-3 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground font-medium mb-1">{label}</p>
      <p className="text-foreground text-sm">{value}</p>
    </div>
  );
}
