// This file extract information to forma a list of product code from flyer fetched

import * as fetchType from '../fetching/fetchingType';
import Logging from '../../logging/logging';

export async function extractProductCodeList(productList: fetchType.Product[]):Promise<string[]| null> {
  try{
    const uniqueProductCode = new Set<string>(); 
    productList.forEach(product => {
        [
          product.sku, 
          product.custom_id_field_1, 
          product.custom_id_field_2, 
          product.custom_id_field_3, 
          product.custom_id_field_4, 
          product.custom_id_field_5, 
          product.custom_id_field_6
        ].forEach(productCode => {
            if (productCode !== null && productCode !== undefined) {
              const newPdtCode = productCode.replace(/\s+/g, '');
              uniqueProductCode.add(newPdtCode);
            }
          });
    });
    return Array.from(uniqueProductCode);
  } catch(error){
      Logging.error;
      return null;
  }
}


