import { z } from "zod";

export const upsertReminderSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, { message: "Descrição é obrigatório" }),
  date_hour: z.date(),
  
}); 