import { z } from "zod";

export const height = z.number();

export const formSchema = z.object({
  height,
});

export type FormSchema = z.infer<typeof formSchema>;
