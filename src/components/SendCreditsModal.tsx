
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  creditBalance: number;
  onSendCredits: (amount: number) => void;
}

const SendCreditsModal = ({ 
  isOpen, 
  onClose, 
  creditBalance,
  onSendCredits
}: SendCreditsModalProps) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount > creditBalance) {
      toast({
        title: "Insufficient Credits",
        description: `You only have ${creditBalance} Pulse Credits available to send.`
      });
      return;
    }
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid number of credits to send."
      });
      return;
    }
    
    // Call the parent's handler function
    onSendCredits(amount);
    
    // Show success message
    toast({
      title: "Credits Sent",
      description: `You've sent ${amount} Pulse Credit${amount > 1 ? 's' : ''} to ${recipient}`
    });
    
    // Reset form and close modal
    setRecipient("");
    setAmount(1);
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">
            Send Pulse Credits
          </DialogTitle>
          <DialogDescription className="text-center">
            Share your Pulse Credits with others in need
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input 
              id="recipient" 
              value={recipient} 
              onChange={(e) => setRecipient(e.target.value)} 
              placeholder="Email or username" 
              required 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="amount" 
                type="number"
                min="1"
                max={creditBalance} 
                value={amount} 
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)} 
                required 
              />
              <div className="text-sm text-gray-500">
                Balance: {creditBalance}
              </div>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Input 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Add a personal message" 
            />
          </div>
          
          <Button type="submit" className="w-full">
            Send Credits
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendCreditsModal;
