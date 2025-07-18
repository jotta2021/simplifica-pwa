'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import UpsertFormReminder from "./upsert-reminder";


// import { Container } from './styles';

const AddButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
          <Plus /> Novo lembrete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-md:w-[90%]">
        <UpsertFormReminder onSuccess={()=> {
            setIsOpen(false)
        }}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddButton;
