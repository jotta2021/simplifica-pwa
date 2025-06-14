import {
  ContainerPage,
  ContainerPageHeader,
  DescriptionPage,
  TitlePage,
  PageActions,
  ContentHeader,
  ContentPage,
  BreadcrumbP,
} from "@/components/ui/container-page";
import React from "react";
import ButtonAdd from "./_components/buttonAdd";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CategoryCard from "./_components/categorie-card";
import { redirect } from "next/navigation";

const Categories = async () => {
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user?.id){
      redirect("/login");
    }
    const categoriasIncomes = await prisma.category.findMany({
        where:{
            userId: session?.user.id,
            type: 'INCOME'
        }
    })
    const categoriasExpenses = await prisma.category.findMany({
        where:{
            userId: session?.user.id,
            type: 'EXPENSE'
        }
    })

 
  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP items={[
            { label: "Resumo", href: "/painel" },
            { label: "Categorias", isCurrentPage: true }
          ]} />
          <TitlePage title="Categorias" />
          <DescriptionPage description="Gerencie as categorias de despesas e receitas" />
        </ContentHeader>
        <PageActions>
        <ButtonAdd/>
        </PageActions>
      </ContainerPageHeader>
      <ContentPage>
        <Tabs defaultValue="income" className="w-full">
          <TabsList className="w-full bg-transparent grid grid-cols-2">
            <TabsTrigger value="income" className="data-[state=active]:border-b-2  data-[state=active]:shadow-none data-[state=active]:border-b-green-500 bg-transparent " >Receitas</TabsTrigger>
            <TabsTrigger value="expense" className="data-[state=active]:border-b-2  data-[state=active]:shadow-none data-[state=active]:border-b-green-500 bg-transparent ">Despesas</TabsTrigger>
          </TabsList>
          <TabsContent value="income">
            <div className="space-y-2">
               {
            categoriasIncomes.map((categoria)=>(
                <div key={categoria.id}>
                    <CategoryCard category={categoria} />
                </div>
            ))
         }  
            </div>
        
          </TabsContent>
          <TabsContent value="expense">
            <div className="space-y-2">
               {
            categoriasExpenses.map((categoria)=>(
                <div key={categoria.id}>
                    <CategoryCard category={categoria} />
                </div>
            ))
         }  
            </div>
        
          </TabsContent>
        </Tabs>
      </ContentPage>
    </ContainerPage>
  );
};

export default Categories;
