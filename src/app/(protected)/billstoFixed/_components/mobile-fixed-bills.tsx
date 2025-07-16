"use client";
import React from "react";
import { FixedBill } from "@/app/@types/bill";
import { Pencil, Trash } from "lucide-react";
import UpsertFixedBillForm from "./upsert-fixed-bill-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { deleteFixedBillAction } from '@/actions/upsertFixedBillActions/deleteFixedBillAction';
import { toast } from "sonner";
import formatCurrency from "@/lib/formatCurrency";

interface MobileFixedBillsProps {
  fixedBills: FixedBill[];
}

const MobileFixedBills: React.FC<MobileFixedBillsProps> = ({ fixedBills }) => {
  const fixedBillsSafe = fixedBills.map(bill => ({
    ...bill,
    categoryId: bill.categoryId ?? undefined,
  }));

  return (
    <div className="space-y-4">
      {fixedBillsSafe.length > 0 ? (
        fixedBillsSafe.map((fixedBill) => <MobileFixedBillCard key={fixedBill.id} fixedBill={fixedBill} />)
      ) : (
        <div className="flex items-center w-full justify-center">
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">Nenhuma conta fixa encontrada</span>
        </div>
      )}
    </div>
  );
};

const MobileFixedBillCard: React.FC<{ fixedBill: FixedBill }> = ({ fixedBill }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const deleteFixedBill = useAction(deleteFixedBillAction, {
    onSuccess: () => {
      toast.success("Conta fixa deletada com sucesso");
      setOpenDialog(false);
    },
    onError: () => {
      toast.error("Erro ao deletar conta fixa");
    },
  });
  const handleDelete = () => {
    deleteFixedBill.execute({ id: fixedBill.id });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="flex flex-col gap-1 w-full">
        <span className="font-medium text-base">{fixedBill.title}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">Dia de vencimento: {fixedBill.dueDay}</span>
        <span className="text-sm font-medium">{formatCurrency(fixedBill.amount) }</span>
        <div className={`inline-block mt-1 rounded-full px-2 py-0.5 flex items-start justify-start ${fixedBill.active ? 'bg-green-100' : 'bg-red-100'}`}>
          <span className={fixedBill.active ? 'text-green-600 text-xs font-semibold' : 'text-red-500 text-xs font-semibold'}>{fixedBill.active ? 'Ativa' : 'Inativa'}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-2">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-md:w-[90%]">
            <UpsertFixedBillForm fixedBill={fixedBill} onSuccess={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-md:w-[90%]">
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que deseja deletar esta conta fixa?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta conta fixa será deletada permanentemente e não poderá ser recuperada.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction className="border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white" onClick={handleDelete} disabled={deleteFixedBill.status === "executing"}>
                {deleteFixedBill.status === "executing" ? "Deletando..." : "Deletar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MobileFixedBills; 