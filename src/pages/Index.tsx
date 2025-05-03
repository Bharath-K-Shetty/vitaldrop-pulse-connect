
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import DonationStats from "@/components/DonationStats";
import EmergencyRequest from "@/components/EmergencyRequest";
import CommunityGroups from "@/components/CommunityGroups";
import QuickActions from "@/components/QuickActions";
import PulseCreditsCard from "@/components/PulseCreditsCard";
import UpcomingDonation from "@/components/UpcomingDonation";
import SendCreditsModal from "@/components/SendCreditsModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface IndexProps {
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  pulseCredits: number;
  onSendCredits: (amount: number) => void;
}

const Index = ({ 
  isAuthenticated, 
  onOpenAuthModal, 
  onLogout,
  pulseCredits,
  onSendCredits
}: IndexProps) => {
  const { toast } = useToast();
  const [showSendCredits, setShowSendCredits] = useState(false);
  
  const handleSendCredits = (amount: number) => {
    onSendCredits(amount);
  };
  
  // Simulate receiving credits
  const simulateReceiveCredits = () => {
    // This would be handled by the parent component in a real app
    toast({
      title: "Credits Received",
      description: "You've received 2 Pulse Credits from Dr. Sarah"
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={onOpenAuthModal}
        onLogout={onLogout}
        pulseCredits={pulseCredits}
        onSendCredits={handleSendCredits}
      />
      <main className="flex-grow">
        <Hero 
          isAuthenticated={isAuthenticated}
          onOpenAuthModal={onOpenAuthModal}
          pulseCredits={pulseCredits}
        />
        
        {isAuthenticated && (
          <section className="py-10 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Your Dashboard</h2>
                <p className="text-gray-600 mt-1">Quick overview of your VitalDrop account</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PulseCreditsCard 
                  credits={pulseCredits} 
                  onSendCredits={() => setShowSendCredits(true)}
                />
                <UpcomingDonation isEligible={true} />
                
                <div className="md:col-span-3">
                  <QuickActions />
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <Button 
                    variant="outline" 
                    className="text-primary hover:bg-red-50"
                    onClick={() => setShowSendCredits(true)}
                  >
                    Send Pulse Credits
                  </Button>
                  
                  {/* This button is just for demo purposes */}
                  <Button 
                    variant="outline" 
                    onClick={simulateReceiveCredits}
                  >
                    Simulate Receiving Credits
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
        
        <DonationStats />
        <EmergencyRequest />
        <CommunityGroups />
      </main>
      <Footer />
      
      {showSendCredits && (
        <SendCreditsModal 
          isOpen={showSendCredits}
          onClose={() => setShowSendCredits(false)}
          creditBalance={pulseCredits}
          onSendCredits={handleSendCredits}
        />
      )}
    </div>
  );
};

export default Index;
