import { z } from "zod";

export const spineIssues = z.string();

export const formSchema = z.object({
  spineIssues,
});

export type FormSchema = z.infer<typeof formSchema>;
