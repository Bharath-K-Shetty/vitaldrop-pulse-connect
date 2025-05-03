
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatInterfaceProps {
  communityName: string;
}

const ChatInterface = ({ communityName }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Dr. Sarah",
      content: "Hello everyone! We have an urgent need for O- blood at Central Hospital.",
      timestamp: new Date(Date.now() - 3600000 * 2),
      isCurrentUser: false
    },
    {
      id: 2,
      sender: "James",
      content: "I can donate. I'm available after 2pm today.",
      timestamp: new Date(Date.now() - 3600000),
      isCurrentUser: false
    },
    {
      id: 3,
      sender: "Community Bot",
      content: "Thank you for responding, James! Your information has been shared with Dr. Sarah.",
      timestamp: new Date(Date.now() - 1800000),
      isCurrentUser: false
    }
  ]);
  const [showCreditInput, setShowCreditInput] = useState(false);
  const [creditAmount, setCreditAmount] = useState(1);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date(),
        isCurrentUser: true
      };
      
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleSendCredit = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "You",
      content: `Sent ${creditAmount} Pulse Credit${creditAmount > 1 ? 's' : ''} to the community`,
      timestamp: new Date(),
      isCurrentUser: true
    };
    
    setMessages([...messages, newMessage]);
    toast({
      title: "Credits Sent",
      description: `You've sent ${creditAmount} Pulse Credit${creditAmount > 1 ? 's' : ''} to the community`
    });
    
    setShowCreditInput(false);
    setCreditAmount(1);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full max-h-[80vh] flex flex-col">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          {communityName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-xl p-3 ${
                  msg.isCurrentUser 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-gray-100 rounded-tl-none'
                }`}
              >
                {!msg.isCurrentUser && (
                  <p className="font-semibold text-sm">{msg.sender}</p>
                )}
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 text-right ${msg.isCurrentUser ? 'text-white/70' : 'text-gray-500'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {showCreditInput ? (
          <div className="p-3 border-t flex gap-2 items-center">
            <Heart className="h-5 w-5 text-primary" />
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium mb-1">Send Pulse Credits</label>
              <Input 
                type="number" 
                min="1" 
                max="100"
                value={creditAmount}
                onChange={(e) => setCreditAmount(parseInt(e.target.value) || 1)}
              />
            </div>
            <Button onClick={handleSendCredit}>Send</Button>
            <Button variant="outline" onClick={() => setShowCreditInput(false)}>Cancel</Button>
          </div>
        ) : (
          <div className="p-3 border-t flex gap-2">
            <Input 
              placeholder="Type your message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="text-primary" 
              onClick={() => setShowCreditInput(true)}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
