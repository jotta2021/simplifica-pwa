import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  MessageCircle,
  CheckCircle,
  Shield,
  Smartphone
} from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <MessageCircle className="w-4 h-4 mr-2" />
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
  );
};

export default HeroSection; 