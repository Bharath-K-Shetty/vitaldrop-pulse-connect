
import { Heart, Shield, Users, Bell, Share } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Pulse Credits System",
    description: "Earn credits with each donation that you can redeem when you or your loved ones need blood."
  },
  {
    icon: Shield,
    title: "Emergency Blood Matching",
    description: "Use AI to find eligible donors nearby during emergencies, ensuring quick and safe responses."
  },
  {
    icon: Share,
    title: "Credit Sharing",
    description: "Transfer Pulse Credits to family, friends, or strangers, creating a community of support."
  },
  {
    icon: Users,
    title: "Community Groups",
    description: "Join blood type communities to foster faster support and collective awareness."
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive real-time alerts for emergency requests, donation eligibility, and community updates."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How VitalDrop Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            A revolutionary approach to blood donation that saves lives while building community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
