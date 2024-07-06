// This file only handle the fetching process of flyer and discount information of the products
// ** Pending add retry function with preset max no. of retries and retryInterval

import { writeFile } from 'fs/promises';
import * as fetchType from '../fetching/fetchingType';
import * as fetch from '../fetching/fetchFlyer';
import * as extract from './extract';
import Logging from '../../logging/logging';

// Extract the list of product code from flyer and then fetch each product and related details
export async function fetchProductDetailsHandler(flyer: fetchType.Flyer): Promise<fetchType.ProductDetails[]|null>{
    try{
        // Send fetched flyer to extract unique product code list and log error if fail to extract
        const productCodeList = await extract.extractProductCodeList(flyer.productList); // ** retry
        if(!productCodeList || productCodeList.length < 1){
            const msg = `Get product code list failed from flyer: ${flyer.id} of store: ${flyer.storeId}`;
            Logging.error(msg);
        } else {
            // Get productDetails and log error if fail to fetch 
            const productDetailsList = await fetch.fetchProductDetailsList(productCodeList, flyer.storeId[0]); // ** retry
            if(!productDetailsList || productDetailsList.length < 1){
                const msg = `Get productDetails List failed from flyer: ${flyer.id} of store: ${flyer.storeId}`;
                Logging.error(msg);
            }
            return productDetailsList;
        }
        return null;
    } catch(error){
        const msg = `Fail to fetch product and related details from flyer ${flyer.id} store: ${flyer.storeId} - `;
        Logging.error(msg + error);
        return null
    }
}

// Fetch list of flyers, then call fetchProductDetailsHandler() to fetch all the product and related details
export async function fetchHandler(groceryName: string, accessToken: string,storeCode: string): Promise<boolean>{
    try{
        // Fetch flyer list
        const flyerList = await fetch.fetchFlyerList(groceryName, accessToken, storeCode);
        if(!flyerList || flyerList.length < 1){
            const msg = "Fetch Flyer list failed";
            Logging.error(msg);
            throw new Error(msg); // Stop operation if no flyer fetched
        }
         
        // Fetch product and related details for each flyer
        const filteredFlyerList: fetchType.Flyer[] = [];

        for (const flyer of flyerList){
            const productDetailList = await fetchProductDetailsHandler(flyer);
            // Only include flyer with successfully extract and fetched product and related details
            if(productDetailList &&  productDetailList.length > 0) {
                flyer.productDetailsList = productDetailList;
                filteredFlyerList.push(flyer)
            }
        }
        if(filteredFlyerList.length < 0){
            const msg =`Fail to fetch product and related details for all flyers grocery: ${groceryName} store: ${storeCode} token: ${accessToken}`;
            Logging.error(msg);
            throw new Error(msg);
        }

        const outputFlyerList = flyerList.map(flyer => {
            const { productList, ...rest } = flyer;
            return rest;
          });

        const ouput ={
            create : new Date().toISOString(),
            flyers: outputFlyerList
        }

        await writeFile('flyers.json', JSON.stringify(ouput, null, 2));
        
        return true;

    } catch(error){
        Logging.error(error);
        return false;
    }
}

