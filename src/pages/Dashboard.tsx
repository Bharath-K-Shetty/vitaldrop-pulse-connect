
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Send, Users, Bell, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PulseCreditsCard from "@/components/PulseCreditsCard";
import UpcomingDonation from "@/components/UpcomingDonation";
import DonationHistory from "@/components/DonationHistory";
import SendCreditsModal from "@/components/SendCreditsModal";

const Dashboard = () => {
  const { toast } = useToast();
  const [pulseCredits, setPulseCredits] = useState(12);
  const [isEligible, setIsEligible] = useState(true);
  const [showSendCredits, setShowSendCredits] = useState(false);
  
  // Simulated emergency alert
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast({
        title: "Emergency Blood Request Nearby",
        description: "O+ blood needed at City Hospital (2.3 km away)",
        variant: "destructive",
      });
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [toast]);
  
  const handleDonateBlood = () => {
    if (isEligible) {
      setPulseCredits(prev => prev + 5);
      setIsEligible(false);
      toast({
        title: "Thank you for donating!",
        description: "You've earned 5 Pulse Credits. You'll be eligible to donate again in 56 days.",
      });
      
      // Simulate donation record being added to history
    } else {
      toast({
        title: "Not Eligible",
        description: "You're not eligible to donate blood at this time.",
      });
    }
  };
  
  const handleSendCredits = (amount: number) => {
    setPulseCredits(prev => prev - amount);
    toast({
      title: "Credits Sent",
      description: `You've sent ${amount} Pulse Credit${amount > 1 ? 's' : ''} successfully.`
    });
    setShowSendCredits(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>
          
          {/* Top cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <PulseCreditsCard 
              credits={pulseCredits} 
              onSendCredits={() => setShowSendCredits(true)}
            />
            
            <UpcomingDonation isEligible={isEligible} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Emergency Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">O+ needed urgently</p>
                        <p className="text-sm text-gray-500">City Hospital (2.3 km away)</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Respond
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 border-2"
                onClick={handleDonateBlood}
              >
                <Heart className="h-6 w-6 mb-2 text-primary" />
                <span>Donate Blood</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 border-2"
                onClick={() => setShowSendCredits(true)}
              >
                <Send className="h-6 w-6 mb-2" />
                <span>Send Credits</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 border-2"
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "This feature will be available soon"
                })}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>Join Community</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 border-2"
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "This feature will be available soon"
                })}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Schedule Donation</span>
              </Button>
            </div>
          </div>
          
          {/* Recent donation history */}
          <DonationHistory />
        </div>
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

export default Dashboard;
