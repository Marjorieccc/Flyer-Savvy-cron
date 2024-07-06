import mysql from 'mysql2/promise';
import {db, schema} from './db/db'
import { grocery } from './drizzle/schema/schema';

async function main(){
    const connect = await db.select().from(schema.grocery);
    console.log(connect);
}

main();


