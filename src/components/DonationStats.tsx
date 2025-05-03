
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Lives Saved", value: "10,482", change: "+12%" },
  { label: "Active Donors", value: "28,651", change: "+8%" },
  { label: "Pulse Credits Earned", value: "124,305", change: "+15%" },
  { label: "Emergency Requests Fulfilled", value: "4,721", change: "+20%" }
];

const DonationStats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Together, we're building a stronger community and saving lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last year</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationStats;
