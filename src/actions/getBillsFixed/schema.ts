import { z } from "zod";

export const gerarContasFixasSchema = z.object({
  ano: z.number().min(2000),
  mes: z.number().min(1).max(12),
}); 