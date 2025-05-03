
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Bell, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [notifications, setNotifications] = useState(2);
  
  const clearNotifications = () => {
    setNotifications(0);
  };
  
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
              <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/communities" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Communities
              </Link>
              <Link to="/emergency" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-red-500 hover:text-red-700">
                Emergency
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="hidden md:flex relative" onClick={clearNotifications}>
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <Link to="/profile">
              <Button variant="outline" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button className="bg-primary text-white">Sign In</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
