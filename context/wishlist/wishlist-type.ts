export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_WISHLIST_ITEM = "DELETE_WISHLIST_ITEMS";
export const SET_WISHLIST = "SET_WISHLIST";
export const CLEAR_WISHLIST = "CLEAR_WISHLIST";

export type itemType = {
  id: string;
  img1?: string;
  img2?: string;
  name: string;
  price: number;
  qty?: number;
};

export type wishlistType = {
  wishlist: itemType[];
  addToWishlist?: (item: itemType) => void;
  deleteWishlistItem?: (item: itemType) => void;
  clearWishlist?: () => void;
};
