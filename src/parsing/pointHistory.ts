// This file parse information for adding new point record from fetched product details

import * as fetch from '../fetching/fetchingType';
import Logging from '../../logging/logging';
import * as parseType from './parsingType';


  export async function parsePointHistory(productdetail:fetch.ProductDetails):Promise<parseType.PointHistory|null>{
    try{
        if( typeof productdetail.offers?.[0]?.promotions?.[0]?.savings === 'number' &&
            productdetail.offers[0].promotions[0].savings > 0){
            return {
                point: productdetail.offers[0]?.promotions?.[0]?.savings,
                pointDetails: productdetail.offers[0]?.promotions?.[0]?.text ?? null
              }
        } 
        return null;
      } catch(error){
          Logging.error(error + " imported product id: " + productdetail.code);
          return null;
      }
  }