"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "./datePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { NumericFormat } from 'react-number-format';
import { useAction } from "next-safe-action/hooks";
import upsertReleasesActions from "@/actions/upsertReleasesActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { AccountWallet } from "@/app/@types/accountWallet";

const formSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, {
    message: "Descrição é obrigatória",
  }),
  amount: z.number().min(1, {
    message: "Valor é obrigatório",
  }),
  
  date: z.date(),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
  accountWalletId: z.string().min(1, {
    message: "Conta é obrigatória",
  }),
  toAccountWalletId: z.string().optional()
});

interface UpsertReleaseFormProps {
  type?: "INCOME" | "EXPENSE" | "TRANSFER" ;
  onSuccess: () => void;
  release?: z.infer<typeof formSchema>
}

const UpsertTransferForm = ({  type, onSuccess, release }: UpsertReleaseFormProps) => {

  const [accounts,setAccounts] = useState<AccountWallet[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const session = await authClient.getSession();
      //armazena as conts bancks
      const listAccounts = session?.data?.accounts || []
    setAccounts(listAccounts)


     
    };


    
    fetchCategories();
  }, []);

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: release?.id || undefined,
      description: release?.description || "Transferência",
      amount: release?.amount || 0,
      date: release?.date || new Date(),
      type: release?.type || type || "EXPENSE",
      accountWalletId: release?.accountWalletId || '',
      toAccountWalletId: release?.toAccountWalletId || ''
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    upsertReleases.execute(values)
  }

  const upsertReleases = useAction(upsertReleasesActions,{
    onSuccess: () => {
      if(release){
        toast.success("Transferência atualizado com sucesso")
      }else{
        toast.success("Transferência realizada com sucesso")
      }
     
      form.reset()
     
      onSuccess()
    },
    onError: () => {
      if(release){
        toast.error("Erro ao atualizar Transferência")
      }else{
        toast.error("Erro ao realizar Transferência")
      }
    }
  })

  return (
    <div className="w-full">
      <DialogHeader>
        <DialogTitle>{ release ? "Alterar lançamento" : 'Nova transferência'}</DialogTitle>
        <DialogDescription>
          {
            release ? "Altere dados de um lançamento" : "Adicione uma nova transferência entre suas contas."
          }
         
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 w-full  max-md:flex-col">
          
             <FormField
              control={form.control}
              name="accountWalletId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Conta </FormLabel>
                  <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={release ? true :false}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma conta" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts && accounts.length > 0 ? accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                    {account.name}
                                </SelectItem>
                            )) : (
                                <SelectItem value="Nenhuma conta encontrada" disabled>
                                    Nenhuma conta encontrada
                                </SelectItem>
                            )}
                        </SelectContent>
                </Select>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo de conta de destino apenas para transferências */}
          
              <FormField
                control={form.control}
                name="toAccountWalletId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Conta de destino</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a conta de destino" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts && accounts.length > 0 ? accounts
                            .filter((account) => account.id !== form.watch("accountWalletId"))
                            .map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name}
                              </SelectItem>
                            )) : (
                              <SelectItem value="Nenhuma conta encontrada" disabled>
                                Nenhuma conta encontrada
                              </SelectItem>
                            )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            </div>
           
          
            <div className="flex gap-4 w-full  max-md:flex-col">
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
                        field.onChange(values.floatValue);
                      }}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$"
                      decimalScale={2}
                      fixedDecimalScale={true}
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                  <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                     
                    />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={upsertReleases.isPending}>
                {upsertReleases.isPending && <Loader2 className="w-4 h-4 animate-spin" /> }
                Salvar
                </Button>
            </div>
          
          </form>
        </Form>
      </DialogHeader>
    </div>
  );
};

export default UpsertTransferForm;
