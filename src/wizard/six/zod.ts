import { z } from "zod";

export const waistMeasurement = z.string();

export const formSchema = z.object({
  waistMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
