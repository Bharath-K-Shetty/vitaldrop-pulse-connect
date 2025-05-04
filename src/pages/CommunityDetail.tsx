
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Calendar, ArrowUp, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toast } = useToast();
  
  // Mock community data - in a real app, this would be fetched based on the ID
  const community = {
    id: parseInt(id || "1"),
    name: "Downtown O+ Donors",
    members: 243,
    location: "Downtown",
    bloodType: "O+",
    isJoined: true,
    activeRequests: 3,
    lastActivity: "Just now",
    description: "A community of O+ blood donors in the downtown area. We organize regular donation drives and respond quickly to emergency requests."
  };
  
  // Mock emergency requests
  const [emergencyRequests, setEmergencyRequests] = useState([
    {
      id: 1,
      title: "Emergency O+ needed",
      location: "Central Hospital",
      units: 2,
      isResponded: false,
      urgency: "critical"
    },
    {
      id: 2,
      title: "Regular donation drive",
      location: "Community Center",
      date: "May 10",
      isResponded: false,
      urgency: "standard"
    }
  ]);
  
  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowBackToTop(e.currentTarget.scrollTop > 300);
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle emergency response
  const handleRespondToEmergency = (id: number) => {
    setEmergencyRequests(prev => 
      prev.map(req => req.id === id ? {...req, isResponded: true} : req)
    );
    
    toast({
      title: "Response Sent",
      description: "Thank you for responding to this emergency request. The team will contact you shortly."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-rose-50">
      <Navbar />
      <main className="flex-grow" onScroll={handleScroll}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link to="/communities">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Back to Communities
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
                {community.name}
              </h1>
            </div>
            <Button 
              variant={community.isJoined ? "outline" : "default"}
              className={!community.isJoined ? "bg-gradient-to-r from-primary to-rose-500 hover:opacity-90 transition-opacity" : ""}
            >
              {community.isJoined ? "Leave Community" : "Join Community"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChatInterface communityName={community.name} />
            </div>
            
            <div className="space-y-6">
              <Card className="border border-white/50 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-rose-500/10">
                  <CardTitle className="text-lg font-medium bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
                    Community Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <p className="text-gray-700">{community.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{community.members} members</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{community.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>Last activity: {community.lastActivity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-white/50 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-rose-500/10">
                  <CardTitle className="text-lg font-medium flex items-center bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
                    <Bell className="h-4 w-4 mr-2 text-primary" />
                    Emergency Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {emergencyRequests.length > 0 ? (
                    <div className="space-y-3">
                      {emergencyRequests.map(request => (
                        <div 
                          key={request.id}
                          className={`p-3 rounded-lg ${
                            request.urgency === 'critical' 
                              ? 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200' 
                              : 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200'
                          }`}
                        >
                          <p className={`font-medium ${request.urgency === 'critical' ? 'text-primary' : 'text-gray-700'}`}>
                            {request.urgency === 'critical' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-100 text-primary mr-2">
                                CRITICAL
                              </span>
                            )}
                            {request.title}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            {request.location}
                            {request.units && `, ${request.units} units`}
                            {request.date && `, ${request.date}`}
                          </p>
                          <div className="mt-2">
                            {request.isResponded ? (
                              <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-md text-center">
                                You've offered to help
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                className={`w-full ${
                                  request.urgency === 'critical'
                                    ? 'bg-gradient-to-r from-red-500 to-primary text-white hover:opacity-90 transition-opacity'
                                    : ''
                                }`}
                                onClick={() => handleRespondToEmergency(request.id)}
                              >
                                Respond
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No active requests at the moment</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {showBackToTop && (
        <Button 
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-gradient-to-r from-primary to-rose-500 hover:opacity-90 transition-opacity"
          size="icon"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
      
      <Footer />
    </div>
  );
};

export default CommunityDetail;
