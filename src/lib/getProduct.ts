import { featuredProducts } from "@/data";

export const getProduct = async (id: string) => {
  // const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
  //   cache: "no-store",
  // });

  // if (!res.ok) return undefined;

  // return res.json();

  //TEST
  return featuredProducts.filter((item) => item.id === Number(id));
};
