import { auth } from '@/lib/auth';
import { getHours } from 'date-fns';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

// import { Container } from './styles';

const Painel= async () => {
    const session = await auth.api.getSession({
        headers:await headers()
    })

    function getPeriodoDoDia(date: Date = new Date()): "manhã" | "tarde" | "noite" {
        const hora = getHours(date);
      
        if (hora >= 5 && hora < 12) {
          return "manhã";
        } else if (hora >= 12 && hora < 18) {
          return "tarde";
        } else {
          return "noite";
        }
      }
  return (
    <div>
          <div className="flex items-center gap-2 p-4">
            <span className=" font-medium">{getPeriodoDoDia() === "manhã" ? "Bom dia" : getPeriodoDoDia() === "tarde" ? "Boa tarde" : "Boa noite"}, {session?.user?.name}</span>
            <Image src={getPeriodoDoDia() === "manhã" ? '/icons/day.png' : getPeriodoDoDia() === "tarde" ? '/icons/afternoon.png' : '/icons/night.png'} alt="logo" width={34} height={34}/>
        </div>
    </div>
  )
}

export default Painel;