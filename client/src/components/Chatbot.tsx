import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import QuoteForm, { QuoteData } from './QuoteForm';
import QuoteTracker from './QuoteTracker';
import BookingForm, { BookingData } from './BookingForm';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SERVICE_TYPES = [
  { value: 'particuliers', label: 'Nettoyage à domicile' },
  { value: 'seniors', label: 'Aide aux seniors' },
  { value: 'handicap', label: 'Services handicap' },
  { value: 'professionnels', label: 'Nettoyage professionnel' },
  { value: 'blanchisserie', label: 'Blanchisserie' },
];

const QUICK_ACTIONS = [
  { label: 'Nos services', message: 'Quels sont vos services ?' },
  { label: 'Blanchisserie', message: 'Parlez-moi de votre service blanchisserie' },
  { label: 'Devis gratuit', message: 'Je souhaite un devis' },
  { label: 'Prendre RDV', message: 'Je veux prendre rendez-vous' },
  { label: 'Tarifs', message: 'Quels sont vos tarifs ?' },
  { label: 'Zone', message: 'Dans quelle zone intervenez-vous ?' },
];

function detectFormTrigger(text: string): 'booking' | 'quote' | 'tracker' | null {
  const lower = text.toLowerCase();
  if (lower.includes('rendez-vous') || lower.includes('réserver') || lower.includes('réservation') || lower.includes('booking') || lower.includes('créneau') || lower.includes('horaire')) {
    return 'booking';
  }
  if (lower.includes('suivi') || lower.includes('suivre') || lower.includes('statut') || lower.includes('état de ma demande')) {
    return 'tracker';
  }
  if (lower.includes('devis') || lower.includes('formulaire') || lower.includes('demande') || lower.includes('contacter')) {
    return 'quote';
  }
  return null;
}

async function callChatAPI(messages: Array<{ role: 'user' | 'assistant'; content: string }>): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    return data.response || "Je n'ai pas pu traiter votre message. Contactez-nous au 06 22 33 26 27.";
  } catch {
    return "Désolé, je rencontre une difficulté technique. Contactez-nous au 06 22 33 26 27 ou par email à contact@oma-services.com.";
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showQuoteTracker, setShowQuoteTracker] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Conversation history for Claude (without timestamps/ids)
  const conversationHistory = messages.map(m => ({
    role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
    content: m.text,
  }));

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        text: "Bonjour ! Je suis l'assistant OMA SERVICES. Comment puis-je vous aider aujourd'hui ?\n\nJe peux vous renseigner sur nos services de nettoyage, blanchisserie, aide aux seniors et bien plus encore.",
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Detect if we should trigger a form
    const formTrigger = detectFormTrigger(messageText);

    // Build history including this new message
    const history = [
      ...conversationHistory,
      { role: 'user' as const, content: messageText },
    ];

    // Call Claude API
    const botResponse = await callChatAPI(history);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);

    // Show form after response
    if (formTrigger === 'booking') {
      setTimeout(() => setShowBookingForm(true), 300);
    } else if (formTrigger === 'tracker') {
      setTimeout(() => setShowQuoteTracker(true), 300);
    } else if (formTrigger === 'quote') {
      setTimeout(() => setShowQuoteForm(true), 300);
    }

    if (!isOpen) setHasNewMessage(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleQuoteSubmit = (data: QuoteData) => {
    const serviceLabel = SERVICE_TYPES.find(s => s.value === data.serviceType)?.label || 'Service';
    const confirmMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: `Merci ${data.name} ! Votre demande de devis pour "${serviceLabel}" a bien été reçue. Nous vous contacterons au ${data.phone} ou par email à ${data.email} dans les 24 heures.`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  const handleBookingSubmit = (data: BookingData) => {
    const serviceLabel = SERVICE_TYPES.find(s => s.value === data.serviceType)?.label || 'Service';
    const dateObj = new Date(data.date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const confirmMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: `Parfait ${data.name} ! Votre rendez-vous est confirmé pour le ${formattedDate} à ${data.time} pour "${serviceLabel}". Nous vous enverrons un email de confirmation et un rappel 24h avant.`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  const resetChat = () => {
    setMessages([]);
    setShowQuoteForm(false);
    setShowBookingForm(false);
    setShowQuoteTracker(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Ouvrir l'assistant"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[400px] h-[560px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-border" style={{ maxWidth: 'calc(100vw - 3rem)' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">Assistant OMA</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                  <p className="text-xs text-white/80">Propulsé par IA • Disponible 24/7</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-white/60" />
              <button
                onClick={resetChat}
                className="text-xs text-white/70 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
                title="Nouvelle conversation"
              >
                Nouveau
              </button>
            </div>
          </div>

          {/* Content area */}
          {showQuoteTracker ? (
            <QuoteTracker onBack={() => setShowQuoteTracker(false)} />
          ) : showBookingForm ? (
            <BookingForm onBack={() => setShowBookingForm(false)} onSubmit={handleBookingSubmit} />
          ) : showQuoteForm ? (
            <QuoteForm onBack={() => setShowQuoteForm(false)} onSubmit={handleQuoteSubmit} />
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <Bot size={14} className="text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[280px] px-4 py-2.5 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
                        message.sender === 'user'
                          ? 'bg-accent text-white rounded-br-sm'
                          : 'bg-gray-100 text-foreground rounded-bl-sm'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot size={14} className="text-accent" />
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && !isLoading && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                  {QUICK_ACTIONS.map(action => (
                    <button
                      key={action.label}
                      onClick={() => handleSendMessage(action.message)}
                      className="text-xs px-3 py-1.5 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors border border-accent/20 font-medium"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleFormSubmit} className="border-t border-border p-3 flex gap-2 flex-shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-accent text-white p-2 rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-all flex-shrink-0"
                  aria-label="Envoyer"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
