
'use server'
import { actionClient } from "@/lib/safe-action";
import { formSchema } from "./schemaCategorie";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";


export const upsertCategorieAction = actionClient.schema(formSchema).action(async ({parsedInput:values}) => {
    const {id, name,type,icon,color} = values;

const session = await auth.api.getSession({
    headers:await headers()
})
if(!session?.user.id){
    return {
        error: 'Unauthorized'
    }
}   

if(id){
    await prisma.category.update({
        where:{
            id:id
        },
        data:{
            name,
            type,
            icon,
            color     
        }
    })
}else{
    await prisma.category.create({
        data:{
            name,
            type,
            icon,
            color,
            userId: session?.user.id
        }
    })
}


    revalidatePath('/categories')

})
