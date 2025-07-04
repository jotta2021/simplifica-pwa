'use client'
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICONES_CATEGORIAS } from "../../categories/_constants/icones";
import React from "react";
import { Category } from "@/app/@types/category";
import { Pie, PieChart, Cell } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ExpensesByCategoryProps {
  expensesByCategory:Category[];
}
const ExpensesByCategory = ({
  expensesByCategory,
}: ExpensesByCategoryProps) => {


  
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    expensesByCategory.forEach((cat) => {
      config[cat.name] = {
        label: cat.name,
        color: cat.color,
      };
    });
    return config;
  }, [expensesByCategory]);


 
  return (
    <Card className="dark:bg-neutral-900 dark:text-white" >
      <CardHeader>
        <CardTitle  className="text-gray-700 dark:text-white">Despesas por Categoria</CardTitle>
      </CardHeader>
      <CardContent>



        <div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={expensesByCategory}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
            >
              {expensesByCategory.map((category) => (
                <Cell key={category.id} fill={category.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        </div>
        <div className="flex flex-col gap-4">
          {expensesByCategory.length > 0 ? expensesByCategory.slice(0, 5).map((category) => (
            <div key={category.id} className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <div className="flex items-center gap-2">
                       <Avatar
                className="bg-gray-300 w-10 h-10 items-center justify-center"
                    style={{ backgroundColor: category.color }}
              >
                {ICONES_CATEGORIAS[
                  category.icon as keyof typeof ICONES_CATEGORIAS
                ]
                  ? React.createElement(
                      ICONES_CATEGORIAS[
                        category.icon as keyof typeof ICONES_CATEGORIAS
                      ],
                      { className: "w-5 h-5 text-white" }
                    )
                  : null}
              </Avatar>
                <span className="text-sm font-medium text-gray-700 dark:text-white">{category.name}</span>
                </div>
           
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                R${" "}
                {category.value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )): <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 text-sm dark:text-gray-300">Sem dados para exibir</span>
          </div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesByCategory;
