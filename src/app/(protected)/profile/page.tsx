import {
  ContainerPage,
  ContainerPageHeader,
  DescriptionPage,
  TitlePage,
  ContentHeader,
  ContentPage,
  BreadcrumbP,
} from "@/components/ui/container-page";
import React from "react";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "./_components/profile-form";
import Plan from "./_components/plans";
import { format } from "date-fns";
const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect("/login");
  }
  

  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP
            items={[
              { label: "Resumo", href: "/painel" },
              { label: "Meu Perfil", isCurrentPage: true },
            ]}
          />
          <TitlePage title="Meu Perfil" />
          <DescriptionPage description="Gerencie suas informações pessoais" />
        </ContentHeader>
      </ContainerPageHeader>
      <ContentPage>
        <div className="flex flex-col items-start gap-8 w-full  mx-auto">
          <div className="w-full">
            <ProfileForm user={user} />
          </div>
          <div className="w-full flex flex-col items-start mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Assinatura</h2>
            <Plan user={{
              ...session.user,
              subscriptionStatus: session.user.subscriptionStatus || undefined,
              curentPlan: session.user.curentPlan || undefined
            }}/>
            {
              session.user.subscriptionId &&
               <span className="mt-4 px-4 py-2 rounded bg-green-100 text-green-800 font-bold text-sm text-center">
             Próxima cobrança acontecerá  em {session?.user?.renewAt && format(session?.user.renewAt, 'dd/MM/yyyy') }
            </span>
            }
                 {
              session.user.renewAt  &&  ! session.user.subscriptionId && 
               <span className="mt-4 px-4 py-2 rounded bg-green-100 text-green-800 font-bold text-sm text-center">
             Seu acesso encerra  em {session?.user?.renewAt && format(session?.user.renewAt, 'dd/MM/yyyy') }
            </span>
            }
           
          </div>
        </div>
      </ContentPage>
    </ContainerPage>
  );
};

export default Profile; 