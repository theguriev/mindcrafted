import { z } from "zod";

export const waistMeasurement = z.number();

export const formSchema = z.object({
  waistMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
