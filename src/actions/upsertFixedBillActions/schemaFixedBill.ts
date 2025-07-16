import { z } from "zod";

export const upsertFixedBillSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  amount: z.number().min(0.01),
  dueDay: z.number().min(1).max(31),
  categoryId: z.string().optional(),
  active: z.boolean().default(true),
}); 