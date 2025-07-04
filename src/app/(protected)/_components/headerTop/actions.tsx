"use client";
import { NotificationType } from "@/app/@types/notifications";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { contexts } from "@/contexts/context";
import { Bell, ChevronUp, LogOut, Moon,  Sun } from "lucide-react";
import { useContext } from "react";
import { Badge } from "@/components/ui/badge";
import { useAction } from "next-safe-action/hooks";
import { markAllNotificationsRead } from "@/actions/upsertNotificationsActions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  SidebarMenuButton } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";


interface Props {
    notifications: NotificationType[],
   
    
}
const Actions= ({notifications  }:Props) => {
    const { darkMode, setDarkMode } = useContext(contexts);
const session = authClient.useSession()
const router = useRouter()
//marca todas as notificacoes como lidas

const readNotificationAction = useAction(markAllNotificationsRead);
async function ReadyNotifications(){
    await readNotificationAction.execute({userId:session.data?.user.id  || ''})
    }

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
  
    function getUserInitials(name?: string) {
      if (!name) return "";
      // Remove leading/trailing spaces, split by spaces, take first two words
      const words = name.trim().split(" ");
      if (words.length === 1) {
        // If only one word, return first two letters
        return words[0].substring(0, 2).toUpperCase();
      }
      // Otherwise, take first letter of first two words
      return (words[0][0] + words[1][0]).toUpperCase();
    }
  return (
    <div className="w-full flex justify-end items-center bg-white dark:bg-neutral-900 gap-4 text-gray-700 dark:text-white">
    <button
    className="hidden max-md:flex"
      
           onClick={() => {
             if (darkMode) {
               setDarkMode(false);
               localStorage.setItem("theme", "light");
             } else {
               setDarkMode(true);
               localStorage.setItem("theme", "dark");
             }
           }}
         >
           {darkMode ? <Moon size={24} /> : <Sun />}
         </button>
 
         <Popover>
           <PopoverTrigger>
             <button className="relative" >
               <Bell size={24}  />
               {
                notifications.filter(n => !n.read).length > 0 &&
                 <Badge className="absolute -bottom-2 rounded-full w-5 h-5 items-center justify-center bg-green-500 " >{notifications.filter(n => !n.read).length}</Badge>
               }
              
             </button>
           </PopoverTrigger>
           <PopoverContent className="w-80 px-2">
   <div className="text-sm">
       <h4 className="font-medium text-gray-700">Notificações</h4>
   </div>
   <NotificationList notifications={notifications} onMarkAllRead={ReadyNotifications} />
           </PopoverContent>
         </Popover>

         <DropdownMenu   >
          <DropdownMenuTrigger asChild className="w-18">
            <SidebarMenuButton>
              <Avatar className="w-8 h-8" >
                {
                  session.data?.user.image  ? 
                   <AvatarImage src={session.data?.user.image}/> :
                   <AvatarFallback className="text-black dark:text-white">
                    {getUserInitials(session.data?.user?.name)}
                   </AvatarFallback>
                }
              
              </Avatar>
               {session?.data?.user?.name}
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
        
       </div>
  )
}

const NotificationList = ({
  notifications,
  onMarkAllRead,
}: {
  notifications: NotificationType[];
  onMarkAllRead: () => void;
}) => (
    <div className="flex flex-col gap-3">
 <div className="flex flex-col gap-3 mt-3 max-h-64 overflow-y-auto">
    {notifications.length === 0 ? (
      <div className="text-center text-gray-400 py-6">Nenhuma notificação</div>
    ) : (
      notifications.map((notification) => (
        <div
          key={notification.id}
          className={`relative flex items-start gap-3 rounded-lg px-4 py-3 border shadow-sm transition-colors group hover:shadow-md cursor-pointer ${
            notification.read
              ? "bg-gray-100 dark:bg-neutral-800 text-gray-400 border-gray-200 dark:border-neutral-700"
              : "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-300 text-green-900 dark:text-green-100 border-2"
          }`}
        >
          <div className="flex-shrink-0 mt-1">
            <Bell size={20} className={notification.read ? "text-gray-300" : "text-green-400 dark:text-green-300 group-hover:animate-none"} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`font-bold text-sm ${notification.read ? "text-gray-400" : "text-green-900 dark:text-green-100"}`}>{notification.title}</span>
              {!notification.read && <span className="ml-1 text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">Nova</span>}
            </div>
            <div className={`text-xs ${notification.read ? "text-gray-400" : "text-gray-700 dark:text-gray-200"}`}>{notification.message}</div>
            <div className="text-[10px] text-gray-400 mt-1">{new Date(notification.created).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</div>
          </div>
        </div>
      ))
    )
    
    }
 
  </div>
  <Button
      className="bg-neutral-200 text-black font-normal hover:bg-neutral-300"
      onClick={onMarkAllRead}
    >
      Marcar todas como lidas
    </Button>
    </div>
 
);

export default Actions;