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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  {
    title: "SimplificaBot",
    url: "#",
    icon: MessageCircle,
    isExternal: true,
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
    const whatsappUrl = `https://wa.me/558296646113?text=${message}`;
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
                    onClick={item.isExternal ? handleSimplificaBotClick : undefined}
                    className={item.isExternal ? "bg-green-500 hover:bg-green-600 text-white border-2 border-green-400 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" : ""}
                  >
                    <a href={item.url} className={item.isExternal ? "flex items-center gap-2" : ""}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.isExternal && (
                        <span className="ml-auto bg-green-400 text-green-900 text-xs px-2 py-1 rounded-full font-semibold">
                          Novo
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
