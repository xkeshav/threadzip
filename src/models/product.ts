

export interface RootObject {
  products: Product[];
  categories: Category[];
  reviews: Review[];
  orders: Order[];
  shoppingCart: string[];
  shoppingCart2: string[];
}

export interface Order {
  orderNumber: number | string;
  products: Product2[];
  payment: Payment;
  date: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface Payment {
  cardNumber: string;
  expiringDate: string;
}

export interface Product2 {
  id: string;
  status: string;
  quantity: number;
  dateModified: string;
}

export interface Review {
  avatar: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  productID: string;
}

export interface Category {
  thumb_src: string;
  title: string;
  collection: string;
}

export interface Product {
  id: string;
  thumb_src: string;
  thumb_alt: string;
  images?: Image[];
  color: string;
  colors?: string[];
  title: string;
  price: number;
  description: string;
  full_description?: string;
  details?: string;
  highlights?: string[];
  features?: string[];
  rating?: number;
  reviews?: number;
  size: string;
  sizes: Sizes;
  data?: Data;
  featuresDetails?: FeaturesDetails;
  stock: boolean;
}

export interface FeaturesDetails {
  Origin: string;
  Material: string;
  Dimensions: string;
  Finish?: string;
  Includes?: string;
  Considerations?: string;
}

export interface Data {
  Features?: string;
  Care?: string;
  Shipping?: string;
  Returns?: string;
  Design?: string;
  Material?: string;
  Considerations?: string;
  Included?: string;
}

export interface Sizes {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
}

export interface Image {
  src: string;
  alt: string;
}
