import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import ButtonLogout from "./buttonLogout"

// Menu items.
const items = [
  {
    title: "Visão geral",
    url: "#",
    icon: Home,
  },
  {
    title: "Lançamentos",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Planejamentos",
    url: "#",
    icon: Calendar,
  },
  
]

export async function     Header() {
  
 async function Logout(){
   
    
 }

  return (
    <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Image src={"/icons/icon.png"} alt="logo" width={40} height={40} />
                <h1 className="text-xl font-bold">Simplifica</h1>
            </div>
        </SidebarHeader>
        <SidebarSeparator/>
      <SidebarContent>
        <SidebarGroup>
         
          <SidebarGroupContent>
       
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

       
      </SidebarContent>
      <SidebarFooter>
       
            <SidebarMenuButton asChild>
              <ButtonLogout />
            </SidebarMenuButton>
        </SidebarFooter>
    </Sidebar>
  )
}