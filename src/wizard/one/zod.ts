import { z } from "zod";

export const firstName = z.string().min(3).max(20);

export const formSchema = z.object({
  firstName,
});

export type FormSchema = z.infer<typeof formSchema>;
