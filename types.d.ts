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

type Order = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItem[];
  status: string;
  createdAt: Date;
  intent_id?: String;
};

type CartItem = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};
