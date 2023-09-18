export interface Product {
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  colors: string[]; // This should contain color options like ["Red", "Blue", "Green"]
  imageCover: string;
  images: string[];
  category: string | null;
  subcategories: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
}
