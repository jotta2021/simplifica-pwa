'use server'
import { actionClient } from "@/lib/safe-action";
import { formSchema } from "./schema";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const upsertPlaningActions = actionClient.schema(formSchema).action(async ({parsedInput}) => {
        const {id, title, description, target_value, iniital_value} = parsedInput;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (id) {
    await prisma.plans.update({
      where: { id },
        data: { title, description, target_value, iniital_value },
      });
    } else {
      await prisma.plans.create({
        data: {
          title,
          description,
          target_value,
          iniital_value,
          userId: session?.user.id as string,
        },
      });
    }
  revalidatePath('/planing')
});

export default upsertPlaningActions;