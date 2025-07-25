// src/server/api/routers/auth.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"; // Ensure this path is correct
import { studentSignUpFormSchema } from "@/lib/validations/auth-validators"; // Ensure this path is correct and schema is correct
import bcrypt from "bcryptjs"; // For password hashing
import { TRPCError } from "@trpc/server"; // For throwing tRPC-specific errors
import { UserRole } from "@prisma/client"; // Ensure UserRole enum is imported from Prisma client

export const authRouter = createTRPCRouter({
  // This creates the 'auth.student' path
  student: createTRPCRouter({
    // This creates the 'auth.student.signup' procedure
    signup: publicProcedure
      .input(studentSignUpFormSchema) // Validate input with your schema
      .mutation(async ({ input, ctx }) => {
        const { prisma } = ctx; // Access Prisma client from tRPC context

        // 1. Check if user with email or schoolId already exists
        const existingUserByEmail = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (existingUserByEmail) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email already registered.",
          });
        }

        const existingUserBySchoolId = await prisma.user.findUnique({
          where: { schoolId: input.schoolId },
        });

        if (existingUserBySchoolId) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "School ID is already in use.",
          });
        }

        // 2. Deduce User Role based on schoolId prefix
        let role: UserRole = UserRole.STUDENT; // Default role
        if (input.schoolId.startsWith("AM")) {
          role = UserRole.ADMIN;
        } else if (input.schoolId.startsWith("AV")) {
          role = UserRole.ADVISOR;
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // 4. Create the User and (initially minimal) StudentProfile in a transaction
        // Using a transaction ensures that either both records are created or neither are,
        // maintaining data integrity.
        const newUser = await prisma.$transaction(async (tx) => {
          const user = await tx.user.create({
            data: {
              email: input.email,
              passwordHash: hashedPassword,
              firstName: input.firstName,
              lastName: input.lastName,
              schoolId: input.schoolId, // Save schoolId to User model
              role: role, // Assign the deduced role
              profileCompleted: false, // User needs to complete profile after initial signup
              // imageUrl will be null initially, can be updated later
            },
          });

          // Only create StudentProfile if the role is STUDENT
          // Other profiles (AdminProfile, AdvisorProfile) can be created by an admin
          // or in a separate onboarding flow, not during initial self-registration.
          if (role === UserRole.STUDENT) {
            await tx.studentProfile.create({
              data: {
                userId: user.id, // Link to the newly created user
                // Provide default or placeholder values for new mandatory fields
                // as they are not part of the initial signup form
                speciality: "Unspecified",
                academicBackground: "Unspecified",
                profileCompleted: false, // Explicitly false for student profile
              },
            });
          }

          return user; // Return the created user object
        });

        // Return a success response to the client
        return {
          success: true,
          message: "Account created successfully!",
          user: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            profileCompleted: newUser.profileCompleted,
          },
          emailSent: false, // Placeholder: set to true if you implement email verification
        };
      }),
  }),
  // Example of another procedure (if you have one)
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log("Verifying email with token:", input.token);
      // Implement actual email verification logic here
      return { success: true, emailVerified: true };
    }),
});
