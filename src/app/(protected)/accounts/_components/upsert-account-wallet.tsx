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
import { upsertAccountWalletAction } from "@/actions/upsertAccountWalletActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AccountWallet } from "@/app/@types/accountWallet";
import banks from "../../_consts/images";
import { formSchema } from "@/actions/upsertAccountWalletActions/schemaAccountWallet";
import { NumericFormat } from "react-number-format";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UpsertAccountWalletFormProps {
  onSuccess?: () => void;
  account?: AccountWallet;
}


const UpsertAccountWalletForm: React.FC<UpsertAccountWalletFormProps> = ({
  onSuccess,
  account,
  
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: account?.id || "",
      name: account?.name || "",
      image: account?.image || "",
      balance: account?.balance || 0,
    
    },
  });

  const upsertAccountWallet = useAction(upsertAccountWalletAction, {
    onSuccess: () => {
      toast.success(
        account ? "Conta atualizada com sucesso" : "Conta criada com sucesso"
      );
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao salvar conta");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertAccountWallet.execute(values);
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          {account ? "Editar conta" : "Crie uma nova conta"}
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
                <FormLabel>Nome da conta</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: Nubank, Carteira..."
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
            disabled={upsertAccountWallet.status === "executing"}
          >
            {upsertAccountWallet.status === "executing" ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2 inline" />
            ) : null}
            {account ? "Salvar alterações" : "Criar conta"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpsertAccountWalletForm;
