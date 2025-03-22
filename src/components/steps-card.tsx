import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./circular-progress";
import { FC } from "react";

const StepsCard: FC<{ steps?: number; goal?: number; progress?: number }> = ({
  steps = 0,
  goal = 0,
  progress = 0,
}) => {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{steps.toLocaleString()}</h2>
            <p className="text-sm text-muted-foreground">Кроків сьогодні</p>
            <div className="text-sm text-muted-foreground">
              Ціль: {goal.toLocaleString()} кроків
            </div>
          </div>
          <CircularProgress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
};

StepsCard.displayName = "StepsCard";

export default StepsCard;
