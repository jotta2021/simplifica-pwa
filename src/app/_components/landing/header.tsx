'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  return (
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
  );
};

export default Header; 