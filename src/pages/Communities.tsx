import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommunityCard from "@/components/CommunityCard";
import CommunityFeed from "@/components/CommunityFeed";
import CommunitySearch from "@/components/CommunitySearch";

// Mock data for communities
const initialCommunities = [
  {
    id: 1,
    name: "Downtown O+ Donors",
    members: 243,
    location: "Downtown",
    bloodType: "O+",
    isJoined: true,
    activeRequests: 3,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Westside Blood Heroes",
    members: 156,
    location: "West City",
    bloodType: "All Types",
    isJoined: false,
    activeRequests: 1,
    lastActivity: "Yesterday"
  },
  {
    id: 3,
    name: "University Hospital Network",
    members: 412,
    location: "University District",
    bloodType: "All Types",
    isJoined: false,
    activeRequests: 5,
    lastActivity: "Just now"
  },
  {
    id: 4,
    name: "Eastside AB- Group",
    members: 78,
    location: "East City",
    bloodType: "AB-",
    isJoined: false,
    activeRequests: 0,
    lastActivity: "3 days ago"
  },
  {
    id: 5,
    name: "North A+ Community",
    members: 189,
    location: "North City",
    bloodType: "A+",
    isJoined: false,
    activeRequests: 2,
    lastActivity: "1 day ago"
  }
];

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    author: "Sarah Johnson",
    authorBloodType: "O+",
    time: "2 hours ago",
    content: "Urgent need for O+ blood at Central Hospital. My brother needs 2 units for surgery tomorrow.",
    isEmergency: true,
  },
  {
    id: 2,
    author: "Michael Chen",
    authorBloodType: "AB+",
    time: "Yesterday",
    content: "Just donated today at the Downtown Blood Drive. The process was quick and they're giving extra Pulse Credits this week!",
    isEmergency: false,
  },
  {
    id: 3,
    author: "Coordinator",
    authorBloodType: "",
    time: "2 days ago",
    content: "Our community just hit 1000 donations since January! Thanks to everyone who's participated.",
    isEmergency: false,
  }
];

interface CommunitiesProps {
  isAuthenticated?: boolean;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
}

const Communities = ({ 
  isAuthenticated = false, 
  onOpenAuthModal, 
  onLogout 
}: CommunitiesProps) => {
  const { toast } = useToast();
  const [communities, setCommunities] = useState(initialCommunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState("");
  
  const handleJoinCommunity = (id: number) => {
    setCommunities(prev => 
      prev.map(community => 
        community.id === id 
          ? { ...community, isJoined: !community.isJoined } 
          : community
      )
    );
    
    const community = communities.find(c => c.id === id);
    
    toast({
      title: community?.isJoined ? "Left Community" : "Joined Community",
      description: community?.isJoined 
        ? `You have left ${community.name}`
        : `You have joined ${community.name}`
    });
  };
  
  const handlePostSubmit = (content: string) => {
    toast({
      title: "Post Shared",
      description: "Your message has been shared with the community"
    });
  };
  
  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={onOpenAuthModal}
        onLogout={onLogout}
      />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Blood Communities</h1>
            <Button 
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "Creating new communities will be available soon"
                });
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Create Community
            </Button>
          </div>
          
          <CommunitySearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCommunities.map((community) => (
              <CommunityCard 
                key={community.id} 
                community={community} 
                onJoin={handleJoinCommunity} 
              />
            ))}
          </div>
          
          {/* Community Feed for joined community */}
          {communities.some(c => c.isJoined) && (
            <CommunityFeed 
              communityName="Downtown O+ Donors"
              posts={communityPosts}
              onPostSubmit={handlePostSubmit}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Communities;
