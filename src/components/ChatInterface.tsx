
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Heart, X, User, Clock, Paperclip, Bell, Bell as BellIcon, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  sender: string;
  senderInitials: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
  isPulseCredit?: boolean;
  creditAmount?: number;
  isTyping?: boolean;
  isImage?: boolean;
  imageUrl?: string;
  isAnnouncement?: boolean;
  isPinned?: boolean;
  isDeleted?: boolean;
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
      senderInitials: "DS",
      content: "Hello everyone! We have an urgent need for O- blood at Central Hospital.",
      timestamp: new Date(Date.now() - 3600000 * 2),
      isCurrentUser: false,
      isPinned: true,
      isAnnouncement: true
    },
    {
      id: 2,
      sender: "James",
      senderInitials: "JW",
      content: "I can donate. I'm available after 2pm today.",
      timestamp: new Date(Date.now() - 3600000),
      isCurrentUser: false
    },
    {
      id: 3,
      sender: "Community Bot",
      senderInitials: "CB",
      content: "Thank you for responding, James! Your information has been shared with Dr. Sarah.",
      timestamp: new Date(Date.now() - 1800000),
      isCurrentUser: false
    },
    {
      id: 4,
      sender: "Emma",
      senderInitials: "ED",
      content: "I'm at the hospital now. They're saying they need at least 3 more donors today.",
      timestamp: new Date(Date.now() - 900000),
      isCurrentUser: false
    },
    {
      id: 5,
      sender: "Michael",
      senderInitials: "MC",
      content: "Just donated last week, but I'll share with my friends who are O-",
      timestamp: new Date(Date.now() - 600000),
      isCurrentUser: false,
      isImage: true,
      imageUrl: "https://placehold.co/300x200/e74c3c/ffffff?text=Donation+Certificate"
    }
  ]);
  
  const [showCreditInput, setShowCreditInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [creditAmount, setCreditAmount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulate someone typing when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      
      // Clear typing indicator after 3 seconds
      const clearTimer = setTimeout(() => {
        setIsTyping(false);
        
        // Add a new message after typing is done
        const newMessage: Message = {
          id: messages.length + 6,
          sender: "Olivia",
          senderInitials: "OM",
          content: "I can be there by 4pm today. Is that still helpful?",
          timestamp: new Date(),
          isCurrentUser: false
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Show notification for new message
        if (notificationsEnabled) {
          toast({
            title: "New Message from Olivia",
            description: "I can be there by 4pm today. Is that still helpful?"
          });
        }
      }, 3000);
      
      return () => clearTimeout(clearTimer);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [toast, notificationsEnabled, messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 10,
        sender: "You",
        senderInitials: "YO",
        content: message,
        timestamp: new Date(),
        isCurrentUser: true
      };
      
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        // Show typing indicator
        setIsTyping(true);
        
        // Clear typing indicator and add response after 2 more seconds
        setTimeout(() => {
          setIsTyping(false);
          
          const responseMessage: Message = {
            id: messages.length + 11,
            sender: "Dr. Sarah",
            senderInitials: "DS",
            content: "That would be perfect! Thank you for the quick response.",
            timestamp: new Date(),
            isCurrentUser: false
          };
          
          setMessages(prev => [...prev, responseMessage]);
          
          // Show notification for new message
          if (notificationsEnabled) {
            toast({
              title: "New Message from Dr. Sarah",
              description: "That would be perfect! Thank you for the quick response."
            });
          }
        }, 2000);
      }, 2000);
    }
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id 
          ? { ...msg, isDeleted: true, content: "This message has been deleted" }
          : msg
      )
    );
    
    toast({
      title: "Message Deleted",
      description: "The message has been removed from the chat"
    });
  };

  const handlePinMessage = (id: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id 
          ? { ...msg, isPinned: !msg.isPinned }
          : msg
      )
    );
    
    const message = messages.find(m => m.id === id);
    toast({
      title: message?.isPinned ? "Message Unpinned" : "Message Pinned",
      description: message?.isPinned 
        ? "The message has been removed from pinned messages" 
        : "The message has been pinned to the top of the chat"
    });
  };

  const handleReportMessage = (id: number) => {
    toast({
      title: "Message Reported",
      description: "Thank you for reporting this message. Our moderators will review it."
    });
  };

  const handleSendCredit = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "You",
      senderInitials: "YO",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    // Simulate "typing" indicator for other users
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Don't show typing indicator for empty messages
    if (e.target.value.trim() === "") return;
    
    const timeout = setTimeout(() => {
      // Typing stopped, clear the indicator
    }, 1000);
    
    setTypingTimeout(timeout as NodeJS.Timeout);
  };

  const handleAttachFile = () => {
    // Simulate file attachment
    const imageUrl = "https://placehold.co/400x300/3498db/ffffff?text=Attached+Image";
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "You",
      senderInitials: "YO",
      content: "Attached an image",
      timestamp: new Date(),
      isCurrentUser: true,
      isImage: true,
      imageUrl: imageUrl
    };
    
    setMessages([...messages, newMessage]);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    toast({
      title: notificationsEnabled ? "Notifications Disabled" : "Notifications Enabled",
      description: notificationsEnabled 
        ? "You will no longer receive notifications for new messages" 
        : "You will now receive notifications for new messages"
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Mock emoji list
  const emojis = ["❤️", "👍", "🩸", "🏥", "🚑", "🙏", "🤝", "😊", "👋", "👨‍⚕️"];

  // Get pinned messages
  const pinnedMessages = messages.filter(msg => msg.isPinned);

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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={toggleNotifications}
          >
            {notificationsEnabled ? (
              <Bell className="h-4 w-4 text-primary" />
            ) : (
              <BellIcon className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-0">
        {pinnedMessages.length > 0 && (
          <div className="px-4 py-2 bg-rose-50 border-b flex items-center">
            <div className="flex-1">
              <p className="text-xs font-medium text-primary mb-1">Pinned Message</p>
              <p className="text-sm truncate">{pinnedMessages[0].content}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => handlePinMessage(pinnedMessages[0].id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        <ScrollArea className="flex-1 p-4 space-y-4 bg-gradient-to-br from-gray-50 to-rose-50/30">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'} relative group mb-4`}
            >
              {!msg.isCurrentUser && (
                <Avatar className="w-8 h-8 mr-2 mt-1">
                  <AvatarFallback className="bg-gradient-to-br from-primary/60 to-rose-400/60 text-white text-xs">
                    {msg.senderInitials}
                  </AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`max-w-[80%] rounded-xl p-3 transition-all hover:shadow-md ${
                  msg.isCurrentUser 
                    ? msg.isPulseCredit 
                      ? 'bg-gradient-to-r from-rose-500 to-primary text-white rounded-tr-none' 
                      : 'bg-gradient-to-r from-primary to-rose-500 text-white rounded-tr-none'
                    : msg.isAnnouncement
                      ? 'bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300 rounded-tl-none'
                      : 'bg-white border border-gray-100 rounded-tl-none'
                }`}
              >
                {!msg.isCurrentUser && (
                  <p className={`font-semibold text-sm ${msg.isAnnouncement ? 'text-amber-800' : ''}`}>
                    {msg.sender}
                    {msg.isAnnouncement && (
                      <span className="ml-2 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        Announcement
                      </span>
                    )}
                  </p>
                )}
                {msg.isPulseCredit ? (
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-white" />
                    <p>{msg.content}</p>
                  </div>
                ) : msg.isImage ? (
                  <div className="space-y-2">
                    <p>{msg.content}</p>
                    <img 
                      src={msg.imageUrl} 
                      alt="Attached image" 
                      className="rounded-lg max-w-full max-h-48 object-cover border border-white/30"
                    />
                  </div>
                ) : (
                  <p className={msg.isDeleted ? "text-gray-500 italic" : ""}>{msg.content}</p>
                )}
                <p className={`text-xs mt-1 text-right ${
                  msg.isCurrentUser 
                    ? 'text-white/70' 
                    : msg.isAnnouncement 
                      ? 'text-amber-700/70' 
                      : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
                
                {/* Message actions menu - only visible on hover */}
                {!msg.isDeleted && (
                  <div className={`absolute ${
                    msg.isCurrentUser ? 'left-0 -translate-x-full pl-2' : 'right-0 translate-x-full pr-2'
                  } top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1`}>
                    {msg.isCurrentUser && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 bg-white shadow-sm"
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 bg-white shadow-sm"
                      onClick={() => handlePinMessage(msg.id)}
                    >
                      <MessageCircle className="h-3 w-3 text-primary" />
                    </Button>
                    {!msg.isCurrentUser && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 bg-white shadow-sm"
                        onClick={() => handleReportMessage(msg.id)}
                      >
                        <Bell className="h-3 w-3 text-amber-500" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="w-8 h-8 mr-2 mt-1">
                <AvatarFallback className="bg-gradient-to-br from-primary/60 to-rose-400/60 text-white text-xs">
                  TS
                </AvatarFallback>
              </Avatar>
              <div className="bg-white border border-gray-100 rounded-xl rounded-tl-none p-3 max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Empty div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </ScrollArea>
        
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
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="border-gray-200 focus:border-primary transition-colors"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleAttachFile}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
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
