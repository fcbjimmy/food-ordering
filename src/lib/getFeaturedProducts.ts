import { featuredProducts } from "@/data";

export const getFeaturedProducts = async () => {
  // const res = await fetch(`${process.env.BASE_URL}/api/products?featured=yes`, {
  //   cache: "no-store",
  // });

  // console.log(
  //   "----------------------------------CONSOLE----------------------------------"
  // );
  // console.log(process.env.BASE_URL);
  // console.log(res);

  // if (!res.ok) return undefined;

  // return res.json();

  //TEST
  return featuredProducts;
};

export const getProducts = async () => {
  // const res = await fetch(`${process.env.BASE_URL}/api/products?featured=no`, {
  //   cache: "no-store",
  // });

  // if (!res.ok) undefined;

  // return res.json();
  //TEST
  return featuredProducts;
};
