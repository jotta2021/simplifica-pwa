'use server'
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { addDays } from "date-fns";
import { MercadoPagoConfig, Order ,PreApproval} from "mercadopago";
import { headers } from "next/headers";
import { z } from "zod";
export const CreateCheckoutMercadoP = actionClient.schema(z.object({
    userId: z.string(),
    plan: z.string()
})).action(async ({parsedInput:{userId,plan}})=> {

    try{
const session =await  auth.api.getSession({
    headers: await headers()
})

      const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
    options: {timeout:5000}
})
console.log('url', process.env.NEXT_PUBLIC_URL)

  
const subscription = await new PreApproval(client).create({
    body:{
        reason: plan ==='mensal' ?  'Plano Mensal - Simplifica' : 'Plano Anual - Simplifica',
        auto_recurring:{
            frequency: plan ==='mensal' ? 1 : 12,
            frequency_type:'months',
            transaction_amount: plan ==='mensal' ? 24.99 : 179.99 ,
            currency_id:'BRL',
           
           
        },
        back_url:`${process.env.NEXT_PUBLIC_URL}/profile`,
       payer_email:session?.user.email,
       external_reference: JSON.stringify({userId:userId, plan:plan })
    }

})

return {
    init_point: subscription.init_point
}  
    }
    catch(error :any){
        console.error("Erro mercado pago", JSON.stringify(error,null,2))
        throw new Error(error.message || 'Erro ao criar assinatura')
    }


})