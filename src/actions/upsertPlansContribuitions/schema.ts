import { z } from "zod";

export const formSchema = z.object({
    id: z.string().optional(),
   amount: z.number().min(1, { message: "Valor é obrigatório" }),
   planId: z.string().min(1, { message: "Plano é obrigatório" }),
  });