"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");

  const router = useRouter();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    const confirmPayment = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/confirm/${payment_intent}`,
          { method: "PUT" }
        );
        if (res.ok) {
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
