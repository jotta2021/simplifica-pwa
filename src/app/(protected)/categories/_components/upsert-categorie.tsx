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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICONES_CATEGORIAS } from "../_constants/icones";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { colors } from "../_constants/colors";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { upsertCategorieAction } from "@/actions/upsertCategorieActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Category } from "@/app/@types/category";
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  type: z.enum(["INCOME", "EXPENSE"], { message: "Tipo é obrigatório" }),
  icon: z.string().min(1, { message: "Icone é obrigatório" }),
  color: z.string().min(1, { message: "Cor é obrigatória" }),
});

interface UpsertCategorieFormProps {
  onSuccess?: () => void;
  category?: Category;
}

const UpsertCategorieForm: React.FC<UpsertCategorieFormProps> = ({ onSuccess, category }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: category?.id || "",
      name: category?.name || "",
      type: category?.type as "INCOME" | "EXPENSE" || "INCOME",
      icon: category?.icon || "",
      color: category?.color || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
   
   
    await upsertCategorie.execute(values);
  }


  
  const upsertCategorie = useAction(upsertCategorieAction, {
    onSuccess: () => {
      if(category){
        toast.success("Categoria atualizada com sucesso");
      }else{
        toast.success("Categoria criada com sucesso");
      }
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao criar categoria");
    },
  });

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{category ? "Editar categoria" : "Crie uma nova categoria"}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 my-4 w-full"
        >
          <div className="flex flex-row gap-4 items-center w-full">
            <Avatar
              className="bg-gray-300 w-20 h-20 items-center justify-center"
              style={{ backgroundColor: form.watch("color") }}
            >
              {ICONES_CATEGORIAS[
                form.watch("icon") as keyof typeof ICONES_CATEGORIAS
              ] ? (
                React.createElement(
                  ICONES_CATEGORIAS[
                    form.watch("icon") as keyof typeof ICONES_CATEGORIAS
                  ],
                  { className: "w-10 h-10 text-white" }
                )
              ) : (
                <AvatarFallback></AvatarFallback>
              )}
            </Avatar>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da categoria</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" className="w-full " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row gap-4"
                    defaultValue="INCOME"
                  >
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="INCOME" />
                      </FormControl>
                      <FormLabel className="font-normal">Receita</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="EXPENSE" />
                      </FormControl>
                      <FormLabel className="font-normal">Despesa</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Escolha um icone</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-8 gap-4">
                          {Object.entries(ICONES_CATEGORIAS).map(
                            ([key, Icon]) => (
                              <div
                                key={key}
                                className="flex items-center bg-gray-300 rounded-full p-2 justify-center cursor-pointer"
                                onClick={() => field.onChange(key)}
                              >
                                <Icon className="w-6 h-6 text-gray-500" />
                              </div>
                            )
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Escolha uma cor</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-8 gap-4">
                          {colors.map((color) => (
                            <div
                              key={color}
                              className="flex items-center rounded-full w-10 h-10 justify-center cursor-pointer"
                              style={{
                                backgroundColor: color,
                                border:
                                  field.value === color
                                    ? "2px solid #e6e6e6"
                                    : "none",
                              }}
                              onClick={() => field.onChange(color)}
                            >
                              <div className="w-6 h-6 rounded-full"></div>
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
          <div className="flex justify-end">
                <Button type="submit" className=" bg-green-500 hover:bg-green-600" disabled={upsertCategorie.isPending}>
          {
            upsertCategorie.isPending &&
            <Loader2 className="w-4 h-4 animate-spin" />
          }
          {category ? "Salvar" : "Criar categoria"}
          </Button>
          </div>
      
        </form>
      </Form>
    </div>
  );
};

export default UpsertCategorieForm;
