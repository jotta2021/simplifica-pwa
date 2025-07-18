

import { auth } from '@/lib/auth';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { headers } from 'next/headers';
import React from 'react';

// import { Container } from './styles';

const TrialMessage: React.FC = async () => {
    const session =await  auth.api.getSession({
        headers:await headers()
    })

  const user = session?.user
  const isTrialActive = user?.renewAt &&  user?.trial && new Date() < new Date(user?.renewAt)
//dias que faltam
const daysDistance = user?.renewAt && formatDistanceToNowStrict(new Date(user?.renewAt), {
    locale:ptBR,
})


    return (

        <div className='w-full'>

       
   
{isTrialActive && 
    <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-300  h-full text-sm w-[60%] p-2 rounded-sm text-green-600 font-medium">
    <p className="max-md:hidden">Período de testes ativo. Faltam {daysDistance} para acabar!</p>
    <p className="hidden max-md:flex">Em teste</p>
    </div> 
}
</div>
      
  )
}

export default TrialMessage;