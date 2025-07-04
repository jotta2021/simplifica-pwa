'use client'
import { Avatar } from "@/components/ui/avatar";
import formatCurrency from "@/helpers/formatCurrency";
import { formatDate } from "@/helpers/formatDate";
import { ICONES_CATEGORIAS } from "../../categories/_constants/icones";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import UpsertReleaseForm from "../../_components/upsert-release-form";
import ButtonsActions from "./buttonsActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  category: string;
  categoryDetails?: {
    name: string;
    icon: string;
    color: string;
  };
  accountWalletId:string 
  toAccountWalletId:string | null
  accountWallet:{
    name:string
    id:string
  }
  toAccountWallet:{
    name:string,
    id:string
  }
};


export const columns: ColumnDef<Transaction>[] = [
  
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            
               <Avatar
          className="bg-gray-300 w-8 h-8 items-center justify-center"
          style={{ backgroundColor: row.original.categoryDetails?.color }}
        >
          
          { row.original.category && ICONES_CATEGORIAS[row.original.categoryDetails?.icon as keyof typeof ICONES_CATEGORIAS]
            ? React.createElement(
                ICONES_CATEGORIAS[
                  row.original.categoryDetails?.icon as keyof typeof ICONES_CATEGORIAS
                ],
                { className: "w-5 h-5 text-white" }
              )
            : 
          <ArrowLeftRight className="text-blue-500" />
          }
        </Avatar>
            <span>{row.original.description}</span>
          </div>
        );
      },
  },

  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return (
        <div>
          <span>{formatDate(row.original.date)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "accountWallet",
    header: "Conta",
    cell: ({ row }) => {
      return (
        <div>
         <p>{row.original.accountWallet.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria/Destino",
    cell: ({ row }) => {
      if (row.original.type === "TRANSFER") {
        return (
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="text-blue-500" />
            <span>{row.original.toAccountWallet?.name || "Transferência"}</span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2">
          <span>{row.original.categoryDetails?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      return (
        <div>
          <span className={`${row.original.type==='INCOME'? 'text-green-500' : row.original.type==='EXPENSE' ? 'text-red-500' : 'text-blue-500' } font-medium`}>{row.original.type==='EXPENSE' && '-'} {formatCurrency(row.original.amount)}</span>
        </div>
      );
    },
  },
  {
  
    id: "actions",
   
    cell: ({ row }) => {
     
      return (
       
         <div>
          <ButtonsActions release={row.original} />
         </div>
      
        
       
      );
  }
}
];
