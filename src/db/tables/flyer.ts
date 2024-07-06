// This file contains Drizzle ORM functions for checking if flyer exists and adding new flyer

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging';


export async function getFlyerID(imported_flyer_id: string,grocery_id:number):Promise<number|null>{
    try{
        const flyerJoinStore = 
            await db.select({flyer_id: schema.flyer.flyer_id, grocery_id: schema.store.grocery_id}).from(schema.flyer)
            .leftJoin(schema.flyer_store, eq(schema.flyer.flyer_id, schema.flyer_store.flyer_id))
            .leftJoin(schema.store, eq(schema.store.store_id, schema.flyer_store.store_id))
            .where(and(
                eq(schema.flyer.imported_flyer_id, imported_flyer_id),
                eq(schema.store.grocery_id, grocery_id)
            ));
        return flyerJoinStore[0]?.flyer_id? flyerJoinStore[0].flyer_id : null;

    } catch(error) {
        Logging.error(error);
        return null;
    }    
}

export async function addFlyer(imported_flyer_id: string,
                                valid_from: string|null,
                                valid_to: string|null):Promise<number|null>{
    try{
        const newFlyer = await db.insert(schema.flyer).values({
            imported_flyer_id,
            valid_from: valid_from ? new Date(valid_from): null,
            valid_to: valid_to ? new Date(valid_to) : null
        });
        return newFlyer[0]?.insertId ? newFlyer[0].insertId: null ;
    } catch(error) {
        Logging.error(error);
        return null;
    }                    
}