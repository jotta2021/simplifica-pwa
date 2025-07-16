"use server";

import { actionClient } from "@/lib/safe-action";
import { gerarContasFixasSchema } from "./schema";
import { prisma } from "../../../lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const gerarContasFixasParaOMesAction = actionClient.schema(gerarContasFixasSchema).action(async ({ parsedInput }) => {
  const { ano, mes } = parsedInput;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }
  const userId = session.user.id;
  const inicioDoMes = startOfMonth(new Date(ano, mes - 1));
  const fimDoMes = endOfMonth(new Date(ano, mes - 1));

  const fixedBills = await prisma.fixedBill.findMany({
    where: {
      userId,
      active: true,
    },
  });

  for (const fixed of fixedBills) {
    const dia = Math.min(fixed.dueDay, 28); // evita erro com dia 30/31 em fevereiro
    const vencimento = new Date(ano, mes - 1, dia);

    const jaExiste = await prisma.bill.findFirst({
      where: {
        fixedBillId: fixed.id,
        dueDate: {
          gte: inicioDoMes,
          lte: fimDoMes,
        },
      },
    });

    if (!jaExiste) {
      await prisma.bill.create({
        data: {
            description: `${fixed.title}`,
          fixedBillId: fixed.id,
          dueDate: vencimento,
          amount: fixed.amount,
          userId: userId,
        },
      });
    }
  }
  revalidatePath("/billtoPay");
  return { success: true };
});
