// src/types/step-props.types.ts

import React from "react";
import { type Variants } from "framer-motion";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { studentSignUpFormSchema } from "@/lib/validations/auth-validators"; // Import the schema

// Define the base type for form values
export type SignUpFormValues = z.infer<typeof studentSignUpFormSchema>;

export interface StepDefinition {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fields: readonly (keyof SignUpFormValues)[];
}

export interface StepComponentProps {
  form: UseFormReturn<SignUpFormValues>;
  itemVariants: Variants;
  contentVariants: Variants;
  step: StepDefinition;
}

// Add types for options if they are passed directly
export interface Option {
  id: string;
  name: string;
}
