import z from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  fixedBillId: z.string().optional(),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  dueDate: z.date({ required_error: "Data de vencimento é obrigatória" }),
  amount: z.number().min(0.01, { message: "Valor é obrigatório" }),
  paid: z.boolean().optional(),
  paidAt: z.date().optional(),
  transactionId: z.string().optional(),
}); 