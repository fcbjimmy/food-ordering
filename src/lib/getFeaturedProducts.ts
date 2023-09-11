export const getFeaturedProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products?featured=yes", {
    cache: "no-store",
  });

  console.log(
    "----------------------------------CONSOLE----------------------------------"
  );
  console.log(res);

  if (!res.ok) return undefined;

  return res.json();
};

export const getProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products?featured=no", {
    cache: "no-store",
  });

  if (!res.ok) undefined;

  return res.json();
};
