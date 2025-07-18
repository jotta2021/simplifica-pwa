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
        
        </div>
      </ContentPage>
    </ContainerPage>
  );
};

export default Profile; 