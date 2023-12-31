import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getNonFeaturedProducts } from "@/lib/getFeaturedProducts";
import { getAuthSession } from "@/utils/auth";

// const getProducts = async () => {
//   const res = await fetch(`${process.env.BASE_URL}/api/products?featured=no`, {
//     cache: "no-store",
//   });

//   if (!res.ok) undefined;

//   return res.json();
// };

const Menu = async () => {
  const products: Product[] = await getNonFeaturedProducts();

  if (!products) return <div>Sorry, no items are available!</div>;
  console.log("------------------------Products------------------------");
  console.log(products);
  console.log(typeof products[0].options);

  return (
    <div className="flex flex-wrap text-pink-600">
      {products.map((item) => {
        return (
          <Link
            className="w-full h-[60vh] border-r-2   border-b-2 border-pink-600 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group even:bg-fuchsia-50"
            href={`/product/${item.id}`}
            key={item.id}
          >
            {/* Image */}
            {item.img && (
              <div className="relative h-[80%]">
                <Image src={item.img} className="object-contain" alt="" fill />
              </div>
            )}
            {/* Text */}
            <div className="flex items-center justify-between font-bold uppercase">
              <h1 className="text-xl p-2">{item.title}</h1>
              <h2 className="group-hover:hidden text-xl">
                {Number(item.price)}
              </h2>
              <button className="hidden group-hover:block bg-pink-600 text-white p-2 rounded-md">
                Add to cart
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
