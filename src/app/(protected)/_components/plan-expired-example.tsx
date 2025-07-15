"use client";

import React, { useState } from "react";
import { PlanExpiredAlert, usePlanExpired } from "./plan-expired-alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

// Exemplo de como usar o componente em uma página específica
export function PlanExpiredExample() {
  const isExpired = usePlanExpired();
  const [showAlert, setShowAlert] = useState(false);

  // Função para mostrar o alerta manualmente (opcional)
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Status do Plano</h2>
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-5 h-5 ${isExpired ? 'text-red-500' : 'text-green-500'}`} />
          <span className={isExpired ? 'text-red-600' : 'text-green-600'}>
            {isExpired ? 'Plano Expirado' : 'Plano Ativo'}
          </span>
        </div>
      </div>

      {/* Botão para testar o alerta manualmente */}
      <Button 
        onClick={handleShowAlert}
        variant="outline"
        className="mb-4"
      >
        Testar Alerta de Plano Expirado
      </Button>

      {/* O alerta será mostrado automaticamente se o plano estiver expirado */}
      <PlanExpiredAlert 
        isOpen={showAlert || isExpired} 
        onClose={handleCloseAlert} 
      />
    </div>
  );
} 