"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import formatCurrency from "@/helpers/formatCurrency";
import { FileText } from "lucide-react";

// Tipos
interface CreditCardExpense {
  id: string;
  amount: number;
  description: string;
  date: string | Date;
  installment?: number;
  totalInstallments?: number;
  categoryId?: string;
  creditCardId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface CreditCard {
  id: string;
  name: string;
  limit: number;
  availableLimit: number;
  closingDay: number;
  dueDay: number;
  image: string | null;
  creditCardExpenses: CreditCardExpense[];
}

interface CreditCardsSectionProps {
  cards: CreditCard[];
}

function getCurrentMonthInvoice(expenses: CreditCardExpense[]) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d >= start && d <= end;
    })
    .reduce((acc, e) => acc + e.amount, 0);
}

const CreditCardsSection: React.FC<CreditCardsSectionProps> = ({ cards }) => {
  return (
    <Card className="shadow-md bg-gradient-to-br dark:bg-neutral-900 dark:text-white transition-colors duration-300 ">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-gray-700 dark:text-white text-lg font-semibold ">Meus Cartões</CardTitle>
        <a href="/accounts">
          <Button variant="outline" size="sm" className="dark:bg-neutral-800">Mais detalhes</Button>
        </a>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0">
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.id} className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-lg p-4 shadow hover:shadow-lg transition-all ">
                {card.image && (
                  <Image src={card.image} alt={card.name} width={48} height={48} className="rounded-full border w-[48px] h-[48px] object-cover mb-2 " />
                )}
                <span className="font-medium text-gray-700 dark:text-white text-base">{card.name}</span>
                <span className="text-xs text-gray-800 dark:text-gray-300">Limite disponível: {formatCurrency(card.availableLimit)}</span>
                <span className="text-xs text-gray-800 dark:text-gray-300">Fatura do mês: {formatCurrency(getCurrentMonthInvoice(card.creditCardExpenses))}</span>
                <Button className="mt-2 bg-green-100 text-green-700 dark:text-green-100 hover:bg-green-200 dark:bg-green-800 flex items-center gap-1" size="sm">
                  <FileText size={16} /> Ver fatura
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-20">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Nenhum cartão cadastrado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditCardsSection; 