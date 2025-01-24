import { z } from "zod";

export const hipMeasurement = z.string();

export const formSchema = z.object({
  hipMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
