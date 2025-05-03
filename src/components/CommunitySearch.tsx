
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CommunitySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CommunitySearch = ({ searchTerm, onSearchChange }: CommunitySearchProps) => {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input 
        className="pl-10" 
        placeholder="Search for communities by name, location or blood type..." 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default CommunitySearch;
