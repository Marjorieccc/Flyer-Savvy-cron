// This file parse information for adding new price record from fetched product details

import * as fetch from '../fetching/fetchingType';
import * as parseType from './parsingType';
import Logging from '../../logging/logging';

export async function parsePriceHistory(productdetail:fetch.ProductDetails):Promise<parseType.PriceHistory|null>{
    try{
      return {
        price: productdetail.offers[0]?.price?.value?? null,
        unit: productdetail.offers[0]?.comparisonPrices[0]?.unit ?? null,
        price_per_quantity: productdetail.offers[0]?.comparisonPrices[0]?.value ?? null,
        quantity: productdetail.offers[0]?.comparisonPrices[0]?.quantity ?? null,
        member_price:productdetail.offers[0]?.memberOnlyPrice?.value ?? null,
        original_price: productdetail.offers[0]?.wasPrice?.value ?? null
      }
    } catch(error){
        Logging.error(error + " imported product id: " + productdetail.code);
        return null;
    }
  }
  