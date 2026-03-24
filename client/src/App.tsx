import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Particuliers from "./pages/Particuliers";
import Seniors from "./pages/Seniors";
import Handicap from "./pages/Handicap";
import Professionnels from "./pages/Professionnels";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import AdminDashboard from "./pages/AdminDashboard";
import Blanchisserie from "./pages/Blanchisserie";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/particuliers"} component={Particuliers} />
      <Route path={"/seniors"} component={Seniors} />
      <Route path={"/handicap"} component={Handicap} />
      <Route path={"/professionnels"} component={Professionnels} />
      <Route path={"/blanchisserie"} component={Blanchisserie} />
      <Route path={"/a-propos"} component={About} />
      <Route path={"/avis-clients"} component={Testimonials} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Chatbot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
