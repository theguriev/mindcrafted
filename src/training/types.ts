export type TrainingType = "home" | "gym";
export type TrainingDay = 1 | 2 | 3;

export interface BaseTraining {
  type: TrainingType;
  date: string;
  feelings: string;
}

export interface HomeTraining extends BaseTraining {
  type: "home";
  rounds: number;
  exercisesPerRound: number;
}

export interface GymTraining extends BaseTraining {
  type: "gym";
  trainingDay: TrainingDay;
}

export type Training = HomeTraining | GymTraining; 
