"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  type SignUpFormValues,
  type StepDefinition,
  type Option,
} from "@/types/step-props.types"; // Adjusted type imports

// Assuming you have a MultiSelect component or will implement one
// For now, we'll use a basic input, but ideally this would be a multi-select
// import { MultiSelect } from "@/components/ui/multi-select"; // Example if you have one

interface SocialLinksProps {
  form: UseFormReturn<SignUpFormValues>;
  itemVariants: Variants;
  contentVariants: Variants;
  step: StepDefinition & {
    fields: readonly ["skills", "interests", "x", "linkedIn"];
  };
  skills: Option[];
  interests: Option[];
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  form,
  itemVariants,
  contentVariants,
  step,
  skills,
  interests,
}) => {
  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center">
        <div className="mx-auto mb-4">{step.icon}</div>
        <h3 className="text-foreground text-2xl font-bold">{step.title}</h3>
        <p className="text-muted-foreground mt-2">{step.subtitle}</p>
      </div>

      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills (Optional)</FormLabel>
              <FormControl>
                {/*
                  Ideally, this would be a MultiSelect component.
                  For now, using a simple Input. You'll need to implement
                  a MultiSelect if you want the tag-like selection.
                  Example: <MultiSelect options={skills} {...field} />
                */}
                <Input
                  placeholder="e.g., JavaScript, React, Node.js (comma-separated)"
                  {...field}
                  value={field.value?.join(", ") || ""} // Convert array to string for display
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((s) => s.trim()),
                    )
                  } // Convert string back to array
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests (Optional)</FormLabel>
              <FormControl>
                {/*
                  Ideally, this would be a MultiSelect component.
                  For now, using a simple Input.
                */}
                <Input
                  placeholder="e.g., AI, Web Development, Gaming (comma-separated)"
                  {...field}
                  value={field.value?.join(", ") || ""} // Convert array to string for display
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((s) => s.trim()),
                    )
                  } // Convert string back to array
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="x"
          render={({ field }) => (
            <FormItem>
              <FormLabel>X (Twitter) Profile (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., https://x.com/yourprofile"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., https://linkedin.com/in/yourprofile"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </motion.div>
  );
};
