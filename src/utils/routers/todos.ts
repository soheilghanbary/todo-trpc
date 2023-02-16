import { z } from "zod";
import { publicProcedure, router } from "~/utils/trpc/server";
import { db } from "../trpc/prisma";

const usersRouter = router({
  getTodos: publicProcedure.query(async () => {
    const todos = await db.todo.findMany();
    return todos;
  }),
  add: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.todo.create({ data: { text: input, completed: false } });
    return "todo was created!";
  }),
  done: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const prevTodo = await db.todo.findFirst({ where: { id: input.id } });
      await db.todo.update({
        where: { id: input.id },
        data: { completed: !prevTodo?.completed },
      });
      return "completed todo";
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.todo.delete({ where: { id: input.id } });
      return "todo has been deleted";
    }),
});

export default usersRouter;
