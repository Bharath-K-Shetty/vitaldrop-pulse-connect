
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
    <Card className="overflow-hidden">
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
          onClick={() => onJoin(community.id)}
        >
          {community.isJoined ? "Leave Community" : "Join Community"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
