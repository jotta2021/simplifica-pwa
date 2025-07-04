"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { upsertCreditCardAction } from "@/actions/upsertCreditCard/upsertCreditCardActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CreditCard } from "@/app/@types/creditCard";
import { formSchema } from "@/actions/upsertCreditCard/schemaCreditCard";
import { NumericFormat } from "react-number-format";
import banks from "../../_consts/images";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UpsertCreditCardFormProps {
  onSuccess?: () => void;
  card?: CreditCard;
}

const UpsertCreditCardForm: React.FC<UpsertCreditCardFormProps> = ({
  onSuccess,
  card,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: card?.id || "",
      name: card?.name || "",
      limit: card?.limit || 0,
      closingDay: card?.closingDay || 1,
      dueDay: card?.dueDay || 1,
      image: card?.image || ''
    },
  });

  const upsertCreditCard = useAction(upsertCreditCardAction, {
    onSuccess: () => {
      toast.success(card ? "Cartão atualizado com sucesso" : "Cartão criado com sucesso");
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao salvar cartão");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertCreditCard.execute(values);
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          {card ? "Editar cartão" : "Crie um novo cartão"}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 my-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do cartão</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: Nubank, Itaú..."
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite do cartão</FormLabel>
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
          <FormField
            control={form.control}
            name="closingDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia de fechamento</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    placeholder="Ex: 10"
                    className="w-full"
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
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    placeholder="Ex: 20"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Escolha uma imagem</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-8 max-md:grid-cols-5 gap-4">
                          {banks.map((item) => (
                            <div key={item.name} className="flex flex-col items-center" >
                              <Avatar
                                className={`cursor-pointer ${field.value === item.image && 'border-2 border-green-500 '} w-10 h-10`}
                                onClick={() => field.onChange(item.image)}
                              >
                                <AvatarImage
                                  src={item.image}
                                  className="object-cover"
                                />
                              </Avatar>
                              <span className="text-[9px] text-gray-700  text-center dark:text-white">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={upsertCreditCard.status === "executing"}
          >
            {upsertCreditCard.status === "executing" ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2 inline" />
            ) : null}
            {card ? "Salvar alterações" : "Criar cartão"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpsertCreditCardForm; 