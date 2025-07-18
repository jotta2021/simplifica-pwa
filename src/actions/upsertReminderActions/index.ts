"use server";

import { actionClient } from "@/lib/safe-action";
import { upsertReminderSchema } from "./schemaReminder";
import { prisma } from '../../../lib/prisma';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const upsertReminderAction = actionClient.schema(upsertReminderSchema).action(async ({ parsedInput: input }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }
  try{
    if (input.id) {
      await prisma.reminder.update({
          where: { id: input.id },
          data: {
            description: input.description,
            date_hour: input.date_hour,
          },
        });
        revalidatePath('/reminder');
     
      } else {
      await prisma.reminder.create({
          data: {
            description: input.description,
            date_hour: input.date_hour,
            userId: session.user.id
          },
        });
        revalidatePath('/reminder');
        
      } 
  }
  catch(error){
   
    console.log(error)
   
  }

}); 