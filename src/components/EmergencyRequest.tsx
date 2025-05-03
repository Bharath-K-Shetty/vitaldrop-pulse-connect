
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EmergencyRequest = () => {
  const [bloodType, setBloodType] = useState("");
  
  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Emergency Blood Request</h2>
            <p className="mt-4 text-gray-600">
              Need blood urgently? Submit a request and we'll notify eligible donors in your area.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Patient Name</label>
                  <Input id="name" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="hospital" className="text-sm font-medium text-gray-700">Hospital</label>
                  <Input id="hospital" placeholder="Hospital name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="bloodType" className="text-sm font-medium text-gray-700">Blood Type Needed</label>
                  <Select value={bloodType} onValueChange={setBloodType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="units" className="text-sm font-medium text-gray-700">Units Required</label>
                  <Input id="units" type="number" placeholder="Number of units" min="1" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
                <Input id="location" placeholder="City or address" />
              </div>

              <div className="space-y-2">
                <label htmlFor="urgency" className="text-sm font-medium text-gray-700">Urgency Level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical - Needed within hours</SelectItem>
                    <SelectItem value="urgent">Urgent - Needed within 24 hours</SelectItem>
                    <SelectItem value="scheduled">Scheduled - Needed within days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-primary hover:bg-red-700 text-white">
                Submit Emergency Request
              </Button>

              <p className="text-sm text-gray-500 text-center mt-4">
                By submitting, we'll alert nearby eligible donors with matching blood types.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyRequest;
