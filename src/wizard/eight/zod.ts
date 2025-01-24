import { z } from "zod";

export const hipMeasurement = z.number();

export const formSchema = z.object({
  hipMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
