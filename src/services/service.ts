// This file processes flyers, stores, products, price history, and point history by interacting with database

import * as db from '../db/tables/table';
import * as parseType from '../parsing/parsingType'
import Logging from '../../logging/logging';

export async function processFlyer(grocery_id: number, flyer: parseType.Flyer):Promise<{ flyerID: number|null, isNew: boolean }>{
    try{
       
        const existFlyerID = await db.getFlyerID(flyer.imported_flyer_id, grocery_id);
        if(existFlyerID) {
            return {flyerID:existFlyerID, isNew: false};
        }
        const newFlyerID = await db.addFlyer(flyer.imported_flyer_id, flyer.valid_from, flyer.valid_to);
        Logging.info("added flyer");
        return {flyerID:newFlyerID, isNew: true};
    } catch(error){
        Logging.error;
        return {flyerID:null, isNew: false};
    }
}

// need change
export async function processFlyerStore(grocery_id: number, flyer_id: number, imported_store_id: string){
    try{
        const storeID = await db.getStoreID(imported_store_id, grocery_id);
        if(!storeID) {
            const msg = `${imported_store_id} not existed in database`;
            Logging.error(msg); 
            return ;
        }
        const result = await db.addFlyerStore(flyer_id, storeID);
        if(!result){
            const msg = `Fail to update flyer-store update flyer: ${flyer_id} and store: ${imported_store_id}`;
            Logging.error(msg); 
        }
    } catch(error){
        Logging.error(error); 
    }
}

export async function processProduct(grocery_id: number, productData: parseType.Product):Promise<number|null>{
    try{
        const existProductID = await db.getProductID(productData.imported_product_code, grocery_id);
        if(existProductID){
            return existProductID;
        }
        const newProductID = await db.addProduct(
            productData.imported_product_code,
            productData.product_name,
            productData.brand,
            productData.package_size,
            productData.package_unit,
            productData.image_url,
            grocery_id
        );
        return newProductID ? newProductID : null;
    } catch(error){
        Logging.error;
        return null;
    }
}

export async function processPriceHistory(product_id: number, flyer_id: number,priceData: parseType.PriceHistory):Promise<number|null>{
    try{
        const existPriceHistoryID = await db.getPriceHistoryID(product_id, flyer_id);
        if(existPriceHistoryID){
            const msg = `Price history record already existed:  ${existPriceHistoryID}`;
            Logging.info(msg);
            return existPriceHistoryID;
        }
        const newPriceID = await db.addPriceHistory(
            priceData.price,
            priceData.unit,
            priceData.price_per_quantity,
            priceData.quantity,
            priceData.member_price,
            priceData.original_price,
            product_id,
            flyer_id
        );
        return newPriceID ? newPriceID : null;
    } catch(error){
        Logging.error;
        // Return null to indicate process point data failure
        return null;
    }
}

export async function processPointHistory(product_id: number, flyer_id: number,point: number):Promise<number|null>{
    try{
        const existPointHistoryID = await db.getPointHistoryID(product_id, flyer_id);
        if(existPointHistoryID){
            const msg = `Point history record already existed:  ${existPointHistoryID}`;
            Logging.info(msg);
            return existPointHistoryID;
        }
        const newPointID =  await db.addPointHistory(point, product_id, flyer_id);
        return newPointID? newPointID : null;
    } catch(error){
        Logging.error;
        // Return null to indicate process point data failure
        return null;
    }
}

