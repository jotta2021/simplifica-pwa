import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Comece grátis e evolua conforme suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Mensal */}
          <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Plano Mensal</CardTitle>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                R$ 24,99
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/mês</span>
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
              <Link href="/register" >
                <Button variant="outline" className="w-full my-2">
                  Começar Mensal
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Plano Anual - Destaque */}
          <Card className="border-2 border-green-500 shadow-xl relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-500 text-white font-semibold">
                <TrendingUp className="w-3 h-3 mr-1" />
                Mais Econômico
              </Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Plano Anual</CardTitle>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                 R$ 14,99
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/mês</span>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                179,99/ano
              </div>
              <CardDescription>
                Economize pagando anualmente
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
              <Link href="/register">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold my-2">
                  Escolher Anual
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Todos os planos incluem 7 dias de teste grátis. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 