
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block p-2 bg-red-100 rounded-lg mb-5">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Every Drop Counts. <br />
              <span className="text-primary">Save Lives</span> with VitalDrop
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              An incentivized blood donation platform that rewards donors with Pulse Credits, 
              helping to build a community of givers and save lives when it matters most.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-red-700 text-white px-6 py-3 text-lg">
                Donate Blood
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-red-50 px-6 py-3 text-lg">
                Request Blood
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-red-100 rounded-lg blur opacity-75"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-sm">
                <div className="pulse-animation w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm font-medium">Your Pulse Credits</p>
                    <h3 className="text-3xl font-bold mt-1">12</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next eligible donation</p>
                    <p className="font-medium">May 25, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lives potentially saved</p>
                    <p className="font-medium">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
