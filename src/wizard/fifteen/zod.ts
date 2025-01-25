import { z } from "zod";

export const physicalActivity = z.string();

export const formSchema = z.object({
  physicalActivity,
});

export type FormSchema = z.infer<typeof formSchema>;
