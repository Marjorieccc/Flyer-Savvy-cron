// This file contains functions using Drizzle ORM to get and add grocery IDs by name.

import { db, schema } from '../db' ;
import { eq } from 'drizzle-orm';
import Logging from '../../../logging/logging';


export async function getGroceryID(groceryName: string):Promise<number|null>{
    try{
        const grocery = await db.query.grocery.findFirst({
            where: eq(schema.grocery.groceryName, groceryName)
        });
        return grocery? grocery.groceryId : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addGrocery(groceryName: string,):Promise<number|null>{
    try{
        const newGrocery = await db.insert(schema.grocery).values({ groceryName});
        return newGrocery[0].insertId; // Return id of inserted record
    } catch(error) {
        Logging.error(error);
        return null;
    }    
}