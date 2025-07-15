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
import { User } from "better-auth";
import { CreateCheckoutMercadoP } from "@/actions/createMercadoPCheckout";
import { cancelSubscriptionMercadoPago } from "@/actions/cancelSubscriptionMercado";
import { toast } from "sonner";


interface UserWithPlan extends User {
  subscriptionStatus?: string;
  curentPlan?: string;
}

interface Props{
  user:UserWithPlan
}
const Plan = ({user}:Props) => {



  const plans = [
    {
      id: 'mensal',
      title: 'Plano Mensal',
      price: 'R$ 24,99',
      priceDetail: '/mês',
      description: 'Flexibilidade total, cancele quando quiser',
      badge: null,
      highlight: false,
      highlightText: '',
      benefits: [
        'Dashboard completo',
        'Bot WhatsApp inteligente',
        'Cadastro de contas e cartões',
        'Categorização inteligente',
        'Suporte por e-mail',
      ],
    },
    {
      id: 'anual',
      title: 'Plano Anual',
      price: ' R$ 14,99 /mês',
      priceDetail: '',
      description: 'Economize pagando anualmente',
      badge: 'Mais Econômico',
      highlight: true,
      highlightText: ' 179,99/ano ',
      benefits: [
        'Dashboard completo',
        'Bot WhatsApp inteligente',
        'Cadastro de contas e cartões',
        'Categorização inteligente',
        'Suporte por e-mail',
      ],
    },
  ];
  


const checkoutMercado = useAction(CreateCheckoutMercadoP,{
  onSuccess:(data)=> {
 if(!data.data?.init_point){
throw new Error('init point not found')
 }
    window.location.href= data.data?.init_point
  },
  onError:(error)=> {
    console.log('Erro ao criar checkout', error)
  }
})
const handleCheckoutMercadoP = (id:string)=> {
  checkoutMercado.execute({userId:user.id, plan:id})
}

//se o usuario tem plano ativo
const activePlan = user?.subscriptionStatus === 'authorized';

const cancelSubscriptionAction = useAction(cancelSubscriptionMercadoPago,{
  onSuccess: ()=> {
    toast.success('Sua assinatura foi cancelada.')
  },
  onError:()=> {
    toast.error('Houve um erro ao cancelar sua assinatura, entre em contato com o suporte')
  }
})

const handleCancel = async ()=> {
cancelSubscriptionAction.execute({userId: user.id})
}


  return (
    <div>
      {activePlan ? (
        <div className="max-md:w-full max-w-screen-md grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Card
            className="border-2 border-green-500 shadow-xl relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/20 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-500 text-white font-semibold">
                <CheckCircle className="w-3 h-3 mr-1" />
                Seu Plano
              </Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{user?.curentPlan?.toUpperCase() || 'Plano Atual'}</CardTitle>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {user?.curentPlan === 'anual' ? '12x de R$ 20,82' : 'R$ 24,99'}
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/mês</span>
              </div>
              {user?.curentPlan === 'anual' && (
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Economia de R$ 50,04 por ano
                </div>
              )}
              <CardDescription>
                {user?.curentPlan === 'anual'
                  ? 'Economize pagando anualmente'
                  : 'Flexibilidade total, cancele quando quiser'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plans[0].benefits.map((benefit, idx) => (
                  <div className="flex items-center" key={idx}>
                    <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <CardFooter className="flex-col items-center justify-center">
               <Button variant={'ghost'} className="text-red-500 hover:bg-red-500 hover:text-white duration-300 w-full" onClick={handleCancel}
               disabled={cancelSubscriptionAction.isExecuting}
               >
                {cancelSubscriptionAction.isExecuting && <Loader2 className="animate-spin"/>}
                Cancelar assinatura</Button>
               <span className="text-neutral-500 text-[10px] text-center">Ao cancelar sua assinatura, você continuará tendo acesso ao site até o final do período já pago, que corresponde à data prevista para renovação.</span>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-md:w-full grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={
                plan.highlight
                  ? 'border-2 border-green-500 shadow-xl relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-2xl transition-all duration-300'
                  : 'border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300'
              }
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white font-semibold">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {plan.price}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    {plan.priceDetail}
                  </span>
                </div>
                {plan.highlightText && (
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {plan.highlightText}
                  </div>
                )}
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.benefits.map((benefit, idx) => (
                    <div className="flex items-center" key={idx}>
                      <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <CardFooter className={plan.highlight ? '':'items-center flex-col justify-center gap-4 w-full'}>
                  <Button
                    className={plan.highlight ? 'w-full bg-green-500  hover:bg-green-600 text-white font-semibold my-2' : 'bg-green-500 hover:bg-green-600 w-full'}
                    onClick={() => handleCheckoutMercadoP(plan.id)}
                    disabled={checkoutMercado.isExecuting}
                  >
                    {plan.id === 'mensal' && checkoutMercado.isExecuting && <Loader2 className="animate-spin text-white" />}
                    {plan.id === 'mensal' ? 'Escolher Mensal' : 'Escolher Anual'}
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plan;
