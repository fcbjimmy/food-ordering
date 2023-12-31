import { create } from "zustand";
import { persist } from "zustand/middleware";
const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalItems,
      addToCart(item) {
        const products = get().products;
        console.log("Adding pkt to cart");
        console.log(products);
        const productInState = products.find(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );
        console.log("productInState:", productInState);
        console.log("item:", item);
        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id &&
            product.optionTitle === productInState.optionTitle
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
        // set((state) => ({
        //   products: [...state.products, item],
        //   totalItems: state.totalItems + item.quantity,
        //   totalPrice: state.totalPrice + item.price,
        // }));
      },
      removeFromCart(item) {
        const products = get().products;
        set((state) => ({
          products: state.products.filter(
            (product) =>
              product.id !== item.id || product.optionTitle !== item.optionTitle
          ),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
      clearCart() {
        set((state) => ({
          products: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
