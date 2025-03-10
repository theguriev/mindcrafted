import { Card, CardContent } from "@/components/ui/card";
import { Ruler, ArrowDown, ArrowUp } from "lucide-react";
import { FC } from "react";
import SparklineChart from "./sparkline-chart";

const HipsCard: FC<{
  hipsData?: Array<{ date: string; value: number }>;
  hipsChange?: number;
  currentHips?: number;
}> = ({ hipsChange = 0, hipsData = [], currentHips = 0 }) => {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-bold">{currentHips}</h2>
              <span className="text-sm text-muted-foreground">см</span>
              {hipsChange !== 0 && (
                <div
                  className={`flex items-center ${
                    hipsChange < 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {hipsChange < 0 ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                  <span className="text-sm">{Math.abs(hipsChange)} см</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">обхват стегон</p>
          </div>
          <div className="h-[60px] w-[100px]">
            <SparklineChart data={hipsData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

HipsCard.displayName = "HipsCard";

export default HipsCard;
