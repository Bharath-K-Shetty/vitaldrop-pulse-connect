
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Communities from "./pages/Communities";
import CommunityDetail from "./pages/CommunityDetail";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/AuthModal";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [pulseCredits, setPulseCredits] = useState<number>(12);
  
  // Check for existing auth in localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem("vitaldrop-auth");
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("vitaldrop-auth", "true");
    setShowAuthModal(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vitaldrop-auth");
  };
  
  // Handle sending credits
  const handleSendCredits = (amount: number) => {
    setPulseCredits(prev => prev - amount);
  };
  
  // Handle receiving credits
  const handleReceiveCredits = (amount: number) => {
    setPulseCredits(prev => prev + amount);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  isAuthenticated={isAuthenticated}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onLogout={handleLogout}
                  pulseCredits={pulseCredits}
                  onSendCredits={handleSendCredits}
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  isAuthenticated={isAuthenticated}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onLogout={handleLogout}
                  pulseCredits={pulseCredits}
                  onSendCredits={handleSendCredits}
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Profile 
                  isAuthenticated={isAuthenticated}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onLogout={handleLogout}
                />
              } 
            />
            <Route 
              path="/communities" 
              element={
                <Communities 
                  isAuthenticated={isAuthenticated}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onLogout={handleLogout}
                />
              } 
            />
            <Route 
              path="/communities/:id" 
              element={
                <CommunityDetail />
              } 
            />
            <Route 
              path="/emergency" 
              element={
                <Emergency 
                  isAuthenticated={isAuthenticated}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onLogout={handleLogout}
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
