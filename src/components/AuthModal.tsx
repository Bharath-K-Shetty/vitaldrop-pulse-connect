
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we'd handle actual authentication
    // For now, just simulate successful login/signup
    toast({
      title: mode === "signin" ? "Signed In" : "Account Created",
      description: mode === "signin" 
        ? "Welcome back to VitalDrop!" 
        : "Your VitalDrop account has been created successfully"
    });
    
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">
            {mode === "signin" ? "Sign in to VitalDrop" : "Create a VitalDrop account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "signin" 
              ? "Enter your credentials to access your account" 
              : "Fill in your details to join the VitalDrop community"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your full name" 
                required 
              />
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com" 
              required 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <select 
                id="bloodType" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                value={bloodType} 
                onChange={(e) => setBloodType(e.target.value)}
                required
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          )}
          
          <Button type="submit" className="w-full">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          {mode === "signin" ? (
            <p>
              Don't have an account?{" "}
              <button 
                type="button" 
                className="text-primary hover:underline" 
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button 
                type="button" 
                className="text-primary hover:underline" 
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
