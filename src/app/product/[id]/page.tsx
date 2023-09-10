import React from "react";
import Image from "next/image";
import Price from "@/components/Price";
import DeleteButton from "@/components/DeleteButton";

const getProduct = async (id: string) => {
  const apiUrl = process.env.API_URL;
  const res = await fetch(`${apiUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Not Found");
  }
  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  // const params = useParams();
  // const id = params.id;
  const { id } = params;
  const product: Product = await getProduct(id);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-pink-600 md:flex-row md:gap-8 md:items-center md:h-[75vh] relative">
      {/* Image Container */}
      {product.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image src={product.img} fill className="object-contain" alt="" />
        </div>
      )}
      {/* Text Container */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl uppercase font-bold">{product.title}</h1>
        <p className="">{product.desc}</p>
        <Price product={product} />
      </div>
      <DeleteButton id={product.id} />
    </div>
  );
};

export default SingleProductPage;
