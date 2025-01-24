import { z } from "zod";

export const shoulderVolumeMeasurement = z.string();

export const formSchema = z.object({
  shoulderVolumeMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
