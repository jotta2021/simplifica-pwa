import {
  ContainerPage,
  ContainerPageHeader,
  ContentHeader,
  ContentPage,
  BreadcrumbP,
  TitlePage,
  DescriptionPage,
  PageActions,
} from "@/components/ui/container-page";
import ButtonAdd from "./_components/buttonAdd";
import { BillTable, billColumns } from "./_components/columns-bill";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HeaderFilter from "./_components/headerFilter";
import { subDays, startOfDay, endOfDay } from "date-fns";
import MobileBills from "./_components/mobile-bills";

type SearchParams  = Promise<{[filter:string]:string | string[] | undefined}>

export default async function BillToPayPage(props:{
  searchParams: SearchParams
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/login");
  }
  const searchParams = await props.searchParams

  // Filtro de período
  const rawFilter = searchParams?.filter;
  const filter = Array.isArray(rawFilter) ? rawFilter[0] : rawFilter || "30days";
  let dateFilter = {};
  const now = new Date();
  if (filter === "now") {
    dateFilter = {
      dueDate: {
        gte: startOfDay(now),
        lte: endOfDay(now),
      },
    };
  } else if (filter === "yesterday") {
    const yesterday = subDays(now, 1);
    dateFilter = {
      dueDate: {
        gte: startOfDay(yesterday),
        lte: endOfDay(yesterday),
      },
    };
  } else if (filter === "7days") {
    dateFilter = {
      dueDate: {
        gte: subDays(now, 7),
      },
    };
  } else if (filter === "30days") {
    dateFilter = {
      dueDate: {
        gte: subDays(now, 30),
      },
    };
  } else if (filter === "90days") {
    dateFilter = {
      dueDate: {
        gte: subDays(now, 90),
      },
    };
  }

  // Busca todas as contas a pagar do usuário, aplicando filtro
  let bills = await prisma.bill.findMany({
    where: {
      userId: session.user.id,
      ...dateFilter,
    },
    orderBy: { dueDate: "asc" },
  });
  // Corrige fixedBillId para undefined se vier null
  bills = bills.map(bill => ({
    ...bill,
    fixedBillId: bill.fixedBillId ?? null,
  }));
  

  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <>
            <BreadcrumbP
              items={[
                { label: "Resumo", href: "/painel" },
                { label: "Contas a Pagar", isCurrentPage: true },
              ]}
            />
            <TitlePage title="Contas a Pagar" />
            <DescriptionPage description="Visualize e gerencie suas contas a pagar " />
          </>
        </ContentHeader>
        <PageActions>
          
          <ButtonAdd />
        </PageActions>
      </ContainerPageHeader>
      <ContentPage>
        <div className="flex items-end justify-end">
            <HeaderFilter filter={filter}/>
        </div>
      
        <div className="block md:hidden">
          <MobileBills bills={bills} />
        </div>
        <div className="hidden md:block ">
          <BillTable columns={billColumns} data={bills} />
        </div>
      </ContentPage>
    </ContainerPage>
  );
}
