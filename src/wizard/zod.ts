import { z } from "zod";

export const sex = z.enum(["male", "female"]);
export const firstName = z.string().min(3).max(20);
export const lastName = z.string().min(3).max(20);
export const birthday = z.date();
export const height = z.string();
export const weight = z.string();
export const waistMeasurement = z.string();
export const shoulderVolumeMeasurement = z.string();
export const hipMeasurement = z.string();
export const hipsMeasurement = z.string();
export const breastVolumeMeasurement = z.string();
export const contraindications = z.string();
export const eatingDisorder = z.string();
export const spineIssues = z.string();
export const endocrineDisorders = z.string();
export const physicalActivity = z.string();
export const foodIntolerances = z.string();
export const goal = z.string();
export const whereDoSports = z.enum(["home", "gym"]);
export const gaveBirth = z.date();
export const breastfeeding = z.enum(["yes", "no"]);

export const sexFormSchema = z.object({
  sex,
});

export type SexFormSchema = z.infer<typeof sexFormSchema>;

export const firstNameFormSchema = z.object({
  firstName,
});

export type FirstNameFormSchema = z.infer<typeof firstNameFormSchema>;

export const lastNameFormSchema = z.object({
  lastName,
});

export type LastNameFormSchema = z.infer<typeof lastNameFormSchema>;

export const birthdayFormSchema = z.object({
  birthday,
});

export type BirthdayFormSchema = z.infer<typeof birthdayFormSchema>;

export const heightFormSchema = z.object({
  height,
});

export type HeightFormSchema = z.infer<typeof heightFormSchema>;

export const weightFormSchema = z.object({
  weight,
});

export type WeightFormSchema = z.infer<typeof weightFormSchema>;

export const waistMeasurementFormSchema = z.object({
  waistMeasurement,
});

export type WaistMeasurementFormSchema = z.infer<
  typeof waistMeasurementFormSchema
>;

export const shoulderVolumeMeasurementFormSchema = z.object({
  shoulderVolumeMeasurement,
});

export type ShoulderVolumeMeasurementFormSchema = z.infer<
  typeof shoulderVolumeMeasurementFormSchema
>;

export const hipMeasurementFormSchema = z.object({
  hipMeasurement,
});

export type HipMeasurementFormSchema = z.infer<typeof hipMeasurementFormSchema>;

export const hipsMeasurementFormSchema = z.object({
  hipsMeasurement,
});

export type HipsMeasurementFormSchema = z.infer<
  typeof hipsMeasurementFormSchema
>;

export const breastVolumeMeasurementFormSchema = z.object({
  breastVolumeMeasurement,
});

export type BreastVolumeMeasurementFormSchema = z.infer<
  typeof breastVolumeMeasurementFormSchema
>;

export const contraindicationsFormSchema = z.object({
  contraindications,
});

export type ContraindicationsFormSchema = z.infer<
  typeof contraindicationsFormSchema
>;

export const eatingDisorderFormSchema = z.object({
  eatingDisorder,
});

export type EatingDisorderFormSchema = z.infer<typeof eatingDisorderFormSchema>;

export const spineIssuesFormSchema = z.object({
  spineIssues,
});

export type SpineIssuesFormSchema = z.infer<typeof spineIssuesFormSchema>;

export const endocrineDisordersFormSchema = z.object({
  endocrineDisorders,
});

export type EndocrineDisordersFormSchema = z.infer<
  typeof endocrineDisordersFormSchema
>;

export const physicalActivityFormSchema = z.object({
  physicalActivity,
});

export type PhysicalActivityFormSchema = z.infer<
  typeof physicalActivityFormSchema
>;

export const foodIntolerancesFormSchema = z.object({
  foodIntolerances,
});

export type FoodIntolerancesFormSchema = z.infer<
  typeof foodIntolerancesFormSchema
>;

export const goalFormSchema = z.object({
  goal,
});

export type GoalFormSchema = z.infer<typeof goalFormSchema>;

export const whereDoSportsFormSchema = z.object({
  whereDoSports,
});

export type WhereDoSportsFormSchema = z.infer<typeof whereDoSportsFormSchema>;

export const gaveBirthFormSchema = z.object({
  gaveBirth,
});

export type GaveBirthFormSchema = z.infer<typeof gaveBirthFormSchema>;

export const breastfeedingFormSchema = z.object({
  breastfeeding,
});

export type BreastfeedingFormSchema = z.infer<typeof breastfeedingFormSchema>;
