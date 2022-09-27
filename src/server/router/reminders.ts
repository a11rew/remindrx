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
        include: {
          how: true,
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
      how: z.array(
        z.object({
          type: z.string(),
          value: z.string(),
        })
      ),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Missing user id",
        });
      }

      const reminder = await ctx.prisma.reminder.create({
        data: {
          dose: input.dosage,
          creatorID: ctx.user.id,
          drug: input.drug,
          when: input.when,
          message: input.message,
        },
      });

      // Create notification methods
      await Promise.all(
        input.how.map(async (method) => {
          if (!ctx.user.id) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Missing user id",
            });
          }

          const result = await ctx.prisma.notificationMethod.create({
            data: {
              type: method.type,
              value: method.value,
              creatorID: ctx.user.id,
              reminderId: reminder.id,
            },
          });

          return result.id;
        })
      );

      return reminder;
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
