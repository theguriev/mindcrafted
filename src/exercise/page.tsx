import { Check, Plus, Timer } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ExercisePage: FC = () => {
  const exerciseTypes = {
    cardio: ["Біг", "Велосипед", "Плавання", "Ходьба", "Гребля", "Скакалка"],
    strength: [
      "Силові тренування",
      "Вправи з власною вагою",
      "Резинові стрічки",
      "Тренування з гирями",
      "Кросфіт",
    ],
    flexibility: ["Йога", "Розтяжка", "Пілатес", "Мобільність"],
  };

  const [exercises, setExercises] = useState([
    {
      id: 1,
      type: "strength",
      name: "Силові тренування",
      duration: 45,
      intensity: "середня",
      completed: true,
    },
    {
      id: 2,
      type: "cardio",
      name: "Біг",
      duration: 30,
      intensity: "висока",
      completed: true,
    },
    {
      id: 3,
      type: "flexibility",
      name: "Йога",
      duration: 20,
      intensity: "низька",
      completed: false,
    },
  ]);

  const [newExercise, setNewExercise] = useState({
    type: "",
    name: "",
    duration: 30,
    intensity: "середня",
  });

  const completedExercises = exercises.filter((ex) => ex.completed).length;
  const totalExercises = exercises.length;
  const progress = (completedExercises / totalExercises) * 100;

  const handleAddExercise = () => {
    if (newExercise.type && newExercise.name) {
      setExercises([
        ...exercises,
        {
          id: exercises.length + 1,
          ...newExercise,
          completed: false,
        },
      ]);
      setNewExercise({
        type: "",
        name: "",
        duration: 30,
        intensity: "середня",
      });
    }
  };

  const toggleExercise = (id: number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "низька":
        return "text-green-500";
      case "середня":
        return "text-yellow-500";
      case "висока":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Прогрес щоденних вправ</CardTitle>
          <CardDescription>Відстежуйте свій режим вправ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>
                Прогрес: {completedExercises}/{totalExercises} вправ
              </span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Додати нову вправу</CardTitle>
          <CardDescription>Плануйте свій режим тренувань</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Тип вправи</Label>
                <Select
                  value={newExercise.type}
                  onValueChange={(value) =>
                    setNewExercise({ ...newExercise, type: value, name: "" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardio">Кардіо</SelectItem>
                    <SelectItem value="strength">Силові</SelectItem>
                    <SelectItem value="flexibility">Гнучкість</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Назва вправи</Label>
                <Select
                  value={newExercise.name}
                  onValueChange={(value) =>
                    setNewExercise({ ...newExercise, name: value })
                  }
                  disabled={!newExercise.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть вправу" />
                  </SelectTrigger>
                  <SelectContent>
                    {newExercise.type &&
                      exerciseTypes[
                        newExercise.type as keyof typeof exerciseTypes
                      ].map((exercise) => (
                        <SelectItem key={exercise} value={exercise}>
                          {exercise}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Тривалість (хвилини)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newExercise.duration}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      duration: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intensity">Інтенсивність</Label>
                <Select
                  value={newExercise.intensity}
                  onValueChange={(value) =>
                    setNewExercise({ ...newExercise, intensity: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть інтенсивність" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="низька">Низька</SelectItem>
                    <SelectItem value="середня">Середня</SelectItem>
                    <SelectItem value="висока">Висока</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAddExercise}
              disabled={!newExercise.type || !newExercise.name}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Додати вправу
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {exercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={exercise.completed ? "border-green-200" : ""}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{exercise.name}</h3>
                    <Badge variant="secondary" className="capitalize">
                      {exercise.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    {exercise.duration} хвилин
                  </div>
                  <div
                    className={`text-sm ${getIntensityColor(
                      exercise.intensity
                    )} capitalize`}
                  >
                    {exercise.intensity} інтенсивність
                  </div>
                </div>
                <Button
                  variant={exercise.completed ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleExercise(exercise.id)}
                >
                  {exercise.completed ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Завершено
                    </>
                  ) : (
                    "Позначити завершеним"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExercisePage;
