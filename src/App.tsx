import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Animations from "./pages/Animations";
import Laboratories from "./pages/Laboratories";
import Formulas from "./pages/Formulas";
import Library from "./pages/Library";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/animations" element={<Animations />} />
        <Route path="/laboratories" element={<Laboratories />} />
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/library" element={<Library />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
