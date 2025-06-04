
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Heart, Clock, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Critical", "Urgent", "Standard"];

// Mock data for nearby donors
const nearbyDonors = [
  { id: 1, name: "James Wilson", bloodType: "O+", distance: "0.8 km", lastDonation: "3 months ago", isAvailable: true },
  { id: 2, name: "Emily Chen", bloodType: "O+", distance: "1.2 km", lastDonation: "4 months ago", isAvailable: true },
  { id: 3, name: "Robert Garcia", bloodType: "O-", distance: "1.5 km", lastDonation: "2 months ago", isAvailable: true },
  { id: 4, name: "Lisa Kumar", bloodType: "O+", distance: "2.3 km", lastDonation: "5 months ago", isAvailable: true },
  { id: 5, name: "Michael Smith", bloodType: "A+", distance: "2.7 km", lastDonation: "6 months ago", isAvailable: false },
];

const Emergency = () => {
  const { toast } = useToast();
  const [bloodType, setBloodType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("1");
  const [hospital, setHospital] = useState("");
  const [patientName, setPatientName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const emergencyBoardRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!emergencyBoardRef.current) return;

    // GSAP ScrollTrigger animation for blur + fade in
    gsap.fromTo(
      emergencyBoardRef.current,
      { filter: "blur(6px)", opacity: 0.6, y: 50 },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: emergencyBoardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };


  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bloodType || !urgency || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Emergency Request Sent",
      description: "We are notifying nearby eligible donors"
    });

    setHasSubmitted(true);
  };

  const handleContactDonor = (id: number) => {
    const donor = nearbyDonors.find(d => d.id === id);

    toast({
      title: "Donor Contacted",
      description: `${donor?.name} has been notified of your emergency request`
    });
  };

  const filteredDonors = nearbyDonors.filter(donor =>
    (!bloodType || donor.bloodType === bloodType) && donor.isAvailable
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8 pt-20" ref={emergencyBoardRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Emergency Blood Request</h1>
            <p className="mt-2 text-gray-600">
              Submit an emergency request and we'll notify eligible donors in your area immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input
                          id="patientName"
                          placeholder="Name of patient"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospital">Hospital</Label>
                        <Input
                          id="hospital"
                          placeholder="Hospital name"
                          value={hospital}
                          onChange={(e) => setHospital(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bloodType">Blood Type Needed*</Label>
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
                        <Label htmlFor="units">Units Required</Label>
                        <Input
                          id="units"
                          type="number"
                          min="1"
                          placeholder="Number of units"
                          value={units}
                          onChange={(e) => setUnits(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location*</Label>
                        <Input
                          id="location"
                          placeholder="City or address"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency Level*</Label>
                        <Select value={urgency} onValueChange={setUrgency}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map(level => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Any additional details about the emergency"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Submit Emergency Request
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      By submitting, we'll alert nearby eligible donors with matching blood types.
                      <br />Fields marked with * are required.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Nearby Donors</CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  {!hasSubmitted && !bloodType ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Select a blood type to see matching donors in your area
                      </p>
                    </div>
                  ) : filteredDonors.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No matching donors found nearby. We'll expand the search when you submit.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 divide-y">
                      {filteredDonors.map((donor) => (
                        <div key={donor.id} className="pt-4 first:pt-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                <User className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium">{donor.name}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{donor.distance}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-red-50 px-2 py-1 rounded text-xs font-medium text-primary">
                              {donor.bloodType}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Last donation: {donor.lastDonation}</span>
                          </div>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleContactDonor(donor.id)}
                          >
                            Contact Donor
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Emergency;
