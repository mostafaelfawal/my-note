import z from "zod";

export const NoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content must be at most 10,000 characters"),

  tags: z.array(z.string()).max(15, "Tags must be at most 15 tags"),
});

export type NoteSchemaType = z.infer<typeof NoteSchema>;
