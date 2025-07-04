'use client'

import React from 'react'
import { Transaction } from './columns'
import { Avatar } from '@/components/ui/avatar'
import { ICONES_CATEGORIAS } from '../../categories/_constants/icones'
import formatCurrency from '@/helpers/formatCurrency'
import { formatDate } from '@/helpers/formatDate'
import ButtonsActions from './buttonsActions'
import { ArrowLeftRight } from 'lucide-react'

interface MobileTransactionsProps {
  transactions: Transaction[]
}

const MobileTransactions = ({ transactions }: MobileTransactionsProps) => {
  
  return (
    <div className="space-y-4">
      {transactions.length>0 ? transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700"
        >
          <div className="flex items-center gap-3">
            <Avatar
              className="w-10 h-10 items-center justify-center"
              style={{ backgroundColor: transaction.categoryDetails?.color }}
            >
              {transaction.category && ICONES_CATEGORIAS[transaction.categoryDetails?.icon as keyof typeof ICONES_CATEGORIAS]
                ? React.createElement(
                    ICONES_CATEGORIAS[
                      transaction.categoryDetails?.icon as keyof typeof ICONES_CATEGORIAS
                    ],
                    { className: "w-6 h-6 text-white" }
                  )
                :  <ArrowLeftRight className="text-blue-500 dark:text-blue-400" />}
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{transaction.description}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {transaction.type === 'TRANSFER' ? (
                  <>
                    Origem: {transaction.accountWallet?.name} <span className="mx-1">→</span> Destino: {transaction.toAccountWallet?.name}
                  </>
                ) : (
                  <>
                    Categoria: {transaction.categoryDetails?.name || '-'}
                    {transaction.accountWallet?.name && (
                      <>
                        {' '}| Conta: {transaction.accountWallet.name}
                      </>
                    )}
                  </>
                )}
              </span>
              <span
              className={`font-medium text-sm ${
                transaction.type === 'INCOME' ? 'text-green-500 dark:text-green-400' : transaction.type==='EXPENSE' ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'
              }`}
            >
              {transaction.type === 'EXPENSE' && '-'} {formatCurrency(transaction.amount)}
            </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
       
            <ButtonsActions release={transaction} />
          </div>
        </div>
      ))    : 
      <div className='flex items-center w-full justify-center'>

        <span className='text-sm text-center text-gray-500 dark:text-gray-400'>Nenhuma transação encontrada</span>
      </div>
      
      }
    </div>
  )
}

export default MobileTransactions 