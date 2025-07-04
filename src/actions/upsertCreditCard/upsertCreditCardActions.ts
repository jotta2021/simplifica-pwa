'use server'
import { actionClient } from "@/lib/safe-action";
import { formSchema } from "./schemaCreditCard";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const upsertCreditCardAction = actionClient.schema(formSchema).action(async ({parsedInput:values}) => {
    const {id, name, limit, closingDay, dueDay,image} = values;
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user.id){
        return {
            error: 'Unauthorized'
        }
    }
    if(id){
        await prisma.creditCard.update({
            where:{ id },
            data:{ name, limit, closingDay, dueDay }
        })
    }else{
        // Verifica se já existe um cartão com o mesmo nome para o usuário
        const existingCard = await prisma.creditCard.findFirst({
            where: {
                userId: session.user.id,
                name,
            },
        });
        if (existingCard) {
            throw new Error("Já existe um cartão com esse nome." )  
        }
        await prisma.creditCard.create({
            data:{ name, limit, availableLimit:limit, closingDay, dueDay, userId: session?.user.id,image: image ||'' }
        })
    }
    revalidatePath('/accounts')
})

export const deleteCreditCardAction = actionClient.schema(z.object({ id: z.string() })).action(async ({ parsedInput: { id } }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.user.id) {
        return { error: 'Unauthorized' };
    }
    // Verifica se o cartão pertence ao usuário
    const card = await prisma.creditCard.findUnique({
        where: { id },
        select: { userId: true }
    });
    if (!card || card.userId !== session.user.id) {
        return { error: 'Not found or forbidden' };
    }
    await prisma.creditCard.delete({ where: { id } });
    revalidatePath('/accounts');
    return { success: true };
}); 