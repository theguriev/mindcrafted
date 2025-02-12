import useMeQuery from "@/hooks/useMeQuery";
import { FieldValues } from "react-hook-form";

export default [
  {
    name: "sex",
    label: "Ваша стать?",
    control: {
      controlType: "radio",
      options: [
        {
          label: "Чоловік",
          value: "male",
        },
        {
          label: "Жінка",
          value: "female",
        },
      ],
    },
  },
  {
    name: "firstName",
    control: {
      controlType: "input",
      placeholder: "Введіть ваше ім'я",
    },
  },
  {
    name: "lastName",
    control: {
      controlType: "input",
      placeholder: "Введіть ваше прізвище",
    },
  },
  {
    name: "birthday",
    control: {
      controlType: "date",
      placeholder: "Оберіть вашу дату народження",
      fromYear: 1950,
      toYear: new Date().getFullYear(),
    },
    prepareBody: (body: FieldValues) => ({
      birthday: body.birthday?.toISOString(),
    }),
    getDefaultValues: (data: ReturnType<typeof useMeQuery>["data"]) => ({
      birthday: data.meta?.birthday
        ? new Date(Date.parse(data.meta.birthday))
        : undefined,
    }),
  },
  {
    name: "height",
    control: {
      controlType: "input",
      placeholder: "Введіть ваш зріст (см)",
      type: "number",
      min: 100,
      max: 250,
    },
  },
  {
    name: "weight",
    control: {
      controlType: "input",
      placeholder: "Введіть вашу вагу (кг)",
      type: "number",
      min: 30,
      max: 250,
    },
  },
  {
    name: "waistMeasurement",
    control: {
      controlType: "input",
      placeholder: "Обхват талії (см)",
      type: "number",
    },
  },
  {
    name: "shoulderVolumeMeasurement",
    control: {
      controlType: "input",
      placeholder: "Обхват плеча (см)",
      type: "number",
    },
  },
  {
    name: "hipMeasurement",
    control: {
      controlType: "input",
      placeholder: "Обхват стегна (сідниці см)",
      type: "number",
    },
  },
  {
    name: "hipsMeasurement",
    control: {
      controlType: "input",
      placeholder: "Обхват стегон (см)",
      type: "number",
    },
  },
  {
    name: "breastVolumeMeasurement",
    control: {
      controlType: "input",
      placeholder: "Обхват грудей (см)",
      type: "number",
    },
  },
  {
    name: "contraindications",
    control: {
      controlType: "textarea",
      placeholder: "Чи є якість протипоказання до вправ від лікаря?",
    },
  },
  {
    name: "eatingDisorder",
    control: {
      controlType: "textarea",
      placeholder: "Чи нема у вас діагностованого розладу харчової поведінки?",
    },
  },
  {
    name: "spineIssues",
    control: {
      controlType: "textarea",
      placeholder:
        "Чи відсутні проблеми з хребтом, колінами, нирками, з тиском і т.д.?",
    },
  },
  {
    name: "endocrineDisorders",
    control: {
      controlType: "textarea",
      placeholder: "Чи нема ендокринних розладів?",
    },
  },
  {
    name: "physicalActivity",
    control: {
      controlType: "textarea",
      placeholder:
        "Яка у вас рухова активність за останній рік, включно з тренуваннями і роботою?",
    },
  },
  {
    name: "foodIntolerances",
    control: {
      controlType: "textarea",
      placeholder: "Чи є у вас непереносимість певних продуктів?",
    },
  },
  {
    name: "goal",
    control: {
      controlType: "textarea",
      placeholder: "Яка ваша ціль?",
    },
  },
  {
    name: "whereDoSports",
    control: {
      controlType: "radio",
      options: [
        {
          label: "Вдома",
          value: "home",
        },
        {
          label: "В залі",
          value: "gym",
        },
      ],
    },
  },
  {
    name: "gaveBirth",
    control: {
      controlType: "date",
      placeholder: "Якщо народжували то коли?",
      fromYear: 1990,
      toYear: new Date().getFullYear(),
    },
    prepareBody: (body: FieldValues) => ({
      gaveBirth: body.gaveBirth?.toISOString(),
    }),
    getDefaultValues: (data: ReturnType<typeof useMeQuery>["data"]) => ({
      gaveBirth: data.meta?.gaveBirth
        ? new Date(Date.parse(data.meta.gaveBirth))
        : undefined,
    }),
  },
  {
    name: "breastfeeding",
    control: {
      controlType: "radio",
      options: [
        {
          label: "Так",
          value: "yes",
        },
        {
          label: "Ні",
          value: "no",
        },
      ],
    },
  },
];
