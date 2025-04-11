// This file contains Drizzle ORM functions for checking if product exists and adding new product

import { db, schema } from '../db' ;
import { eq, and } from 'drizzle-orm';
import * as image from '../handleImage/handleImage'
import Logging from '../../../logging/logging';

export async function getProductID(importedProductCode: string, groceryId: number):Promise<number|null>{
    try{
        const product = await db.query.product.findFirst({
            where: and(
                eq(schema.product.importedProductCode, importedProductCode),
                eq(schema.product.groceryId, groceryId)
            )
        });
        return product? product.productId : null;
    }catch (error){
        Logging.error(error);
        return null;
    }
}

export async function addProduct(
    importedProductCode: string,
    productName: string|null,
    brand: string|null,
    packageSize: number|null,
    packageUnit: string|null,
    incommingImageUrl: string|null,
    groceryId: number):Promise<number|null>{
    try{
        const imageUrl = incommingImageUrl ? await image.handleImage(incommingImageUrl) : null;

        const newProduct = await db.insert(schema.product).values({
            importedProductCode,
            productName,
            brand,
            packageSize,
            packageUnit,
            imageUrl,
            groceryId
        });
        return newProduct[0].insertId;
    } catch(error) {
        Logging.error(error);
        return null;
    }                    
}

