'use server'

import { auth } from '@/lib/auth';
import { prisma } from '../../../lib/prisma';
import { actionClient } from './../../lib/safe-action';
import { formSchema } from './schema';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';


const upsertReleasesActions = actionClient.schema(formSchema).action(async ({parsedInput: {description,id, amount, accountWalletId,toAccountWalletId, date, category, type}}) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session){
        return {
            error: "Unauthorized"
        }
    }
    if(id){
        // Buscar a transação original
        const originalTransaction = await prisma.transactions.findUnique({
            where: { id },
        });
        if (!originalTransaction) {
            return { error: 'Transação original não encontrada' };
        }

        // Se a transação original era uma transferência, reverter efeito antigo
        if (originalTransaction.type === 'TRANSFER') {
            // Reverter saldo da conta de origem antiga
            if (originalTransaction.accountWalletId) {
                await prisma.accountWallet.update({
                    where: { id: originalTransaction.accountWalletId },
                    data: { balance: { increment: originalTransaction.amount } },
                });
            }
            // Reverter saldo da conta de destino antiga
            if (originalTransaction.toAccountWalletId) {
                await prisma.accountWallet.update({
                    where: { id: originalTransaction.toAccountWalletId },
                    data: { balance: { decrement: originalTransaction.amount } },
                });
            }
        } else if (originalTransaction.type === 'INCOME') {
            // Reverter saldo da conta de origem antiga
            if (originalTransaction.accountWalletId) {
                await prisma.accountWallet.update({
                    where: { id: originalTransaction.accountWalletId },
                    data: { balance: { decrement: originalTransaction.amount } },
                });
            }
        } else if (originalTransaction.type === 'EXPENSE') {
            // Reverter saldo da conta de origem antiga
            if (originalTransaction.accountWalletId) {
                await prisma.accountWallet.update({
                    where: { id: originalTransaction.accountWalletId },
                    data: { balance: { increment: originalTransaction.amount } },
                });
            }
        }

        // Atualizar a transação
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
                accountWalletId: accountWalletId,
                toAccountWalletId : type==='TRANSFER' ? toAccountWalletId : null
            }
        })

        // Aplicar novo efeito da transação
        if (type === 'INCOME') {
            await prisma.accountWallet.update({
                where: { id: accountWalletId },
                data: { balance: { increment: amount } },
            });
        } else if (type === 'EXPENSE') {
            await prisma.accountWallet.update({
                where: { id: accountWalletId },
                data: { balance: { decrement: amount } },
            });
        } else if (type === 'TRANSFER') {
            // Subtrair da conta de origem
            await prisma.accountWallet.update({
                where: { id: accountWalletId },
                data: { balance: { decrement: amount } },
            });
            // Somar na conta de destino
            if (toAccountWalletId) {
                await prisma.accountWallet.update({
                    where: { id: toAccountWalletId },
                    data: { balance: { increment: amount } },
                });
            }
        }
    }else{
         await prisma.transactions.create({
        data: {
            description,
            amount,
            date,
            categoryId: category,
            userId: session.user.id,
            type: type,
            accountWalletId: accountWalletId,
            toAccountWalletId : type==='TRANSFER' ? toAccountWalletId : null
        }
    })

    // Buscar saldo atual da conta
    const account = await prisma.accountWallet.findUnique({
        where: { id: accountWalletId },
        select: { balance: true }
    });
    if (!account) {
        return { error: 'Conta não encontrada' };
    }
    let newBalance = account.balance;
    if (type === 'INCOME') {
        newBalance += amount;
    } else if (type === 'EXPENSE') {
        newBalance -= amount;
    } else if (type === 'TRANSFER') {
        newBalance -= amount;
    }
    await prisma.accountWallet.update({
        where: {
            id: accountWalletId
        },
        data: {
            balance: newBalance
        }
    })

    // Se for transferência, atualizar saldo da conta de destino
    if (type === 'TRANSFER' && toAccountWalletId) {
        const toAccount = await prisma.accountWallet.findUnique({
            where: { id: toAccountWalletId },
            select: { balance: true }
        });
        if (!toAccount) {
            return { error: 'Conta de destino não encontrada' };
        }
        const newToBalance = toAccount.balance + amount;
        await prisma.accountWallet.update({
            where: { id: toAccountWalletId },
            data: { balance: newToBalance }
        });
    }
    }
    
    revalidatePath('/releases')
})

export default upsertReleasesActions