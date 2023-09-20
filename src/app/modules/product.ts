export interface ProductResponse {
  data: Product;
}

export interface Product {
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount: number;
  colors: string[];
  imageCover: string;
  images: string[];
  category: {
    name: string;
  };
  subcategories: string[];
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: any[];
  id: string;
}
