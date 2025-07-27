// "use client";

// import React from "react";
// import { motion, type Variants } from "framer-motion";
// import { type UseFormReturn } from "react-hook-form";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import {
//   type SignUpFormValues,
//   type StepDefinition,
// } from "@/types/step-props.types"; // Adjusted type imports

// interface ContactDetailsProps {
//   form: UseFormReturn<SignUpFormValues>;
//   itemVariants: Variants;
//   contentVariants: Variants;
//   step: StepDefinition & { fields: readonly ["phoneNumber", "website"] };
// }

// export const ContactDetails: React.FC<ContactDetailsProps> = ({
//   form,
//   itemVariants,
//   contentVariants,
//   step,
// }) => {
//   return (
//     <motion.div
//       variants={contentVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6"
//     >
//       <div className="text-center">
//         <div className="mx-auto mb-4">{step.icon}</div>
//         <h3 className="text-foreground text-2xl font-bold">{step.title}</h3>
//         <p className="text-muted-foreground mt-2">{step.subtitle}</p>
//       </div>

//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="phoneNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone Number (Optional)</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g., +237 6XX XXX XXX" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };
