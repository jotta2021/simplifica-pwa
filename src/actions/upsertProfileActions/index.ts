'use server'

import { auth } from '@/lib/auth';
import { prisma } from '../../../lib/prisma';
import { actionClient } from './../../lib/safe-action';
import { profileSchema } from './schema';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

const upsertProfileActions = actionClient.schema(profileSchema).action(async ({parsedInput: {name, email, phone, image}}) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    if(!session){
        return {
            error: "Unauthorized"
        }
    }

    // Verificar se o email já está em uso por outro usuário
    const existingUser = await prisma.user.findFirst({
        where: {
            email,
            id: { not: session.user.id },
        },
    });

    if (existingUser) {
        return { error: "Este email já está em uso" };
    }

    // Atualizar o usuário
    const updatedUser = await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name,
            email,
            phone: phone || null,
            image: image || null,
        },
    });

    revalidatePath('/profile')
    
    return {
        success: true,
        user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            image: updatedUser.image,
        },
    };
})

export default upsertProfileActions 