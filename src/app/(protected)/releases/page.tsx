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
import { parseISO } from "date-fns";




const Releases = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user?.id){
      redirect("/login");
    }
 

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
          <CardContent className="space-y-2">
            <DataTable columns={columns} data={formattedTransactions as any} />
          </CardContent>
        </Card>
      </ContentPage>
    </ContainerPage>
  );
};

export default Releases;
