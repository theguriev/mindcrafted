import { z } from "zod";

export const sex = z.enum(["male", "female"]);

export const formSchema = z.object({
  sex,
});

export type FormSchema = z.infer<typeof formSchema>;
