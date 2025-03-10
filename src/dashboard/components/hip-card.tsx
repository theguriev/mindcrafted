import { Card, CardContent } from "@/components/ui/card";
import { Ruler, ArrowDown, ArrowUp } from "lucide-react";
import { FC } from "react";
import SparklineChart from "./sparkline-chart";

const HipCard: FC<{
  hipChange?: number;
  hipData?: Array<{ date: string; value: number }>;
  currentHip?: number;
}> = ({ hipChange = 0, hipData = [], currentHip = 0 }) => {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-bold">{currentHip}</h2>
              <span className="text-sm text-muted-foreground">см</span>
              {hipChange !== 0 && (
                <div
                  className={`flex items-center ${
                    hipChange < 0 ? "text-green-500" : "text-red-400"
                  }`}
                >
                  {hipChange < 0 ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                  <span className="text-sm">{Math.abs(hipChange)} см</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">обхват стегна</p>
          </div>
          <div className="h-[60px] w-[100px]">
            <SparklineChart data={hipData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

HipCard.displayName = "HipCard";

export default HipCard;
