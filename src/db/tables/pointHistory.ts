// This file contains Drizzle ORM functions for checking if point record exists and adding new point record

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging';

export async function getPointHistoryID(product_id: number, flyer_id: number):Promise<number|null>{
    try{
        const pointHistory = await db.query.point_history.findFirst({
            where: and(
                eq(schema.price_history.product_id, product_id),
                eq(schema.price_history.flyer_id, flyer_id)
            )
        });
        return pointHistory? pointHistory.point_history_id : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addPointHistory(
    point: number,
    product_id: number,
    flyer_id: number,
    point_details:string | null):Promise<number|null>{
    try{
        const newPointHistory = await db.insert(schema.point_history).values({
            point,
            product_id,
            flyer_id,
            point_details
        });
        return newPointHistory[0].insertId;
    } catch(error) {
        Logging.error(error + " Product: " + product_id + " flyer: " + flyer_id);
        return null;
    }                    
}