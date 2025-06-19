'use client'

import React from 'react'
import { Transaction } from './columns'
import { Avatar } from '@/components/ui/avatar'
import { ICONES_CATEGORIAS } from '../../categories/_constants/icones'
import formatCurrency from '@/helpers/formatCurrency'
import { formatDate } from '@/helpers/formatDate'
import ButtonsActions from './buttonsActions'

interface MobileTransactionsProps {
  transactions: Transaction[]
}

const MobileTransactions = ({ transactions }: MobileTransactionsProps) => {
  
  return (
    <div className="space-y-4">
      {transactions.length>0 ? transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border"
        >
          <div className="flex items-center gap-3">
            <Avatar
              className="w-10 h-10 items-center justify-center"
              style={{ backgroundColor: transaction.categoryDetails?.color }}
            >
              {ICONES_CATEGORIAS[transaction.categoryDetails?.icon as keyof typeof ICONES_CATEGORIAS]
                ? React.createElement(
                    ICONES_CATEGORIAS[
                      transaction.categoryDetails?.icon as keyof typeof ICONES_CATEGORIAS
                    ],
                    { className: "w-6 h-6 text-white" }
                  )
                : null}
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{transaction.description}</span>
              <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-medium text-sm ${
                transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.type === 'EXPENSE' && '-'} {formatCurrency(transaction.amount)}
            </span>
            <ButtonsActions release={transaction} />
          </div>
        </div>
      ))    : 
      <div className='flex items-center w-full justify-center'>

        <span className='text-sm text-center'>Nenhuma transação encontrada</span>
      </div>
      
      }
    </div>
  )
}

export default MobileTransactions 