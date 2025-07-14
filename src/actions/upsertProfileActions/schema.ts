import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  phone: z.string().optional(),
  image: z.string().optional(),
  curentPlan: z.string().optional(),
  subscriptionId: z.string().optional(),
  subscriptionStatus: z.string().optional(),
  trial: z.boolean().optional(),
  renewAt: z.date().optional(),
}); 