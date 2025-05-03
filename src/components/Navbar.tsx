
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-primary">VitalDrop</span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Home
              </Link>
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Donate
              </Link>
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Request
              </Link>
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Communities
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-primary text-white">Sign In</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
