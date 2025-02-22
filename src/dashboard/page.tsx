import type React from "react";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./components/circular-progress";

const DashboardPage: React.FC = () => {
  const todaySteps = 6789;
  const goalSteps = 10000;
  const progress = (todaySteps / goalSteps) * 100;
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Link to="/dashboard/steps">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  {todaySteps.toLocaleString()}
                </h2>
                <p className="text-sm text-muted-foreground">Кроків сьогодні</p>
                <div className="text-sm text-muted-foreground">
                  Ціль: {goalSteps.toLocaleString()} кроків
                </div>
              </div>
              <CircularProgress value={progress} />
            </div>
          </CardContent>
        </Card>
      </Link>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-video rounded-lg bg-muted/50" />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
