
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface PulseCreditsCardProps {
  credits: number;
  className?: string;
}

const PulseCreditsCard = ({ credits, className }: PulseCreditsCardProps) => {
  return (
    <Card className={`relative overflow-hidden hover:shadow-md transition-all ${className}`}>
      <div className="absolute top-0 right-0 p-2">
        <Heart className="h-5 w-5 text-primary" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Pulse Credits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="relative">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">{credits}</div>
            <div className="text-sm text-gray-500">Available credits</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Credits can be used when you or someone you know needs blood
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseCreditsCard;
