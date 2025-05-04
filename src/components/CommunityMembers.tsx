
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, MessageCircle } from "lucide-react";

interface Member {
  id: number;
  name: string;
  initials: string;
  role: string;
  status: "online" | "offline";
  lastActive: string;
}

interface CommunityMembersProps {
  members: Member[];
  onClose: () => void;
}

const CommunityMembers = ({ members, onClose }: CommunityMembersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMembers = members.filter(
    member => member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card className="h-full max-h-[80vh] flex flex-col border border-white/50 shadow-lg">
      <CardHeader className="pb-2 border-b bg-gradient-to-r from-primary/10 to-rose-500/10 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
            Community Members
          </span>
          <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5">
            {members.filter(m => m.status === "online").length} online
          </span>
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search members..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(80vh-12rem)]">
          <div className="divide-y">
            {filteredMembers.map(member => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-primary/60 to-rose-400/60 text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    {member.status === "online" && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${member.role === "Admin" ? "text-primary font-medium" : "text-gray-500"}`}>
                        {member.role}
                      </span>
                      {member.status === "online" ? (
                        <span className="text-xs text-green-600">Active now</span>
                      ) : (
                        <span className="text-xs text-gray-500">Last active: {member.lastActive}</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CommunityMembers;
