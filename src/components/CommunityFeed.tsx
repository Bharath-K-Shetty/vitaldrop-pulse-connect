
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommunityPost from "./CommunityPost";
import { useState } from "react";

interface Post {
  id: number;
  author: string;
  authorBloodType: string;
  time: string;
  content: string;
  isEmergency: boolean;
}

interface CommunityFeedProps {
  communityName: string;
  posts: Post[];
  onPostSubmit: (content: string) => void;
}

const CommunityFeed = ({ communityName, posts, onPostSubmit }: CommunityFeedProps) => {
  const [newPost, setNewPost] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    onPostSubmit(newPost);
    setNewPost("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">{communityName}</h2>
        <p className="text-gray-500 text-sm mt-1">Community Feed</p>
      </div>
      
      <div className="p-6 border-b">
        <form onSubmit={handleSubmit} className="space-y-4">
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
        {posts.map((post) => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
