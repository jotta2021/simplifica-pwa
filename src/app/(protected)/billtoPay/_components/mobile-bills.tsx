"use client";
import React from "react";
import { Bill } from "@/app/@types/bill";
import formatCurrency from "@/helpers/formatCurrency";
import { formatDate } from "@/helpers/formatDate";
import { Pencil, Trash, Repeat, Repeat1 } from "lucide-react";
import UpsertBillForm from "./upsert-bill-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { deleteBillAction } from "@/actions/upsertBillActions/deleteBillAction";
import { toast } from "sonner";

interface MobileBillsProps {
  bills: Bill[];
}

const MobileBills: React.FC<MobileBillsProps> = ({ bills }) => {
  return (
    <div className="space-y-4">
      {bills.length > 0 ? (
        bills.map((bill) => <MobileBillCard key={bill.id} bill={bill} />)
      ) : (
        <div className="flex items-center w-full justify-center">
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">Nenhuma conta encontrada</span>
        </div>
      )}
    </div>
  );
};

const MobileBillCard: React.FC<{ bill: Bill }> = ({ bill }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const deleteBill = useAction(deleteBillAction, {
    onSuccess: () => {
      toast.success("Conta deletada com sucesso");
      setOpenDialog(false);
    },
    onError: () => {
      toast.error("Erro ao deletar conta");
    },
  });
  const handleDelete = () => {
    deleteBill.execute({ id: bill.id });
  };

  // Status visual
  const paid = bill.paid;
  const dueDate = new Date(bill.dueDate);
  const now = new Date();
  const dueDateDay = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let status = "";
  let color = "";
  let bg = "";
  if (paid) {
    status = "Pago";
    color = "text-green-600";
    bg = "bg-green-100";
  } else if (!paid && dueDateDay < today) {
    status = "Vencida";
    color = "text-red-500";
    bg = "bg-red-100";
  } else {
    status = "Não paga";
    color = "text-yellow-700";
    bg = "bg-yellow-100";
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-2">
          {bill.fixedBillId && <Repeat1 size={16} className="text-blue-500"  />}
          <span className="font-medium text-base">{bill.description}</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">Vencimento: {formatDate(new Date(bill.dueDate))}</span>
        <span className="text-sm font-medium">{formatCurrency(bill.amount)}</span>
        <div className={`inline-block mt-1 ${bg} rounded-full px-2 py-0.5 flex items-start justify-start`}>
          <span className={color + " text-xs font-semibold"}>{status}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end ml-2">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-md:w-[90%]">
            <UpsertBillForm bill={bill} onSuccess={() => setOpenDialog(false)} />
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
              <AlertDialogTitle>Tem certeza que deseja deletar esta conta?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta conta será deletada permanentemente e não poderá ser recuperada.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction className="border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white" onClick={handleDelete} disabled={deleteBill.status === "executing"}>
                {deleteBill.status === "executing" ? "Deletando..." : "Deletar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MobileBills; 