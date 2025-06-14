import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICONES_CATEGORIAS } from "../../categories/_constants/icones";
import React from "react";
import { Category } from "@/app/@types/category";

// import { Container } from './styles';
interface ExpensesByCategoryProps {
  expensesByCategory:Category[];
}
const ExpensesByCategory = ({
  expensesByCategory,
}: ExpensesByCategoryProps) => {


  return (
    <Card>
      <CardHeader>
        <CardTitle  className="text-gray-700">Despesas por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {expensesByCategory.length > 0 ? expensesByCategory.map((category) => (
            <div key={category.id} className="flex items-center justify-between border-b pb-2">
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
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
           
              <span className="text-sm font-medium text-gray-700">
                R${" "}
                {category.value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )): <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 text-sm">Sem dados para exibir</span>
          </div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesByCategory;
