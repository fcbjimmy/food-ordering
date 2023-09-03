type Product = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  isFeatured: boolean;
  options: { title: string; additionalPrice: number }[];
  catSlug: string;
};
