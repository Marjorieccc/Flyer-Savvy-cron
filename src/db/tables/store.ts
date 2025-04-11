// This file contains Drizzle ORM functions for checking if store exists and adding new store

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging';

export async function getStoreID(importedStoreId: string,groceryId:number):Promise<number|null>{
    try{
        const store = await db.query.store.findFirst({
            where: and(
                eq(schema.store.importedStoreId, importedStoreId),
                eq(schema.store.groceryId, groceryId)
            )
        });
        return store? store.groceryId : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addStore(importedStoreId: string,
    storeName: string,
    address: string,
    postalCode: string,
    groceryId: number):Promise<number|null>{
    try{
        const newStore = await db.insert(schema.store).values({ 
            importedStoreId,
            storeName,
            address,
            postalCode,
            groceryId
        });
        return newStore[0].insertId;
    } catch(error) {
        Logging.error(error);
        return null;
    }    
}