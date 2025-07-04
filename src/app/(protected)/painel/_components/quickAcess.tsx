'use client'
import { CircleMinus ,CirclePlus, ArrowLeftRight } from 'lucide-react';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UpsertReleaseForm from '../../_components/upsert-release-form';
import { Category } from '@/app/@types/category';
import { Button } from '@/components/ui/button';
import UpsertTransferForm from '../../_components/upsert-transfer-form';

// import { Container } from './styles';

interface QuickAcessProps {
  categories: Category[];
  iconSize?: number;
}

const QuickAcess: React.FC<QuickAcessProps> = ({ categories, iconSize = 24 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenIncome, setIsOpenIncome] = useState(false)
  const [isOpenTransfer, setIsOpenTransfer] = useState(false)
  return (
    <div className=" flex items-center gap-2 max-md:hidden">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant='ghost' className='p-6'>
                <div className='bg-red-100 rounded-md p-3 '>
                    <CircleMinus size={iconSize} color='#dc2626' />
                </div>
                <div className='flex flex-col items-start'>
                  <p className='font-medium text-gray-700 dark:text-white'>Adicionar despesa</p>
                  <span className='text-xs font-normal text-gray-500 dark:text-white'>Lance uma despesa manualmente</span>
                </div>
          </Button>
      </DialogTrigger>
      <DialogContent className="max-md:w-[90%]">
       <UpsertReleaseForm  type='EXPENSE' onSuccess={() => {setIsOpen(false)}} />
      </DialogContent>
      </Dialog>
      <Dialog open={isOpenIncome} onOpenChange={setIsOpenIncome}>
        <DialogTrigger asChild>
          <Button variant='ghost' className='p-6'>
            <div className='bg-green-100 rounded-md p-3'>
              <CirclePlus size={iconSize} color='#22c55e' />
            </div>
            <div className='flex flex-col items-start'>
              <p className='font-medium text-gray-700 dark:text-white'>Adicionar receita</p>
              <span className='text-xs font-normal text-gray-500 dark:text-white'>Lance uma receita manualmente</span>
            </div>
          </Button>
        </DialogTrigger>
      <DialogContent className="max-md:w-[90%]">
       <UpsertReleaseForm  type='INCOME' onSuccess={() => {setIsOpenIncome(false)}} />
      </DialogContent>
      </Dialog>
      <Dialog open={isOpenTransfer} onOpenChange={setIsOpenTransfer}>
        <DialogTrigger asChild>
          <Button variant='ghost' className='p-6'>
            <div className='bg-blue-100 rounded-md p-3'>
              <ArrowLeftRight size={iconSize} color='#2563eb' />
            </div>
            <div className='flex flex-col items-start'>
              <p className='font-medium text-gray-700 dark:text-white'>Transferência</p>
              <span className='text-xs font-normal text-gray-500 dark:text-white'>Transfira entre contas</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-md:w-[90%]">
          <UpsertTransferForm type='TRANSFER' onSuccess={() => { setIsOpenTransfer(false) }} />
        </DialogContent>
      </Dialog>
    </div>  
  )
}

export default QuickAcess;