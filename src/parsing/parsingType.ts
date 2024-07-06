export type Product = {
    imported_product_code: string,
    product_name: string | null,
    brand: string | null,
    package_size: number | null,
    package_unit: string | null,
    image_url: string | null
}

export type PriceHistory = {
    price: number | null,
    unit: string | null,
    price_per_quantity: number | null,
    quantity: number | null,
    member_price:number | null,
    original_price: number | null
}

export type Flyer = {
    imported_flyer_id: string,
    valid_from: string | null;  //  valid_from: Date | null;
    valid_to: string | null;  // valid_to: Date | null;
}