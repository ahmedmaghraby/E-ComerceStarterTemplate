import { itemType } from "@/type/product";

const removeItemFromCart = (cartItems: itemType[], item: itemType) => {
  if (item.qty === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== item.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty! - 1 } : cartItem
  );
};

export default removeItemFromCart;
