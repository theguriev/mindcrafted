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

const steps = new Map([
  [
    "sex",
    {
      name: "sex",
      formSchema: sexFormSchema,
      control: SexStep,
    },
  ],
  [
    "firstName",
    {
      name: "firstName",
      formSchema: firstNameFormSchema,
      control: FirstNameStep,
    },
  ],
  [
    "lastName",
    {
      name: "lastName",
      formSchema: lastNameFormSchema,
      control: LastNameStep,
    },
  ],
  [
    "birthday",
    {
      name: "birthday",
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
      name: "height",
      formSchema: heightFormSchema,
      control: HeightStep,
    },
  ],
  [
    "weight",
    {
      name: "weight",
      formSchema: weightFormSchema,
      control: WeightStep,
    },
  ],
  [
    "waistMeasurement",
    {
      name: "waistMeasurement",
      formSchema: waistMeasurementFormSchema,
      control: WaistMeasurementStep,
    },
  ],
  [
    "shoulderVolumeMeasurement",
    {
      name: "shoulderVolumeMeasurement",
      formSchema: shoulderVolumeMeasurementFormSchema,
      control: ShoulderVolumeMeasurementStep,
    },
  ],
  [
    "hipMeasurement",
    {
      name: "hipMeasurement",
      formSchema: hipMeasurementFormSchema,
      control: HipMeasurementStep,
    },
  ],
  [
    "hipsMeasurement",
    {
      name: "hipsMeasurement",
      formSchema: hipsMeasurementFormSchema,
      control: HipsMeasurementStep,
    },
  ],
  [
    "breastVolumeMeasurement",
    {
      name: "breastVolumeMeasurement",
      formSchema: breastVolumeMeasurementFormSchema,
      control: BreastVolumeMeasurementStep,
    },
  ],
  [
    "contraindications",
    {
      name: "contraindications",
      formSchema: contraindicationsFormSchema,
      control: ContraindicationsStep,
    },
  ],
  [
    "eatingDisorder",
    {
      name: "eatingDisorder",
      formSchema: eatingDisorderFormSchema,
      control: EatingDisorderStep,
    },
  ],
  [
    "spineIssues",
    {
      name: "spineIssues",
      formSchema: spineIssuesFormSchema,
      control: SpineIssuesStep,
    },
  ],
  [
    "endocrineDisorders",
    {
      name: "endocrineDisorders",
      formSchema: endocrineDisordersFormSchema,
      control: EndocrineDisordersStep,
    },
  ],
  [
    "physicalActivity",
    {
      name: "physicalActivity",
      formSchema: physicalActivityFormSchema,
      control: PhysicalActivityStep,
    },
  ],
] as const);

export default steps;

export type StepsKeys = Parameters<(typeof steps)["get"]>[0];
export type StepObject = ReturnType<(typeof steps)["get"]>;

export const hasStep = (step: string): step is StepsKeys =>
  steps.has(step as StepsKeys);

// {
//   name: "foodIntolerances",
//   control: {
//     controlType: "textarea",
//     placeholder: "Чи є у вас непереносимість певних продуктів?",
//   },
// },
// {
//   name: "goal",
//   control: {
//     controlType: "textarea",
//     placeholder: "Яка ваша ціль?",
//   },
// },
// {
//   name: "whereDoSports",
//   control: {
//     controlType: "radio",
//     options: [
//       {
//         label: "Вдома",
//         value: "home",
//       },
//       {
//         label: "В залі",
//         value: "gym",
//       },
//     ],
//   },
// },
// {
//   name: "gaveBirth",
//   control: {
//     controlType: "date",
//     placeholder: "Якщо народжували то коли?",
//     fromYear: 1990,
//     toYear: new Date().getFullYear(),
//   },
//   prepareBody: (body: FieldValues) => ({
//     gaveBirth: body.gaveBirth?.toISOString(),
//   }),
//   getDefaultValues: (data: ReturnType<typeof useMeQuery>["data"]) => ({
//     gaveBirth: data.meta?.gaveBirth
//       ? new Date(Date.parse(data.meta.gaveBirth))
//       : undefined,
//   }),
// },
// {
//   name: "breastfeeding",
//   control: {
//     controlType: "radio",
//     options: [
//       {
//         label: "Так",
//         value: "yes",
//       },
//       {
//         label: "Ні",
//         value: "no",
//       },
//     ],
//   },
// },
// ] as const;

// export const stepsDictionary = steps.reduce<
//   Record<(typeof steps)[number]["name"], (typeof steps)[number]>
// >(
//   (acc, step) => ({ ...acc, [step.name]: step }),
//   {} as Record<(typeof steps)[number]["name"], (typeof steps)[number]>
// );
