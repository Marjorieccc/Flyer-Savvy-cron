// This file only handle the parsing process and the adding new records of flyer and discount information of the products
// ** Pending add retry function with preset max no. of retries and retryInterval

import * as fetchType from '../fetching/fetchingType';
import * as parse from '../parsing/parsing';
import * as process from '../services/service';
import Logging from '../../logging/logging';

export async function parseAndUpdateProduct(groceryId: number, flyerId: number, productdetail:fetchType.ProductDetails):Promise<boolean>{
    try{
        // Parse fetched product detail object and ready to add new record
        const productParsed = await parse.parseProduct(productdetail); // ** retry
        const priceHistoryParsed = await parse.parsePriceHistory(productdetail); // ** retry
        const pointHistoryParsed = await parse.parsePointHistory(productdetail); // ** retry

        // Return if product information is not ready from parsing 
        if(!productParsed){
            const msg = `Fail to parse product details from flyer: ${flyerId} of product imported code: ${productdetail.code}`;
            Logging.error(msg);
            return false;
        }

        // Return if product information is not exist or added to database as unable to further process price / point data
        const productID = await process.processProduct(groceryId,productParsed); // ** retry
        if(!productID){
            const msg = `Fail to process product details from flyer: ${flyerId} of product imported code: ${productdetail.code}`;
            Logging.error(msg);
            return false;
        }

        // Add new price record if not existed
        if(priceHistoryParsed){
            const priceHistoryID = await process.processPriceHistory(productID, flyerId,priceHistoryParsed); // ** retry
            if(!priceHistoryID){
                const msg = `Fail to process price details from flyer: ${flyerId} of product: ${productID}`;
                Logging.error(msg);
            }
        }

        // Add new point record if not existed  
        if(pointHistoryParsed){
            const pointHistoryID = await process.processPointHistory(productID, flyerId, pointHistoryParsed); // ** retry
            if(!pointHistoryID){
                const msg = `Fail to process point details from flyer: ${flyerId} of product: ${productID}`;
                Logging.error(msg);
            }
        }

        if(!priceHistoryParsed && !pointHistoryParsed){
            const msg = `Fail to get both point and price record of product :${productID}` ;
            Logging.error(msg);
        }

        return true;

    } catch(error){
        // Throw new error to parseAndUpdate() to stop operation
        const msg = `Fail to parse and update product and related details from flyer ${flyerId} grocery: ${groceryId}}`;
        Logging.error(msg);
        return false;
    }
}

export async function parseAndUpdate(groceryId: number, flyerFetched: fetchType.Flyer, productDetailsList:fetchType.ProductDetails[]):Promise<boolean>{
    try{
        // Parse flyer to get content for adding new flyer record, return false if failed
        const flyerParsed = await parse.parseFlyer(flyerFetched);
        if(!flyerParsed){
            const msg = `Parse flyer data failed: ${flyerFetched.id} grocery: ${groceryId}`;
            Logging.error(msg);
            return false;
        }

        // Check if flyer has not yet saved will add new flyer record, return false if failed
        const flyer = await process.processFlyer(groceryId, flyerParsed);
        if(!flyer.flyerID){
            const msg = `Process flyer failed: ${flyerFetched.id} grocery: ${groceryId}`;
            Logging.error(msg);
            return false;
        }

        // Update Flyer-Store information (for database reference purpose)
        await process.processFlyerStore(groceryId, flyer.flyerID, flyerFetched.storeId[0]);
        
        // Return if the flyer exists in database already
        if(!flyer.isNew){
            const msg = `Flyer already existed: ${flyerFetched.id} grocery: ${groceryId}`;
            Logging.error(msg);
            return false;
        }


        let allProductFailed:boolean = true;
        for (const productDetail of productDetailsList){
            // Parse all product and related information of the flyer and then add new records to database
            const updated = await parseAndUpdateProduct(groceryId,flyer.flyerID, productDetail);
            if (!updated){
                // Log down failed to parse/update product
                const msg = `Fail to update data of product ${productDetail.code} flyer: ${flyer.flyerID}`;
                Logging.error(msg);
            } else{
                allProductFailed = false;
            }
        }

        // Log down flyer information if all product cannot be parse and update
        if (allProductFailed){
            const msg = `Fail to update product and related data of all flyers ${flyer.flyerID}`;
            Logging.error(msg);
            return false;
        }

        return true;

    } catch(error){
        const msg =`Fail to parse and update flyer : ${flyerFetched.id} grocery: ${groceryId} - `;
        Logging.error(msg);
        return false;
    }
}

