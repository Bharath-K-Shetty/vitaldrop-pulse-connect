import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CommunityCard from "@/components/CommunityCard";
import CommunityFeed from "@/components/CommunityFeed";
import CommunitySearch from "@/components/CommunitySearch";
import CreateCommunityModal from "@/components/CreateCommunityModal";

gsap.registerPlugin(ScrollTrigger);

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
    lastActivity: "2 hours ago",
    unreadMessages: 3
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
  const [showCreateModal, setShowCreateModal] = useState(false);

  const communityFeedRef = useRef<HTMLDivElement | null>(null);
  const communityRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!communityRef.current) return;

    // GSAP ScrollTrigger animation for blur + fade in
    gsap.fromTo(
      communityRef.current,
      { filter: "blur(6px)", opacity: 0.6, y: 50 },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: communityRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };


  }, []);
  useEffect(() => {
    if (!communityFeedRef.current) return;

    // GSAP ScrollTrigger animation for blur + fade in
    gsap.fromTo(
      communityFeedRef.current,
      { filter: "blur(6px)", opacity: 0.6 },
      {
        filter: "blur(0px)",
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: communityFeedRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  const handleJoinCommunity = (id: number) => {
    setCommunities((prev) =>
      prev.map((community) => {
        if (community.id === id) {
          const isJoined = !community.isJoined;
          return {
            ...community,
            isJoined,
            unreadMessages: isJoined ? community.unreadMessages : undefined,
          };
        }
        return community;
      })
    );

    const community = communities.find((c) => c.id === id);

    toast({
      title: community?.isJoined ? "Left Community" : "Joined Community",
      description: community?.isJoined
        ? `You have left ${community.name}`
        : `You have joined ${community.name}`,
    });
  };

  const handlePostSubmit = (content: string) => {
    toast({
      title: "Post Shared",
      description: "Your message has been shared with the community",
    });
  };

  const handleCreateCommunity = (newCommunity) => {
    const newId = Math.max(...communities.map((c) => c.id)) + 1;
    const communityCopy = {
      id: newId,
      name: newCommunity.name,
      location: newCommunity.location,
      bloodType: newCommunity.bloodType,
      members: 1, // Starting with the creator
      isJoined: true, // Auto-join when creating
      activeRequests: 0,
      lastActivity: "Just now",
    };

    setCommunities((prev) => [communityCopy, ...prev]);
    setShowCreateModal(false);

    toast({
      title: "Community Created",
      description: `'${newCommunity.name}' has been created successfully!`,
    });
  };

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-rose-50">
      <Navbar
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={onOpenAuthModal}
        onLogout={onLogout}
      />
      <main className="flex-grow py-8 pt-20" ref={communityRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
              Blood Communities
            </h1>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-primary to-rose-500 hover:opacity-90 transition-opacity"
            >
              <Users className="mr-2 h-4 w-4" />
              Create Community
            </Button>
          </div>

          <CommunitySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

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
          {communities.some((c) => c.isJoined) && (
            <div ref={communityFeedRef}>
              <CommunityFeed
                communityName="Downtown O+ Donors"
                posts={communityPosts}
                onPostSubmit={handlePostSubmit}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />

      <CreateCommunityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateCommunity={handleCreateCommunity}
      />
    </div>
  );
};

export default Communities;
