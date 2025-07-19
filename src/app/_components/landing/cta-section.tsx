import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
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
  );
};

export default CTASection; 