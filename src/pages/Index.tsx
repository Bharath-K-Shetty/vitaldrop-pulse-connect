
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EmergencyRequest from "@/components/EmergencyRequest";
import DonationStats from "@/components/DonationStats";
import CommunityGroups from "@/components/CommunityGroups";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <DonationStats />
        <EmergencyRequest />
        <CommunityGroups />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
