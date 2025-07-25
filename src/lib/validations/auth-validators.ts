// src/lib/validations/auth-validators.ts

import * as z from "zod";

// Simplified studentSignUpFormSchema for initial registration
export const studentSignUpFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    firstName: z.string().min(2, { message: "First name is required." }),
    lastName: z.string().min(2, { message: "Last name is required." }),
    schoolId: z.string().min(1, { message: "School ID is required." }), // Added schoolId here
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(1, { message: "Password is required." }),
});
