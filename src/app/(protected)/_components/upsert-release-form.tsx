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
import { Category } from "@/app/@types/category";
import { Button } from "@/components/ui/button";
import { NumericFormat } from 'react-number-format';
import { useAction } from "next-safe-action/hooks";
import upsertReleasesActions from "@/actions/upsertReleasesActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const formSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, {
    message: "Descrição é obrigatória",
  }),
  amount: z.number().min(1, {
    message: "Valor é obrigatório",
  }),
  date: z.date(),
  category: z.string().min(1, {
    message: "Categoria é obrigatória",
  }),
  type: z.enum(["INCOME", "EXPENSE"]),
});

interface UpsertReleaseFormProps {
  type?: "INCOME" | "EXPENSE";
  onSuccess: () => void;
  release?: z.infer<typeof formSchema>
}

const UpsertReleaseForm = ({  type, onSuccess, release }: UpsertReleaseFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const session = await authClient.getSession();
      const listCategories = session?.data?.categories || []
      if(type === "INCOME"){
        const incomeCategories = listCategories.filter((category: Category) => category.type === "INCOME")
        setCategories(incomeCategories)
      }else{
        const expenseCategories = listCategories.filter((category: Category) => category.type === "EXPENSE")
        setCategories(expenseCategories)
      }
    };
    
    fetchCategories();
  }, []);

  console.log(release)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: release?.id || undefined,
      description: release?.description || "",
      amount: release?.amount || 0,
      date: release?.date || new Date(),
      category: release?.category || "",
      type: release?.type || type || "EXPENSE",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    upsertReleases.execute(values)
  }

  const upsertReleases = useAction(upsertReleasesActions,{
    onSuccess: () => {
      if(release){
        toast.success("Lançamento atualizado com sucesso")
      }else{
        toast.success("Lançamento criado com sucesso")
      }
     
      form.reset()
     
      onSuccess()
    },
    onError: () => {
      if(release){
        toast.error("Erro ao atualizar lançamento")
      }else{
        toast.error("Erro ao criar lançamento")
      }
    }
  })

  return (
    <div className="w-full">
      <DialogHeader>
        <DialogTitle>{ release ? "Alterar lançamento" : type === "INCOME" ? "Nova receita" : "Nova despesa"}</DialogTitle>
        <DialogDescription>
          {
            release ? "Altere dados de um lançamento" : "Adicione um novo lançamento para o seu orçamento"
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
            <div className="flex gap-4 w-full  max-md:flex-col">
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
               <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.length > 0 ? categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            )) : (
                                <SelectItem value="Nenhuma categoria encontrada" disabled>
                                    Nenhuma categoria encontrada
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

export default UpsertReleaseForm;
