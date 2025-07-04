import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
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
import HeaderFilter from "./_components/headerFilter";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/releases-table";
import ButtonAdd from "./_components/buttonAdd";
import MobileTransactions from "./_components/mobile-transactions";
import { subDays, startOfDay, endOfDay } from "date-fns";


type SearchParams  = Promise<{[filter:string]:string | string[] | undefined}>



export default async function ReleasesPage(props:{
  searchParams: SearchParams
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const searchParams = await props.searchParams
 const rawFilter = searchParams?.filter;
  const filter = Array.isArray(rawFilter) ? rawFilter[0] : rawFilter || "30days";


  
  let dateFilter = {};
  const now = new Date();

  if (filter === "now") {
    dateFilter = {
      date: {
        gte: startOfDay(now),
        lte: endOfDay(now),
      },
    };
  } else if (filter === "yesterday") {
    const yesterday = subDays(now, 1);
    dateFilter = {
      date: {
        gte: startOfDay(yesterday),
        lte: endOfDay(yesterday),
      },
    };
  } else if (filter === "7days") {
    dateFilter = {
      date: {
        gte: subDays(now, 7),
      },
    };
  } else if (filter === "30days") {
    dateFilter = {
      date: {
        gte: subDays(now, 30),
      },
    };
  } else if (filter === "90days") {
    dateFilter = {
      date: {
        gte: subDays(now, 90),
      },
    };
  }
 

  const transactions = await prisma.transactions.findMany({
    where: {
      userId: session.user.id,
     ...dateFilter,
    },
    include: {
      category: true,
      accountWallet:true,
      toAccountWallet:true
    },
    orderBy: {
      date: "desc",
    },
  });

  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    ...(transaction.category && {
      category: transaction.category.id,
      categoryDetails: {
        name: transaction.category.name,
        icon: transaction.category.icon,
        color: transaction.category.color,
      },
    }),
  }));

  return (
    <ContainerPage>

      <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP
            items={[
              { label: "Resumo", href: "/painel" },
              { label: "Lançamentos", isCurrentPage: true },
            ]}
          />
          <TitlePage title="Lançamentos" />
          <DescriptionPage description="Gerencie seus lançamentos financeiros" />
        </ContentHeader>
        <PageActions>
          <ButtonAdd />
        </PageActions>
      </ContainerPageHeader>
      <ContentPage>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle>Histórico de transações</CardTitle>
            <HeaderFilter  />
          </CardHeader>
          <CardContent className="space-y-2 max-md:px-1">
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
}
