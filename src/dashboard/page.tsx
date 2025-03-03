import type React from "react";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./components/circular-progress";
import { ArrowDown, ArrowUp, Dumbbell, Ruler, Utensils } from "lucide-react";
import SparklineChart from "./components/sparkline-chart";

// Дані вимірювання плечей
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

// Дані вимірювання грудей
const chestData = [
  { date: "2024-02-16", value: 95 },
  { date: "2024-02-17", value: 95 },
  { date: "2024-02-18", value: 96 },
  { date: "2024-02-19", value: 96 },
  { date: "2024-02-20", value: 97 },
  { date: "2024-02-21", value: 97 },
  { date: "2024-02-22", value: 98 },
];
const currentChest = chestData[chestData.length - 1].value;
const previousChest = chestData[chestData.length - 2].value;
const chestChange = currentChest - previousChest;

// Дані вимірювання талії
const waistData = [
  { date: "2024-02-16", value: 82 },
  { date: "2024-02-17", value: 82 },
  { date: "2024-02-18", value: 81 },
  { date: "2024-02-19", value: 81 },
  { date: "2024-02-20", value: 80 },
  { date: "2024-02-21", value: 80 },
  { date: "2024-02-22", value: 79 },
];
const currentWaist = waistData[waistData.length - 1].value;
const previousWaist = waistData[waistData.length - 2].value;
const waistChange = currentWaist - previousWaist;

// Дані вимірювання стегон
const hipsData = [
  { date: "2024-02-16", value: 98 },
  { date: "2024-02-17", value: 98 },
  { date: "2024-02-18", value: 97 },
  { date: "2024-02-19", value: 97 },
  { date: "2024-02-20", value: 96 },
  { date: "2024-02-21", value: 96 },
  { date: "2024-02-22", value: 95 },
];
const currentHips = hipsData[hipsData.length - 1].value;
const previousHips = hipsData[hipsData.length - 2].value;
const hipsChange = currentHips - previousHips;

// Дані вимірювання стегна
const hipData = [
  { date: "2024-02-16", value: 93 },
  { date: "2024-02-17", value: 93 },
  { date: "2024-02-18", value: 92 },
  { date: "2024-02-19", value: 92 },
  { date: "2024-02-20", value: 91 },
  { date: "2024-02-21", value: 91 },
  { date: "2024-02-22", value: 90 },
];
const currentHip = hipData[hipData.length - 1].value;
const previousHip = hipData[hipData.length - 2].value;
const hipChange = currentHip - previousHip;

// Дані харчування
const totalMeals = 4;
const completedMeals = 2;
const nutritionProgress = (completedMeals / totalMeals) * 100;

const DashboardPage: React.FC = () => {
  const todaySteps = 4789;
  const goalSteps = 7000;
  const progress = (todaySteps / goalSteps) * 100;

  // Дані відстеження ваги
  const currentWeight = 75.5; // кг
  const previousWeight = 76.2; // кг
  const goalWeight = 70; // кг
  const weightChange = currentWeight - previousWeight;
  const weightProgress =
    ((previousWeight - currentWeight) / (previousWeight - goalWeight)) * 100;

  // Дані відстеження вправ
  const totalExercises = 3;
  const completedExercises = 2;
  const exerciseProgress = (completedExercises / totalExercises) * 100;
  const lastExercise = "Силове тренування";
  const exerciseDuration = 45;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <Link to="/dashboard/nutrition">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
          <CardContent className="p-6 flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-2xl font-bold">
                    {completedMeals}/{totalMeals}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  харчування сьогодні завершено
                </p>
                <div className="flex w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-primary"
                    style={{ width: `${nutritionProgress}%` }}
                  />
                </div>
              </div>
              <CircularProgress value={nutritionProgress} />
            </div>
          </CardContent>
        </Card>
      </Link>
      <Link to="/dashboard/steps">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
          <CardContent className="p-6 flex-1">
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
      <Link to="/dashboard/exercise">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
          <CardContent className="p-6 flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-2xl font-bold">
                    {completedExercises}/{totalExercises}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">вправ завершено</p>
                <div className="text-sm text-muted-foreground">
                  Остання: {lastExercise} ({exerciseDuration} хв)
                </div>
              </div>
              <CircularProgress value={exerciseProgress} />
            </div>
          </CardContent>
        </Card>
      </Link>
      <Link to="/dashboard/weight">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
          <CardContent className="p-6 flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {currentWeight.toFixed(1)}
                  </h2>
                  <span className="text-sm text-muted-foreground">кг</span>
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
        <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
          <CardContent className="p-6 flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-2xl font-bold">{currentShoulder}</h2>
                  <span className="text-sm text-muted-foreground">см</span>
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
                        {Math.abs(shoulderChange)} см
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">обхват плеча</p>
              </div>
              <div className="h-[60px] w-[100px]">
                <SparklineChart data={shoulderData} />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/dashboard/chest">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
          <CardContent className="p-6 flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-2xl font-bold">{currentChest}</h2>
                  <span className="text-sm text-muted-foreground">см</span>
                  {chestChange !== 0 && (
                    <div
                      className={`flex items-center ${
                        chestChange > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {chestChange > 0 ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      <span className="text-sm">
                        {Math.abs(chestChange)} см
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">обхват грудей</p>
              </div>
              <div className="h-[60px] w-[100px]">
                <SparklineChart data={chestData} />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/dashboard/waist">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
          <CardContent className="p-6 flex-1">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-2xl font-bold">{currentWaist}</h2>
                  <span className="text-sm text-muted-foreground">см</span>
                  {waistChange !== 0 && (
                    <div
                      className={`flex items-center ${
                        waistChange < 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {waistChange < 0 ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                      <span className="text-sm">
                        {Math.abs(waistChange)} см
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">обхват талії</p>
              </div>
              <div className="h-[60px] w-[100px]">
                <SparklineChart data={waistData} />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/dashboard/hips">
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
      </Link>

      <Link to="/dashboard/hip">
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
      </Link>
    </div>
  );
};

export default DashboardPage;
