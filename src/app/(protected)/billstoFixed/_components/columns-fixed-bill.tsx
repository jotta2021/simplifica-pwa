"use client";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FixedBill } from "@/app/@types/bill";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertFixedBillForm from "./upsert-fixed-bill-form";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAction } from 'next-safe-action/hooks';
import { deleteFixedBillAction } from '@/actions/upsertFixedBillActions/deleteFixedBillAction';
import formatCurrency from "@/lib/formatCurrency";

export const fixedBillColumns: ColumnDef<FixedBill>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => <span>{row.original.title}</span>,
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => <span> {formatCurrency(row.original.amount) }</span>,
  },
  {
    accessorKey: "dueDay",
    header: "Dia de vencimento",
    cell: ({ row }) => <span>{row.original.dueDay}</span>,
  },
  {
    accessorKey: "active",
    header: "Ativa?",
    cell: ({ row }) => row.original.active ? <span className="text-green-600">Sim</span> : <span className="text-red-500">Não</span>,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <FixedBillActions fixedBill={row.original} />,
  },
];

const FixedBillActions: React.FC<{ fixedBill: FixedBill }> = ({ fixedBill }) => {
  const [openDialog, setOpenDialog] = useState(false);
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
    <div className="flex gap-2">
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
        <AlertDialogContent className='max-md:w-[90%]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja deletar esta conta fixa?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta conta fixa será deletada permanentemente e não poderá ser recuperada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className='border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white' onClick={handleDelete} disabled={deleteFixedBill.status === "executing"}>
              {deleteFixedBill.status === "executing" ? "Deletando..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export function FixedBillTable({ columns, data }: { columns: ColumnDef<FixedBill, any>[]; data: FixedBill[] }) {
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
                  Nenhuma conta fixa encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        Anterior
      </Button>
      <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Próximo
      </Button>
    </div>
  );
} 