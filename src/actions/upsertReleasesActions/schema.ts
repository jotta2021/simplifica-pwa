import { z } from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
    description: z.string().min(1, {
      message: "Descrição é obrigatória",
    }),
    amount: z.number().min(1, {
      message: "Valor é obrigatório",
    }),
    date: z.date(),
    category: z.string().min(1, {
      message: "Categoria é obrigatória",
    }),
    type: z.enum(["INCOME", "EXPENSE"]),
  });
  