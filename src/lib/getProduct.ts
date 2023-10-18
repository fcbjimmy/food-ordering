import prisma from "@/utils/connect";

export const getProduct = async (id: string): Promise<Product | undefined> => {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return undefined;
  return res.json();

  //test
};
