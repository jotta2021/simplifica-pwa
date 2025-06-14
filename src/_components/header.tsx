import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { IoHomeOutline } from "react-icons/io5";
import { BsPiggyBank } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
const Header= () => {
    const items = [
  {
    title: "Painel",
    url: "#",
    icon:<IoHomeOutline  size={30} />
   
  },
  {
    title: "Planejamentos",
    url: "#",
   icon: <BsPiggyBank  size={30} />
  },
  {
    title: "Sair",
    url: "#",
   icon: <IoExitOutline  size={30} />
  },

]
 
  return (
    <Sidebar className='bg-white ' >
        <SidebarHeader className='p-4 bg-white '>

            <h2 className='text-gray-700 font-bold'>Boa noite, Joanderson</h2>
             <span className='text-gray-300 text-sm '>Vamos simplificar suas finanças?</span>
        </SidebarHeader>
        <SidebarSeparator/>
      <SidebarContent  className='bg-white'>
        <SidebarGroup>
        
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span className='font-medium' >{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default Header;