"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { upsertBillAction } from "@/actions/upsertBillActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { formSchema } from "@/actions/upsertBillActions/schemaBill";
import { Bill } from "@/app/@types/bill";
import { DatePicker } from "@/app/(protected)/_components/datePicker";
import { NumericFormat } from "react-number-format";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface UpsertBillFormProps {
  onSuccess?: () => void;
  bill?: Bill;
}

const UpsertBillForm: React.FC<UpsertBillFormProps> = ({ onSuccess, bill }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: bill?.id || undefined,
      fixedBillId: bill?.fixedBillId || undefined,
      description: bill?.description || "",
      dueDate: bill?.dueDate ? new Date(bill.dueDate) : new Date(),
      amount: bill?.amount || 0,
      paid: bill?.paid || false,
      paidAt: bill?.paidAt ? new Date(bill.paidAt) : undefined,
      transactionId: bill?.transactionId || undefined,
    },
  });

  const upsertBill = useAction(upsertBillAction, {
    onSuccess: () => {
      toast.success(bill ? "Conta atualizada com sucesso" : "Conta criada com sucesso");
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao salvar conta a pagar");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertBill.execute(values);
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{bill ? "Editar conta a pagar" : "Nova conta a pagar"}</DialogTitle>
        <DialogDescription>
          {bill ? "Altere os dados da conta a pagar" : "Adicione uma nova conta a pagar"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4 w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição da conta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de vencimento</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="Valor"
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue ?? 0);
                    }}
                    thousandSeparator="."
                    decimalSeparator="," 
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            bill &&
             <FormField
            control={form.control}
            name="paid"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mb-0">Pago?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          }
         
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={upsertBill.status === "executing"}>
            {upsertBill.status === "executing" ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2 inline" />
            ) : null}
            {bill ? "Salvar alterações" : "Criar conta a pagar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpsertBillForm; 