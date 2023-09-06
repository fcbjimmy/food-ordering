import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  const { orderId } = params;

  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (order) {
    // Create a PaymentIntent with the order amount and currency
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * 100, //put order.price!!
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      //update the order
      await prisma.order.update({
        where: { id: orderId },
        data: {
          intent_id: paymentIntent.client_secret,
        },
      });
      return NextResponse.json(
        { clientSecret: paymentIntent.client_secret },
        { status: 500 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
