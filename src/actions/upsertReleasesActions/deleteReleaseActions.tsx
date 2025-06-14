'use server'

import { actionClient } from "@/lib/safe-action"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { revalidatePath } from "next/cache"



const deleteReleaseActions = actionClient.schema(z.object({
    id: z.string()
})).action(async ({parsedInput: {id}}) => {
    await prisma.transactions.delete({
        where: {
            id: id
        }
    })
    revalidatePath("/releases")
})

export default deleteReleaseActions