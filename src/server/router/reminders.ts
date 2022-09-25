import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const remindersRouter = createRouter()
  .query("mine", {
    async resolve({ ctx }) {
      return await ctx.prisma.reminder.findMany({
        where: {
          creatorID: ctx.user.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      drug: z.string(),
      dosage: z.string(),
      when: z.string(),
      message: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Missing user id",
        });
      }

      return await ctx.prisma.reminder.create({
        data: {
          dose: input.dosage,
          creatorID: ctx.user.id,
          drug: input.drug,
          when: input.when,
          message: input.message,
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.reminder.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
