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

export const formSchema = z.object({
  sex,
  firstName,
  lastName,
  birthday,
  height,
  weight,
  waistMeasurement,
  shoulderVolumeMeasurement,
  hipMeasurement,
  hipsMeasurement,
  breastVolumeMeasurement,
  contraindications,
  eatingDisorder,
  spineIssues,
  endocrineDisorders,
  physicalActivity,
  foodIntolerances,
  goal,
  whereDoSports,
  gaveBirth,
  breastfeeding,
});

export type FormSchema = z.infer<typeof formSchema>;
