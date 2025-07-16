'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UpsertFixedBillForm from './upsert-fixed-bill-form';

const ButtonAdd: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='bg-green-500 hover:bg-green-600'>
            <Plus />
            Nova conta fixa
          </Button>
        </DialogTrigger>
        <DialogContent className='max-md:w-[90%]'>
          <UpsertFixedBillForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButtonAdd; 