// This file contains Drizzle ORM functions for checking if product exists and adding new product

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import * as image from '../handleImage/handleImage'
import Logging from '../../../logging/logging';

export async function getProductID(imported_product_code: string, grocery_id: number):Promise<number|null>{
    try{
        const product = await db.query.product.findFirst({
            where: and(
                eq(schema.product.imported_product_code, imported_product_code),
                eq(schema.product.grocery_id, grocery_id)
            )
        });
        return product? product.product_id : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addProduct(
    imported_product_code: string,
    product_name: string|null,
    brand: string|null,
    package_size: number|null,
    package_unit: string|null,
    incomming_image_url: string|null,
    grocery_id: number):Promise<number|null>{
    try{
        const image_url = incomming_image_url ? await image.handleImage(incomming_image_url) : null;

        const newProduct = await db.insert(schema.product).values({
            imported_product_code,
            product_name,
            brand,
            package_size,
            package_unit,
            image_url,
            grocery_id
        });
        return newProduct[0].insertId;
    } catch(error) {
        Logging.error(error);
        return null;
    }                    
}

