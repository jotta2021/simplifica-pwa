"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CreditCard, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface PlanExpiredAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlanExpiredAlert({ isOpen, onClose }: PlanExpiredAlertProps) {
  const router = useRouter();
  const session = authClient.useSession();

  const handleRenewPlan = () => {
    // Fecha o modal e redireciona para a página de perfil onde estão os planos
    onClose();
    router.push("/profile");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl font-bold text-red-600 dark:text-red-400">
            Plano Expirado
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Seu plano venceu e você não pode mais acessar todas as funcionalidades do Simplifica. 
            Renove seu plano para continuar aproveitando todos os recursos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-3 sm:flex-row">
        
          <AlertDialogAction 
            onClick={handleRenewPlan}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Renovar Plano
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Hook para verificar se o plano expirou
export function usePlanExpired() {
  const session = authClient.useSession();
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (session?.data?.user) {
      const user = session.data.user;
      const now = new Date();
      
      // Adiciona 2 dias de tolerância à data de renovação
      const toleranceDays = 2;
      
      // Verifica se o usuário está em trial e a data de renovação + 2 dias já passou
      const isTrialExpired = Boolean(
        user.trial && 
        user.renewAt && 
        new Date(user.renewAt).getTime() + (toleranceDays * 24 * 60 * 60 * 1000) < now.getTime()
      );
      
      // Verifica se o usuário não tem assinatura ativa
      const hasNoActiveSubscription = Boolean(!user.subscriptionId || user.subscriptionStatus !== 'authorized');
      
      // Verifica se a data de renovação + 2 dias passou e não há assinatura ativa
      const isRenewDatePassed = Boolean(
        user.renewAt && 
        new Date(user.renewAt).getTime() + (toleranceDays * 24 * 60 * 60 * 1000) < now.getTime() && 
        hasNoActiveSubscription
      );
      
      setIsExpired(isTrialExpired || isRenewDatePassed);
    }
  }, [session]);

  return isExpired;
} 