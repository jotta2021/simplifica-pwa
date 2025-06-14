import { auth } from "@/lib/auth";
import { getHours } from "date-fns";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { prisma } from "../../../../lib/prisma";
import { createCategoriesDefaultAction } from "@/actions/upsertCategorieActions/createCategoriesDefault";
import {
  BreadcrumbP,
  ContainerPage,
  ContainerPageHeader,
  ContentHeader,
  ContentPage,
} from "@/components/ui/container-page";
import CardeResumes from "./_components/cardResume";
import ExpensesByCategory from "./_components/expensesByCategory";
import { Category } from "@/app/@types/category";
import QuickAcess from "./_components/quickAcess";
import PlanningCard from "../_components/PlanningCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

// import { Container } from './styles';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: string;
  category: {
    name: string;
    icon: string;
    color: string;
  };
};

const Painel = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  let categories = await prisma.category.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  // Verifica se existem categorias padrão
  const defaultCategories = [
    "Salário",
    "Investimentos",
    "Freelance",
    "Alimentação",
    "Transporte",
    "Moradia",
    "Lazer",
    "Saúde",
  ];

  const hasDefaultCategories = defaultCategories.every((defaultName) =>
    categories.some((category) => category.name === defaultName)
  );

  if (!hasDefaultCategories) {
    await createCategoriesDefaultAction();
    // Buscar novamente as categorias após criar as padrões
    categories = await prisma.category.findMany({
      where: {
        userId: session?.user?.id,
      },
    });
  }

  function getPeriodoDoDia(
    date: Date = new Date()
  ): "manhã" | "tarde" | "noite" {
    const hora = getHours(date);

    if (hora >= 5 && hora < 12) {
      return "manhã";
    } else if (hora >= 12 && hora < 18) {
      return "tarde";
    } else {
      return "noite";
    }
  }

//mes atual
  const now = new Date();
  const startofMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endofMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    99
  );

  //mes passado
const startofMonthLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const endofMonthLastMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  0,
  23,
  59,
  59,
  99
);
  //transacoes deste mes
  const transactions = await prisma.transactions.findMany({
    include: {
      category: true,
    },
    where: {
      userId: session?.user?.id,
      date: {
        gte: startofMonth,
        lte: endofMonth,
      },
    },
  });

  const totalReceitas = transactions.reduce((acc, transaction) => {
    if (transaction.type === "INCOME") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const totalDespesas = transactions.reduce((acc, transaction) => {
    if (transaction.type === "EXPENSE") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);
  //transacoes do mes passado  = 
  const transactionsLastMonth = await prisma.transactions.findMany({
    include: {
      category: true,
    },
    where: {
      userId: session?.user?.id,
      date: {
        gte: startofMonthLastMonth,
        lte: endofMonthLastMonth,
      },
    },
  });

  const totalReceitasLastMonth = transactionsLastMonth.reduce((acc, transaction) => {
    if (transaction.type === "INCOME") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const totalDespesasLastMonth = transactionsLastMonth.reduce((acc, transaction) => {
    if (transaction.type === "EXPENSE") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);



  





    //transacoes em geral
    const transactionsGeneral = await prisma.transactions.findMany({
      include: {
        category: true,
      },
      where: {
        userId: session?.user?.id,
      },
    });


    //receitas 

    //saldo atual
    const saldoAtual = transactionsGeneral.reduce((acc, transaction) => {
      if (transaction.type === "INCOME") {
        return acc + transaction.amount;
      }
      if (transaction.type === "EXPENSE") {
        return acc - transaction.amount;
      }
      return acc;
    }, 0);
  

  function getGastosPorCategoria(transactions: Transaction[]) {
    const gastosMap = new Map<
      string,
      {
        name: string;
        value: number;
        icon?: string;
        color?: string;
      }
    >();

    transactions
      .filter((t) => t.type === "EXPENSE")
      .forEach((curr) => {
        const category = curr.category || {};
        const categoryName = category.name || "Sem categoria";
        if (!gastosMap.has(categoryName)) {
          gastosMap.set(categoryName, {
            name: categoryName,
            value: 0,
            icon: category.icon,
            color: category.color,
          });
        }
        const cat = gastosMap.get(categoryName)!;
        cat.value += curr.amount;
      });

    return Array.from(gastosMap.values());
  }

  const gastosPorCategoria = getGastosPorCategoria(transactions);

  const plans = await prisma.plans.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <BreadcrumbP items={[
            { label: "Resumo", isCurrentPage: true }
          ]} />
          <div className="flex items-center gap-2 mb-6">
            <span className="font-medium text-lg">
              {getPeriodoDoDia() === "manhã"
                ? "Bom dia"
                : getPeriodoDoDia() === "tarde"
                ? "Boa tarde"
                : "Boa noite"}
              , {session?.user?.name}
            </span>
            <Image
              src={
                getPeriodoDoDia() === "manhã"
                  ? "/icons/day.png"
                  : getPeriodoDoDia() === "tarde"
                  ? "/icons/afternoon.png"
                  : "/icons/night.png"
              }
              alt="logo"
              width={34}
              height={34}
            />
          </div>
        </ContentHeader>
        <QuickAcess categories={categories} />
      </ContainerPageHeader>
      <ContentPage>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 ">
          <CardeResumes
            title="Saldo Atual"
            nowMonth={saldoAtual}
            
            color="#3b82f6"
          />
          <CardeResumes
            title="Despesas"
            subtitle={true}
            nowMonth={totalDespesas}
            lastMonth={totalDespesasLastMonth}
            color="#ef4444"
          />
          <CardeResumes
            title="Receitas"
            subtitle={true}
            nowMonth={totalReceitas}
            lastMonth={totalReceitasLastMonth}
            color="#22c55e"
          />
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          <ExpensesByCategory
            expensesByCategory={gastosPorCategoria as Category[]}
          />
          <Card className="flex flex-col ">
            <CardHeader>
              <CardTitle className="text-gray-700">Planejamentos</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <PlanningCard
                    key={plan.id}
                    title={plan.title}
                    description={plan.description}
                    targetValue={plan.target_value}
                    initialValue={plan.iniital_value}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500 text-sm">Sem dados para exibir</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ContentPage>
    </ContainerPage>
  );
};

export default Painel;
