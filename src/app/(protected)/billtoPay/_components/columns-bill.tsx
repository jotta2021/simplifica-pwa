"use client";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Bill } from "@/app/@types/bill";
import formatCurrency from "@/helpers/formatCurrency";
import { formatDate } from "@/helpers/formatDate";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertBillForm from "./upsert-bill-form";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAction } from 'next-safe-action/hooks';
import { deleteBillAction } from '@/actions/upsertBillActions/deleteBillAction';

export const billColumns: ColumnDef<Bill>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <span>{row.original.description}</span>,
  },
  {
    accessorKey: "dueDate",
    header: "Vencimento",
    cell: ({ row }) => <span>{formatDate(new Date(row.original.dueDate))}</span>,
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => <span>{formatCurrency(row.original.amount)}</span>,
  },
  {
    accessorKey: "paid",
    header: "Pago?",
    cell: ({ row }) => {
      const paid = row.original.paid;
      const dueDate = new Date(row.original.dueDate);
      const now = new Date();
      // Zera hora/min/seg dos dois para comparar só a data
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
        <div className={`${bg} rounded-full inline-block  items-center justify-center  p-1 px-2 `}>
          <span className={color}>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "fixedBillId",
    header: "Fixa?",
    cell: ({ row }) => (
      row.original.fixedBillId ? <span className="text-blue-500">Fixa</span> : <span>Não</span>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <BillActions bill={row.original} />,
  },
];

// Componente de ações (editar/excluir)
const BillActions: React.FC<{ bill: Bill }> = ({ bill }) => {
  const [openDialog, setOpenDialog] = useState(false);
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

  return (
    <div className="flex gap-2">
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
        <AlertDialogContent className='max-md:w-[90%]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja deletar esta conta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta conta será deletada permanentemente e não poderá ser recuperada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className='border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white' onClick={handleDelete} disabled={deleteBill.status === "executing"}>
              {deleteBill.status === "executing" ? "Deletando..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// DataTable para contas a pagar
export function BillTable({ columns, data }: { columns: ColumnDef<Bill, any>[]; data: Bill[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhuma conta encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Próximo
        </Button>
      </div>
    </div>
  );
}
