"use client";

import React, { useEffect, useState } from "react";

// type Props = {
//   price: number;
//   id: string;
//   options?: { title: string; additionalPrice: number }[];
// };

const Price = ({ product }: { product: Product }) => {
  const [total, setTotal] = useState<number>(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (product.options.length) {
      setTotal(
        quantity * product.price + product.options[selected].additionalPrice
      );
    }
  }, [quantity, selected, product.options, product.price]);

  console.log(typeof total);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">${Number(total).toFixed(1)}</h2>
      {/* Options container */}
      <div className="flex gap-4">
        {product.options?.map((option, id) => (
          <button
            key={id}
            className={`min-w-[6rem] p-2 ring-1 ring-pink-600 rounded-md ${
              selected === id ? "bg-pink-600" : "bg-white"
            } ${selected === id ? "text-white" : "text-pink-600"}`}
            onClick={() => setSelected(id)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* Quantity and add button container */}
      <div className="flex justify-between items-center">
        {/* Quantity */}
        <div className="flex justify-between w-full p-3 ring-1 ring-pink-600">
          <span className="">Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"-"}
            </button>
            <span className="">{quantity}</span>
            <button
              onClick={() =>
                setQuantity((prev) => (prev < 9 ? prev + 1 : prev))
              }
            >
              {"+"}
            </button>
          </div>
        </div>
        {/* Cart Button */}
        <button className="uppercase w-56 bg-pink-600 text-white p-3 ring-1 ring-pink-600 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
