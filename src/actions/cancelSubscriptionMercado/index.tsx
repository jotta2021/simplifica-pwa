'use server'
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { headers } from "next/headers";
import { z } from "zod";
import { MercadoPagoConfig, PreApproval } from "mercadopago";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
export const cancelSubscriptionMercadoPago = actionClient
  .schema(
    z.object({
      userId: z.string(),
    })
  )
  .action(async ({ parsedInput: { userId } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
        options: { timeout: 5000 },
      });

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user?.subscriptionId) {
        throw new Error("subscription user not found");
      }

      const preapproval = new PreApproval(client);

      //faz o cancelamento do plano
      await preapproval.update({
        id: user.subscriptionId,
        body: {
          status: "cancelled",
        },
      });

      //atualiza o banco de dados
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: "cancelled",
          subscriptionId: null,
          curentPlan: null,
        },
      });
      revalidatePath('/profile')
      return {ok:true}
      
    } catch (error: any) {
      console.error("erro ao cancelar plano");
      throw new error(error?.message || "Erro ao cancelar plano");
    }
  });
