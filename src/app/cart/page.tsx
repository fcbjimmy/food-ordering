"use client";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//Cart -> Checkout -> Create first order on db with no paid status and returns the order id ->
// Payment page -> API Call to create intentid with checking if order id exists on db ->
// Once it checks order id exists, it created intentid (paymentIntent.client_secret) and then u can update
// the db and send it as json()
// then it redirects to success payment where it will send make an api call to change
// the order status to PAID!
const Cart = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckOut = async () => {
    if (!session) {
      router.push("/");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`payment/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-pink-600 lg:flex-row">
      {/* Products Container */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-y-auto lg:h-full lg:w-2/3 lg:px-20 xl:px-40">
        {/* Single Item */}
        {products.map((product, id) => (
          <div className="flex items-center justify-between mb-4" key={id}>
            {product.img && (
              <Image src={product.img} alt="" width={100} height={100} />
            )}
            <div className="uppercase text-xl font-bold">
              <h1 className="">
                {product.title} x {product.quantity}
              </h1>
              <span className="">{product.optionTitle}</span>
            </div>
            <h2 className="font-bold">${product.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(product)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* Payment Container */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 lg:px-20 xl:px-30 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="bg-pink-600 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckOut}
        >
          Check out
        </button>
      </div>
    </div>
  );
};

export default Cart;
