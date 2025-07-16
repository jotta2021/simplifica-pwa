"use server"

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";



export const deleteFixedBillAction = actionClient.schema(z.object({
  id: z.string()
})).action(async ({ parsedInput: {id} }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }
  await prisma.fixedBill.delete({
    where: { id: id, userId: session.user.id },
  });
  revalidatePath('/billstoFixed')
  return { success: true };
}); 