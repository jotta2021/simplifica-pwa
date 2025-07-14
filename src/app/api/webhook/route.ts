import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "../../../../lib/prisma";





export async function POST(req: NextRequest) {
 
  try {
    console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY)
console.log("STRIPE_WEBHOOK_SECRET:", process.env.STRIPE_WEBHOOK_SECRET)
   if(!process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY){
        throw new Error('Stripe secret key not found')
    }
    const signature = req.headers.get('stripe-signature')
    if(!signature){
        throw new Error("Stripe signature not found")
    }
    const text = await req.text();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
        apiVersion:'2025-06-30.basil'
    })

    //verifica se o webhook veio do stripe
    const event  = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
    )
  
switch (event.type){
case 'invoice.paid': {
if(!event.data.object.id){
    throw new Error()
}
const {subscription, subscription_details,customer} = await  event.data.object.object as unknown as {
    subscription : string;
    subscription_details:{
        metadata:{
            userId:string
        };

    },
    customer:string
}


if(!subscription){
    throw new Error()
}
const userId = subscription_details.metadata.userId

const user = await prisma.user.findFirst({
    where:{
        id:userId
    },
})

console.log(subscription)

await prisma.user.update({
    where:{
        id: userId
    },
    data: {
        subscriptionId: subscription,
        stripeCustomerId:customer,
        trial:false,
       


    }
})


break;
}
case 'customer.subscription.deleted' :{
    if(!event.data.object.id){
        throw new Error()
    }
    const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id
    );
    const userId = subscription.metadata.userId
    await prisma.user.update({
        where:{
            id: userId
        },
        data: {
            subscriptionId: null,
            stripeCustomerId:null,
        }
    })
    

}
break;
}

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao processar webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
