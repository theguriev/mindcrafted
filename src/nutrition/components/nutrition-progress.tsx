import { Scale } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionProgressProps {
  completedMeals: number;
  totalMeals: number;
  progress: number;
}

export function NutritionProgress({
  completedMeals,
  totalMeals,
  progress,
}: NutritionProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Прогрес щоденних прийомів їжі</CardTitle>
        <CardDescription>
          Відстежуйте свої 4 прийоми їжі на день
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>
              Прогрес: {completedMeals}/{totalMeals} прийомів їжі
            </span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t pt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Scale className="h-4 w-4" />
          <span>
            Всі ваги вказані для сирих продуктів. Не перевищуйте рекомендовані
            порції.
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
