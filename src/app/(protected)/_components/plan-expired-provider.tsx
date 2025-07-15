"use client";

import React, { useEffect, useState } from "react";
import { PlanExpiredAlert, usePlanExpired } from "./plan-expired-alert";

interface PlanExpiredProviderProps {
  children: React.ReactNode;
}

export function PlanExpiredProvider({ children }: PlanExpiredProviderProps) {
  const isExpired = usePlanExpired();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Mostra o alerta apenas se o plano estiver expirado
    if (isExpired) {
      setShowAlert(true);
    }
  }, [isExpired]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {children}
      <PlanExpiredAlert 
        isOpen={showAlert} 
        onClose={handleCloseAlert} 
      />
    </>
  );
} 