import { z } from "zod";

export const whereDoSports = z.enum(["home", "gym"]);

export const formSchema = z.object({
  whereDoSports,
});

export type FormSchema = z.infer<typeof formSchema>;
