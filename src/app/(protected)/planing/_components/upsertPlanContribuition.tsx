"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import upsertPlansContribuitions from "@/actions/upsertPlansContribuitions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Valor é obrigatório" }),
  planId: z.string().min(1, { message: "Plano é obrigatório" }),
});

interface UpsertPlanContribuitionFormProps {
  planId?: string;
  onSuccess?: () => void;
}

const UpsertPlanContribuitionForm = ({ planId, onSuccess }: UpsertPlanContribuitionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      planId: planId || "",
    },
  });

  const upsertContribuition = useAction(upsertPlansContribuitions, {
    onSuccess: () => {
      form.reset();
      toast.success("Contribuição adicionada com sucesso");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Erro ao adicionar contribuição");
      console.log(error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertContribuition.execute(values);
  }

  return (
    <div>
      <DialogTitle>Adicionar contribuição</DialogTitle>
      <DialogDescription>Informe o valor que deseja adicionar ao planejamento</DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4 w-full">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue ?? 0);
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    placeholder="Ex: 100,00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Hidden input for planId */}
          <input type="hidden" {...form.register("planId")} value={planId} />
          <div className="flex justify-end">
          <Button type="submit" disabled={upsertContribuition.status === "executing"} className="bg-green-500 hover:bg-green-600 text-white">
            {upsertContribuition.status === "executing" ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            ) : null}
            Adicionar
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpsertPlanContribuitionForm;
