"use client";

import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  LogOut,
  Tag,
  User2,
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
];

export  function Header() {
  const session =  authClient.useSession();
  const pathname = usePathname();
  async function Logout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Deslogado com sucesso")
          redirect("/login");
        },
      },
    });
  }
  return (
    <Sidebar className="bg-green-500" collapsible="offcanvas">
      <SidebarHeader className="bg-green-500">
        <div className="flex items-center gap-2">
          <Image src={"/icons/icon.png"} alt="logo" width={40} height={40} />
          <span className={`text-xl font-bold text-white `}>Simplifica</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="bg-green-500">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-white">
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
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
      <SidebarFooter className="bg-green-500 text-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> {session?.data?.user?.name}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem asChild>
              <Button variant={"ghost"} className="w-full" onClick={Logout}>
                <LogOut />
                Sair
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
