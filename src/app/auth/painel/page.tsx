"use client";
import Header from "@/_components/header";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import ResumeCards from "./_components/resumeCards";
import { LiaToolsSolid } from "react-icons/lia";
import formatCurrency from "@/lib/formatCurrency";
import FormatDate from "@/lib/formatDate";
import { Progress } from "@/components/ui/progress";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { Tooltip } from "@/components/ui/tooltip";
import BottomTab from "@/_components/bottomTab";
import Link from "next/link";
import { Home, BarChart2, User } from "lucide-react";
const Painel: React.FC = () => {
  const transactions = [
    {
      title: "SALARIO",
      type: "income",
      category: "Trabalho",
      amount: 1500,
      createdAt: new Date("2025-05-23T10:05:50-03:00"),
      user: "5BnJF88zkMO8gsIi0n9zunsLGu22",
    },
    {
      title: "MERCADO",
      type: "expense",
      category: "Alimentação",
      amount: 250,
      createdAt: new Date("2025-05-22T16:30:00-03:00"),
      user: "5BnJF88zkMO8gsIi0n9zunsLGu22",
    },
    {
      title: "FREELANCE",
      type: "income",
      category: "Trabalho",
      amount: 800,
      createdAt: new Date("2025-05-21T14:10:25-03:00"),
      user: "5BnJF88zkMO8gsIi0n9zunsLGu22",
    },
    {
      title: "ASSINATURAS",
      type: "expense",
      category: "Serviços",
      amount: 89.9,
      createdAt: new Date("2025-05-20T09:00:00-03:00"),
      user: "5BnJF88zkMO8gsIi0n9zunsLGu22",
    },
  ];
  const objetivos = [
    {
      title: "Quitas parcelas da moto",
      value: 620,
      total_value: 6000,
      created: new Date("2025-05-23T10:01:50-03:00"),
      user: "5BnJF88zkMO8gsIi0n9zunsLGu22",
    },
    {
      title: "Viajar pra Gramado",
      value: 620,
      total_value: 8000,
      created: new Date("2025-05-23T10:01:50-03:00"),
      user: "5BnJF88zkMO8gsIi0n9zunsLGu22",
    },
  ];
  const gastosPorCategoria = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      const { category, amount } = curr;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

  const calculePercentage = (value: number, totalValue: number) => {
    if (totalValue === 0) return 0;
    return (value / totalValue) * 100;
  };

  const pieChartData = Object.entries(gastosPorCategoria).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];
  return (
    <SidebarProvider>
      <Header />

      <div className="px-10 w-full bg-gray-50 max-md:px-4">
        <SidebarTrigger className="max-md:hidden"/>
        <h1 className="text-xl font-bold text-gray-700"> Resumo</h1>
        <div>
          <ResumeCards />

          <div className="flex gap-10 max-md:flex-col">
            {/**Historico */}
            <div className="w-[60%] max-md:w-full flex flex-col gap-4">
              <h1 className="text-xl font-bold text-gray-700">
                {" "}
                Ultimas transações
              </h1>

              <Card>
                <CardContent>
                  <div>
                    {transactions.map((item) => (
                      <div
                        key={item.title}
                        className="flex gap-10 max-md:gap-4 items-center justify-between border-b p-2 text-sm"
                      >
                        <div className="flex items-center gap-4 max-md:gap-2">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <LiaToolsSolid size={20} color="#3b82f6 " />
                          </div>

                          <div>
                            <p>{item.title}</p>
                            <p className="text-gray-500 text-xs">
                              {FormatDate(item.createdAt)}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p
                          className={`font-bold ${
                            item.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.type === "income" ? "+ " : "- "}{" "}
                          {formatCurrency(item.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/**Objetivos */}

            <div className="w-[40%] max-md:w-full flex flex-col gap-4">
              <h1 className="text-xl font-bold text-gray-700">Objetivos</h1>

              <Card>
                <CardContent>
                  <div className="p-2 flex flex-col gap-4">
                    {objetivos.map((item) => (
                      <div key={item.title} className="flex flex-col gap-1">
                        <p className="font-medium text-gray-700">
                          {item.title}
                        </p>
                        <Progress
                          value={calculePercentage(
                            item.value,
                            item.total_value
                          )}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">
                            {formatCurrency(item.value)}
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {formatCurrency(item.total_value)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="my-4 flex flex-col gap-4 w-[20%] max-md:w-full">
            <h1 className="text-xl font-bold text-gray-700">
              Gastos por categoria
            </h1>
            <Card>
              <CardContent className="flex items-center justify-center">
                <PieChart width={350} height={250}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </CardContent>
            </Card>
          </div>
        </div>
       <BottomTab/>
      </div>
    </SidebarProvider>
  );
};

export default Painel;
