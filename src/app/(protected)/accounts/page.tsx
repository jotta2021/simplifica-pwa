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
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AccountWalletCard from "./_components/account-wallet-card";
import { redirect } from "next/navigation";
import CreditCardCard from "./_components/credit-card-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Accounts = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    redirect("/login");
  }
  const accounts = await prisma.accountWallet.findMany({
    where: {
      userId: session?.user.id,
    }
  });

  const cards = await prisma.creditCard.findMany({
    where:{
      userId:session.user.id
    },
    include:{
      creditCardExpenses: true
    }
  })

  

  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP
            items={[
              { label: "Resumo", href: "/painel" },
              { label: "Contas/Cartões", isCurrentPage: true },
            ]}
          />
          <TitlePage title="Contas/Cartões" />
          <DescriptionPage description="Gerencie suas contas bancárias e cartões" />
        </ContentHeader>
        <PageActions>
          <ButtonAdd />
        </PageActions>
      </ContainerPageHeader>
      <ContentPage>
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="w-full bg-transparent grid grid-cols-2">
            <TabsTrigger value="accounts" className="data-[state=active]:border-b-2  data-[state=active]:shadow-none data-[state=active]:border-b-green-500 bg-transparent dark:bg-neutral-900 ">Contas bancárias</TabsTrigger>
            <TabsTrigger value="cards" className="data-[state=active]:border-b-2  data-[state=active]:shadow-none data-[state=active]:border-b-green-500 bg-transparent dark:bg-neutral-900 ">Cartões</TabsTrigger>
          </TabsList>
          <TabsContent value="accounts">
            <div className="space-y-2">
              {accounts.map((account: any) => (
                <div key={account.id}>
                  <AccountWalletCard account={account} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="cards">
            <div className="space-y-2">
              {cards.map((card: any) => (
                <div key={card.id}>
                  <CreditCardCard card={card} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </ContentPage>
    </ContainerPage>
  );
};

export default Accounts;
