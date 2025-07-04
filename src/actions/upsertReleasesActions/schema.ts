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
    category: z.string().optional(),
    type: z.enum(["INCOME", "EXPENSE" , "TRANSFER"]),
    accountWalletId: z.string().min(1, {
      message: "Conta é obrigatória",
    }),
    toAccountWalletId: z.string().optional()
  });
  