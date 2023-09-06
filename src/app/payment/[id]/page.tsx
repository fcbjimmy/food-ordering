"use client";

import { useEffect, useState } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
//create intent
const PaymentPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = params;

  useEffect(() => {
    //api call to create the intent
    const makePayment = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        console.log(data);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    makePayment();
  }, [id, clientSecret]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
