"use client";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePickerAndHour } from "./datePickerandHour";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { upsertReminderAction } from "@/actions/upsertReminderActions";
import { toast } from "sonner";
import { Reminder } from "./calendarReminders";

// import { Container } from './styles';
const formSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, { message: "Descrição é obrigatório" }),
  date_hour: z.date(),
});


interface Props {
    onSuccess: ()=> void;
    reminder?: Reminder
}
const UpsertFormReminder= ({onSuccess, reminder}:Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: reminder?.id || '',
      description: reminder?.description || '',
      date_hour: new Date(reminder?.date_hour || new Date()) || new Date(),
      
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
await upsertReminder.execute(values)
  }

  const upsertReminder = useAction(upsertReminderAction,{
    onSuccess:()=>{
toast.success('Lembrete criado com sucesso!')
onSuccess()
    },
    onError:()=> {
        toast.error("Ocorreu um erro")
    }
  })

  return (
    <div>
      <DialogTitle>Adicionar lembrete</DialogTitle>
      <DialogDescription>
        Preencha os campos abaixo para adicionar um novo lembrete
      </DialogDescription>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Informe o lembrete" {...field} />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="date_hour"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                 <DatePickerAndHour date={field.value} setDate={field.onChange}/>
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="flex justify-end">
          <Button type="submit" className="bg-green-500 hover:bg-green-600"
          disabled={upsertReminder.isExecuting}
          >
          
              {
                upsertReminder.isExecuting &&
                <Loader2 className="animate-spin" color="white"/>
              }
            
            Salvar 
          </Button>
        </div>
        </form>
      </Form>
    </div>
  );
};

export default UpsertFormReminder;
