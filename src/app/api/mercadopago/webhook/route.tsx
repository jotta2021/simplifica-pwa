import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment, PreApproval } from "mercadopago";
import { prisma } from "../../../../../lib/prisma";
import { addDays } from "date-fns";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
  options: { timeout: 5000 },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook recebido:", body);

    const { type, data } = body;
    const id = data.id;

    if (type === "payment") {
      const paymentData = await new Payment(mpClient).get({ id });
      const ref = JSON.parse(paymentData.external_reference || "{}");

      console.log("💰 Pagamento recebido:", {
        userId: ref.userId,
        plano: ref.plan,
        status: paymentData.status,
        valor: paymentData.transaction_amount,
      });

 if(paymentData.status ==='approved'){
    // Atualizar a assinatura no banco 
    const user = await prisma.user.findFirst({
      where:{
          id: ref.userId
      } 
    })
    //nova data de renovação
    const renewAt =ref.plan ==='mensal' ?
    addDays(new Date(user?.renewAt || new Date()),30) :
    addDays(new Date(user?.renewAt || new Date()),365)

    //atualiza assinatura do usuario no banco de dados
    await prisma.user.update({
      where:{
          id:ref.userId
      },
      data:{
          renewAt:renewAt,
          trial:false


      }
    })


 }

    } else if (type === "preapproval" || type === "subscription_preapproval" || type==='subscription_authorized_payment') {
      const subData = await new PreApproval(mpClient).get({ id });
      const ref = JSON.parse(subData.external_reference || "{}");

      console.log("🔁 Assinatura recebida:", {
        userId: ref.userId,
        plano: ref.plan,
        status: subData.status,
        
      });
// adiciona os campos da assinatura no usuario
      if(subData.status ==='authorized'){
        await prisma.user.update({
            where:{
                id:ref.userId
            },
            data:{
               
                subscriptionId: subData.id,
                subscriptionStatus:subData.status,
                curentPlan: ref.plan
                
      
      
            }
          })
    
      }
     
      
    } else {
      console.log("Tipo de webhook não tratado:", type);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Erro ao processar webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
