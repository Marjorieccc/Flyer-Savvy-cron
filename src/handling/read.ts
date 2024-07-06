// This file reads the fetched json file, and output to Flyer[] for further process
import { writeFile, readFile } from 'fs/promises';
import * as fetchType from '../fetching/fetchingType';
import Logging from '../../logging/logging';

export async function readJson(filePath:string):Promise<fetchType.Flyer[]>{
    try{
        const flyerData = await readFile(filePath, 'utf-8');
        const flyerArray = JSON.parse(flyerData);
        const flyerList: fetchType.Flyer[] = flyerArray.flyers;
        return flyerList;

    } catch(error){
        const msg = `Fail to read fetched data into Flyer objects: `;
        Logging.error (msg + error);
        throw new Error(msg + error);
    }

}