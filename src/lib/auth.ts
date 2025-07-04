import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { customSession } from "better-auth/plugins";
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: { 
        clientId: process.env.GOOGLE_CLIENT_ID as string, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
},
plugins:[
  customSession(async ({user,session})=> {
    const categories = await prisma.category.findMany({
      where: {
        userId: user.id
      }
    })
    const accounts = await prisma.accountWallet.findMany({
      where:{
        userId:user.id
      }
    })
    return {
      session: {
        ...session
      },
        user: {
          ...user,
          
          
        
      },
     
      categories,
      accounts
    }
  })
]
});
