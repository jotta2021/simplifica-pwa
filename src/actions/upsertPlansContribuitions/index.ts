'use server'
import { actionClient } from "@/lib/safe-action";
import { formSchema } from "./schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

const upsertPlansContribuitions = actionClient.schema(formSchema).action(async ({parsedInput}) => {
const {amount,planId} = parsedInput
const session = await auth.api.getSession({headers: await headers()})
if(!session?.user?.id){
    return {
        error: "Unauthorized"
    }
}

await prisma.plans_contributions.create({
    data:{
        amount,
        planId,
        
    }
})
//sempre que for atualizar um plano, atualizar o valor total do plano
await prisma.plans.update({
    where:{
        id:planId
    },
    data:{
        iniital_value: {
            increment: amount
        }
        
    }
})  

revalidatePath('/planing')

})

export default upsertPlansContribuitions