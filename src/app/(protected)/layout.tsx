import React from 'react';
import { Header } from './_components/header';
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar';
import TabBarMobile from './_components/tabBarMobile';
import HeaderTop from './_components/headerTop/headerTop';
import { PlanExpiredProvider } from './_components/plan-expired-provider';


const LayoutProtected  = ({children,types}:{children:React.ReactNode,types:React.ReactNode}) => {
  return (
    <SidebarProvider open={true}>
      <PlanExpiredProvider>
        <Header />
    
        <main className='w-full'>
      
          <HeaderTop/>
        {children}
        </main>
        <TabBarMobile/>
      </PlanExpiredProvider>
    </SidebarProvider>
  )
}

export default LayoutProtected;