"use client";
import React from "react";
import { AccountWallet } from "@/app/@types/accountWallet";
import { Card, CardHeader,CardContent,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AccountWalletsSectionProps {
  accounts: AccountWallet[];
}

const AccountWalletsSection: React.FC<AccountWalletsSectionProps> = ({ accounts }) => {
  return (
    <Card className="shadow-md bg-gradient-to-br  dark:bg-neutral-900 dark:text-white transition-colors duration-300 ">
    <CardHeader className="pb-2 flex flex-row items-center justify-between">
      <CardTitle className="text-gray-700 dark:text-white text-lg font-semibold ">Minhas Contas</CardTitle>
      <a href="/accounts">
        <Button variant="outline" size="sm" className="dark:bg-neutral-800">Mais detalhes</Button>
      </a>
    </CardHeader>
    <CardContent className="flex flex-col gap-3 pt-0">
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <div key={account.id} className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-lg p-4 shadow hover:shadow-lg transition-all ">
              <Image src={account.image} alt={account.name} width={48} height={48} className="rounded-full border w-[48px] h-[48px] object-cover mb-2 " />
              <span className="font-medium text-gray-700 dark:text-white text-base">{account.name}</span>
              <span className="text-xs text-gray-800 dark:text-gray-300 mb-2">Saldo: R$ {account.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-20">
          <p className="text-gray-500 dark:text-gray-300 text-sm">Nenhuma conta cadastrada</p>
        </div>
      )}
    </CardContent>
  </Card>
  );
};

export default AccountWalletsSection; 