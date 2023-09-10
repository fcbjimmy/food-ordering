"use client";

import { useCartStore } from "@/utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { NEXT_URL } from "@/utils/url";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent_client_secret");
  const { clearCart } = useCartStore();

  const router = useRouter();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    const confirmPayment = async () => {
      try {
        const res = await fetch(`${NEXT_URL}/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        console.log(res);
        const data = await res.json();
        if (res.ok) {
          clearCart();

          toast.success(data.message);
          timerId = setTimeout(() => {
            // do something
            router.push("/");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    confirmPayment();
    return () => clearTimeout(timerId);
  }, [payment_intent, router]);

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      <h3 className="text-4xl text-green-500 font-bold">
        Success!, please do not close the page. You are being redirected.
      </h3>
    </div>
  );
};

export default SuccessPage;
