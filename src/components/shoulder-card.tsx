import { Card, CardContent } from "@/components/ui/card";
import { Ruler, ArrowUp, ArrowDown } from "lucide-react";
import { FC } from "react";
import { BodyMeasurement } from "../types";
import SparklineChart from "./sparkline-chart";

const ShoulderCard: FC<Partial<BodyMeasurement>> = ({
  change = 0,
  current = 0,
  data = [],
}) => {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-bold">{current}</h2>
              <span className="text-sm text-muted-foreground">см</span>
              {change !== 0 && (
                <div
                  className={`flex items-center ${
                    change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {change > 0 ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  <span className="text-sm">{Math.abs(change)} см</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">обхват плеча</p>
          </div>
          <div className="h-[60px] w-[100px]">
            <SparklineChart data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ShoulderCard.displayName = "ShoulderCard";

export default ShoulderCard;
