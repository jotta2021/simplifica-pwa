'use server'


   

import { actionClient } from "@/lib/safe-action";
import { prisma } from "../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { CategoryType } from "@/generated/prisma";


export const createCategoriesDefaultAction = actionClient.action(async () => {

const session = await auth.api.getSession({
    headers:await headers()
})
if(!session?.user.id){
    return {
        error: 'Unauthorized'
    }
}   
const defaultCategories = [
    // Income categories
    {
      name: "Salário",
      type: CategoryType.INCOME,
      icon: "dinheiro",
      color: "#22c55e",
      userId: session?.user.id
    },
    {
      name: "Investimentos", 
      type: CategoryType.INCOME,
      icon: "investimentos",
      color: "#4ade80",
      userId: session?.user.id
    },
    {
      name: "Freelance",
      type: CategoryType.INCOME,
      icon: "recibo",
      color: "#86efac",
      userId: session?.user.id
    },

    // Expense categories
    {
      name: "Alimentação",
      type: CategoryType.EXPENSE,
      icon: "restaurante",
      color: "#ef4444",
      userId: session?.user.id
    },
    {
      name: "Transporte",
      type: CategoryType.EXPENSE,
      icon: "combustivel", 
      color: "#f87171",
      userId: session?.user.id
    },
    {
      name: "Moradia",
      type: CategoryType.EXPENSE,
      icon: "energia",
      color: "#fca5a5",
      userId: session?.user.id
    },
    {
      name: "Lazer",
      type: CategoryType.EXPENSE,
      icon: "lazer",
      color: "#fee2e2",
      userId: session?.user.id
    },
    {
      name: "Saúde",
      type: CategoryType.EXPENSE,
      icon: "lista",
      color: "#6ECEDA",
      userId: session?.user.id
    }
   ]

    await prisma.category.createMany({
        data: defaultCategories
    })



    revalidatePath('/categories')

})
