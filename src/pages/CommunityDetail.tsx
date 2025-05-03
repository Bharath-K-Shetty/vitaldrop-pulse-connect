
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Calendar, ArrowUp } from "lucide-react";

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
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
  
  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowBackToTop(e.currentTarget.scrollTop > 300);
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50" onScroll={handleScroll}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link to="/communities">
                <Button variant="outline" size="sm">Back to Communities</Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{community.name}</h1>
            </div>
            <Button variant={community.isJoined ? "outline" : "default"}>
              {community.isJoined ? "Leave Community" : "Join Community"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChatInterface communityName={community.name} />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Community Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{community.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{community.members} members</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{community.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Last activity: {community.lastActivity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Active Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {community.activeRequests > 0 ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                        <p className="font-medium text-primary">Emergency O+ needed</p>
                        <p className="text-sm text-gray-700">Central Hospital, 2 units</p>
                        <div className="mt-2">
                          <Button size="sm" className="w-full">Respond</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                        <p className="font-medium">Regular donation drive</p>
                        <p className="text-sm text-gray-700">Community Center, May 10</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">Maybe</Button>
                          <Button size="sm" className="flex-1">I'll be there</Button>
                        </div>
                      </div>
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
          className="fixed bottom-6 right-6 rounded-full shadow-lg"
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
