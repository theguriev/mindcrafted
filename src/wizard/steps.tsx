import SexStep from "./components/sex-step";
import FirstNameStep from "./components/first-name-step";
import LastNameStep from "./components/last-name.step";
import BirthdayStep from "./components/birthday-step";
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
      control: SexStep,
    },
  ],
  [
    "firstName",
    {
      control: FirstNameStep,
    },
  ],
  [
    "lastName",
    {
      control: LastNameStep,
    },
  ],
  [
    "birthday",
    {
      control: BirthdayStep,
    },
  ],
  [
    "height",
    {
      control: HeightStep,
    },
  ],
  [
    "weight",
    {
      control: WeightStep,
    },
  ],
  [
    "waistMeasurement",
    {
      control: WaistMeasurementStep,
    },
  ],
  [
    "shoulderVolumeMeasurement",
    {
      control: ShoulderVolumeMeasurementStep,
    },
  ],
  [
    "hipMeasurement",
    {
      control: HipMeasurementStep,
    },
  ],
  [
    "hipsMeasurement",
    {
      control: HipsMeasurementStep,
    },
  ],
  [
    "breastVolumeMeasurement",
    {
      control: BreastVolumeMeasurementStep,
    },
  ],
  [
    "contraindications",
    {
      control: ContraindicationsStep,
    },
  ],
  [
    "eatingDisorder",
    {
      control: EatingDisorderStep,
    },
  ],
  [
    "spineIssues",
    {
      control: SpineIssuesStep,
    },
  ],
  [
    "endocrineDisorders",
    {
      control: EndocrineDisordersStep,
    },
  ],
  [
    "physicalActivity",
    {
      control: PhysicalActivityStep,
    },
  ],
  [
    "foodIntolerances",
    {
      control: FoodIntoIerancesStep,
    },
  ],
  ["goal", { control: GoalStep }],
  [
    "whereDoSports",
    {
      control: WhereDoSportsStep,
    },
  ],
  [
    "gaveBirth",
    {
      control: GaveBirthStep,
    },
  ],
  [
    "breastfeeding",
    {
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
