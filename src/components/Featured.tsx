import React from "react";
import Image from "next/image";
import FeaturedTextContainer from "./FeaturedTextContainer";

const getFeaturedProducts = async () => {
  const apiUrl = process.env.API_URL;
  const res = await fetch(`${apiUrl}/api/products?featured=yes`, {
    cache: "no-store",
  });

  console.log(res);

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const Featured = async () => {
  const featuredProducts: Product[] = await getFeaturedProducts();

  return (
    <div className="w-screen overflow-x-scroll text-pink-600">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => {
          return (
            <div
              key={item.id}
              className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
            >
              {/* IMAGE CONTAINER */}
              {item.img && (
                <div className="relative flex-1 w-full">
                  <Image
                    src={item.img}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {/* TEXT CONTAINER */}
              <FeaturedTextContainer
                title={item.title}
                desc={item.desc}
                price={item.price}
                id={item.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
