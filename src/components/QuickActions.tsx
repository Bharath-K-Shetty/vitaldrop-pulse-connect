
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Send, Users, Bell, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface QuickActionsProps {
  className?: string;
}

const QuickActions = ({ className }: QuickActionsProps) => {
  const { toast } = useToast();
  
  const handleEmergencyAlert = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Nearby donors have been notified of your emergency request"
    });
  };
  
  return (
    <Card className={`overflow-hidden shadow-md ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link to="/dashboard">
            <Button variant="outline" className="w-full flex flex-col h-auto py-4 hover:border-primary hover:bg-red-50 transition-all">
              <Heart className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm">Donate Blood</span>
            </Button>
          </Link>
          <Link to="/emergency">
            <Button variant="outline" className="w-full flex flex-col h-auto py-4 hover:border-primary hover:bg-red-50 transition-all">
              <Bell className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm">Request Blood</span>
            </Button>
          </Link>
          <Link to="/communities">
            <Button variant="outline" className="w-full flex flex-col h-auto py-4 hover:border-primary hover:bg-red-50 transition-all">
              <Users className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm">Join Community</span>
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="w-full flex flex-col h-auto py-4 hover:border-primary hover:bg-red-50 transition-all"
            onClick={handleEmergencyAlert}
          >
            <Bell className="h-6 w-6 mb-2 text-red-600 animate-pulse" />
            <span className="text-sm">Emergency Alert</span>
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full flex flex-col h-auto py-4 hover:border-primary hover:bg-red-50 transition-all">
              <Send className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm">Send Credits</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full flex flex-col h-auto py-4 hover:border-primary hover:bg-red-50 transition-all">
              <Calendar className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm">My Schedule</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
