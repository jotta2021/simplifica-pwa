import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { customSession } from "better-auth/plugins";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

//intercepta o prisma pra qualquer criacao de usuario
prisma.$use(async (params, next) => {
  // só interessa interceptar o create do model User
  if (params.model === "User" && params.action === "create") {
    // executa o create original
    const newUser = await next(params);

    // faz o update pós‑criação pra setar trial e renewAt
    await prisma.user.update({
      where: { id: newUser.id },
      data: {
        trial: true,
        renewAt: addDays(new Date(), 7),
      },
    });

    return newUser;
  }

  // pros outros queries, segue normal
  return next(params);
});


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
    const userId = await prisma.user.findFirst({
      where:{
        id: user.id
      }
    })
    return {
      session: {
        ...session
      },
        user: {
          ...user,
          renewAt: userId?.renewAt,
          trial:userId?.trial,
          subscriptionId: userId?.subscriptionId,
          subscriptionStatus:userId?.subscriptionStatus,
          curentPlan: userId?.curentPlan,

          
        
      },
     
      categories,
      accounts
    }
  })
]
});
