import React from "react";
import Image from "next/image";
import Price from "@/components/Price";
import DeleteButton from "@/components/DeleteButton";
import NotFound from "./not-found";
import { getProduct } from "@/lib/getProduct";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/utils/auth";

//doesnt work during build time
// export async function generateStaticParams() {
//   const products: Product[] = await getProducts();
//   if (!products) return [];

//   return products.map((item) => ({ id: item.id }));
// }
//test

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  // const params = useParams();
  // const id = params.id;
  const { id } = params;
  const session = await getAuthSession();

  // const product: Product = await getProduct(id);
  const product: Product | undefined = await getProduct(id);
  console.log(
    "------------------------Individual Product------------------------"
  );
  console.log(product);
  console.log(typeof product?.options[0].additionalPrice);
  console.log("Price", typeof product?.price);
  if (!product) return notFound();

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
      {session?.user.isAdmin && <DeleteButton id={product.id} />}
    </div>
  );
};

export default SingleProductPage;
