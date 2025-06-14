import React from "react";
import { ContainerPage, ContainerPageHeader, ContentHeader, ContentPage, BreadcrumbP } from "@/components/ui/container-page";
import { Card } from "@/components/ui/card";

import PlanningCard from "../_components/PlanningCard";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import AddButton from "./_components/addButton";
import { redirect } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { deletePlaningAction } from "@/actions/upsertPlaningActions/deletePlaning";
import { toast } from "sonner";

const PlaningPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if(!session?.user?.id){
    redirect("/login");
  }
  const plans = await prisma.plans.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });



  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP items={[
            { label: "Resumo", href: "/painel" },
            { label: "Planejamentos", isCurrentPage: true }
          ]} />
          <h1 className="font-bold text-2xl">Planejamentos</h1>
          <span className="text-gray-500">Gerencie seus planejamentos financeiros</span>
        </ContentHeader>
       
            <AddButton />
        
      </ContainerPageHeader>
      <ContentPage>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length === 0 ? (
            <Card className="col-span-full p-8 text-center text-gray-500">Nenhum planejamento cadastrado.</Card>
          ) : (
            plans.map(plan => (
              <PlanningCard
                key={plan.id}
                id={plan.id}
                title={plan.title}
                description={plan.description}
                targetValue={plan.target_value}
                initialValue={plan.iniital_value}
                onFunction={true}
              />
            ))
          )}
        </div>
      </ContentPage>
    </ContainerPage>
  );
};

export default PlaningPage;
