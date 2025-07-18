"use client";

import { Reminder } from "./calendarReminders";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import UpsertFormReminder from "./upsert-reminder";
import { useAction } from "next-safe-action/hooks";
import { deleteReminderAction } from "@/actions/upsertReminderActions/deleteReminderAction";
import { toast } from "sonner";

interface Props {
  reminders: Reminder[];
}

const MobileReminders = ({ reminders }: Props) => {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<string | null>(null);
  const [editReminder, setEditReminder] = useState<Reminder | null>(null);
  const [deleteReminder, setDeleteReminder] = useState<Reminder | null>(null);

  const deleteAction = useAction(deleteReminderAction, {
    onSuccess: () => {
      toast.success("Lembrete excluído com sucesso!");
      setDeleteReminder(null);
    },
    onError: () => {
      toast.error("Erro ao excluir lembrete");
    },
  });

  if (!isMobile) return null;

  return (
    <div className="space-y-4 p-2 max-md:flex hidden flex-col">
      {reminders.length === 0 && (
        <div className="flex items-center w-full justify-center py-8">
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">Nenhum lembrete encontrado</span>
        </div>
      )}
      {reminders.map((reminder) => (
        <Card
          key={reminder.id}
          className={`flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow hover:shadow-md transition-all cursor-pointer ${selected === reminder.id ? 'ring-2 ring-green-500' : ''}`}
          onClick={() => setSelected(reminder.id === selected ? null : reminder.id)}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
              <Bell className="w-5 h-5 text-green-600 dark:text-green-300" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium text-gray-700 dark:text-white text-base truncate">{reminder.description}</span>
              <span className="text-xs text-gray-400 dark:text-gray-400 mt-1">{new Date(reminder.date_hour).toLocaleString("pt-BR")}</span>
              {selected === reminder.id && (
                <span className="text-xs text-green-600 dark:text-green-400 mt-2">Criado em: {new Date(reminder.createdAt).toLocaleString("pt-BR")}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 ml-2">
              <Dialog open={!!editReminder && editReminder.id === reminder.id} onOpenChange={(open) => setEditReminder(open ? reminder : null)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); setEditReminder(reminder); }}>
                    <Pencil size={18} className="text-blue-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-md:w-[90%]">
                  <UpsertFormReminder reminder={reminder} onSuccess={() => setEditReminder(null)} />
                </DialogContent>
              </Dialog>
              <AlertDialog open={!!deleteReminder && deleteReminder.id === reminder.id} onOpenChange={(open) => setDeleteReminder(open ? reminder : null)}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); setDeleteReminder(reminder); }}>
                    <Trash size={18} className="text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-md:w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir lembrete?</AlertDialogTitle>
                    <AlertDialogDescription>Tem certeza que deseja excluir este lembrete? Esta ação não poderá ser desfeita.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white" onClick={() => deleteAction.execute({ id: reminder.id })} disabled={deleteAction.status === "executing"}>
                      {deleteAction.status === "executing" ? "Excluindo..." : "Excluir"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MobileReminders; 