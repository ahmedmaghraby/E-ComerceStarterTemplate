export type Product = {
  id: string;
  name: string;
  price: number;
  qty?: number | undefined;
  discountPercent?: number;
  description?: string;
  detail?: string;
  categoryId?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string | null;
  category?: category;
};

export type category = {
  id?: string;
  name?: string;
  description?: string;
  thumbnailImage?: string;
  createdAt?: string;
  updatedAt?: string | null;
};

export interface itemType extends Product {
  img1?: string;
  img2?: string;
  categoryName?: string;
}

export interface productResponse extends Product {
  image1?: string;
  image2?: string;
}
