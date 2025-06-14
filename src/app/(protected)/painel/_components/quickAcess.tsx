'use client'
import { CircleMinus ,CirclePlus} from 'lucide-react';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UpsertReleaseForm from '../../_components/upsert-release-form';
import { Category } from '@/app/@types/category';

// import { Container } from './styles';

const QuickAcess: React.FC<{categories: Category[]}> = ({categories}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenIncome, setIsOpenIncome] = useState(false)
  return (
    <div className=" gap-2 grid grid-cols-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button  className='text-gray-700 font-medium flex flex-col items-center justify-center  border rounded-md p-2 text-sm hover:bg-gray-100 duration-200   '>
      <CircleMinus size={24} color='#dc2626' />
    Despesa
    </button> 
      </DialogTrigger>
      <DialogContent className="max-md:w-[90%]">
       <UpsertReleaseForm  type='EXPENSE' onSuccess={() => {setIsOpen(false)}} categories={categories}/>
      </DialogContent>
      </Dialog>
    <Dialog open={isOpenIncome} onOpenChange={setIsOpenIncome}>
        <DialogTrigger asChild>
          <button  className='text-gray-700 font-medium flex flex-col items-center justify-center  border rounded-md p-2 text-sm hover:bg-gray-100 duration-200   '>
      <CirclePlus size={24} color='#22c55e' />
    Receita
    </button> 
      </DialogTrigger>
      <DialogContent className="max-md:w-[90%]">
       <UpsertReleaseForm  type='INCOME' onSuccess={() => {setIsOpenIncome(false)}} categories={categories}/>
      </DialogContent>
      </Dialog>
   
 

    </div>                  
  )
}

export default QuickAcess;