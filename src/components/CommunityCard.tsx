
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin } from "lucide-react";

interface Community {
  id: number;
  name: string;
  members: number;
  location: string;
  bloodType: string;
  isJoined: boolean;
  activeRequests: number;
  lastActivity: string;
}

interface CommunityCardProps {
  community: Community;
  onJoin: (id: number) => void;
}

const CommunityCard = ({ community, onJoin }: CommunityCardProps) => {
  return (
    <Card className="overflow-hidden hover-grow transition-all duration-300 hover:shadow-lg border border-white/50 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-rose-500/10 border-b">
        <CardTitle className="flex justify-between items-start">
          <span className="text-gradient-primary">{community.name}</span>
          <div className="bg-gradient-to-r from-primary to-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {community.bloodType}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>{community.members} members</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{community.location}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Active requests:</span>
            <span className="font-medium text-primary">{community.activeRequests}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last activity:</span>
            <span>{community.lastActivity}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 border-t">
        <Button 
          className={`w-full ${!community.isJoined ? 'bg-gradient-to-r from-primary to-rose-500 hover:opacity-90 transition-opacity' : ''}`}
          variant={community.isJoined ? "outline" : "default"}
          onClick={() => onJoin(community.id)}
        >
          {community.isJoined ? "Leave Community" : "Join Community"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
