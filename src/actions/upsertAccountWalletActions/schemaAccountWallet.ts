import z from "zod";

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  image: z.string().optional(),
  balance: z.number().optional()
}); 