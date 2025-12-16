import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { PageTransition } from "@/components/layout/PageTransition";
import { SplashScreen } from "@/components/animations/SplashScreen";
import Index from "./pages/Index";
import Animations from "./pages/Animations";
import Laboratories from "./pages/Laboratories";
import Auth from "./pages/Auth";
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
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash once per session
    return !sessionStorage.getItem("splashShown");
  });

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <Toaster />
            <Sonner />
            <AnimatedRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;