import { z } from "zod";

export const breastVolumeMeasurement = z.string();

export const formSchema = z.object({
  breastVolumeMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
