// This file processes flyers, stores, products, price history, and point history by interacting with database

import * as db from '../db/tables/table';
import * as parseType from '../parsing/parsingType'
import Logging from '../../logging/logging';

export async function processFlyer(groceryId: number, flyer: parseType.Flyer):Promise<{ flyerID: number|null, isNew: boolean }>{
    try{
       
        const existFlyerId = await db.getFlyerID(flyer.importedFlyerId, groceryId);
        if(existFlyerId) {
            return {flyerID:existFlyerId, isNew: false};
        }
        const newFlyerID = await db.addFlyer(flyer.importedFlyerId, flyer.validFrom, flyer.validTo);
        Logging.info("added flyer");
        return {flyerID:newFlyerID, isNew: true};
    } catch(error){
        Logging.error;
        return {flyerID:null, isNew: false};
    }
}

// need change
export async function processFlyerStore(groceryId: number, flyerId: number, importedStoreId: string){
    try{
        const storeId = await db.getStoreID(importedStoreId, groceryId);
        if(!storeId) {
            const msg = `${importedStoreId} not existed in database`;
            Logging.error(msg); 
            return ;
        }
        const result = await db.addFlyerStore(flyerId, storeId);
        if(!result){
            const msg = `Fail to update flyer-store update flyer: ${flyerId} and store: ${importedStoreId}`;
            Logging.error(msg); 
        }
    } catch(error){
        Logging.error(error); 
    }
}

export async function processProduct(groceryId: number, productData: parseType.Product):Promise<number|null>{
    try{
        const existProductId = await db.getProductID(productData.importedProductCode, groceryId);
        if(existProductId){
            return existProductId;
        }
        const newProductId = await db.addProduct(
            productData.importedProductCode,
            productData.productName,
            productData.brand,
            productData.packageSize,
            productData.packageUnit,
            productData.imageUrl,
            groceryId
        );
        return newProductId ? newProductId : null;
    } catch(error){
        Logging.error;
        return null;
    }
}

export async function processPriceHistory(productId: number, flyerId: number,priceData: parseType.PriceHistory):Promise<number|null>{
    try{
        const existPriceHistoryId = await db.getPriceHistoryID(productId, flyerId);
        if(existPriceHistoryId){
            const msg = `Price history record already existed:  ${existPriceHistoryId}`;
            Logging.info(msg);
            return existPriceHistoryId;
        }
        const newPriceId = await db.addPriceHistory(
            priceData.price,
            priceData.unit,
            priceData.pricePerQuantity,
            priceData.quantity,
            priceData.memberPrice,
            priceData.originalPrice,
            productId,
            flyerId
        );
        return newPriceId ? newPriceId : null;
    } catch(error){
        Logging.error;
        // Return null to indicate process point data failure
        return null;
    }
}


export async function processPointHistory(productId: number, flyerId: number,pointData: parseType.PointHistory):Promise<number|null>{
    try{
        const existPointHistoryId = await db.getPointHistoryID(productId, flyerId);
        if(existPointHistoryId){
            const msg = `Point history record already existed:  ${existPointHistoryId}`;
            Logging.info(msg);
            return existPointHistoryId;
        }
        const newPointId =  await db.addPointHistory(pointData.point, productId, flyerId, pointData.pointDetails);
        return newPointId? newPointId : null;
    } catch(error){
        Logging.error;
        // Return null to indicate process point data failure
        return null;
    }
}