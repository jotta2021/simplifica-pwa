import z from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  amount: z.number().min(0.01, { message: "Valor é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  date: z.string().min(1, { message: "Data é obrigatória" }), // pode ser validado como date depois
  installment: z.number().int().min(1, { message: "Parcela deve ser maior que 0" }).optional(),
  totalInstallments: z.number().int().min(1, { message: "Total de parcelas deve ser maior que 0" }).optional(),
  categoryId: z.string().optional(),
  creditCardId: z.string().min(1, { message: "Cartão é obrigatório" }),
});
