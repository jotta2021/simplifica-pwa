"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import UpsertAccountWalletForm from "./upsert-account-wallet";
import { AccountWallet } from "@/app/@types/accountWallet";
import { useAction } from "next-safe-action/hooks";
import { deleteAccountWalletAction } from "@/actions/upsertAccountWalletActions";
import { toast } from "sonner";
import Image from "next/image";
import { MoreVertical, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import banks from "@/app/(protected)/_consts/images";
import formatCurrency from "@/helpers/formatCurrency";
import { cn } from "@/lib/utils";

interface AccountWalletCardProps {
  account: AccountWallet;
}

const AccountWalletCard: React.FC<AccountWalletCardProps> = ({ account }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const deleteAccount = useAction(deleteAccountWalletAction, {
    onSuccess: () => {
      toast.success("Conta excluída com sucesso");
      setOpenDelete(false);
    },
    onError: () => {
      toast.error("Erro ao excluir conta");
    },
  });


  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow flex items-center p-4 justify-between hover:shadow-md transition-all  ",
        "dark:bg-card dark:text-card-foreground dark:border  dark:hover:shadow-lg dark:bg-neutral-800"
      )}
    >
      <div className="flex items-center gap-4">
        {account.image && (
          <Image src={account.image} alt={account.image} width={48} height={48} quality={100}  className="rounded-full w-[48px] h-[48px] object-cover " />
        )}
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-700 text-sm dark:text-white">{account.name}</span>
          <span className="text-xs text-gray-800 dark:text-gray-300">Saldo: {formatCurrency(account.balance) }</span>
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
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-md:w-[90%]">
          <UpsertAccountWalletForm account={account} onSuccess={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja realmente excluir esta conta?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300">Esta ação não poderá ser desfeita.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => deleteAccount.execute({ id: account.id })} disabled={deleteAccount.status === 'executing'}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountWalletCard; 