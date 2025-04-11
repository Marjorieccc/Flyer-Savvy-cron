// This file parse information for adding new flyer from fetched object

import * as fetch from '../fetching/fetchingType';
import * as parseType from './parsingType';
import Logging from '../../logging/logging';

export async function parseFlyer(flyer:fetch.Flyer):Promise<parseType.Flyer|null>{
  try{
    return {
      importedFlyerId: flyer.id,
      validFrom: flyer.validFrom ?? null,
      validTo: flyer.validTo ??  null,
    }
  } catch(error){
      Logging.error;
      return null;
  }
}