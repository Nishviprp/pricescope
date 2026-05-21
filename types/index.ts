export interface Retailer {
  name: string;
  logo: string;
  color: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  shipping: string;
  delivery: string;
  inStock: boolean;
  badge: string;
  affiliateUrl: string;
}

export interface Product {
  name: string;
  category: string;
  emoji: string;
  description: string;
  specs: string[];
}

export interface CompareResult {
  product: Product;
  retailers: Retailer[];
  searchedAt: string;
}
