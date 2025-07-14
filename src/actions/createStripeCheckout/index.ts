'use server'
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { headers } from "next/headers";
import Stripe from "stripe";
import { z } from "zod";

export const createStripeCheckout = actionClient.schema(z.object({
    plan: z.string()
})).action(async ({parsedInput : {plan}} ) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-06-30.basil",
  });

  const sessionStripe = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.NEXT_PUBLIC_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/profile`,
    subscription_data: {
      metadata: {
        userId: session?.user.id,
      },
    },
    line_items: [
      {
        price: plan ==='mensal' ?  process.env.STRIPE_MENSAL_PRICE_ID : process.env.STRIPE_ANUAL_PRICE_ID,
        quantity: 1,
      },
    ],
  });
  return {
    sessionId: sessionStripe.id
  }
});
