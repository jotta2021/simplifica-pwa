"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { EllipsisVertical, Loader2, Pencil, PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import UpsertPlanForm from "../planing/_components/upsert-plan-form";
import UpsertPlanContribuitionForm from "@/app/(protected)/planing/_components/upsertPlanContribuition";
import { deletePlaningAction } from "@/actions/upsertPlaningActions/deletePlaning";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
interface PlanningCardProps {
  id?: string;
  title: string;
  description: string;
  targetValue: number;
  initialValue: number;
  onFunction?: boolean;
}

export default function PlanningCard({
  id,
  title,
  description,
  targetValue,
  initialValue,
  onFunction,
}: PlanningCardProps) {
  const progress = Math.min((initialValue / targetValue) * 100, 100);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddContribuitionDialog, setOpenAddContribuitionDialog] =
    useState(false);

    const deletePlaning = useAction(deletePlaningAction, {
      onSuccess: () => {
        toast.success("Planejamento deletado com sucesso");
      },
      onError: () => {
        toast.error("Erro ao deletar planejamento");
      },
    })

    function handleDeletePlaning() {
      deletePlaning.execute({ id: id as string });
    }
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <Menubar
          className={`p-0 mt-0 m-0 ${onFunction === undefined && "hidden"}`}
        >
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                className="gap-1 text-sm justify-between "
                onClick={() => setOpenEditDialog(true)}
              >
                Editar
                <Pencil size={16} />
              </MenubarItem>

              <MenubarItem
                className="gap-1 text-sm justify-between"
                onClick={() => setOpenAddContribuitionDialog(true)}
                disabled={!id}
              >
                Adicionar valor
                <PlusCircle size={16} />
              </MenubarItem>
              <MenubarItem className="gap-1 text-sm justify-between text-red-500" onClick={handleDeletePlaning} disabled={deletePlaning.isExecuting}>
                {
                  deletePlaning.isExecuting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Deletar
                      <Trash size={16} />
                    </>
                  )
                }
                
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>
              Valor guardado:{" "}
              <b>
                R${" "}
                {initialValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </b>
            </span>
            <span>
              Meta:{" "}
              <b>
                R${" "}
                {targetValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </b>
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <span className="text-xs text-muted-foreground mt-1">
            Progresso: {progress.toFixed(1)}%
          </span>
        </div>
      </CardContent>
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="max-md:w-[90%]">
          <UpsertPlanForm
            plan={{
              id,
              title,
              description,
              target_value: targetValue,
              iniital_value: initialValue,
            }}
            onSuccess={() => setOpenEditDialog(false)}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAddContribuitionDialog}
        onOpenChange={setOpenAddContribuitionDialog}
      >
        <DialogContent className="max-md:w-[90%]">
          <UpsertPlanContribuitionForm
            planId={id}
            onSuccess={() => setOpenAddContribuitionDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
