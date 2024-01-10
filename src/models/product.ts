export type RootObject = {
  products: Product[];
  categories: Category[];
  reviews: Review[];
  orders: Order[];
  shoppingCart: string[];
  shoppingCart2: string[];
}

export type Order = {
  orderNumber: number | string;
  products: Product2[];
  payment: Payment;
  date: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export type Payment = {
  cardNumber: string;
  expiringDate: string;
}

export type Product2 = {
  id: string;
  status: string;
  quantity: number;
  dateModified: string;
}

export type Review = {
  avatar: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  productID: string;
}

export type Category = {
  thumb_src: string;
  title: string;
  collection: string;
}

export type ProductOverView = {
  title: string;
  colors: string[];
  images: Image[];
  full_description: string;
  price: number;
  highlights: string[];
  details: string;
  rating: number;
  reviews: number;
  sizes: Sizes;
}

export type Product = ProductOverView & {
  id: string;
  thumb_src: string;
  thumb_alt: string;
  color: string;
  description: string;
  features?: string[];
  reviews?: number;
  data?: FeatureData;
  featuresDetails?: FeaturesDetails;
  stock: boolean;
  size: string;
}

export type CartItemEntity = {
  thumb_src: string;
  thumb_alt: string;
  title: string;
  color: string;
  size: string;
  price: number;
  stock: boolean;
}


export type FeaturesDetails = {
  Origin: string;
  Material: string;
  Dimensions: string;
  Finish?: string;
  Includes?: string;
  Considerations?: string;
}

export type FeatureData = {
  Features?: string;
  Care?: string;
  Shipping?: string;
  Returns?: string;
  Design?: string;
  Material?: string;
  Considerations?: string;
  Included?: string;
}

export type Sizes = {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
}

export type Image = {
  src: string;
  alt: string;
}
