import z from "zod";

export const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    type: z.enum(["INCOME", "EXPENSE"], { message: "Tipo é obrigatório" }),
    icon: z.string().min(1, { message: "Icone é obrigatório" }),
    color: z.string().min(1, { message: "Cor é obrigatória" }),
  });