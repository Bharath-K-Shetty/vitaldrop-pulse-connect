import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Bell, User, LogOut, Wallet } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import SendCreditsModal from "./SendCreditsModal";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import gsap from "gsap";

interface NavbarProps {
  isAuthenticated?: boolean;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
  pulseCredits?: number;
  onSendCredits?: (amount: number) => void;
}

const Navbar = ({
  isAuthenticated = false,
  onOpenAuthModal,
  onLogout,
  pulseCredits = 0,
  onSendCredits
}: NavbarProps) => {
  const { setVisible } = useWalletModal();

  const [notifications, setNotifications] = useState(2);
  const [showSendCredits, setShowSendCredits] = useState(false);
  const { toast } = useToast();

  const navbarRef = useRef<HTMLDivElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisibled] = useState(true);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = currentScrollPos < prevScrollPos;
      setVisibled(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Animate navbar visibility
  useEffect(() => {
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        y: visible ? 0 : -100,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [visible]);

  const clearNotifications = () => {
    setNotifications(0);
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been marked as read"
    });
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });
    }
  };

  const handleSendCredits = (amount: number) => {
    if (onSendCredits) {
      onSendCredits(amount);
    }
  };

  const handleHoverEnter = (el: HTMLButtonElement | null) => {
    if (el) {
      gsap.to(el, { scale: 1.05, duration: 0.6, ease: "expo.in" });
    }
  };

  const handleHoverLeave = (el: HTMLButtonElement | null) => {
    if (el) {
      gsap.to(el, { scale: 1.05, duration: 0.6, ease: "expo.out" });
    }
  };

  return (
    <nav
      ref={navbarRef}
      className="border-b fixed top-0 z-50 w-full bg-white shadow-sm backdrop-blur-md bg-opacity-80 transition-transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-primary">VitalDrop</span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/communities" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                Communities
              </Link>
              <Link to="/emergency" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-red-500 hover:text-red-700">
                Emergency
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center gap-1 bg-red-50 border-red-100 text-primary hover:bg-red-100 credit-count"
                  onClick={() => setShowSendCredits(true)}
                  onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
                >
                  <Heart className="h-4 w-4" />
                  <span>{pulseCredits} Credits</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden md:flex relative"
                  onClick={clearNotifications}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>
                <Link to="/profile">
                  <Button variant="outline" size="icon" className="hidden md:flex">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="hidden md:flex" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}

            <Button
              onClick={() => setVisible(true)}
              onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
              onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
              className="group bg-primary text-white hover:bg-red-700"
            >
              <Wallet className="mr-2 hover:ml-[2px] hover:rotate-3 transition-all duration-300" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>

      {showSendCredits && (
        <SendCreditsModal
          isOpen={showSendCredits}
          onClose={() => setShowSendCredits(false)}
          creditBalance={pulseCredits || 0}
          onSendCredits={handleSendCredits}
        />
      )}
    </nav>
  );
};

export default Navbar;
