import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrainingType } from "../types";

interface TrainingTypeSelectorProps {
  onSelect: (type: TrainingType) => void;
}

export const TrainingTypeSelector = ({ onSelect }: TrainingTypeSelectorProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="cursor-pointer hover:bg-accent" onClick={() => onSelect("home")}>
        <CardHeader>
          <CardTitle>Домашнє тренування</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Тренування вдома з використанням власної ваги та підручних засобів
          </p>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:bg-accent" onClick={() => onSelect("gym")}>
        <CardHeader>
          <CardTitle>Тренування в залі</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Тренування в тренажерному залі з використанням спортивного обладнання
          </p>
        </CardContent>
      </Card>
    </div>
  );
}; 
