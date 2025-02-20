import { z } from "zod";

export const height = z.string();

export const formSchema = z.object({
  height,
});

export type FormSchema = z.infer<typeof formSchema>;
