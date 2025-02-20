import { z } from "zod";

export const hipsMeasurement = z.string();

export const formSchema = z.object({
  hipsMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
