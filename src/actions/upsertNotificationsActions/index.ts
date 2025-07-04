'use server'

import { redirect } from "next/navigation"
import { prisma } from "../../../lib/prisma"
import z from "zod"
import { revalidatePath } from "next/cache"

const markAllNotificationsReadSchema = z.object({
  userId: z.string().min(1, { message: "userId é obrigatório" })
})

export const markAllNotificationsRead = async (input: { userId: string }) => {
  const { userId } = markAllNotificationsReadSchema.parse(input)
  await prisma.notification.updateMany({
    where: { userId },
    data: { read: true }
  })
  revalidatePath('/')
  return { success: true }



}