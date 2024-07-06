// This file combines the action of fetching, parsing and add new record to database
// Pending to change to fetched and saved in local first, when succeed pass saved files to parse and update database

import * as fetchHandle from './fetch';
import * as read from './read';
import * as parseAndUpdate from './parseAndUpdate';
import Logging from '../../logging/logging';


export async function handler(grocery_id: number, groceryName: string, accessToken: string,storeCode: string){
    try{
        // 1. Fetching and write into json file
        const fetchFlyer = await fetchHandle.fetchHandler(groceryName, accessToken, storeCode);

        if(!fetchFlyer){
            const msg =`Fail to fetch flyer : ${grocery_id} - ${groceryName} store: ${storeCode} token: ${accessToken} - `;
            Logging.error(msg);
            throw new Error(msg);
        }
    
        /*

        // 2. Read json file
        const flyerList = await read.readJson('flyers.json');


        // 3. Parse and Insert to database
        let allFlyerFailed = true;
        for (const flyer of flyerList){
            // Only flyer with complete details will be parsing and insert to database
            if(flyer.productDetailsList) {
                const flyerResult = await parseAndUpdate.parseAndUpdate(grocery_id,flyer, flyer.productDetailsList);
                if(flyerResult) allFlyerFailed = false;
            }
        }
        // Throw and stop operation if none of the flyer fetched is being parsed / update database
        if (allFlyerFailed){
            const msg = `Fail to update all flyers, grocery: ${grocery_id} - ${groceryName} store: ${storeCode} token: ${accessToken}`;
            Logging.error(msg);
            throw new Error(msg);
        }
        
        */
       
    } catch(error){
        const msg =`Fail to handle grocery: ${grocery_id} - ${groceryName} store: ${storeCode} token: ${accessToken} - `;
        Logging.error(msg + error);
        throw new Error(msg + error);
    }
}