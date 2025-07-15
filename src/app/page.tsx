
'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Wallet, 
  CreditCard, 
  BarChart3, 
  PieChart, 
  Target, 
  MessageCircle, 
  Camera, 
  Mic, 
  Send,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Smartphone,
  Calendar,
  Receipt,
  PiggyBank,
  PlayCircle,
  Mail,
  Clock
} from 'lucide-react';
import Image from 'next/image';

const LandingPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <Image src={"/icon.png"} alt="logo" width={30} height={30} />
            <span className="text-xl font-bold text-slate-900 dark:text-white">Simplifica</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
            >
              Funcionalidades
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
            >
              Preços
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
            >
              Contato
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" size="sm">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                Testar Grátis por 7 dias
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Zap className="w-4 h-4 mr-2" />
                Assistente Financeiro Inteligente
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Simplifique suas
                <span className="text-green-500"> finanças</span>
                <br />
                com IA
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                Organize suas finanças de forma inteligente. Cadastre despesas e receitas pelo WhatsApp, 
                visualize relatórios detalhados e tome controle total do seu dinheiro.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link href="/register">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Teste grátis por 7 dias
                  </Button>
                </Link>
              
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Comece sem pagar nada
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Dados seguros
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2 text-green-500" />
                  Multiplataforma
                </div>
              </div>
            </div>

            {/* Right Side - Screenshots */}
            <div className="relative">
              {/* Desktop Screenshot */}
              <div className="relative mb-8">
                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1"></div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Simplifica Dashboard</div>
                  </div>
                  <img 
                    src="/print-pc.png" 
                    alt="Dashboard do Simplifica no Desktop" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Tudo que você precisa para organizar suas finanças
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ferramentas poderosas para controlar seus gastos, planejar investimentos e alcançar seus objetivos financeiros.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* WhatsApp Integration */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Assistente WhatsApp</CardTitle>
                <CardDescription>
                  Envie fotos de comprovantes, áudios ou mensagens. Nosso assistente inteligente cadastra automaticamente suas transações.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                  <Camera className="w-4 h-4" />
                  <span>Foto de comprovante</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 mt-2">
                  <Mic className="w-4 h-4" />
                  <span>Áudio com detalhes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 mt-2">
                  <Send className="w-4 h-4" />
                  <span>Mensagem de texto</span>
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Contas e Carteiras</CardTitle>
                <CardDescription>
                  Organize suas contas bancárias, carteiras digitais e tenha uma visão consolidada de todos os seus recursos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Múltiplas contas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Saldo em tempo real</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Transferências</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Cards */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Cartões de Crédito</CardTitle>
                <CardDescription>
                  Controle seus cartões de crédito, acompanhe faturas e limite de gastos para cada cartão.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Controle de faturas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Limite de gastos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Vencimentos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Categorização Inteligente</CardTitle>
                <CardDescription>
                  Categorize automaticamente suas despesas e receitas. Crie categorias personalizadas e acompanhe seus gastos por área.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Categorias automáticas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Personalização total</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Relatórios por categoria</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Relatórios Detalhados</CardTitle>
                <CardDescription>
                  Visualize gráficos, relatórios mensais e acompanhe sua evolução financeira com dashboards interativos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Gráficos interativos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Relatórios mensais</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Comparativos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Planning */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Planejamento Financeiro</CardTitle>
                <CardDescription>
                  Defina metas, crie orçamentos e planeje seus investimentos para alcançar seus objetivos financeiros.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Metas personalizadas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Orçamentos mensais</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Acompanhamento de progresso</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WhatsApp Integration Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <MessageCircle className="w-4 h-4 mr-2" />
              Revolução na Gestão Financeira
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Assistente Financeiro no WhatsApp
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Cadastre despesas e receitas de forma super simples. Basta enviar uma foto, áudio ou mensagem para nosso assistente inteligente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Foto do Comprovante</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Tire uma foto do comprovante de compra. Nosso assistente extrai automaticamente o valor, data e estabelecimento.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mic className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Áudio com Detalhes</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Grave um áudio explicando a transação. "Gastei R$ 50 no mercado ontem" e pronto!
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Mensagem de Texto</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Escreva diretamente: "Recebi R$ 3000 do salário" ou "Paguei R$ 120 de energia".
                  </p>
                </div>
              </div>

              <Link href="/register">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white mt-6">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conectar WhatsApp
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm mx-auto">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Simplifica Bot</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Online</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Olá! Envie uma foto do comprovante, áudio ou mensagem para cadastrar sua transação.
                    </p>
                  </div>
                  
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 max-w-xs ml-auto">
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                      Gastei R$ 50 no mercado
                    </p>
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      ✅ Despesa cadastrada!<br/>
                      Valor: R$ 50,00<br/>
                      Categoria: Alimentação<br/>
                      Data: Hoje
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Pricing Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-green-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comece a organizar suas finanças hoje mesmo
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já simplificaram suas finanças com o Simplifica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                <MessageCircle className="w-5 h-5 mr-2" />
                Conectar WhatsApp
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-green-600 hover:bg-gray-100 hover:text-green-600"
              >
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Entre em contato conosco
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Tem alguma dúvida ou sugestão? Estamos aqui para ajudar você a simplificar suas finanças.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">WhatsApp</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Conecte-se diretamente pelo WhatsApp para suporte rápido e eficiente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">E-mail</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Envie suas dúvidas para nosso time de suporte especializado.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Horário de Atendimento</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Segunda a sexta, das 8h às 18h
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Envie uma mensagem
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Nome
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    E-mail
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Mensagem
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Como podemos ajudar você?"
                  />
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Simplifica</span>
              </div>
              <p className="text-slate-400 mb-4">
                Simplifique suas finanças com inteligência artificial e controle total do seu dinheiro.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-sm">📱</span>
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-sm">💬</span>
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-sm">📧</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunidade</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Simplifica. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage; 