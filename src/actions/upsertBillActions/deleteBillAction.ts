"use server";
import { actionClient } from "@/lib/safe-action";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const schema = z.object({ id: z.string() });

export const deleteBillAction = actionClient.schema(schema).action(async ({ parsedInput }) => {
  const { id } = parsedInput;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  await prisma.bill.delete({
    where: { id, userId: session.user.id },
  });
  revalidatePath("/billtoPay");
  return { success: true };
}); 