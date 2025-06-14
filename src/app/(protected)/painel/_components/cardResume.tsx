import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

interface CardeResumesProps {
  title: string;
  nowMonth: number;
  lastMonth?: number;
  color: string;
  subtitle?: boolean;
}

const CardeResumes = ({
  title,
  nowMonth,
  lastMonth,
  color,
  subtitle,
}: CardeResumesProps) => {
  // pega a variacao entre as receitas e despesas em porcentagem
  const variation = lastMonth ? ((nowMonth - lastMonth) / lastMonth) * 100 : 0;

  const isPositive = variation > 0 ? true : false;
  const colorVariation = isPositive ? "#22c55e" : "#ef4444";

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-none shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex flex-row items-center gap-4 px-6 py-5">
          <div className="flex flex-col flex-1">
            <span className="text-gray-600 text-xs font-medium tracking-wide mb-1">
              {title}
              {subtitle && (
                <span className="ml-1 text-gray-400 font-normal">
                  no mês atual
                </span>
              )}
            </span>
            <span
              className="text-3xl font-extrabold tracking-tight"
              style={{ color }}
            >
              R${" "}
              {nowMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {(title === "Despesas" || title === "Receitas") && (
            <div
              className="flex gap-1 items-center justify-center rounded-ful  rounded-full px-3 py-1"
              style={{
                background: `${color}1A`,
              }}
            >
              {isPositive ? (
                <TrendingUp size={16} color={color} />
              ) : (
                <TrendingDown size={16} color={color} />
              )}
              <span
                className="text-xs font-medium tracking-wide"
                style={{ color: color }}
              >
                {" "}
                {variation.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardeResumes;
