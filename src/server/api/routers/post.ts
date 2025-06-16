// import { z } from "zod";

// import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   getLatest: publicProcedure.query(async ({ ctx }) => {
//     // First check if the db connection and post model exist
//     if (!ctx.db?.post) {
//       throw new Error("Database post model not available");
//     }
    
//     try {
//       const post = await ctx.db.post.findFirst({
//         orderBy: { createdAt: "desc" },
//       });
      
//       // Return null if no post exists (instead of throwing error)
//       return post || null;
//     } catch (error) {
//       console.error("Error fetching latest post:", error);
//       return null;
//     }
//   }),
// });
