
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MapPin, Search, User, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const Communities = () => {
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
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    toast({
      title: "Post Shared",
      description: "Your message has been shared with the community"
    });
    
    setNewPost("");
  };
  
  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
          
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              className="pl-10" 
              placeholder="Search for communities by name, location or blood type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCommunities.map((community) => (
              <Card key={community.id} className="overflow-hidden">
                <CardHeader className="pb-4 bg-gray-50 border-b">
                  <CardTitle className="flex justify-between items-start">
                    <span>{community.name}</span>
                    <div className="bg-red-50 px-2 py-1 rounded text-xs font-medium text-primary">
                      {community.bloodType}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{community.members} members</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{community.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Active requests:</span>
                      <span className="font-medium">{community.activeRequests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last activity:</span>
                      <span>{community.lastActivity}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <Button 
                    className="w-full"
                    variant={community.isJoined ? "outline" : "default"}
                    onClick={() => handleJoinCommunity(community.id)}
                  >
                    {community.isJoined ? "Leave Community" : "Join Community"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Community Feed for joined community */}
          {communities.some(c => c.isJoined) && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Downtown O+ Donors</h2>
                <p className="text-gray-500 text-sm mt-1">Community Feed</p>
              </div>
              
              <div className="p-6 border-b">
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <Input 
                    placeholder="Share a message or request with the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">
                      Post Message
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="divide-y">
                {communityPosts.map((post) => (
                  <div key={post.id} className="p-6">
                    <div className="flex items-start">
                      <div className="mr-3">
                        <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{post.author}</h3>
                          {post.authorBloodType && (
                            <div className="ml-2 flex items-center text-xs font-medium text-primary">
                              <Heart className="h-3 w-3 mr-1" />
                              {post.authorBloodType}
                            </div>
                          )}
                          <span className="ml-auto text-xs text-gray-500">{post.time}</span>
                        </div>
                        <p className={`mt-2 ${post.isEmergency ? 'text-primary font-medium' : ''}`}>
                          {post.isEmergency && (
                            <span className="inline-block bg-red-100 text-primary text-xs font-medium px-2 py-1 rounded mr-2">
                              URGENT
                            </span>
                          )}
                          {post.content}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">
                            Reply
                          </Button>
                          {post.isEmergency && (
                            <Button size="sm">
                              Offer Help
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Communities;
