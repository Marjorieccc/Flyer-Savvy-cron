// This file contains Drizzle ORM functions for checking if price record exists and adding new price record

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging'; 

export async function getPriceHistoryID(productId: number, flyerId: number):Promise<number|null>{
    try{
        const priceHistory = await db.query.priceHistory.findFirst({
            where: and(
                eq(schema.priceHistory.productId, productId),
                eq(schema.priceHistory.flyerId, flyerId)
            )
        });
        return priceHistory? priceHistory.priceHistoryId : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addPriceHistory(
    price: number|null,
    unit: string |null,
    pricePerQuantity: number|null,
    quantity: number|null,
    memberPrice: number|null,
    originalPrice: number|null,
    productId: number|null,
    flyerId: number):Promise<number|null>{
    try{
        const newPriceHistory = await db.insert(schema.priceHistory).values({
            price,
            unit,
            pricePerQuantity,
            quantity,
            memberPrice,
            originalPrice,
            productId,
            flyerId
        });
        return newPriceHistory[0].insertId;
    } catch(error) {
        Logging.error(error + " Product: " + productId + " flyer: " + flyerId);
        return null;
    }                    
}