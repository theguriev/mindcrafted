import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Training } from "../types";

interface HomeTrainingFormProps {
  onSubmit: (training: Training) => void;
  onBack: () => void;
}

export const HomeTrainingForm = ({ onSubmit, onBack }: HomeTrainingFormProps) => {
  const [rounds, setRounds] = React.useState("");
  const [exercisesPerRound, setExercisesPerRound] = React.useState("");
  const [feelings, setFeelings] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: "home",
      date: new Date().toISOString(),
      feelings,
      rounds: Number(rounds),
      exercisesPerRound: Number(exercisesPerRound),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Домашнє тренування</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rounds">Кількість кругів</Label>
            <Input
              id="rounds"
              type="number"
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
              required
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exercisesPerRound">Вправи на круг</Label>
            <Input
              id="exercisesPerRound"
              type="number"
              value={exercisesPerRound}
              onChange={(e) => setExercisesPerRound(e.target.value)}
              required
              min="1"
            />
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
            <Button type="submit" className="flex-1">
              Зберегти
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 
