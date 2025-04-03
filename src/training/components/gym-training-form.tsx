import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Training, TrainingDay } from "../types";

interface GymTrainingFormProps {
  onSubmit: (training: Training) => void;
  onBack: () => void;
}

export const GymTrainingForm = ({ onSubmit, onBack }: GymTrainingFormProps) => {
  const [trainingDay, setTrainingDay] = React.useState<TrainingDay | null>(null);
  const [feelings, setFeelings] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trainingDay) {
      onSubmit({
        type: "gym",
        date: new Date().toISOString(),
        feelings,
        trainingDay,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Тренування в залі</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Тренувальний день</Label>
            <div className="flex gap-2">
              {[1, 2, 3].map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={trainingDay === day ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setTrainingDay(day as TrainingDay)}
                >
                  День {day}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feelings">Як ви себе почуваєте?</Label>
            <Textarea
              id="feelings"
              value={feelings}
              onChange={(e) => setFeelings(e.target.value)}
              required
              placeholder="Опишіть своє самопочуття після тренування..."
            />
          </div>
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Назад
            </Button>
            <Button type="submit" className="flex-1" disabled={!trainingDay}>
              Зберегти
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 
