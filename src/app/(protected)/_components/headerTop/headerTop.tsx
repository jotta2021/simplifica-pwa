import React from "react";
import Actions from "./actions";
import { prisma } from "../../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
   <div className="px-6 py-2 dark:bg-neutral-900 flex w-full justify-between gap-10">
    <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-300  h-full text-sm w-[60%] p-2 rounded-sm text-green-600 font-medium">

<p className="max-md:hidden">Você está utilizando uma versão de teste do Simplifica - Finanças Pessoais</p>
<p className="hidden max-md:flex">Vs. Teste</p>
    </div> 
<Actions notifications={notifications} />
   </div>
  );
};

export default HeaderTop;
