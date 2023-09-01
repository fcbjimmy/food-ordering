import React from "react";
import Image from "next/image";

const Cart = () => {
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-pink-600 lg:flex-row">
      {/* Products Container */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-y-auto lg:h-full lg:w-2/3 lg:px-20 xl:px-40">
        {/* Single Item */}
        <div className="flex items-center justify-between mb-4">
          <Image src="/temp/p1.png" alt="" width={100} height={100} />
          <div className="uppercase text-xl font-bold">
            <h1 className="">Sicilian</h1>
            <span className="">Large</span>
          </div>
          <h2 className="font-bold">$79.9</h2>
          <span className="cursor-pointer">X</span>
        </div>
        {/* Single Item */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/temp/p1.png"
            alt=""
            className=""
            width={100}
            height={100}
          />
          <div className="uppercase text-xl font-bold">
            <h1 className="">Sicilian</h1>
            <span className="">Large</span>
          </div>
          <h2 className="font-bold">$79.9</h2>
          <span className="cursor-pointer">X</span>
        </div>
        {/* Single Item */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/temp/p1.png"
            alt=""
            className=""
            width={100}
            height={100}
          />
          <div className="uppercase text-xl font-bold">
            <h1 className="">Sicilian</h1>
            <span className="">Large</span>
          </div>
          <h2 className="font-bold">$79.9</h2>
          <span className="cursor-pointer">X</span>
        </div>
      </div>
      {/* Payment Container */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 lg:px-20 xl:px-30 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal (3 items)</span>
          <span className="">$81.70</span>
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
          <span className="font-bold">$81.70</span>
        </div>
        <button className="bg-pink-600 text-white p-3 rounded-md w-1/2 self-end">
          Check out
        </button>
      </div>
    </div>
  );
};

export default Cart;
