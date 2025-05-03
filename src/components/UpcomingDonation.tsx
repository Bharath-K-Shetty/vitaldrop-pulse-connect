
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface UpcomingDonationProps {
  isEligible: boolean;
  className?: string;
}

const UpcomingDonation = ({ isEligible, className }: UpcomingDonationProps) => {
  // Calculate next eligible date (56 days from now if not eligible)
  const nextEligibleDate = new Date();
  if (!isEligible) {
    nextEligibleDate.setDate(nextEligibleDate.getDate() + 56);
  }
  
  const formattedDate = nextEligibleDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Card className={`hover:shadow-md transition-all ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Next Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="font-medium">
              {isEligible ? 'You are eligible to donate now' : `Eligible on ${formattedDate}`}
            </div>
            <div className="text-sm text-gray-500">
              {isEligible ? 'Visit any donation center' : '56 days between donations required'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingDonation;
