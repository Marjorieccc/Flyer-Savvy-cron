export type Product = {
    importedProductCode: string,
    productName: string | null,
    brand: string | null,
    packageSize: number | null,
    packageUnit: string | null,
    imageUrl: string | null
}

export type PriceHistory = {
    price: number | null,
    unit: string | null,
    pricePerQuantity: number | null,
    quantity: number | null,
    memberPrice:number | null,
    originalPrice: number | null
}

export type PointHistory = {
    point: number,
    pointDetails: string | null
}

export type Flyer = {
    importedFlyerId: string,
    validFrom: string | null;  //  valid_from: Date | null;
    validTo: string | null;  // valid_to: Date | null;
}