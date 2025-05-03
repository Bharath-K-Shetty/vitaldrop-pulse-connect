
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const bloodGroups = [
  { type: "O+", members: 8427, icon: "🩸", color: "bg-red-100", requests: 24 },
  { type: "A+", members: 5319, icon: "🩸", color: "bg-blue-100", requests: 18 },
  { type: "B+", members: 3654, icon: "🩸", color: "bg-green-100", requests: 12 },
  { type: "AB+", members: 1281, icon: "🩸", color: "bg-purple-100", requests: 7 },
  { type: "O-", members: 2105, icon: "🩸", color: "bg-orange-100", requests: 31 },
  { type: "A-", members: 1628, icon: "🩸", color: "bg-pink-100", requests: 14 },
];

const CommunityGroups = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Blood Type Communities</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Join a community based on your blood type to connect with donors and recipients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bloodGroups.map((group, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className={`h-2 ${group.color}`}></div>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{group.icon}</span>
                    <h3 className="text-2xl font-bold">{group.type} Group</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{group.members.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Active requests</p>
                    <p className="font-medium">{group.requests} nearby</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Compatibility</p>
                    <p className="font-medium">
                      Can donate to: {group.type === "O-" ? "All blood types" : "Multiple types"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t px-6 py-4">
                <Button className="w-full">Join Community</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityGroups;
