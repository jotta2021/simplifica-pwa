'use server'

import { auth } from '@/lib/auth';
import { prisma } from '../../../lib/prisma';
import { actionClient } from './../../lib/safe-action';
import { formSchema } from './schema';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';


const upsertReleasesActions = actionClient.schema(formSchema).action(async ({parsedInput: {description,id, amount, date, category, type}}) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session){
        return {
            error: "Unauthorized"
        }
    }
    if(id){
        await prisma.transactions.update({
            where: {
                id: id
            },
            data: {
                description,
                amount,
                date,
                categoryId: category,
                userId: session.user.id,
                type: type,
            }
        })
    }else{
         await prisma.transactions.create({
        data: {
            description,
            amount,
            date,
            categoryId: category,
            userId: session.user.id,
            type: type,
        }
    })
    }
    
    revalidatePath('/releases')
})

export default upsertReleasesActions