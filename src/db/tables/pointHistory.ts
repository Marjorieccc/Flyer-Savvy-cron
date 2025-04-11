// This file contains Drizzle ORM functions for checking if point record exists and adding new point record

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging';

export async function getPointHistoryID(productId: number, flyerId: number):Promise<number|null>{
    try{
        const pointHistory = await db.query.pointHistory.findFirst({
            where: and(
                eq(schema.pointHistory.productId, productId),
                eq(schema.priceHistory.flyerId, flyerId)
            )
        });
        return pointHistory? pointHistory.pointHistoryId : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addPointHistory(
    point: number,
    productId: number,
    flyerId: number,
    pointDetails:string | null):Promise<number|null>{
    try{
        const newPointHistory = await db.insert(schema.pointHistory).values({
            point,
            productId,
            flyerId,
            pointDetails
        });
        return newPointHistory[0].insertId;
    } catch(error) {
        Logging.error(error + " Product: " + productId + " flyer: " + flyerId);
        return null;
    }                    
}