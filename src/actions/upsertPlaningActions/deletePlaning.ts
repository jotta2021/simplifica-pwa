'use server'

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action"
import { headers } from "next/headers";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deletePlaningAction = actionClient.schema(z.object({
    id: z.string(),
})).action(async({parsedInput})=> {
    const {id} = parsedInput

    const session = await auth.api.getSession({
        headers: await headers(),
      });

      if(!session?.user?.id){
        return {
            error: 'Unauthorized'
        }
      }

      await prisma.plans.delete({
        where: {
            id:id as string,
            userId: session?.user?.id
        }
      })

      revalidatePath('/planing')
      
})