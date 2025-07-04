import z from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  limit: z.number().min(1, { message: "Limite é obrigatório" }),
  closingDay: z.number().min(1).max(31, { message: "Dia de fechamento inválido" }),
  dueDay: z.number().min(1).max(31, { message: "Dia de vencimento inválido" }),
  image: z.string().optional()
}); 