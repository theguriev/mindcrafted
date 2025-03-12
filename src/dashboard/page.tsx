import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./components/circular-progress";
import { Dumbbell, Utensils } from "lucide-react";
import HipCard from "./components/hip-card";
import { FC, Suspense } from "react";
import HipsCard from "./components/hips-card";
import WaistCard from "./components/waist-card";
import BodyMeasurementLoader from "./components/body-measurement-loader";
import ChestCard from "./components/chest-card";
import ShoulderCard from "./components/shoulder-card";
import WeightCard from "./components/weight-card";
import WeightCardLoader from "./components/weight-card-loader";

// Дані харчування
const totalMeals = 4;
const completedMeals = 2;
const nutritionProgress = (completedMeals / totalMeals) * 100;

const todaySteps = 4789;
const goalSteps = 7000;
const progress = (todaySteps / goalSteps) * 100;

// Дані відстеження вправ
const totalExercises = 3;
const completedExercises = 2;
const exerciseProgress = (completedExercises / totalExercises) * 100;
const lastExercise = "Силове тренування";
const exerciseDuration = 45;

const DashboardPage: FC = () => {
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
        <Suspense fallback={<WeightCard />}>
          <WeightCardLoader />
        </Suspense>
      </Link>

      <Link to="/dashboard/shoulder">
        <Suspense fallback={<ShoulderCard />}>
          <BodyMeasurementLoader Component={ShoulderCard} type="shoulder" />
        </Suspense>
      </Link>

      <Link to="/dashboard/chest">
        <Suspense fallback={<ChestCard />}>
          <BodyMeasurementLoader Component={ChestCard} type="chest" />
        </Suspense>
      </Link>

      <Link to="/dashboard/waist">
        <Suspense fallback={<WaistCard />}>
          <BodyMeasurementLoader Component={WaistCard} type="waist" />
        </Suspense>
      </Link>

      <Link to="/dashboard/hips">
        <Suspense fallback={<HipsCard />}>
          <BodyMeasurementLoader Component={HipsCard} type="hips" />
        </Suspense>
      </Link>

      <Link to="/dashboard/hip">
        <Suspense fallback={<HipCard />}>
          <BodyMeasurementLoader Component={HipCard} type="hip" />
        </Suspense>
      </Link>
    </div>
  );
};

export default DashboardPage;
