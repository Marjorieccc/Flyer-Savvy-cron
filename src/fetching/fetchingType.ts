export type FlyerFetched = {
  id: string;
  flyer_run_id: number;
  valid_from: string;
  valid_to: string;
  postal_code: string;
  flyer_type_id?: number;
  storefront_payload?: string;
  pdf_url?: string;
  first_page_thumbnail_400h_url?: string;
  [key: string]: any;
};

// for fetching product code 
export type Product = {
  sku:  string | null;
  custom_id_field_1: string | null;
  custom_id_field_2: string | null;
  custom_id_field_3: string | null;
  custom_id_field_4: string | null;
  custom_id_field_5: string | null;
  custom_id_field_6: string | null;
  [key: string]: any;
};

// Nofrills product image
export type ImageAsset = {
  smallUrl: string | null;
  [key: string]: any;
};

// Nofrills discount price
export type Price = {
  value: number| null;
  [key: string]: any;
}

// Nofrills original price (optional)
export type WasPrice = {
  value: number| null;
  [key: string]: any;
}

// Nofrills member price under PC Optimum program
export type MemberOnlyPrice = {
  value: number| null;
  [key: string]: any;
}

// Unit price
export type ComparisonPrices = {
  value: number| null;
  unit: string | null;
  quantity: number| null;
  [key: string]: any;
}

// Nofrills member Optimum points under PC Optimum program
export type Promotion = {
  savings?: number| null;
  [key: string]: any;
}

export type Offer = {
  price: Price;
  wasPrice: WasPrice;
  comparisonPrices: ComparisonPrices[];
  memberOnlyPrice: MemberOnlyPrice;
  promotions?: Promotion[];
  [key: string]: any;
}

export type ProductDetails = {
  code:string ;
  name:string | null;
  brand: string | null;
  imageAssets: ImageAsset[];
  packageSize: string| null;
  offers: Offer[];
  [key: string]: any;
};

export type Flyer = {
  // fetch in first stage
  id: string;
  validFrom: string; 
  validTo: string;
  storeId: string[];
  productList: Product[];
  // fetch after first stage fetching succeed
  productDetailsList: ProductDetails[] | null;
};

