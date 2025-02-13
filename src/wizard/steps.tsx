import SexStep from "./components/sex-step";
import {
  firstNameFormSchema,
  sexFormSchema,
  lastNameFormSchema,
  birthdayFormSchema,
  heightFormSchema,
  weightFormSchema,
  waistMeasurementFormSchema,
  shoulderVolumeMeasurementFormSchema,
  hipMeasurementFormSchema,
  hipsMeasurementFormSchema,
  breastVolumeMeasurementFormSchema,
  contraindicationsFormSchema,
  eatingDisorderFormSchema,
  spineIssuesFormSchema,
  endocrineDisordersFormSchema,
  physicalActivityFormSchema,
  foodIntolerancesFormSchema,
  goalFormSchema,
  whereDoSportsFormSchema,
  gaveBirthFormSchema,
  breastfeedingFormSchema,
} from "./zod";
import FirstNameStep from "./components/first-name-step";
import LastNameStep from "./components/last-name.step";
import BirthdayStep from "./components/birthday-step";
import useMeQuery from "@/hooks/useMeQuery";
import { FieldValues } from "react-hook-form";
import HeightStep from "./components/height-step";
import WeightStep from "./components/weight-step";
import WaistMeasurementStep from "./components/waist-measurement-step";
import ShoulderVolumeMeasurementStep from "./components/shoulder-volume-measurement-step";
import HipMeasurementStep from "./components/hip-measurement-step";
import HipsMeasurementStep from "./components/hips-measurement-step";
import BreastVolumeMeasurementStep from "./components/breast-volume-measurement-step";
import ContraindicationsStep from "./components/contraindications-step";
import EatingDisorderStep from "./components/eating-disorder-step";
import SpineIssuesStep from "./components/spine-issues-step";
import EndocrineDisordersStep from "./components/endocrine-disorders-step";
import PhysicalActivityStep from "./components/physical-activity-step";
import FoodIntoIerancesStep from "./components/foodInto-ierances-step";
import GoalStep from "./components/goal-step";
import WhereDoSportsStep from "./components/where-do-sports-step";
import GaveBirthStep from "./components/gave-birth-step";
import BreastfeedingStep from "./components/breastfeeding-step";

const stepEntries = [
  [
    "sex",
    {
      formSchema: sexFormSchema,
      control: SexStep,
    },
  ],
  [
    "firstName",
    {
      formSchema: firstNameFormSchema,
      control: FirstNameStep,
    },
  ],
  [
    "lastName",
    {
      formSchema: lastNameFormSchema,
      control: LastNameStep,
    },
  ],
  [
    "birthday",
    {
      formSchema: birthdayFormSchema,
      control: BirthdayStep,
      prepareBody: (body: FieldValues) => ({
        birthday: body.birthday?.toISOString(),
      }),
      getDefaultValues: (data: ReturnType<typeof useMeQuery>["data"]) => ({
        birthday: data.meta?.birthday
          ? new Date(Date.parse(data.meta.birthday))
          : undefined,
      }),
    },
  ],
  [
    "height",
    {
      formSchema: heightFormSchema,
      control: HeightStep,
    },
  ],
  [
    "weight",
    {
      formSchema: weightFormSchema,
      control: WeightStep,
    },
  ],
  [
    "waistMeasurement",
    {
      formSchema: waistMeasurementFormSchema,
      control: WaistMeasurementStep,
    },
  ],
  [
    "shoulderVolumeMeasurement",
    {
      formSchema: shoulderVolumeMeasurementFormSchema,
      control: ShoulderVolumeMeasurementStep,
    },
  ],
  [
    "hipMeasurement",
    {
      formSchema: hipMeasurementFormSchema,
      control: HipMeasurementStep,
    },
  ],
  [
    "hipsMeasurement",
    {
      formSchema: hipsMeasurementFormSchema,
      control: HipsMeasurementStep,
    },
  ],
  [
    "breastVolumeMeasurement",
    {
      formSchema: breastVolumeMeasurementFormSchema,
      control: BreastVolumeMeasurementStep,
    },
  ],
  [
    "contraindications",
    {
      formSchema: contraindicationsFormSchema,
      control: ContraindicationsStep,
    },
  ],
  [
    "eatingDisorder",
    {
      formSchema: eatingDisorderFormSchema,
      control: EatingDisorderStep,
    },
  ],
  [
    "spineIssues",
    {
      formSchema: spineIssuesFormSchema,
      control: SpineIssuesStep,
    },
  ],
  [
    "endocrineDisorders",
    {
      formSchema: endocrineDisordersFormSchema,
      control: EndocrineDisordersStep,
    },
  ],
  [
    "physicalActivity",
    {
      formSchema: physicalActivityFormSchema,
      control: PhysicalActivityStep,
    },
  ],
  [
    "foodIntolerances",
    {
      formSchema: foodIntolerancesFormSchema,
      control: FoodIntoIerancesStep,
    },
  ],
  ["goal", { name: "goal", formSchema: goalFormSchema, control: GoalStep }],
  [
    "whereDoSports",
    {
      formSchema: whereDoSportsFormSchema,
      control: WhereDoSportsStep,
    },
  ],
  [
    "gaveBirth",
    {
      prepareBody: (body: FieldValues) => ({
        gaveBirth: body.gaveBirth?.toISOString(),
      }),
      getDefaultValues: (data: ReturnType<typeof useMeQuery>["data"]) => ({
        gaveBirth: data.meta?.gaveBirth
          ? new Date(Date.parse(data.meta.gaveBirth))
          : undefined,
      }),
      formSchema: gaveBirthFormSchema,
      control: GaveBirthStep,
    },
  ],
  [
    "breastfeeding",
    {
      formSchema: breastfeedingFormSchema,
      control: BreastfeedingStep,
    },
  ],
] as const;

export const stepEntriesWithNameAndIndex = stepEntries.map(
  ([name, step], index) => [name, { ...step, name, index }] as const
);

const steps = new Map(stepEntriesWithNameAndIndex);

export default steps;

export type StepsKeys = Parameters<(typeof steps)["get"]>[0];
export type StepObject = ReturnType<(typeof steps)["get"]>;

export const hasStep = (step: string): step is StepsKeys =>
  steps.has(step as StepsKeys);
