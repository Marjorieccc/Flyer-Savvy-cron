// This file contains Drizzle ORM functions for checking if flyer exists and adding new flyer

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging';


export async function getFlyerID(importedFlyerId: string,groceryId:number):Promise<number|null>{
    try{
        const flyerJoinStore = 
            await db.select({flyer_id: schema.flyer.flyerId, grocery_id: schema.store.groceryId}).from(schema.flyer)
            .leftJoin(schema.flyerStore, eq(schema.flyer.flyerId, schema.flyerStore.flyerId))
            .leftJoin(schema.store, eq(schema.store.storeId, schema.flyerStore.storeId))
            .where(and(
                eq(schema.flyer.importedFlyerId, importedFlyerId),
                eq(schema.store.groceryId, groceryId)
            ));
        return flyerJoinStore[0]?.flyer_id? flyerJoinStore[0].flyer_id : null;

    } catch(error) {
        Logging.error(error);
        return null;
    }    
}

export async function addFlyer(importedFlyerId: string,
                                validFrom: string|null,
                                validTo: string|null):Promise<number|null>{
    try{
        const newFlyer = await db.insert(schema.flyer).values({
            importedFlyerId,
            validFrom: validFrom ? new Date(validFrom): null,
            validTo: validTo ? new Date(validTo) : null
        });
        return newFlyer[0]?.insertId ? newFlyer[0].insertId: null ;
    } catch(error) {
        Logging.error(error);
        return null;
    }                    
}