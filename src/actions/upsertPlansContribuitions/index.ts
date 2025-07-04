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

//pega o planejamento
const plan = await prisma.plans.findFirst({
    where:{
        id: planId
    }
})

// calcula o novo valor inicial
const newInitialValue = (plan?.iniital_value || 0) + amount;
const targetValue = plan?.target_value || 0;
const percentAchieved = targetValue > 0 ? (newInitialValue / targetValue) * 100 : 0;


if (percentAchieved >= 50 && percentAchieved<100 ) {
    // Chame a função desejada aqui
    fiftyPercentReached("Parabéns! Você está quase lá");
}
if (percentAchieved === 100 ) {
    // Chame a função desejada aqui
    fiftyPercentReached("Parabéns! Você atingiu sua meta!");
}


//emite uma notificação alertando que o usuario ja atingiu uma parte da meta
async function fiftyPercentReached(title:string) {
    await prisma.notification.create({
        data:{
            title:title,
            message:`Você atingiu ${percentAchieved.toFixed(2)}% do planejamento "${plan?.title}"`,
            userId: plan?.userId || ''
        }
    })

}

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