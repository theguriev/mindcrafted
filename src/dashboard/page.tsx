import type React from "react";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./components/circular-progress";
import { ArrowDown, ArrowUp, Ruler } from "lucide-react";
import SparklineChart from "./components/sparkline-chart";

// Shoulder measurement data
const shoulderData = [
  { date: "2024-02-16", value: 113 },
  { date: "2024-02-17", value: 113 },
  { date: "2024-02-18", value: 114 },
  { date: "2024-02-19", value: 114 },
  { date: "2024-02-20", value: 114 },
  { date: "2024-02-21", value: 115 },
  { date: "2024-02-22", value: 115 },
];
const currentShoulder = shoulderData[shoulderData.length - 1].value;
const previousShoulder = shoulderData[shoulderData.length - 2].value;
const shoulderChange = currentShoulder - previousShoulder;

const DashboardPage: React.FC = () => {
  const todaySteps = 4789;
  const goalSteps = 7000;
  const progress = (todaySteps / goalSteps) * 100;

  // Weight tracking data
  const currentWeight = 75.5; // kg
  const previousWeight = 76.2; // kg
  const goalWeight = 70; // kg
  const weightChange = currentWeight - previousWeight;
  const weightProgress =
    ((previousWeight - currentWeight) / (previousWeight - goalWeight)) * 100;

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
      <Link to="/dashboard/weight">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {currentWeight.toFixed(1)}
                  </h2>
                  <span className="text-sm text-muted-foreground">kg</span>
                  {weightChange !== 0 && (
                    <div
                      className={`flex items-center ${
                        weightChange < 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {weightChange < 0 ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                      <span className="text-sm">
                        {Math.abs(weightChange).toFixed(1)} кг
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">поточна вага</p>
                <div className="text-sm text-muted-foreground">
                  Ціль: {goalWeight.toFixed(1)} кг
                </div>
              </div>
              <CircularProgress value={weightProgress} />
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/dashboard/shoulder">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-2xl font-bold">{currentShoulder}</h2>
                  <span className="text-sm text-muted-foreground">cm</span>
                  {shoulderChange !== 0 && (
                    <div
                      className={`flex items-center ${
                        shoulderChange > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {shoulderChange > 0 ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      <span className="text-sm">
                        {Math.abs(shoulderChange)} cm
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Обхват плеча</p>
              </div>
              <div className="h-[60px] w-[100px]">
                <SparklineChart data={shoulderData} />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default DashboardPage;
