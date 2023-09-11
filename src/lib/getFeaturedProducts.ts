import { featuredProducts } from "@/data";
import prisma from "@/utils/connect";

export const getFeaturedProducts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/products?featured=yes`, {
    cache: "no-store",
  });

  if (!res.ok) return undefined;

  return res.json();
};

export const getNonFeaturedProducts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/products?featured=no`, {
    cache: "no-store",
  });

  if (!res.ok) undefined;

  return res.json();
};
