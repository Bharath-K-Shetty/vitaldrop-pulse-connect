
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import CreditTransactionHistory from "./CreditTransactionHistory";
import { CreditTransaction } from "@/types/pulseCredits";

// Mock transaction data - in a real app, this would come from props
const mockTransactions: CreditTransaction[] = [
  {
    id: 1,
    amount: 2,
    type: 'received',
    fromOrTo: 'Dr. Sarah',
    date: 'Today, 2:30 PM',
    message: 'Thank you for your help!'
  },
  {
    id: 2,
    amount: 3,
    type: 'sent',
    fromOrTo: 'John Doe',
    date: 'Yesterday, 10:15 AM',
    message: 'For emergency request'
  },
  {
    id: 3,
    amount: 5,
    type: 'earned',
    date: 'May 1, 2025',
  },
  {
    id: 4,
    amount: 1,
    type: 'sent',
    fromOrTo: 'City Hospital',
    date: 'April 28, 2025',
  },
  {
    id: 5,
    amount: 5,
    type: 'earned',
    date: 'April 15, 2025',
  }
];

interface PulseCreditsCardProps {
  credits: number;
  className?: string;
  onSendCredits?: () => void;
}

const PulseCreditsCard = ({ credits, className, onSendCredits }: PulseCreditsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`relative overflow-hidden transition-all ${isHovered ? 'shadow-md' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 p-2">
        <div className={`p-1.5 rounded-full ${isHovered ? 'bg-red-50' : ''} transition-colors`}>
          <Heart className="h-5 w-5 text-primary" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Pulse Credits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="relative">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              {credits}
            </div>
            <div className="text-sm text-gray-500">Available credits</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Credits can be used when you or someone you know needs blood
        </div>
        
        {onSendCredits && (
          <Button 
            variant="outline" 
            className="mt-4 w-full border-red-100 text-primary hover:bg-red-50 hover:text-primary transition-all"
            onClick={onSendCredits}
          >
            Send Credits
          </Button>
        )}
        
        <div className="mt-4 border-t pt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full flex justify-between items-center p-0 h-auto text-gray-600 hover:bg-transparent hover:text-primary"
            onClick={() => setExpanded(!expanded)}
          >
            <span>Transaction History</span>
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {expanded && (
            <CreditTransactionHistory transactions={mockTransactions} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseCreditsCard;
