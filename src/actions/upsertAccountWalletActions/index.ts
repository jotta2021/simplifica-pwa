'use server'
import { actionClient } from "@/lib/safe-action";
import { formSchema } from "./schemaAccountWallet";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const upsertAccountWalletAction = actionClient.schema(formSchema).action(async ({parsedInput:values}) => {
    const {id, name, balance,image} = values;
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user.id){
        return {
            error: 'Unauthorized'
        }
    }
    if(id){
        await prisma.accountWallet.update({
            where:{ id },
            data:{ name,  balance,image }
        })
    }else{
        // Verifica se já existe uma conta com o mesmo nome para o usuário
        const existingAccount = await prisma.accountWallet.findFirst({
            where: {
                userId: session.user.id,
                name,
            },
        });
        if (existingAccount) {
            throw new Error("Já existe uma conta com esse nome." )  
        }
        await prisma.accountWallet.create({
            data:{ name, image: image || '', balance, userId: session?.user.id }
        })
    }
    revalidatePath('/accounts')
})

export const deleteAccountWalletAction = actionClient.schema(
  formSchema.pick({ id: true })
).action(async ({ parsedInput: { id } }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }
  await prisma.accountWallet.delete({
    where: { id },
  });
  revalidatePath('/accounts');
}); 