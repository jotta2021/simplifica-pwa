import React from "react";
import Actions from "./actions";
import { prisma } from "../../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import TrialMessage from "./trialMessage";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import MenuButton from "./menuBar";

const HeaderTop = async () => {
const session = await auth.api.getSession({
  headers: await headers()
})




  const notifications = await prisma.notification.findMany({
    where:{
      userId: session?.user.id
    },
    orderBy:{
      created: 'desc'
    }
  })

 
  return (
   <div className="px-6 py-2 dark:bg-neutral-900 flex w-full justify-between items-center gap-10">
    <MenuButton/>
  <TrialMessage/>
   
 
    <Actions notifications={notifications} />
   </div>
  );
};



export default HeaderTop;
