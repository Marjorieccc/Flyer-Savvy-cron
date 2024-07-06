// This file contains Drizzle ORM function for handling the many-to-many relation between stores and groceries.

import { db, schema } from '../db' ;
import Logging from '../../../logging/logging';


export async function addFlyerStore(flyer_id: number, store_id: number):Promise<boolean>{
    try {
        const result = await db.insert(schema.flyer_store).values({
            flyer_id,
            store_id
        }).onDuplicateKeyUpdate({ set: { flyer_id: flyer_id, store_id: store_id} });
        return result? true : false;
    }catch(error) {
        Logging.error(error);
        return false;
    }                    
}
