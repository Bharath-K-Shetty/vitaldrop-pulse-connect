
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

// Create interface props for pages that need authentication
interface AuthPageProps {
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  pulseCredits: number;
  onSendCredits: (amount: number) => void;
}

// Props for pages that don't need pulse credits
interface BasicAuthPageProps {
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

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
  
  // Standard auth props to pass to pages
  const authProps: AuthPageProps = {
    isAuthenticated,
    onOpenAuthModal: () => setShowAuthModal(true),
    onLogout: handleLogout,
    pulseCredits,
    onSendCredits: handleSendCredits
  };
  
  // Props for pages that don't need pulse credits
  const basicAuthProps: BasicAuthPageProps = {
    isAuthenticated,
    onOpenAuthModal: () => setShowAuthModal(true),
    onLogout: handleLogout
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
              element={<Index {...authProps} />} 
            />
            <Route 
              path="/dashboard" 
              element={<Dashboard />} 
            />
            <Route 
              path="/profile" 
              element={
                <Profile {...basicAuthProps} />
              } 
            />
            <Route 
              path="/communities" 
              element={
                <Communities {...basicAuthProps} />
              } 
            />
            <Route 
              path="/communities/:id" 
              element={
                <CommunityDetail {...basicAuthProps} />
              } 
            />
            <Route 
              path="/emergency" 
              element={
                <Emergency {...basicAuthProps} />
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
