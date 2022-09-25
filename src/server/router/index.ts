// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { remindersRouter } from "./reminders";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("reminders.", remindersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
