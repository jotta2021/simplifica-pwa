'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import UpsertReleaseForm from "../../_components/upsert-release-form";
import { Category } from "@/app/@types/category";


const ButtonAdd = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [type, setType] = useState<"INCOME" | "EXPENSE" >("EXPENSE");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleClick = (selectedType: "INCOME" | "EXPENSE") => {
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
          <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
            <Plus />
            Novo lançamento
          </Button>
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={() => setPopoverOpen(true)}
          onMouseLeave={() => setPopoverOpen(false)}
          className="w-32"
        >
          <div className="flex flex-col gap-2 items-start">
            <Button variant="ghost" onClick={() => handleClick("EXPENSE")} className="text-xs">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Despesa
            </Button>
            <Button variant="ghost" onClick={() => handleClick("INCOME")} className="text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Receita
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className=" max-md:w-[90%]">
          <UpsertReleaseForm type={type}  onSuccess={() => {
            setOpenDialog(false)
          }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonAdd;
