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

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
// --- Interface Definitions ---
interface AuthPageProps {
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  pulseCredits: number;
  onSendCredits: (amount: number) => void;
}
interface BasicAuthPageProps {
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

const queryClient = new QueryClient();

const App = () => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pulseCredits, setPulseCredits] = useState(12);

  useEffect(() => {
    const savedAuth = localStorage.getItem("vitaldrop-auth");
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("vitaldrop-auth", "true");
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vitaldrop-auth");
  };

  const handleSendCredits = (amount: number) => {
    setPulseCredits(prev => prev - amount);
  };

  const authProps: AuthPageProps = {
    isAuthenticated,
    onOpenAuthModal: () => setShowAuthModal(true),
    onLogout: handleLogout,
    pulseCredits,
    onSendCredits: handleSendCredits
  };

  const basicAuthProps: BasicAuthPageProps = {
    isAuthenticated,
    onOpenAuthModal: () => setShowAuthModal(true),
    onLogout: handleLogout
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index {...authProps} />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile {...basicAuthProps} />} />
                  <Route path="/communities" element={<Communities {...basicAuthProps} />} />
                  <Route path="/communities/:id" element={<CommunityDetail {...basicAuthProps} />} />
                  <Route path="/emergency" element={<Emergency {...basicAuthProps} />} />
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
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
