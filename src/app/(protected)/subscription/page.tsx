import React from 'react';
import Plan from '../profile/_components/plans';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { format } from 'date-fns';
import { BreadcrumbP,  DescriptionPage, ContainerPageHeader, ContentPage, ContentHeader, TitlePage, ContainerPage } from '@/components/ui/container-page';

// import { Container } from './styles';

const Subscriptions= async () => {
    const session =await  auth.api.getSession({
        headers: await headers()
    })
  return (
    <ContainerPage>
           <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP
            items={[
              { label: "Resumo", href: "/painel" },
              { label: "Assinatura", isCurrentPage: true },
            ]}
          />
          <TitlePage title="Assinatura" />
          <DescriptionPage description="Gerencie sua assinatura" />
        </ContentHeader>
      </ContainerPageHeader>
          <ContentPage>
         <div className="w-full flex flex-col items-start mt-8">
 
   <Plan user={{
  ...session?.user,
  id: session?.user?.id ?? "",
  name: session?.user?.name ?? "",
  subscriptionStatus: session?.user?.subscriptionStatus || undefined,
  curentPlan: session?.user?.curentPlan || undefined,
  email: session?.user?.email || '',
  emailVerified: session?.user?.emailVerified ?? false, 
  createdAt: session?.user?.createdAt ?? new Date(), 
  updatedAt: session?.user?.updatedAt ?? new Date(), 
}} />

    {
      session?.user.subscriptionId &&
       <span className="mt-4 px-4 py-2 rounded bg-green-100 text-green-800 font-bold text-sm text-center">
     Próxima cobrança acontecerá  em {session?.user?.renewAt && format(session?.user.renewAt, 'dd/MM/yyyy') }
    </span>
    }
         {
      session?.user.renewAt  &&  ! session?.user.subscriptionId && 
       <span className="mt-4 px-4 py-2 rounded bg-green-100 text-green-800 font-bold text-sm text-center">
     Seu acesso encerra  em {session?.user?.renewAt && format(session?.user.renewAt, 'dd/MM/yyyy') }
    </span>
    }
   
  </div>
    </ContentPage>
    </ContainerPage>
  
   
  )
}

export default Subscriptions;