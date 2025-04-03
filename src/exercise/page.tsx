import React from "react";
import { TrainingTypeSelector } from "../training/components/training-type-selector";
import { HomeTrainingForm } from "../training/components/home-training-form";
import { GymTrainingForm } from "../training/components/gym-training-form";
import { Training, TrainingType } from "../training/types";

const ExercisePage = () => {
  const [selectedType, setSelectedType] = React.useState<TrainingType | null>(null);

  const handleSubmit = (training: Training) => {
    // Тут можна додати логіку збереження тренування
    console.log("Збережено тренування:", training);
    setSelectedType(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Тренування</h1>
      
      {!selectedType ? (
        <TrainingTypeSelector onSelect={setSelectedType} />
      ) : selectedType === "home" ? (
        <HomeTrainingForm
          onSubmit={handleSubmit}
          onBack={() => setSelectedType(null)}
        />
      ) : (
        <GymTrainingForm
          onSubmit={handleSubmit}
          onBack={() => setSelectedType(null)}
        />
      )}
    </div>
  );
};

export default ExercisePage;

