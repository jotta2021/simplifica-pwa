import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { GiMoneyStack } from "react-icons/gi";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import { TbMoneybag } from "react-icons/tb";

const ResumeCards: React.FC = () => {
  return (
    <div className="my-8 grid grid-cols-4 max-md:flex max-md:flex-col w-full gap-4 relative  max-md:items-center">
      <Card className="bg-BrightGreen border-green-500 max-md:absolute max-md:w-full max-md:py-4 z-0">
        <CardContent className="p-2 py-6 text-gray-800 flex items-center justify-center ">
          <div className="flex justify-between  ">
            <div className="flex flex-col justify-center items-center">
              <p className="  font-medium">Total guardado</p>
              <h2 className="font-bold text-3xl">R$ 1564,00</h2>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="z-10 max-md:mt-32 max-md:w-[80%]">
        <CardContent className="p-2 py-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Saldo atual</p>
              <h2 className="font-semibold text-2xl">R$ 1564,00</h2>
            </div>

            <div className="bg-blue-100 rounded-full flex items-center justify-center w-12 h-12">
              <GiMoneyStack size={30} color="#3b82f6" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="max-md:w-[80%]">
        <CardContent className="p-2 py-6 ">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Receitas</p>
              <h2 className="font-semibold text-2xl">R$ 1564,00</h2>
            </div>

            <div className="bg-green-100 rounded-full flex items-center justify-center w-12 h-12">
              <GoArrowUp size={30} color="#22c55e" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="max-md:w-[80%]">
        <CardContent className="p-2 py-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Despesas</p>
              <h2 className="font-semibold text-2xl">R$ 1564,00</h2>
            </div>

            <div className="bg-red-100 rounded-full flex items-center justify-center w-12 h-12">
              <GoArrowDown size={30} color="#ef4444" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeCards;
