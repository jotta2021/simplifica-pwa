'use server'

import { actionClient } from "@/lib/safe-action"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { revalidatePath } from "next/cache"



const deleteReleaseActions = actionClient.schema(z.object({
    id: z.string()
})).action(async ({parsedInput: {id}}) => {
    // Buscar a transação antes de deletar
    const transaction = await prisma.transactions.findUnique({
        where: { id },
        select: {
            amount: true,
            type: true,
            accountWalletId: true,
            toAccountWalletId: true
        }
    });
    if (!transaction) return;

    // Atualizar saldo da conta de origem
    const account = await prisma.accountWallet.findUnique({
        where: { id: transaction.accountWalletId },
        select: { balance: true }
    });
    if (!account) return;
    let newBalance = account.balance;
    if (transaction.type === 'INCOME') {
        newBalance -= transaction.amount;
    } else if (transaction.type === 'EXPENSE') {
        newBalance += transaction.amount;
    } else if (transaction.type === 'TRANSFER') {
        newBalance += transaction.amount;
    }
    await prisma.accountWallet.update({
        where: { id: transaction.accountWalletId },
        data: { balance: newBalance }
    });

    // Se for transferência, atualizar saldo da conta de destino
    if (transaction.type === 'TRANSFER' && transaction.toAccountWalletId) {
        const toAccount = await prisma.accountWallet.findUnique({
            where: { id: transaction.toAccountWalletId },
            select: { balance: true }
        });
        if (toAccount) {
            const newToBalance = toAccount.balance - transaction.amount;
            await prisma.accountWallet.update({
                where: { id: transaction.toAccountWalletId },
                data: { balance: newToBalance }
            });
        }
    }

    // Agora sim, deletar a transação
    await prisma.transactions.delete({
        where: {
            id: id
        }
    });
    revalidatePath("/releases")
})

export default deleteReleaseActions