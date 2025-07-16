'use server'
import { actionClient } from "@/lib/safe-action";
import { formSchema } from "./schemaBill";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const upsertBillAction = actionClient.schema(formSchema).action(async ({ parsedInput: values }) => {
  const { id, fixedBillId, description, dueDate, amount, paid, paidAt, transactionId } = values;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }
  if (id) {
    await prisma.bill.update({
      where: { id },
      data: { fixedBillId, description, dueDate, amount, paid, paidAt, transactionId },
    });
  } else {
    await prisma.bill.create({
      data: {
        fixedBillId,
        description,
        dueDate,
        amount,
        paid: paid ?? false,
        paidAt,
        transactionId,
        userId: session?.user?.id
      },
    });
  }
  revalidatePath('/billtoPay');
}); 