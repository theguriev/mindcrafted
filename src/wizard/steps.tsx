import SexStep from "./components/sex-step";
import {
  firstNameFormSchema,
  sexFormSchema,
  lastNameFormSchema,
  birthdayFormSchema,
  heightFormSchema,
  weightFormSchema,
  waistMeasurementFormSchema,
} from "./zod";
import FirstNameStep from "./components/first-name-step";
import LastNameStep from "./components/last-name.step";
import BirthdayStep from "./components/birthday-step";
import useMeQuery from "@/hooks/useMeQuery";
import { FieldValues } from "react-hook-form";
import HeightStep from "./components/height-step";
import WeightStep from "./components/weight-step";
import WaistMeasurementStep from "./components/waist-measurement-step";

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
] as const);

export default steps;

export type StepsKeys = Parameters<(typeof steps)["get"]>[0];
export type StepObject = ReturnType<(typeof steps)["get"]>;

export const hasStep = (step: string): step is StepsKeys =>
  steps.has(step as StepsKeys);

// {
//   name: "waistMeasurement",
//   control: {
//     controlType: "input",
//     placeholder: "Обхват талії (см)",
//     type: "number",
//   },
// },
// {
//   name: "shoulderVolumeMeasurement",
//   control: {
//     controlType: "input",
//     placeholder: "Обхват плеча (см)",
//     type: "number",
//   },
// },
// {
//   name: "hipMeasurement",
//   control: {
//     controlType: "input",
//     placeholder: "Обхват стегна (сідниці см)",
//     type: "number",
//   },
// },
// {
//   name: "hipsMeasurement",
//   control: {
//     controlType: "input",
//     placeholder: "Обхват стегон (см)",
//     type: "number",
//   },
// },
// {
//   name: "breastVolumeMeasurement",
//   control: {
//     controlType: "input",
//     placeholder: "Обхват грудей (см)",
//     type: "number",
//   },
// },
// {
//   name: "contraindications",
//   control: {
//     controlType: "textarea",
//     placeholder: "Чи є якість протипоказання до вправ від лікаря?",
//   },
// },
// {
//   name: "eatingDisorder",
//   control: {
//     controlType: "textarea",
//     placeholder: "Чи нема у вас діагностованого розладу харчової поведінки?",
//   },
// },
// {
//   name: "spineIssues",
//   control: {
//     controlType: "textarea",
//     placeholder:
//       "Чи відсутні проблеми з хребтом, колінами, нирками, з тиском і т.д.?",
//   },
// },
// {
//   name: "endocrineDisorders",
//   control: {
//     controlType: "textarea",
//     placeholder: "Чи нема ендокринних розладів?",
//   },
// },
// {
//   name: "physicalActivity",
//   control: {
//     controlType: "textarea",
//     placeholder:
//       "Яка у вас рухова активність за останній рік, включно з тренуваннями і роботою?",
//   },
// },
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
