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
  WalletProvider,
  useWallet
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

import { supabase } from "./lib/supabase";

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

const AppContent = () => {
  const { publicKey, connected } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pulseCredits, setPulseCredits] = useState(12);

  const initializeUser = async () => {
    if (!publicKey) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("wallet_address", publicKey.toBase58());

    if (!data || data.length === 0) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          wallet_address: publicKey.toBase58(),
          name: "",
          blood_group: "",
          pulse_credits: 12,
          hasDonated: false,
          hasRequested: false
        }
      ]);
      if (insertError) console.error("Insert error:", insertError);
      else console.log("User successfully created!");
    } else {
      console.log("User already exists:", data[0]);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      const key = `vitaldrop-auth-${publicKey.toBase58()}`;
      const saved = localStorage.getItem(key);

      if (saved) {
        setIsAuthenticated(true);
        initializeUser(); // now in scope
      } else {
        setShowAuthModal(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [connected, publicKey]);

  const handleAuthSuccess = () => {
    if (publicKey) {
      const key = `vitaldrop-auth-${publicKey.toBase58()}`;
      localStorage.setItem(key, "true");
      setIsAuthenticated(true);
      setShowAuthModal(false);
      initializeUser(); // ✅ Now this works fine
    }
  };

  const handleLogout = () => {
    if (publicKey) {
      localStorage.removeItem(`vitaldrop-auth-${publicKey.toBase58()}`);
    }
    setIsAuthenticated(false);
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
    <>
      <Toaster />
      <Sonner />
      <TooltipProvider>
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
    </>
  );
};

const App = () => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <AppContent />
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
