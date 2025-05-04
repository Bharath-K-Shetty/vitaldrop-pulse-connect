
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Heart, X, User, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
  isPulseCredit?: boolean;
  creditAmount?: number;
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
      isCurrentUser: true,
      isPulseCredit: true,
      creditAmount: creditAmount
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

  // Mock emoji list
  const emojis = ["❤️", "👍", "🩸", "🏥", "🚑", "🙏", "🤝", "😊", "👋", "👨‍⚕️"];

  return (
    <Card className="h-full max-h-[80vh] flex flex-col bg-white border border-white/50 shadow-lg">
      <CardHeader className="pb-2 border-b bg-gradient-to-r from-primary/10 to-rose-500/10">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent font-bold">
            {communityName}
          </span>
          <span className="text-xs text-gray-500 ml-auto font-normal flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Active now
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-rose-50/30">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isCurrentUser && (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mr-2 mt-1">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
              <div 
                className={`max-w-[80%] rounded-xl p-3 transition-all hover:shadow-md ${
                  msg.isCurrentUser 
                    ? msg.isPulseCredit 
                      ? 'bg-gradient-to-r from-rose-500 to-primary text-white rounded-tr-none' 
                      : 'bg-gradient-to-r from-primary to-rose-500 text-white rounded-tr-none'
                    : 'bg-white border border-gray-100 rounded-tl-none'
                }`}
              >
                {!msg.isCurrentUser && (
                  <p className="font-semibold text-sm">{msg.sender}</p>
                )}
                {msg.isPulseCredit ? (
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-white" />
                    <p>{msg.content}</p>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
                <p className={`text-xs mt-1 text-right ${msg.isCurrentUser ? 'text-white/70' : 'text-gray-500'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {showCreditInput ? (
          <div className="p-3 border-t bg-white flex gap-2 items-center">
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
            <Button 
              onClick={handleSendCredit}
              className="bg-gradient-to-r from-primary to-rose-500 hover:opacity-90 transition-opacity"
            >
              Send
            </Button>
            <Button variant="outline" onClick={() => setShowCreditInput(false)}>Cancel</Button>
          </div>
        ) : (
          <div className="p-3 border-t bg-white">
            {showEmojiPicker && (
              <div className="mb-2 p-2 bg-white rounded-lg border flex flex-wrap gap-2 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border"
                  onClick={() => setShowEmojiPicker(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
                {emojis.map((emoji, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    className="p-1 h-8 w-8"
                    onClick={() => {
                      setMessage(prev => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😊
              </Button>
              <Input 
                placeholder="Type your message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="border-gray-200 focus:border-primary transition-colors"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-rose-500 hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="text-primary border-primary hover:bg-primary/10" 
                onClick={() => setShowCreditInput(true)}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
