import React from 'react';
import { Header } from './painel/_components/header';
import { SidebarProvider } from '@/components/ui/sidebar';

// import { Container } from './styles';

const LayoutProtected  = ({children}:{children:React.ReactNode}) => {
  return (
    <SidebarProvider>
      <Header />
      {children}
    </SidebarProvider>
  )
}

export default LayoutProtected;