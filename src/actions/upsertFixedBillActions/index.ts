"use server"

import { actionClient } from "@/lib/safe-action";
import { upsertFixedBillSchema } from "./schemaFixedBill";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const upsertFixedBillAction = actionClient.schema(upsertFixedBillSchema).action(async ({ parsedInput: input }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }
  if (input.id) {
    // Update
    const updated = await prisma.fixedBill.update({
      where: { id: input.id, userId: session.user.id },
      data: {
        title: input.title,
        amount: input.amount,
        dueDay: input.dueDay,
        categoryId: input.categoryId,
        active: input.active,
      },
    });
    revalidatePath('/billstoFixed')
    return updated;
  } else {
    // Create
    const created = await prisma.fixedBill.create({
      data: {
        title: input.title,
        amount: input.amount,
        dueDay: input.dueDay,
        categoryId: input.categoryId,
        active: input.active,
        userId: session.user.id,
      },
    });
    revalidatePath('/billstoFixed')
    return created;
  }
  
}

); 