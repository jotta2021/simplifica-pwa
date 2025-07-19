import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  MessageCircle,
  Camera,
  Mic,
  Send
} from 'lucide-react';

const WhatsAppSection: React.FC = () => {
  return (
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
  );
};

export default WhatsAppSection; 