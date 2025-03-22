import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FC } from "react";
import { BodyMeasurement } from "../types";
import CircularProgress from "./circular-progress";

const WeightCard: FC<
  Omit<Partial<BodyMeasurement>, "data"> & { goal?: number; progress?: number }
> = ({ change = 0, current = 0, goal = 0, progress = 0 }) => {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{current.toFixed(1)}</h2>
              <span className="text-sm text-muted-foreground">кг</span>
              {change !== 0 && (
                <div
                  className={`flex items-center ${
                    change < 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {change < 0 ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                  <span className="text-sm">
                    {Math.abs(change).toFixed(1)} кг
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">поточна вага</p>
            <div className="text-sm text-muted-foreground">
              Ціль: {goal.toFixed(1)} кг
            </div>
          </div>
          <CircularProgress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
};

WeightCard.displayName = "WeightCard";

export default WeightCard;
