export interface Review {
  _id: string;
  title: string;
  ratings: number;
  product: string;
  user:{
    name:string
  }
}
export interface ReviewResponse {
  data: Review[];
}
