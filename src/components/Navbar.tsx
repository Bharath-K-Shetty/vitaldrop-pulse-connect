
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Bell, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SendCreditsModal from "./SendCreditsModal";

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
  const [notifications, setNotifications] = useState(2);
  const [showSendCredits, setShowSendCredits] = useState(false);
  const { toast } = useToast();
  
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
  
  return (
    <nav className="border-b sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md bg-opacity-80">
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
                  className="hidden md:flex items-center gap-1 bg-red-50 border-red-100 text-primary hover:bg-red-100"
                  onClick={() => setShowSendCredits(true)}
                >
                  <Heart className="h-4 w-4" />
                  <span>{pulseCredits} Credits</span>
                </Button>
                <Button variant="outline" size="icon" className="hidden md:flex relative" onClick={clearNotifications}>
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
            
            {!isAuthenticated ? (
              <Button 
                className="bg-primary text-white hover:bg-red-700 transition-colors"
                onClick={onOpenAuthModal}
              >
                Sign In
              </Button>
            ) : (
              <Button 
                className="md:hidden bg-primary text-white hover:bg-red-700 transition-colors"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
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
