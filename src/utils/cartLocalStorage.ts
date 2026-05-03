import type { CartItem } from "../types/product";

export const getCart = (): CartItem[] => {
    const cartLocalStorage = localStorage.getItem("cart");
    
    if(cartLocalStorage) {
        return JSON.parse(cartLocalStorage);
    } else {
        return [];
    }
};

export const saveCart = (items: CartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(items));
};