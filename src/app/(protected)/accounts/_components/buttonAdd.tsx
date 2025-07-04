'use client'
import { Button } from '@/components/ui/button';
import { Plus, CreditCard as CreditCardIcon, PiggyBank } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpsertAccountWalletForm from './upsert-account-wallet';
import UpsertCreditCardForm from './upsert-credit-card';

const ButtonAdd: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [type, setType] = useState<'account' | 'creditcard'>('account');
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleClick = (selectedType: 'account' | 'creditcard') => {
      setType(selectedType);
      setOpenDialog(true);
      setPopoverOpen(false);
    };

    return (
      <>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger
            onMouseEnter={() => setPopoverOpen(true)}
            onMouseLeave={() => setPopoverOpen(false)}
            asChild
          >
            <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2 text-white">
              <Plus />
              Novo
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onMouseEnter={() => setPopoverOpen(true)}
            onMouseLeave={() => setPopoverOpen(false)}
            className="w-44"
          >
            <div className="flex flex-col gap-2 items-start">
              <Button variant="ghost" onClick={() => handleClick('account')} className="text-xs flex items-center gap-2">
                <PiggyBank size={16} /> Conta bancária
              </Button>
              <Button variant="ghost" onClick={() => handleClick('creditcard')} className="text-xs flex items-center gap-2">
                <CreditCardIcon size={16} /> Cartão de crédito
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-h-[90vh] overflow-y-auto max-md:w-[90%]">
            {type === 'account' ? (
              <UpsertAccountWalletForm onSuccess={() => setOpenDialog(false)} />
            ) : (
              <UpsertCreditCardForm onSuccess={() => setOpenDialog(false)} />
            )}
          </DialogContent>
        </Dialog>
      </>
    );
}

export default ButtonAdd; 