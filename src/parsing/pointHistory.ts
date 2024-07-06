// This file parse information for adding new point record from fetched product details

import * as fetch from '../fetching/fetchingType';
import Logging from '../../logging/logging';

export async function parsePointHistory(productdetail:fetch.ProductDetails):Promise<number|null>{
    try{
        return productdetail.offers[0]?.promotions?.[0]?.savings ?? null;
    } catch(error){
        Logging.error(error + " imported product id: " + productdetail.code);
        return null;
    }
  }