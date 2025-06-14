"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import upsertPlaningActions from "@/actions/upsertPlaningActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  target_value: z.coerce.number().min(1, { message: "Valor alvo é obrigatório" }),
  iniital_value: z.coerce.number().min(0, { message: "Valor inicial é obrigatório" }),
});

interface UpsertPlanFormProps {
  onSuccess?: () => void;
  plan?: z.infer<typeof formSchema>

}

const UpsertPlanForm= ({ onSuccess, plan }:UpsertPlanFormProps) => {
  console.log(plan);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: plan?.id || undefined,
      title: plan?.title || "",
      description: plan?.description || "",
      target_value: plan?.target_value || 0,
      iniital_value: plan?.iniital_value || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Chamar action para criar planejamento
   
    await upsertPlaning.execute(values);
  }

  const upsertPlaning = useAction(upsertPlaningActions,{
    onSuccess: () => {
      form.reset();
      if(plan?.id){
        toast.success("Planejamento atualizado com sucesso");
      }else{
        toast.success("Planejamento criado com sucesso");
      }
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Erro ao criar planejamento");
      console.log(error);
    },
  })

  return (
    <div>
      <DialogTitle>Adicionar planejamento</DialogTitle>
      <DialogDescription>Preencha os campos abaixo para adicionar um novo planejamento</DialogDescription>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Viagem dos Sonhos" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Descreva seu objetivo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="target_value"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Valor alvo</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="Valor alvo"
                    value={field.value}
                    onValueChange={(values) => field.onChange(values.floatValue)}
                    thousandSeparator="."
                    decimalSeparator="," 
                    prefix="R$ "
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
            name="iniital_value"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Valor inicial</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="Valor inicial"
                    value={field.value}
                    onValueChange={(values) => field.onChange(values.floatValue)}
                    thousandSeparator="."
                    decimalSeparator="," 
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    customInput={Input}
                 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            {
              upsertPlaning.isPending &&
              <Loader2 className="w-4 h-4 animate-spin" />
            }
            Salvar 
          </Button>
        </div>
      </form>
    </Form>
    </div>
   
  );
};

export default UpsertPlanForm; 