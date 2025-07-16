"use client";

import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  LogOut,
  Moon,
  Sun,
  Tag,
  User2,
  Wallet,
  User,
  MessageCircle,
  NotebookPen,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { usePathname, redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useContext, useEffect } from "react";
import { contexts } from "@/contexts/context";

// Menu items.
const items = [
  {
    title: "Visão geral",
    url: "/painel",
    icon: Home,
  },
  {
    title: "Lançamentos",
    url: "/releases",
    icon: Inbox,
  },
  {
    title: "Categorias",
    url: "/categories",
    icon: Tag,
  },
  {
    title: "Planejamentos",
    url: "/planing",
    icon: Calendar,
  },
  // Removido o item 'A pagar' daqui para renderizar manualmente como Accordion
  {
    title: "Contas/Cartões",
    url: "/accounts",
    icon: Wallet,
  },
  {
    title: "Meu Perfil",
    url: "/profile",
    icon: User,
  },
];

export  function Header() {
  const session =  authClient.useSession();
  const pathname = usePathname();
  const {darkMode,setDarkMode} = useContext(contexts)

  useEffect(() => {
    if(typeof document!=='undefined'){
        if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    }
    
  }, [darkMode]);

  const handleSimplificaBotClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o SimplificaBot. Como posso começar?");
    const whatsappUrl = `https://wa.me/5582996735814?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader  >
        <div className="flex items-center gap-2">
            <Image src={"/icon.png"} alt="logo" width={40} height={40} />
            <p className="text-xl font-bold">Simplifica</p>
         
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent  >
        <SidebarGroup>
          <SidebarGroupLabel >Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    
                  >
                    <a href={item.url} >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Botão do SimplificaBot renderizado manualmente */}
             

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="billtoPay">
                  <AccordionTrigger className=" px-2 py-2">
                    <div className="flex items-center gap-2  ">
                      
                        <NotebookPen size={16} />
                    <span>A pagar</span>
                      </div>
                  
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 flex flex-col gap-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/billtoPay/fixed"}>
                        <a href="/billstoFixed">Contas fixas</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/billtoPay"}>
                        <a href="/billtoPay">Contas a pagar</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={handleSimplificaBotClick}
                  className="bg-green-500 hover:bg-green-600 text-white border-2 border-green-400 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <button type="button" className="flex items-center gap-2 w-full">
                    <MessageCircle className="mr-2" />
                    <span>SimplificaBot</span>
                    <span className="ml-auto bg-green-400 text-green-900 text-xs px-2 py-1 rounded-full font-semibold">
                      Novo
                    </span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
             

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
<div className="flex items-center justify-between text-sm dark:text-white dark:bg-neutral-700 px-3 bg-slate-200 p-2 rounded-md">
  <div className="flex items-center gap-2 ">
    {
      darkMode ?
    <Moon/> :  <Sun/>
    }
    
  <span>Dark mode</span>
  </div>
 
  <Switch className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400"
  checked={darkMode}
  onCheckedChange={setDarkMode}
  />
</div>


     
      </SidebarFooter>
    </Sidebar>
  );
}
