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
import { upsertFixedBillAction } from "@/actions/upsertFixedBillActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FixedBill } from "@/app/@types/bill";
import { Checkbox } from "@/components/ui/checkbox";
import { NumericFormat } from "react-number-format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Category } from "@/app/@types/category";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Título obrigatório"),
  amount: z.number().min(0.01, "Valor obrigatório"),
  dueDay: z.number().min(1).max(31),
  categoryId: z.string().min(1, "Categoria obrigatória"),
  active: z.boolean(),
});

interface UpsertFixedBillFormProps {
  onSuccess?: () => void;
  fixedBill?: FixedBill;
}

const UpsertFixedBillForm: React.FC<UpsertFixedBillFormProps> = ({ onSuccess, fixedBill }) => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  useEffect(() => {
    const fetchCategories = async () => {
      const session = await authClient.getSession();
      const listCategories = session?.data?.categories || [];
      // Só categorias de despesa
      setCategories(listCategories.filter((cat: Category) => cat.type === "EXPENSE"));
    };
    fetchCategories();
  }, []);
console.log(categories)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: fixedBill?.id || undefined,
      title: fixedBill?.title || "",
      amount: fixedBill?.amount || 0,
      dueDay: fixedBill?.dueDay || 1,
      categoryId: fixedBill?.categoryId || "",
      active: fixedBill?.active === false ? false : true,
    },
  });

  const upsertFixedBill = useAction(upsertFixedBillAction, {
    onSuccess: () => {
      toast.success(fixedBill ? "Conta fixa atualizada com sucesso" : "Conta fixa criada com sucesso");
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao salvar conta fixa");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertFixedBill.execute(values);
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{fixedBill ? "Editar conta fixa" : "Nova conta fixa"}</DialogTitle>
        <DialogDescription>
          {fixedBill ? "Altere os dados da conta fixa" : "Adicione uma nova conta fixa"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título da conta fixa" {...field} />
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
          <FormField
            control={form.control}
            name="dueDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia de vencimento</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Dia do mês"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  {/* Só renderiza o Select se categories !== null */}
                  {categories !== null ? (
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
                          <SelectItem value="" disabled>
                            Nenhuma categoria encontrada
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-gray-400">Carregando categorias...</div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="mb-0">Ativa?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={upsertFixedBill.status === "executing"}>
            {upsertFixedBill.status === "executing" ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2 inline" />
            ) : null}
            {fixedBill ? "Salvar alterações" : "Criar conta fixa"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpsertFixedBillForm; 