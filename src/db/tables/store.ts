// This file contains Drizzle ORM functions for checking if store exists and adding new store

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import Logging from '../../../logging/logging';

export async function getStoreID(imported_store_id: string,grocery_id:number):Promise<number|null>{
    try{
        const store = await db.query.store.findFirst({
            where: and(
                eq(schema.store.imported_store_id, imported_store_id),
                eq(schema.store.grocery_id, grocery_id)
            )
        });
        return store? store.grocery_id : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addStore(imported_store_id: string,
    store_name: string,
    address: string,
    postal_code: string,
    grocery_id: number):Promise<number|null>{
    try{
        const newStore = await db.insert(schema.store).values({ 
            imported_store_id,
            store_name,
            address,
            postal_code,
            grocery_id
        });
        return newStore[0].insertId;
    } catch(error) {
        Logging.error(error);
        return null;
    }    
}