"use client";

import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  desc?: string;
  price: number;
  id: string;
};
const FeaturedTextContainer = ({ title, desc, price, id }: Props) => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
        {title}
      </h1>
      <p className="p-4 2xl:p-8">{desc}</p>
      <span className="text-xl font-bold ">{price}</span>
      <button
        type="button"
        className="bg-pink-600 text-white p-2 rounded-md"
        onClick={() => router.push(`/product/${id}`)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default FeaturedTextContainer;
