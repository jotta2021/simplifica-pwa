import { z } from "zod";

export const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "Título é obrigatório" }),
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    target_value: z.coerce.number().min(1, { message: "Valor alvo é obrigatório" }),
    iniital_value: z.coerce.number().min(0, { message: "Valor inicial é obrigatório" }),
  });
  