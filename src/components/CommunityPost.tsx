
import { User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  author: string;
  authorBloodType: string;
  time: string;
  content: string;
  isEmergency: boolean;
}

interface CommunityPostProps {
  post: Post;
}

const CommunityPost = ({ post }: CommunityPostProps) => {
  return (
    <div className="p-6">
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
  );
};

export default CommunityPost;
