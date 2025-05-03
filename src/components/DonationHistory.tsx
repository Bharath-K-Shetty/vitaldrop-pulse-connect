
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for donation history
const initialDonations = [
  {
    id: 1,
    date: "April 15, 2025",
    location: "Central Blood Bank, Downtown",
    pulseCredits: 5,
    bloodType: "O+",
    healthMetrics: { hemoglobin: "14.2 g/dL", weight: "72 kg" }
  },
  {
    id: 2,
    date: "February 18, 2025",
    location: "RedCross Mobile Drive, Eastside",
    pulseCredits: 5,
    bloodType: "O+",
    healthMetrics: { hemoglobin: "13.8 g/dL", weight: "71 kg" }
  },
  {
    id: 3,
    date: "December 24, 2024",
    location: "University Hospital Blood Center",
    pulseCredits: 5,
    bloodType: "O+",
    healthMetrics: { hemoglobin: "14.0 g/dL", weight: "73 kg" }
  }
];

const DonationHistory = () => {
  const [donations] = useState(initialDonations);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        {donations.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            You have not made any donations yet.
          </p>
        ) : (
          <div className="space-y-6">
            {donations.map((donation) => (
              <div 
                key={donation.id}
                className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{donation.date}</h3>
                    <p className="text-sm text-gray-500">{donation.location}</p>
                  </div>
                  <div className="bg-red-50 px-3 py-1 rounded-full text-xs font-medium text-primary">
                    +{donation.pulseCredits} credits
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-gray-500">Blood Type</p>
                    <p className="font-medium">{donation.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Hemoglobin</p>
                    <p className="font-medium">{donation.healthMetrics.hemoglobin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Weight</p>
                    <p className="font-medium">{donation.healthMetrics.weight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DonationHistory;
