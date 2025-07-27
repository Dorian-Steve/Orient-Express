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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import {
//   type SignUpFormValues,
//   type StepDefinition,
//   type Option,
// } from "@/types/step-props.types"; // Adjusted type imports

// interface AcademicInfoProps {
//   form: UseFormReturn<SignUpFormValues>;
//   itemVariants: Variants;
//   contentVariants: Variants;
//   step: StepDefinition & {
//     fields: readonly [
//       "studentId",
//       "department",
//       "program",
//       "level",
//       "yearOfAdmission",
//       "expectedGraduationYear",
//       "speciality",
//       "academicBackground",
//     ];
//   };
//   departments: Option[];
//   levels: Option[];
//   programs: Option[];
// }

// export const AcademicInfo: React.FC<AcademicInfoProps> = ({
//   form,
//   itemVariants,
//   contentVariants,
//   step,
//   departments,
//   levels,
//   programs,
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
//           name="studentId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Student ID</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g., IUT2023001" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="department"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Department</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select your department" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {departments.map((option) => (
//                     <SelectItem key={option.id} value={option.id}>
//                       {option.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="program"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Program</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select your program" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {programs.map((option) => (
//                     <SelectItem key={option.id} value={option.id}>
//                       {option.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="level"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Academic Level</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select your academic level" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {levels.map((option) => (
//                     <SelectItem key={option.id} value={option.id}>
//                       {option.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="yearOfAdmission"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Year of Admission</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   placeholder="e.g., 2023"
//                   {...field}
//                   onChange={(e) =>
//                     field.onChange(parseInt(e.target.value) || "")
//                   } // Convert to number
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="expectedGraduationYear"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Expected Graduation Year</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   placeholder="e.g., 2026"
//                   {...field}
//                   onChange={(e) =>
//                     field.onChange(parseInt(e.target.value) || "")
//                   } // Convert to number
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>

//       {/* New Mandatory Field: Speciality */}
//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="speciality"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Speciality</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g., Software Engineering" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>

//       {/* New Mandatory Field: Academic Background */}
//       <motion.div variants={itemVariants}>
//         <FormField
//           control={form.control}
//           name="academicBackground"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Academic Background</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g., Baccalaureate S" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };
