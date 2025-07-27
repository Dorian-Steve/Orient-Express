// src/lib/validations/auth-validators.ts

import * as z from "zod";

export const studentSignUpFormSchema = z
  .object({
    // Personal Info (from User table)
    email: z.string().email({ message: "Please enter a valid email address." }),
    firstName: z.string().min(2, { message: "First name is required." }),
    lastName: z.string().min(2, { message: "Last name is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),

    // Academic Info (from student_profiles table, and new mandatory fields)
    studentId: z.string().min(1, { message: "Student ID is required." }), // Maps to schoolId in DB
    department: z.string().min(1, { message: "Department is required." }),
    program: z.string().min(1, { message: "Program is required." }),
    level: z.string().min(1, { message: "Academic level is required." }),
    yearOfAdmission: z.number().int().min(1900, { message: "Invalid year." }).max(new Date().getFullYear() + 1, { message: "Invalid year." }),
    expectedGraduationYear: z.number().int().min(new Date().getFullYear(), { message: "Invalid year." }).max(new Date().getFullYear() + 10, { message: "Invalid year." }),
    // New mandatory fields
    speciality: z.string().min(1, { message: "Speciality is required." }),
    academicBackground: z.string().min(1, { message: "Academic background is required." }),


    // Contact Details (from student_profiles table)
    phoneNumber: z.string().optional().or(z.literal("")),
    website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),

    // Social Links / Skills / Interests (from student_profiles table)
    skills: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
    x: z.string().url({ message: "Please enter a valid X (Twitter) URL." }).optional().or(z.literal("")),
    linkedIn: z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

// --- NEW: SignIn Form Schema ---
export const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(1, { message: "Password is required." }), // Minimum 1 for required, adjust if you have a specific min length
});
