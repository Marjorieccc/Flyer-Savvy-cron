// This file contains Drizzle ORM functions for checking if price record exists and adding new price record

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging'; 

export async function getPriceHistoryID(product_id: number, flyer_id: number):Promise<number|null>{
    try{
        const priceHistory = await db.query.price_history.findFirst({
            where: and(
                eq(schema.price_history.product_id, product_id),
                eq(schema.price_history.flyer_id, flyer_id)
            )
        });
        return priceHistory? priceHistory.price_history_id : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addPriceHistory(
    price: number|null,
    unit: string |null,
    price_per_quantity: number|null,
    quantity: number|null,
    member_price: number|null,
    original_price: number|null,
    product_id: number|null,
    flyer_id: number):Promise<number|null>{
    try{
        const newPriceHistory = await db.insert(schema.price_history).values({
            price,
            unit,
            price_per_quantity,
            quantity,
            member_price,
            original_price,
            product_id,
            flyer_id
        });
        return newPriceHistory[0].insertId;
    } catch(error) {
        Logging.error(error + " Product: " + product_id + " flyer: " + flyer_id);
        return null;
    }                    
}