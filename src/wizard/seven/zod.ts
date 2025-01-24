import { z } from "zod";

export const shoulderVolumeMeasurement = z.number();

export const formSchema = z.object({
  shoulderVolumeMeasurement,
});

export type FormSchema = z.infer<typeof formSchema>;
