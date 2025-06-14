'use client'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import UpsertCategorieForm from './upsert-categorie';
// import { Container } from './styles';

const ButtonAdd: React.FC = () => {
    const [open, setOpen] = useState(false)
    
    return (        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
        <Plus />
        Nova categoria
      </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-md:w-[90%]">
             <UpsertCategorieForm onSuccess={()=>setOpen(false)}/>
            </DialogContent>
        </Dialog>
     
    )
    }

export default ButtonAdd;