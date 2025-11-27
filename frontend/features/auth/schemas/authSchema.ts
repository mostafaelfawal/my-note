import z from "zod";
import { passwordRules } from "./rules";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .refine(passwordRules.upper, "Must contain at least one uppercase letter")
  .refine(passwordRules.lower, "Must contain at least one lowercase letter")
  .refine(passwordRules.number, "Must contain at least one number")
  .refine(passwordRules.special, "Must contain at least one special character");

export const AuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  name: z.string().min(2, "Name is too short").optional(),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
