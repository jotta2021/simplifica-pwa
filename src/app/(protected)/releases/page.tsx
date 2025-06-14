import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ContainerPage,
  ContainerPageHeader,
  ContentHeader,
  DescriptionPage,
  PageActions,
  TitlePage,
  ContentPage,
  BreadcrumbP,
} from "@/components/ui/container-page";
import React from "react";
import HeaderFilter from "./_components/headerFilter";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/releases-table";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ButtonAdd from "./_components/buttonAdd";
import { redirect } from "next/navigation";
import MobileTransactions from "./_components/mobile-transactions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
const Releases = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user?.id){
      redirect("/login");
    }
 
    let filterDate;

    const transactions = await prisma.transactions.findMany({
        where: {
            userId: session?.user.id
        },
        include:{
            category: true
        },
        orderBy:{
          date: 'desc'
        }
    })

    const formattedTransactions = transactions.map(transaction => ({
        ...transaction,
        category: transaction.category.id,
        categoryDetails: {
            name: transaction.category.name,
            icon: transaction.category.icon,
            color: transaction.category.color
        }
    }))
   
  

   
  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP items={[
            { label: "Resumo", href: "/painel" },
            { label: "Lançamentos", isCurrentPage: true }
          ]} />
          <TitlePage title="Lançamentos" />
          <DescriptionPage description="Gerencie seus lançamentos financeiros" />
        </ContentHeader>
        <PageActions>
          <ButtonAdd
          
          />
        </PageActions>
      </ContainerPageHeader>
      <ContentPage>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center max-md:flex-col max-md:items-start">
            <CardTitle>Histórico de transações</CardTitle>
         
            <HeaderFilter />
          </CardHeader>
          <CardContent className="space-y-2 max-md:px-1">
        
          {/* Renderização responsiva: DataTable em telas grandes, MobileTransactions em telas pequenas */}
          <div className="hidden max-md:block">
            <MobileTransactions transactions={formattedTransactions as any} />
          </div>
          <div className="max-md:hidden">
            <DataTable columns={columns} data={formattedTransactions as any} />
          </div>
          </CardContent>
        </Card>
      </ContentPage>
    </ContainerPage>
  );
};

export default Releases;
