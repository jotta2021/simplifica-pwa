"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import UpsertCreditCardForm from "./upsert-credit-card";
import { CreditCard } from "@/app/@types/creditCard";
import { MoreVertical, Edit, Trash, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import banks from "@/app/(protected)/_consts/images";
import { useAction } from "next-safe-action/hooks";
import { deleteCreditCardAction } from "@/actions/upsertCreditCard/upsertCreditCardActions";
import { toast } from "@/hooks/use-toast";

interface CreditCardCardProps {
  card: CreditCard;
}

const CreditCardCard: React.FC<CreditCardCardProps> = ({ card }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteCreditCard = useAction(deleteCreditCardAction, {
    onSuccess: () => {
      toast({ title: "Cartão excluído com sucesso" });
      setOpenDelete(false);
    },
    onError: () => {
      toast({ title: "Erro ao excluir cartão" });
    },
  });

  return (
    <div
      className="bg-white rounded-lg shadow flex items-center p-4 justify-between hover:shadow-md transition-all dark:bg-card dark:text-card-foreground dark:border dark:hover:shadow-lg dark:bg-neutral-800"
    >
      <div className="flex items-center gap-4">
        {card.image && (
          <Image src={card.image} alt={card.name} width={48} height={48} quality={100} className="rounded-full w-[48px] h-[48px] object-cover" />
        )}
       
        <div className="flex flex-col gap-4">
           <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-700 text-sm dark:text-white">{card.name}</span>
          <span className="text-xs text-gray-800 dark:text-gray-300">Limite total: R$ {card.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} | Limite disponivel: R$ {card.availableLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          <span className="text-xs text-gray-800 dark:text-gray-300">Fechamento: dia {card.closingDay} | Vencimento: dia {card.dueDay}</span>
          
        </div>
        < Button
          className="bg-green-100 text-green-700 dark:text-green-100 hover:bg-green-200 dark:bg-green-800"
        >
          <FileText size={16} /> Ver fatura
        </Button>
        </div>

        
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><MoreVertical size={20} /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpenEdit(true)} className="flex items-center gap-2 cursor-pointer dark:text-white">
            <Edit size={16} /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenDelete(true)} className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400">
            <Trash size={16} /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-md:w-[90%]">
          <UpsertCreditCardForm card={card} onSuccess={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja realmente excluir este cartão?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300">Esta ação não poderá ser desfeita.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => deleteCreditCard.execute({ id: card.id })} disabled={deleteCreditCard.status === 'executing'}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditCardCard; 