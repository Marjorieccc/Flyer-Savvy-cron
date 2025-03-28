// This file parse information for adding new product from fetched product details

import * as fetch from '../fetching/fetchingType';
import * as parseUtil from './util';
import * as parseType from './parsingType';
import Logging from '../../logging/logging';

export async function parseProduct(productdetail:fetch.ProductDetails):Promise<parseType.Product|null>{
    try{
        
        let packageSize: number | null = null;
        let packageUnit : string | null = null;

        if (productdetail.packageSize){
            const result = await parseUtil.convertPackageSizeString(productdetail.packageSize);
            packageSize = result.packageSize;
            packageUnit = result.packageUnit;
        }else{
            packageSize = productdetail.offers[0]?.comparisonPrices[0]?.quantity ?? null;
            packageUnit = productdetail.offers[0]?.comparisonPrices[0]?.unit ?? null;
        }

        return{
            imported_product_code: productdetail.code,
            product_name: productdetail.name ?? null,
            brand: productdetail.brand ?? null,
            package_size: packageSize,
            package_unit: packageUnit,
            image_url: productdetail.imageAssets[0]?.smallUrl?? null
        }
    } catch(error){
        Logging.error;
        return null;
    }
}