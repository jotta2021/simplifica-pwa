'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import UpsertReleaseForm from '../../_components/upsert-release-form';
import UpsertTransferForm from '../../_components/upsert-transfer-form';

const transactionTypes = [
  { label: 'Receita', value: 'income' },
  { label: 'Despesa', value: 'expense' },
  { label: 'Transferência', value: 'transfer' },
];

const ButtonActionMobile = () => {
  const [showTypeDialog, setShowTypeDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<"INCOME" | "EXPENSE" | "TRANSFER" | null>(null);

  const handleTypeSelect = (type: string) => {
    let mappedType: "INCOME" | "EXPENSE" | "TRANSFER" = "EXPENSE";
    if (type === "income") mappedType = "INCOME";
    else if (type === "expense") mappedType = "EXPENSE";
    else if (type === "transfer") mappedType = "TRANSFER";
    setTransactionType(mappedType);
    setShowTypeDialog(false);
    setTimeout(() => setShowFormDialog(true), 200);
  };

  const handleFormSuccess = () => {
    setShowFormDialog(false);
    setTransactionType(null);
  };

  return (
    <>
      {/* Dialog de seleção de tipo */}
      <Dialog open={showTypeDialog} onOpenChange={setShowTypeDialog}>
        <DialogTrigger asChild>
          <Button className="fixed right-3 bottom-20 rounded-full w-12 h-12 bg-green-500 hover:bg-green-600 hidden max-md:block"
            onClick={() => setShowTypeDialog(true)}>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-md w-[90%] flex flex-col items-center gap-4">
          <span className="font-semibold text-lg mb-2">Selecione o tipo de transação</span>
          {transactionTypes.map((type) => (
            <Button
              key={type.value}
              className="w-full"
              variant="outline"
              onClick={() => handleTypeSelect(type.value)}
            >
              {type.label}
            </Button>
          ))}
        </DialogContent>
      </Dialog>

      {/* Dialog do formulário */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="max-md w-[90%]">
          {/* Passe o tipo selecionado como prop se necessário */}
          {
            transactionType === 'TRANSFER' ?
            <UpsertTransferForm onSuccess={handleFormSuccess} type={transactionType || undefined}/>
            :
             <UpsertReleaseForm onSuccess={handleFormSuccess} type={transactionType || undefined} />
          }
         
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonActionMobile;