// This file contains Drizzle ORM function for handling the many-to-many relation between stores and groceries.

import { db, schema } from '../db' ;
import Logging from '../../../logging/logging';


export async function addFlyerStore(flyerId: number, storeId: number):Promise<boolean>{
    try {
        const result = await db.insert(schema.flyerStore).values({
            flyerId,
            storeId
        }).onDuplicateKeyUpdate({ set: { flyerId: flyerId, storeId: storeId} });
        return result? true : false;
    }catch(error) {
        Logging.error(error);
        return false;
    }                    
}
