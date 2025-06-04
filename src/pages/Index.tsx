import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import DonationStats from "@/components/DonationStats";
import EmergencyRequest from "@/components/EmergencyRequest";
import CommunityGroups from "@/components/CommunityGroups";
import QuickActions from "@/components/QuickActions";
import PulseCreditsCard from "@/components/PulseCreditsCard";
import UpcomingDonation from "@/components/UpcomingDonation";
import SendCreditsModal from "@/components/SendCreditsModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

interface IndexProps {
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  pulseCredits: number;
  onSendCredits: (amount: number) => void;
}

const Index = ({
  isAuthenticated,
  onOpenAuthModal,
  onLogout,
  pulseCredits,
  onSendCredits,
}: IndexProps) => {
  const { toast } = useToast();
  const [showSendCredits, setShowSendCredits] = useState(false);

  // Create refs for each scroll-reveal section
  const heroRef = useRef<HTMLElement | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const donationStatsRef = useRef<HTMLDivElement | null>(null);
  const emergencyRequestRef = useRef<HTMLDivElement | null>(null);
  const communityGroupsRef = useRef<HTMLDivElement | null>(null);

  const handleSendCredits = (amount: number) => {
    onSendCredits(amount);
  };

  const simulateReceiveCredits = () => {
    toast({
      title: "Credits Received",
      description: "You've received 2 Pulse Credits from Dr. Sarah",
    });
  };

  useEffect(() => {
    const sections = [
      heroRef.current,
      dashboardRef.current,
      donationStatsRef.current,
      emergencyRequestRef.current,
      communityGroupsRef.current,
    ];

    sections.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { filter: "blur(6px)", opacity: 0.6, y: 50 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  const communityFeedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!communityFeedRef.current) return;

    // GSAP ScrollTrigger animation for blur + fade in
    gsap.fromTo(
      communityFeedRef.current,
      { filter: "blur(6px)", opacity: 0.6 },
      {
        filter: "blur(0px)",
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: communityFeedRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={onOpenAuthModal}
        onLogout={onLogout}
        pulseCredits={pulseCredits}
        onSendCredits={handleSendCredits}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section ref={heroRef}>
          <Hero
            isAuthenticated={isAuthenticated}
            onOpenAuthModal={onOpenAuthModal}
            pulseCredits={pulseCredits}
          />
        </section>

        {/* Dashboard Section */}
        {isAuthenticated && (
          <section
            ref={dashboardRef}
            className="py-10 bg-gradient-to-b from-white to-gray-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Your Dashboard</h2>
                <p className="text-gray-600 mt-1">
                  Quick overview of your VitalDrop account
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PulseCreditsCard
                  credits={pulseCredits}
                  onSendCredits={() => setShowSendCredits(true)}
                />
                <UpcomingDonation isEligible={true} />

                <div className="md:col-span-3">
                  <QuickActions />
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <Button
                    variant="outline"
                    className="text-primary hover:bg-red-50"
                    onClick={() => setShowSendCredits(true)}
                  >
                    Send Pulse Credits
                  </Button>

                  <Button variant="outline" onClick={simulateReceiveCredits}>
                    Simulate Receiving Credits
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Donation Stats */}
        <section ref={donationStatsRef}>
          <DonationStats />
        </section>

        {/* Emergency Request */}
        <section ref={emergencyRequestRef}>
          <EmergencyRequest />
        </section>

        {/* Community Groups */}
        <section ref={communityGroupsRef}>
          <CommunityGroups />
        </section>
      </main>

      <Footer />

      {showSendCredits && (
        <SendCreditsModal
          isOpen={showSendCredits}
          onClose={() => setShowSendCredits(false)}
          creditBalance={pulseCredits}
          onSendCredits={handleSendCredits}
        />
      )}
    </div>
  );
};

export default Index;
