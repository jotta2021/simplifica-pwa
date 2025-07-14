"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle, Loader2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useAction } from "next-safe-action/hooks";
import { createStripeCheckout } from "@/actions/createStripeCheckout";
import {loadStripe} from '@stripe/stripe-js'


interface Props{
  userId:string
}
const Plan = ({userId}:Props) => {

const createCheckoutStripe = useAction(createStripeCheckout,{
  onSuccess:async({data})=> {
console.log("data",data)
if(!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY){
  throw new Error('STRIPE PUBLISHABLE NOT FOUND')
}
const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
  
if(!stripe){
  throw new Error('STRIPE  NOT FOUND')
}
if(!data?.sessionId){
  throw new Error('SESSION ID  NOT FOUND')
}

await stripe.redirectToCheckout({
  sessionId: data?.sessionId || ''
})
},
onError: (error)=> {
  console.log('Erro ao criar checkout', error)
}
})


const handleCheckout = ()=> {
  createCheckoutStripe.execute({
    plan: 'mensal'
  })
}

  return (
    <div className="max-md:w-full">
      {/* Plano Mensal */}
      <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Plano Mensal</CardTitle>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            R$ 24,99
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
              /mês
            </span>
          </div>
          <CardDescription>
            Flexibilidade total, cancele quando quiser
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
              <span className="text-sm">Dashboard completo</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
              <span className="text-sm">Bot WhatsApp inteligente</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
              <span className="text-sm">Cadastro de contas e cartões</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
              <span className="text-sm">Categorização inteligente</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
              <span className="text-sm">Suporte por e-mail</span>
            </div>
          </div>
          <CardFooter className="items-center flex-col justify-center gap-4">
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={handleCheckout}
              disabled={createCheckoutStripe.isExecuting}
            >
              {
                createCheckoutStripe.isExecuting &&
                <Loader2 className="animate-spin text-white"/>
              }
              Fazer assinatura
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-white hover:bg-red-500 duration-300"
              
            >
              Cancelar renovação
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default Plan;
