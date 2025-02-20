import { z } from "zod";

export const breastfeeding = z.enum(["yes", "no"]);

export const formSchema = z.object({
  breastfeeding,
});

export type FormSchema = z.infer<typeof formSchema>;
