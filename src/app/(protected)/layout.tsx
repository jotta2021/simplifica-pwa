import React from 'react';
import { Header } from './_components/header';
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar';


// import { Container } from './styles';

const LayoutProtected  = ({children,types}:{children:React.ReactNode,types:React.ReactNode}) => {
  return (
    <SidebarProvider open={true}>
    
      <Header />
      <main className='w-full'>
        <SidebarTrigger/>   
      {children}
      </main>
      
    </SidebarProvider>
  )
}

export default LayoutProtected;